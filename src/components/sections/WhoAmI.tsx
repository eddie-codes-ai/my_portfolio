import TerminalCard from '../ui/TerminalCard';
import { profile } from '../../data/profile';

function WhoAmI() {
  return (
    <section
      id="whoami"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 64px 64px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
          &gt;_ $ whoami
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}
      >
        <TerminalCard title="profile.json" accentBorder>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-glow)',
                border: '1px solid var(--border-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}
            >
              &lt;/&gt;
            </div>
            <div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {profile.name}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {profile.title}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>📍 location: </span>
              <span style={{ color: 'var(--accent)' }}>"{profile.location}"</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>⚡ status: </span>
              <span style={{ color: 'var(--green)' }}>"{profile.status}"</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-muted)' }}>&lt;/&gt; focus: </span>
              <span style={{ color: 'var(--text-primary)' }}>"web &amp; mobile"</span>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '16px',
              marginBottom: '20px',
            }}
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span style={{ color: 'var(--accent)' }}>{stat.label}: </span>
                {stat.value}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '34px',
                height: '34px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                transition: 'border-color var(--transition), color var(--transition)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)';
              }}
            >
              GH
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '34px',
                height: '34px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                transition: 'border-color var(--transition), color var(--transition)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)';
              }}
            >
              LI
            </a>
            <a
              href={`mailto:${profile.social.email}`}
              style={{
                width: '34px',
                height: '34px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                transition: 'border-color var(--transition), color var(--transition)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)';
              }}
            >
              @
            </a>
          </div>
        </TerminalCard>

        <TerminalCard title="philosophy.md">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {profile.philosophy.paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {para}
              </p>
            ))}
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-mono)',
              }}
            >
              "{profile.philosophy.quote}"
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
              {profile.philosophy.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '3px 10px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </TerminalCard>
      </div>
    </section>
  );
}

export default WhoAmI;