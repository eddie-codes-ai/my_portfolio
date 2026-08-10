// Vercel serverless function. Fetches a public repo's README and extracts
// the bullet points under a "## Highlights" heading, for the Deployments
// section's click-to-expand card detail.
//
// Only ever reads public READMEs — GITHUB_TOKEN only has Metadata:
// Read-only, no Contents access, so this can't (and doesn't try to) read
// private repos. Curated cards (private repos) use their own hand-written
// highlights instead and never call this endpoint.

import process from "node:process";

interface VercelRequest {
  method?: string;
  url?: string;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string): VercelResponse;
  json(body: unknown): void;
}

const GITHUB_USERNAME = "eddie-codes-ai";
const REPO_NAME_PATTERN = /^[\w.-]+$/;

function parseHighlights(markdown: string): string[] {
  const lines = markdown.split("\n");
  const startIdx = lines.findIndex((l) => /^##\s+highlights\s*$/i.test(l.trim()));
  if (startIdx === -1) return [];

  const items: string[] = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^##\s+/.test(line)) break;
    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) items.push(cleanMarkdown(bullet[1]));
  }
  return items;
}

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const url = new URL(req.url ?? "", "http://localhost");
  const repo = url.searchParams.get("repo");
  if (!repo || !REPO_NAME_PATTERN.test(repo)) {
    res.status(400).json({ error: "Invalid or missing repo parameter" });
    return;
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    // Deliberately request the default JSON envelope, not a raw/text
    // Accept variant — GitHub doesn't reliably honor raw-content
    // negotiation on this endpoint, and letting fetch's .text() guess the
    // charset on whatever it decides to send back corrupted non-ASCII
    // characters (em dashes came back as mojibake). Decoding the
    // guaranteed-base64 `content` field ourselves is unambiguous.
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "my-portfolio-activity-feed",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const ghRes = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/readme`,
      { headers }
    );

    if (!ghRes.ok) {
      res.status(ghRes.status).json({ error: `GitHub API error: ${ghRes.status}` });
      return;
    }

    const data: { content?: string; encoding?: string } = await ghRes.json();
    if (!data.content || data.encoding !== "base64") {
      res.status(200).json({ highlights: [] });
      return;
    }
    const markdown = Buffer.from(data.content, "base64").toString("utf-8");
    const highlights = parseHighlights(markdown);

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    res.status(200).json({ highlights });
  } catch {
    res.status(500).json({ error: "Failed to fetch README" });
  }
}
