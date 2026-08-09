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
const POLL_INTERVAL = 5 * 60_000; // 5 min — GitHub's unauthenticated API allows only 60 req/hr per IP
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

interface PushEventCommit {
  sha: string;
  message: string;
}

interface PushEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: PushEventCommit[] };
}

// Single request: GitHub's public events feed already contains recent push
// activity across every repo, so we don't need one call per repo.
async function fetchAllCommits(): Promise<GitHubCommit[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const events = await res.json();
  if (!Array.isArray(events)) return [];

  const commits: GitHubCommit[] = [];
  for (const event of events as PushEvent[]) {
    if (event.type !== "PushEvent" || !event.payload?.commits) continue;
    const repo = event.repo.name.split("/").pop() ?? event.repo.name;
    for (const c of event.payload.commits) {
      commits.push({
        id: c.sha,
        sha: c.sha.slice(0, 7),
        message: c.message.split("\n")[0],
        repo,
        timestamp: event.created_at,
        url: `https://github.com/${event.repo.name}/commit/${c.sha}`,
      });
    }
  }

  return commits
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
      // rate-limit shouldn't blank out a working feed.
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
