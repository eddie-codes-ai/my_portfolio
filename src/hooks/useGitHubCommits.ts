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
const POLL_INTERVAL = 60_000;
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

async function fetchRepos(): Promise<string[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const repos = await res.json();
  return repos.map((r: { name: string }) => r.name);
}

async function fetchCommitsForRepo(repo: string): Promise<GitHubCommit[]> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits?per_page=5`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) return [];
  const commits = await res.json();
  if (!Array.isArray(commits)) return [];

  return commits.map((c: {
    sha: string;
    commit: { message: string; author: { date: string } };
    html_url: string;
  }) => ({
    id: c.sha,
    sha: c.sha.slice(0, 7),
    message: c.commit.message.split("\n")[0],
    repo,
    timestamp: c.commit.author.date,
    url: c.html_url,
  }));
}

async function fetchAllCommits(): Promise<GitHubCommit[]> {
  const repos = await fetchRepos();

  const results = await Promise.all(
    repos.map((repo) => fetchCommitsForRepo(repo))
  );

  const all = results
    .flat()
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, MAX_COMMITS);

  return all;
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