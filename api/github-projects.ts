// Vercel serverless function. Returns the account's repos — including
// private ones, if GITHUB_TOKEN has Metadata: Read-only access to them —
// so the Deployments section can auto-list projects that aren't hand
// -curated in src/data/projects.ts. Same auth/caching strategy as
// api/github-activity.ts — see that file for details.
//
// With a token: hits /user/repos (authenticated-owner listing), which
// includes private repos the token can see. "Metadata: Read-only" is
// enough for the fields this endpoint returns (name, description,
// language, topics, homepage, etc.) — no Contents/commit access needed
// or used here.
// Without a token: falls back to the public /users/{username}/repos
// listing, same as before — public repos only.

import process from "node:process";

interface VercelRequest {
  method?: string;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string): VercelResponse;
  json(body: unknown): void;
}

const GITHUB_USERNAME = "eddie-codes-ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "my-portfolio-activity-feed",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const url = token
      ? `https://api.github.com/user/repos?type=owner&sort=pushed&per_page=100`
      : `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&per_page=100`;
    const ghRes = await fetch(url, { headers });

    if (!ghRes.ok) {
      res.status(ghRes.status).json({ error: `GitHub API error: ${ghRes.status}` });
      return;
    }

    const repos = await ghRes.json();

    // Project list changes far less often than commits — cache longer.
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
    const limit = ghRes.headers.get("x-ratelimit-limit");
    const remaining = ghRes.headers.get("x-ratelimit-remaining");
    if (limit) res.setHeader("X-GitHub-RateLimit-Limit", limit);
    if (remaining) res.setHeader("X-GitHub-RateLimit-Remaining", remaining);
    res.status(200).json(repos);
  } catch {
    res.status(500).json({ error: "Failed to fetch GitHub repos" });
  }
}
