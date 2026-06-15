import SkillBar from '../ui/SkillBar';
import { skills } from '../../data/skills';

const stats = [
  { value: '2+', label: 'Languages', sub: 'production-grade' },
  { value: '8+', label: 'Frameworks', sub: 'battle-tested' },
  { value: '2+', label: 'Systems Built', sub: 'and counting' },
];

function Architecture() {
  return (
    <section
      id="architecture"
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
        <span style={{ color: 'var(--accent)', fontSize: '16px' }}>🗂</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '16px' }}>$ system.architecture()</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
        {skills.map((skill) => <SkillBar key={skill.id} skill={skill} />)}
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '32px' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '24px' }}>~ /system/overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '28px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{stat.value}</div>
              <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>{stat.label}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Architecture;