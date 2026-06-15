import SkillBar from '../ui/SkillBar';
import { skills } from '../../data/skills';
import { useTypewriter } from '../../hooks/useTypewriter';

const stats = [
  { value: '6+', label: 'Languages', sub: 'production-grade' },
  { value: '10+', label: 'Frameworks', sub: 'battle-tested' },
  { value: '10+', label: 'Systems Built', sub: 'and counting' },
];

function Architecture() {
  const { displayed, done, cursorChar } = useTypewriter('$ system.architecture()', { speed: 50, delay: 300 });

  return (
    <section id="architecture" style={{ minHeight: '100vh', padding: '80px 40px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1560px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '18px' }}>🗂</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '18px' }}>
          {displayed}
          {!done && <span style={{ animation: 'blink-cur 1s step-end infinite' }}>{cursorChar}</span>}
        </span>
        {done && <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />}
      </div>

      <div style={{ width: '100%', maxWidth: '1560px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        {skills.map((skill) => <SkillBar key={skill.id} skill={skill} />)}
      </div>

      <div style={{ width: '100%', maxWidth: '1560px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '28px' }}>~ /system/overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '36px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{stat.value}</div>
              <div style={{ fontSize: '17px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: '10px' }}>{stat.label}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '6px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink-cur {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default Architecture;