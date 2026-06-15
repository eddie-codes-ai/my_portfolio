import { useState } from 'react';
import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

type Filter = 'all' | Project['type'];

const filters: { label: string; value: Filter }[] = [
  { label: 'all', value: 'all' },
  { label: 'fullstack', value: 'fullstack' },
  { label: 'mobile', value: 'mobile' },
  { label: 'frontend', value: 'frontend' },
  { label: 'backend', value: 'backend' },
];

function Deployments() {
  const [active, setActive] = useState<Filter>('all');
  const filtered = active === 'all' ? projects : projects.filter((p) => p.type === active);

  return (
    <section
      id="deployments"
      style={{
        minHeight: '100vh',
        padding: '80px 120px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '16px' }}>🔀</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '16px' }}>$ ls production-projects/</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button key={f.value} onClick={() => setActive(f.value)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', padding: '8px 20px', borderRadius: '20px', border: `1px solid ${active === f.value ? 'var(--accent)' : 'var(--border)'}`, background: active === f.value ? 'var(--accent-glow)' : 'transparent', color: active === f.value ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all var(--transition)' }}
          >{f.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
          no projects found in this category.
        </div>
      )}
    </section>
  );
}

export default Deployments;