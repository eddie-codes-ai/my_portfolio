import TerminalCard from '../ui/TerminalCard';
import { profile } from '../../data/profile';

function WhoAmI() {
  return (
    <section
      id="whoami"
      style={{
        minHeight: '100vh',
        padding: '120px 80px 80px',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '15px' }}>
          &gt;_ $ whoami
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <TerminalCard title="profile.json" accentBorder>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: 'var(--accent-glow)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
              &lt;/&gt;
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{profile.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{profile.title}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>📍 location: </span>
              <span style={{ color: 'var(--accent)' }}>"{profile.location}"</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>⚡ status: </span>
              <span style={{ color: 'var(--green)' }}>"{profile.status}"</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-muted)' }}>&lt;/&gt; focus: </span>
              <span style={{ color: 'var(--text-primary)' }}>"web &amp; mobile"</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '24px' }}>
            {profile.stats.map((stat) => (
              <div key={stat.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <span style={{ color: 'var(--accent)' }}>{stat.label}: </span>{stat.value}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { href: profile.social.github, label: 'GH' },
              { href: profile.social.linkedin, label: 'LI' },
              { href: `mailto:${profile.social.email}`, label: '@' },
            ].map(({ href, label }) => (
              <a key={label} href={href} target={label !== '@' ? '_blank' : undefined} rel="noopener noreferrer"
                style={{ width: '38px', height: '38px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '13px', fontFamily: 'var(--font-mono)', transition: 'border-color var(--transition), color var(--transition)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; }}
              >{label}</a>
            ))}
          </div>
        </TerminalCard>

        <TerminalCard title="philosophy.md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {profile.philosophy.paragraphs.map((para, i) => (
              <p key={i} style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>{para}</p>
            ))}
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', fontFamily: 'var(--font-mono)' }}>"{profile.philosophy.quote}"</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
              {profile.philosophy.tags.map((tag) => (
                <span key={tag} style={{ fontSize: '12px', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '4px 12px', fontFamily: 'var(--font-mono)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </TerminalCard>
      </div>
    </section>
  );
}

export default WhoAmI;