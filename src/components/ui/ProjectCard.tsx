import { useState } from 'react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<Project['status'], string> = {
  live: 'var(--green)',
  'in-progress': 'var(--yellow)',
  archived: 'var(--text-muted)',
};

function ProjectCard({ project }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const [highlights, setHighlights] = useState<string[] | null>(
    project.source === 'github' ? null : project.highlights
  );
  const [loadingHighlights, setLoadingHighlights] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  async function handleToggle() {
    const opening = !open;
    setOpen(opening);
    if (opening && project.source === 'github' && highlights === null && !loadingHighlights) {
      setLoadingHighlights(true);
      try {
        const res = await fetch(`/api/github-readme?repo=${encodeURIComponent(project.id)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { highlights: string[] } = await res.json();
        setHighlights(data.highlights);
      } catch {
        setFetchFailed(true);
      } finally {
        setLoadingHighlights(false);
      }
    }
  }

  return (
    <div
      className="project-card"
      data-open={open}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'border-color var(--transition), background var(--transition)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-accent)';
        (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card-hover)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: statusColors[project.status],
              display: 'block',
              flexShrink: 0,
              marginTop: '2px',
            }}
          />
          <span
            style={{
              fontSize: '17px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {project.name}
          </span>
          {project.source === 'github' && (
            <span
              title="Auto-synced from GitHub"
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 8px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              synced
            </span>
          )}
          {project.private && (
            <span
              title="Private repository"
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 8px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              🔒 private
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              github
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                color: 'var(--accent)',
                border: '1px solid var(--border-accent)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              live ↗
            </a>
          )}
        </div>
      </div>

      <p
        style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: '1.75',
          fontFamily: 'var(--font-mono)',
          margin: 0,
        }}
      >
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 12px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <button type="button" className="pc-expand-btn" onClick={handleToggle}>
        <span className="pc-chev">▸</span> {open ? 'hide details' : 'view details'}
      </button>

      <div className="pc-detail">
        <div className="pc-detail-inner">
          <div style={{ paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {project.source === 'github' && (
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                <b style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Auto-synced</b> — parsed from{' '}
                <b style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>README.md</b> on GitHub
              </div>
            )}

            {loadingHighlights && (
              <div className="pc-skeleton">
                <div className="pc-bar" />
                <div className="pc-bar" />
                <div className="pc-bar" />
              </div>
            )}

            {!loadingHighlights && fetchFailed && highlights === null && (
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Couldn't load details right now — try again in a moment.
              </div>
            )}

            {!loadingHighlights && highlights && highlights.length > 0 && (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0 }}>
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '13.5px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}
                  >
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>›</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {!loadingHighlights && highlights && highlights.length === 0 && (
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No additional details available.</div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .pc-expand-btn {
          all: unset;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 12.5px;
          padding-top: 4px;
          border-top: 1px dashed var(--border);
        }
        .pc-expand-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
          border-radius: 2px;
        }
        .pc-chev {
          display: inline-block;
          transition: transform 0.25s ease;
          font-size: 10px;
        }
        .project-card[data-open="true"] .pc-chev { transform: rotate(90deg); }
        .pc-detail {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }
        .project-card[data-open="true"] .pc-detail { grid-template-rows: 1fr; }
        .pc-detail-inner { overflow: hidden; }
        .pc-skeleton { display: flex; flex-direction: column; gap: 8px; }
        .pc-bar {
          height: 12px;
          border-radius: 3px;
          background: linear-gradient(90deg, var(--border) 0%, var(--bg-card-hover) 50%, var(--border) 100%);
          background-size: 200% 100%;
          animation: pc-shimmer 1.3s ease-in-out infinite;
        }
        .pc-bar:nth-child(1) { width: 88%; }
        .pc-bar:nth-child(2) { width: 72%; }
        .pc-bar:nth-child(3) { width: 80%; }
        @keyframes pc-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pc-detail, .pc-chev, .pc-bar { transition: none; animation: none; }
        }
      `}</style>
    </div>
  );
}

export default ProjectCard;