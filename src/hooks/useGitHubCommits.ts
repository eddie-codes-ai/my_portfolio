import { useState, useEffect, useRef } from "react";

export interface GitHubCommit {
  id: string;
  message: string;
  repo: string;
  timestamp: string;
  sha: string;
  url: string;
}

const GITHUB_USERNAME = "eddie-codes-ai";
const POLL_INTERVAL = 5 * 60_000;
const MAX_COMMITS = 20;

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}

interface RawCommit {
  repo: string;
  sha: string;
  message: string;
  date: string;
  url: string;
}

// Prefer the /api/github-activity serverless proxy (authenticated, 5000
// req/hr, edge-cached, and does the repo-list + per-repo-commits work
// server-side). Fall back to calling GitHub directly — same repos+commits
// approach, just unauthenticated — if the proxy isn't reachable, e.g.
// running `vite dev` without `vercel dev`.
async function fetchAllCommits(): Promise<GitHubCommit[]> {
  try {
    const proxied = await fetch("/api/github-activity");
    if (proxied.ok) {
      const raw: RawCommit[] = await proxied.json();
      return raw.map((c) => ({
        id: c.sha,
        sha: c.sha.slice(0, 7),
        message: c.message.split("\n")[0],
        repo: c.repo,
        timestamp: c.date,
        url: c.url,
      }));
    }
  } catch {
    // proxy unreachable — fall through to direct calls
  }

  const reposRes = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=8`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!reposRes.ok) throw new Error(`GitHub API error: ${reposRes.status}`);
  const repos: { name: string }[] = await reposRes.json();

  const perRepo = await Promise.all(
    repos.map(async (repo): Promise<GitHubCommit[]> => {
      const cRes = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=5`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!cRes.ok) return [];
      const commits = await cRes.json();
      if (!Array.isArray(commits)) return [];

      return commits.map((c: {
        sha: string;
        commit: { message: string; author: { date: string } };
        html_url: string;
      }) => ({
        id: c.sha,
        sha: c.sha.slice(0, 7),
        message: c.commit.message.split("\n")[0],
        repo: repo.name,
        timestamp: c.commit.author.date,
        url: c.html_url,
      }));
    })
  );

  return perRepo
    .flat()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, MAX_COMMITS);
}

export function useGitHubCommits() {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function load() {
    try {
      const data = await fetchAllCommits();
      setCommits(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (e) {
      // Keep whatever commits we already have on screen — a transient
      // failure shouldn't blank out a working feed.
      setError(e instanceof Error ? e.message : "Failed to fetch commits");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    timerRef.current = setInterval(load, POLL_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { commits, loading, error, lastUpdated, timeAgo };
}
