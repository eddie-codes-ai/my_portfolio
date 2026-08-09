// Vercel serverless function. Proxies GitHub's public events feed using a
// server-side token so the 5,000 req/hr authenticated rate limit applies
// instead of the 60 req/hr unauthenticated limit shared by every visitor's IP.
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

    const ghRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      { headers }
    );

    if (!ghRes.ok) {
      res.status(ghRes.status).json({ error: `GitHub API error: ${ghRes.status}` });
      return;
    }

    const events = await ghRes.json();

    // Cache at Vercel's edge so repeat visits (and page revisits) don't
    // re-hit GitHub at all — keeps us far under any rate limit regardless.
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(events);
  } catch {
    res.status(500).json({ error: "Failed to fetch GitHub activity" });
  }
}
