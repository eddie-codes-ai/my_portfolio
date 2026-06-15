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
        padding: '80px 80px',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '16px' }}>🔀</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '15px' }}>$ ls production-projects/</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button key={f.value} onClick={() => setActive(f.value)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '6px 16px', borderRadius: '20px', border: `1px solid ${active === f.value ? 'var(--accent)' : 'var(--border)'}`, background: active === f.value ? 'var(--accent-glow)' : 'transparent', color: active === f.value ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all var(--transition)' }}
          >{f.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
          no projects found in this category.
        </div>
      )}
    </section>
  );
}

export default Deployments;