import { useEffect, useRef } from "react";
import { useGitHubCommits } from "../../hooks/useGitHubCommits";
import type { GitHubCommit } from "../../hooks/useGitHubCommits";
import TerminalCard from "../ui/TerminalCard";
import { useTypewriter } from "../../hooks/useTypewriter";

function CommitRow({ commit, timeAgo }: { commit: GitHubCommit; timeAgo: (ts: string) => string }) {
  return (
    <a href={commit.url} target="_blank" rel="noopener noreferrer" className="commit-row">
      <span className="commit-arrow">-&gt;</span>
      <span className="commit-body">
        <span className="commit-message">{commit.message}</span>
        <span className="commit-meta">
          <span className="commit-repo">{commit.repo}</span>
          <span className="commit-sha">{commit.sha}</span>
        </span>
      </span>
      <span className="commit-time">{timeAgo(commit.timestamp)}</span>
    </a>
  );
}

export default function Logs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { commits, loading, error, lastUpdated, timeAgo } = useGitHubCommits();
  const { displayed, done } = useTypewriter('$ tail -f logs/activity.log', { speed: 50, delay: 200, triggerRef: sectionRef });
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || commits.length === 0) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    posRef.current = 0;
    const speed = 1.0;
    function animate() {
      if (!track) return;
      posRef.current += speed;
      const halfHeight = track.scrollHeight / 2;
      if (posRef.current >= halfHeight) posRef.current = 0;
      track.style.transform = `translateY(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [commits]);

  function pauseScroll() { if (animRef.current) cancelAnimationFrame(animRef.current); }

  function resumeScroll() {
    if (!trackRef.current || commits.length === 0) return;
    const track = trackRef.current;
    const speed = 1.0;
    function animate() {
      posRef.current += speed;
      const halfHeight = track.scrollHeight / 2;
      if (posRef.current >= halfHeight) posRef.current = 0;
      track.style.transform = `translateY(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
  }

  const doubled = [...commits, ...commits];

  return (
    <section ref={sectionRef} className="logs-section" id="logs">
      <div className="logs-inner">
        <div className="logs-header">
          <span className="logs-icon">📋</span>
          <span className="logs-command">
            {displayed}
            {!done && <span style={{ animation: 'blink-cur 1s step-end infinite' }}>▊</span>}
          </span>
          {done && <div className="logs-rule" />}
        </div>

        <TerminalCard title="activity.log — streaming" showDots>
          <div className="logs-live-badge">
            <span className="logs-live-dot" />
            <span className="logs-live-text">LIVE</span>
          </div>
          <div className="logs-viewport" onMouseEnter={pauseScroll} onMouseLeave={resumeScroll}>
            {loading && <div className="logs-state">fetching commits...</div>}
            {error && !loading && <div className="logs-state logs-error">! rate limited — commits will load shortly. try refreshing in 60s.</div>}
            {!loading && !error && commits.length === 0 && <div className="logs-state">no recent commits found</div>}
            {!loading && !error && commits.length > 0 && (
              <div className="logs-track" ref={trackRef}>
                {doubled.map((commit, i) => <CommitRow key={`${commit.id}-${i}`} commit={commit} timeAgo={timeAgo} />)}
              </div>
            )}
          </div>
          <div className="logs-prompt">
            <span>$ </span>
            <span className="logs-cursor-blink" />
          </div>
        </TerminalCard>

        {lastUpdated && (
          <p className="logs-updated">last synced {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        )}
      </div>

      <style>{`
        @keyframes blink-cur { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .logs-section { padding: 80px 40px; width: 100%; box-sizing: border-box; display: flex; justify-content: center; }
        .logs-inner { width: 100%; max-width: 1560px; }
        .logs-header { margin-bottom: 40px; display: flex; align-items: center; gap: 12px; }
        .logs-icon { font-size: 18px; }
        .logs-command { font-family: 'JetBrains Mono', monospace; font-size: 18px; color: #a78bfa; letter-spacing: 0.01em; white-space: nowrap; }
        .logs-rule { flex: 1; height: 1px; background: var(--border, #1e293b); }
        .logs-live-badge { display: flex; align-items: center; gap: 0.4rem; position: absolute; top: 0.6rem; right: 1rem; z-index: 1; }
        .logs-live-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: pulse-dot 1.6s ease-in-out infinite; }
        .logs-live-text { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #4ade80; letter-spacing: 0.08em; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }
        .logs-viewport { height: 380px; overflow: hidden; position: relative; }
        .logs-viewport::before, .logs-viewport::after { content: ''; position: absolute; left: 0; right: 0; height: 48px; z-index: 2; pointer-events: none; }
        .logs-viewport::before { top: 0; background: linear-gradient(to bottom, var(--bg-card, #1a1a2e), transparent); }
        .logs-viewport::after { bottom: 0; background: linear-gradient(to top, var(--bg-card, #1a1a2e), transparent); }
        .logs-track { will-change: transform; }
        .commit-row { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.9rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); text-decoration: none; transition: background 0.15s ease; }
        .commit-row:hover { background: rgba(167, 139, 250, 0.06); }
        .commit-arrow { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #a78bfa; margin-top: 0.1rem; flex-shrink: 0; opacity: 0.8; }
        .commit-body { flex: 1; display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; }
        .commit-message { font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; }
        .commit-meta { display: flex; align-items: center; gap: 0.75rem; }
        .commit-repo { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: #64748b; }
        .commit-sha { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #475569; background: rgba(255,255,255,0.04); padding: 0.1rem 0.4rem; border-radius: 3px; border: 1px solid rgba(255,255,255,0.06); }
        .commit-time { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: #64748b; flex-shrink: 0; margin-top: 0.1rem; }
        .logs-state { padding: 1.5rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: #64748b; }
        .logs-error { color: #fbbf24; }
        .logs-prompt { padding: 0.75rem 1rem 0.25rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: #a78bfa; display: flex; align-items: center; gap: 0.25rem; }
        .logs-cursor-blink { display: inline-block; width: 9px; height: 1.1em; background: #a78bfa; opacity: 0.9; animation: blink 1.1s step-end infinite; vertical-align: text-bottom; }
        @keyframes blink { 0%, 100% { opacity: 0.9; } 50% { opacity: 0; } }
        .logs-updated { margin-top: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #475569; text-align: right; }
        @media (max-width: 600px) { .logs-section { padding: 2.5rem 1rem; } .commit-message { font-size: 0.85rem; } .logs-viewport { height: 300px; } }
      `}</style>
    </section>
  );
}