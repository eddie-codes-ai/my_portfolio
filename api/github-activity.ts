// Vercel serverless function. Returns a flattened, pre-sorted list of recent
// commits across the user's most-recently-pushed repos.
//
// Note: GitHub's /events/public feed (tried first in an earlier version of
// this file) frequently omits payload.commits entirely, so it can't be
// trusted as a data source. Listing repos + fetching commits per repo is
// reliable, and now that this runs server-side with an authenticated token
// (5000 req/hr) behind a 60s edge cache, the extra requests are cheap and
// no longer depend on any individual visitor's IP quota.
//
// Requires a GITHUB_TOKEN env var set in the Vercel project (Settings ->
// Environment Variables). A classic PAT with no scopes checked is enough —
// this only ever reads public data.

interface VercelRequest {
  method?: string;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string): VercelResponse;
  json(body: unknown): void;
}

const GITHUB_USERNAME = "eddie-codes-ai";
const REPO_COUNT = 8;
const COMMITS_PER_REPO = 5;
const MAX_COMMITS = 20;

interface RawCommit {
  repo: string;
  sha: string;
  message: string;
  date: string;
  url: string;
}

function githubFetch(url: string, token: string | undefined) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "my-portfolio-activity-feed",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { headers });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const token = process.env.GITHUB_TOKEN;

    const reposRes = await githubFetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${REPO_COUNT}`,
      token
    );
    if (!reposRes.ok) {
      res.status(reposRes.status).json({ error: `GitHub API error: ${reposRes.status}` });
      return;
    }
    const repos: { name: string }[] = await reposRes.json();

    const perRepo = await Promise.all(
      repos.map(async (repo): Promise<RawCommit[]> => {
        const cRes = await githubFetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=${COMMITS_PER_REPO}`,
          token
        );
        if (!cRes.ok) return [];
        const commits = await cRes.json();
        if (!Array.isArray(commits)) return [];

        return commits.map((c: {
          sha: string;
          commit: { message: string; author?: { date: string }; committer?: { date: string } };
          html_url: string;
        }) => ({
          repo: repo.name,
          sha: c.sha,
          message: c.commit.message,
          date: c.commit.author?.date ?? c.commit.committer?.date ?? new Date().toISOString(),
          url: c.html_url,
        }));
      })
    );

    const commits = perRepo
      .flat()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_COMMITS);

    // Cache at Vercel's edge so repeat visits don't re-hit GitHub at all.
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    // Non-secret diagnostics: confirms GITHUB_TOKEN is actually in use.
    const limit = reposRes.headers.get("x-ratelimit-limit");
    const remaining = reposRes.headers.get("x-ratelimit-remaining");
    if (limit) res.setHeader("X-GitHub-RateLimit-Limit", limit);
    if (remaining) res.setHeader("X-GitHub-RateLimit-Remaining", remaining);
    res.status(200).json(commits);
  } catch {
    res.status(500).json({ error: "Failed to fetch GitHub activity" });
  }
}
