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
        <span style={{ color: 'var(--accent)', fontSize: '16px' }}>🗂</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '15px' }}>$ system.architecture()</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {skills.map((skill) => <SkillBar key={skill.id} skill={skill} />)}
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px' }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '20px' }}>~ /system/overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: '6px' }}>{stat.label}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Architecture;