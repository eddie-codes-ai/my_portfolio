import { useEffect, useState } from "react";
import type { Project } from "../types";

const GITHUB_USERNAME = "eddie-codes-ai";
const POLL_INTERVAL = 10 * 60_000; // repo list changes rarely — 10 min is plenty
const MAX_AUTO_PROJECTS = 6;

// Repos we never want surfaced as project cards: the portfolio itself and
// the special profile-readme repo.
const EXCLUDED_REPOS = new Set(["my_portfolio", GITHUB_USERNAME.toLowerCase()]);

const MOBILE_LANGS = new Set(["dart", "kotlin", "swift", "objective-c"]);
const BACKEND_LANGS = new Set(["python", "go", "rust", "java", "php", "c#", "ruby", "c++"]);
const FRONTEND_LANGS = new Set(["javascript", "typescript", "html", "css", "vue"]);
const KNOWN_TYPES = new Set<Project["type"]>(["frontend", "backend", "fullstack", "mobile"]);

interface RawRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
  created_at: string;
}

function prettify(repoName: string): string {
  return repoName
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

function inferType(repo: RawRepo): Project["type"] {
  const topicMatch = (repo.topics ?? []).find((t) => KNOWN_TYPES.has(t as Project["type"]));
  if (topicMatch) return topicMatch as Project["type"];

  const lang = repo.language?.toLowerCase() ?? "";
  if (MOBILE_LANGS.has(lang)) return "mobile";
  if (BACKEND_LANGS.has(lang)) return "backend";
  if (FRONTEND_LANGS.has(lang)) return "frontend";
  return "fullstack";
}

function toProject(repo: RawRepo): Project {
  return {
    id: repo.name.toLowerCase(),
    name: prettify(repo.name),
    description: repo.description ?? "No description provided.",
    type: inferType(repo),
    status: repo.archived ? "archived" : "live",
    year: String(new Date(repo.created_at).getFullYear()),
    techStack: Array.from(
      new Set([repo.language, ...(repo.topics ?? [])].filter((v): v is string => Boolean(v)))
    ).slice(0, 6),
    highlights: [],
    // Private repos aren't reachable by visitors — omit the dead link,
    // keep a live/deployed URL if one's set (that's meant to be public).
    github: repo.private ? undefined : repo.html_url,
    live: repo.homepage || undefined,
    source: "github",
    private: repo.private,
  };
}

async function fetchRepos(): Promise<RawRepo[]> {
  try {
    const proxied = await fetch("/api/github-projects");
    if (proxied.ok) return proxied.json();
  } catch {
    // proxy unreachable — fall through to direct call
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&per_page=100`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

// Fetches public, non-fork, non-archived, described repos and maps them to
// Project cards — used to fill in anything not already hand-curated in
// src/data/projects.ts.
export function useGitHubProjects(excludeIds: string[] = []) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const excluded = new Set(excludeIds.map((id) => id.toLowerCase()));

    async function load() {
      try {
        const repos = await fetchRepos();
        if (!Array.isArray(repos)) return;

        const mapped = repos
          .filter((r) => !r.fork && !r.archived && r.description)
          .filter((r) => !EXCLUDED_REPOS.has(r.name.toLowerCase()))
          .filter((r) => !excluded.has(r.name.toLowerCase()))
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
          .slice(0, MAX_AUTO_PROJECTS)
          .map(toProject);

        if (!cancelled) {
          setProjects(mapped);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to fetch repos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const timer = setInterval(load, POLL_INTERVAL);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- excludeIds is derived from static data, stable across renders
  }, []);

  return { projects, loading, error };
}
