import type { Skill } from '../../types';
import { useEffect, useRef, useState } from 'react';

interface SkillBarProps {
  skill: Skill;
}

const categoryColors: Record<Skill['category'], string> = {
  frontend: '#a78bfa',
  backend: '#60a5fa',
  mobile: '#34d399',
  devops: '#fbbf24',
  database: '#f472b6',
};

function SkillBar({ skill }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(skill.percentage), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [skill.percentage]);

  const color = categoryColors[skill.category];

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '14px 18px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>{skill.icon}</span>
          <span
            style={{
              fontSize: '13px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {skill.name}
          </span>
        </div>
        <span
          style={{
            fontSize: '13px',
            color,
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
          }}
        >
          {skill.percentage}%
        </span>
      </div>
      <div
        style={{
          height: '3px',
          background: 'var(--border)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${width}%`,
            background: color,
            borderRadius: '2px',
            transition: 'width 1s ease',
          }}
        />
      </div>
    </div>
  );
}

export default SkillBar;