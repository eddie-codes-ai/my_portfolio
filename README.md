# 🖥️ My Portfolio

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?logo=vercel&logoColor=white)

A personal developer portfolio built around a terminal/hacker aesthetic — but the interesting part isn't the visuals, it's that the activity feed and project catalog aren't hand-maintained. They sync live from GitHub through a set of serverless functions, so the site stays current without ever being manually updated.

## Highlights

- **Live commit activity ticker** — pulls recent commits across every repo through a serverless proxy, authenticated against GitHub and edge-cached, so it stays well under GitHub's rate limits regardless of traffic
- **Auto-synced project catalog** — pulls each project's description, topics, and tech stack directly from GitHub instead of a hardcoded list; add a repo, write a description, it shows up
- **Click-to-expand project cards** — fetches and parses each repo's README `## Highlights` section on demand, with a loading state while it fetches
- **Public and private repos, safely** — a narrowly-scoped (Metadata: read-only) GitHub token surfaces private repos on the card without ever exposing source code or file contents
- **Terminal/hacker UI** — boot screen animation, scroll-triggered typewriter section headers, ambient glow effects, a laser-scanner aesthetic pass
- **Contact form via EmailJS** — no backend needed for that piece

## Tech Stack

- React 19, TypeScript, Vite 8
- Vercel Serverless Functions (Node)
- EmailJS

## Project Structure

my_portfolio/
├── api/                      # Vercel serverless functions
│   ├── github-activity.ts    # commit feed proxy
│   ├── github-projects.ts    # repo list proxy
│   └── github-readme.ts      # README highlights parser
├── src/
│   ├── components/
│   │   ├── sections/         # WhoAmI, Deployments, Logs, Connect...
│   │   └── ui/                # ProjectCard, TerminalCard, SkillBar...
│   ├── hooks/                 # useGitHubCommits, useGitHubProjects, useTypewriter...
│   ├── data/                  # profile, curated project overrides
│   ├── types/
│   └── styles/
└── public/

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`
