import { useEffect, useState } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const bootLines = [
  { text: 'BIOS v1.0.0 — Initializing system...', delay: 0 },
  { text: 'Loading kernel modules...', delay: 400 },
  { text: 'Mounting /dev/skills...', delay: 800 },
  { text: 'Starting network services...', delay: 1200 },
  { text: 'Authenticating developer identity...', delay: 1600 },
  { text: '[OK] All systems operational.', delay: 2200, highlight: true },
  { text: '$ Welcome, Edwin Mwai.', delay: 2800, accent: true },
];

function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, line.delay);
    });

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 600);
    }, 3600);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px 40px',
          minWidth: '480px',
          maxWidth: '90vw',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--red)',
              display: 'block',
            }}
          />
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--yellow)',
              display: 'block',
            }}
          />
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--green)',
              display: 'block',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              marginLeft: '8px',
            }}
          >
            system_boot.sh
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {bootLines.map((line, index) => (
            <div
              key={index}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                opacity: visibleLines.includes(index) ? 1 : 0,
                transform: visibleLines.includes(index) ? 'translateY(0)' : 'translateY(4px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                color: line.accent
                  ? 'var(--accent)'
                  : line.highlight
                  ? 'var(--green)'
                  : 'var(--text-secondary)',
              }}
            >
              <span style={{ color: line.accent ? 'var(--accent)' : 'var(--text-muted)' }}>
                {line.accent ? '' : '$ '}
              </span>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BootScreen;