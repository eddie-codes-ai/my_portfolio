import { useState, useRef } from 'react';
import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import { useTypewriter } from '../../hooks/useTypewriter';

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
  const sectionRef = useRef<HTMLElement>(null);
  const { displayed, done } = useTypewriter('$ ls production-projects/', { speed: 50, delay: 200, triggerRef: sectionRef });

  return (
    <section ref={sectionRef} id="deployments" style={{ minHeight: '100vh', padding: '80px 40px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1560px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '18px' }}>🔀</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '18px' }}>
          {displayed}{!done && <span style={{ animation: 'blink-cur 1s step-end infinite' }}>▊</span>}
        </span>
        {done && <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />}
      </div>
      <div style={{ width: '100%', maxWidth: '1560px', display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button key={f.value} onClick={() => setActive(f.value)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', padding: '10px 24px', borderRadius: '20px', border: `1px solid ${active === f.value ? 'var(--accent)' : 'var(--border)'}`, background: active === f.value ? 'var(--accent-glow)' : 'transparent', color: active === f.value ? 'var(--accent)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all var(--transition)' }}
          >{f.label}</button>
        ))}
      </div>
      <div style={{ width: '100%', maxWidth: '1560px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
      {filtered.length === 0 && (
        <div style={{ width: '100%', maxWidth: '1560px', textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '15px' }}>no projects found in this category.</div>
      )}
      <style>{`@keyframes blink-cur { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </section>
  );
}

export default Deployments;