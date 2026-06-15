import TerminalCard from '../ui/TerminalCard';
import { profile } from '../../data/profile';

function WhoAmI() {
  return (
    <section
      id="whoami"
      style={{
        minHeight: '100vh',
        padding: '100px 120px 80px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '16px' }}>
          &gt;_ $ whoami
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        <TerminalCard title="profile.json" accentBorder>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', background: 'var(--accent-glow)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
              &lt;/&gt;
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{profile.name}</div>
              <div style={{ fontSize: '14px', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>{profile.title}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}>
              <span style={{ color: 'var(--text-muted)' }}>📍 location: </span>
              <span style={{ color: 'var(--accent)' }}>"{profile.location}"</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}>
              <span style={{ color: 'var(--text-muted)' }}>⚡ status: </span>
              <span style={{ color: 'var(--green)' }}>"{profile.status}"</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}>
              <span style={{ color: 'var(--text-muted)' }}>&lt;/&gt; focus: </span>
              <span style={{ color: 'var(--text-primary)' }}>"web &amp; mobile"</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginBottom: '28px' }}>
            {profile.stats.map((stat) => (
              <div key={stat.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span style={{ color: 'var(--accent)' }}>{stat.label}: </span>{stat.value}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { href: profile.social.github, label: 'GH' },
              { href: profile.social.linkedin, label: 'LI' },
              { href: `mailto:${profile.social.email}`, label: '@' },
            ].map(({ href, label }) => (
              <a key={label} href={href} target={label !== '@' ? '_blank' : undefined} rel="noopener noreferrer"
                style={{ width: '44px', height: '44px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'var(--font-mono)', transition: 'border-color var(--transition), color var(--transition)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; }}
              >{label}</a>
            ))}
          </div>
        </TerminalCard>

        <TerminalCard title="philosophy.md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {profile.philosophy.paragraphs.map((para, i) => (
              <p key={i} style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: '1.9', fontFamily: 'var(--font-mono)' }}>{para}</p>
            ))}
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontStyle: 'italic', fontFamily: 'var(--font-mono)' }}>"{profile.philosophy.quote}"</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
              {profile.philosophy.tags.map((tag) => (
                <span key={tag} style={{ fontSize: '13px', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '6px 14px', fontFamily: 'var(--font-mono)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </TerminalCard>
      </div>
    </section>
  );
}

export default WhoAmI;