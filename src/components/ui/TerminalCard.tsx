import type { ReactNode } from 'react';

interface TerminalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showDots?: boolean;
  accentBorder?: boolean;
}

function TerminalCard({
  title,
  children,
  className = '',
  showDots = true,
  accentBorder = false,
}: TerminalCardProps) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${accentBorder ? 'var(--border-accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
      className={className}
    >
      {(showDots || title) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
          }}
        >
          {showDots && (
            <div style={{ display: 'flex', gap: '6px' }}>
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
            </div>
          )}
          {title && (
            <span
              style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {title}
            </span>
          )}
        </div>
      )}
      <div style={{ padding: '20px' }}>{children}</div>
    </div>
  );
}

export default TerminalCard;