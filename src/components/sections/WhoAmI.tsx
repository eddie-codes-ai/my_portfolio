import TerminalCard from '../ui/TerminalCard';
import { profile } from '../../data/profile';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

function WhoAmI() {
  return (
    <section
      id="whoami"
      style={{
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '120px 40px 80px',
      }}
    >
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '1560px', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '18px' }}>
          &gt;_ $ whoami
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', width: '100%', maxWidth: '1560px' }}>

        {/* Left — profile card */}
        <div style={{ width: '540px', flexShrink: 0 }}>
          <TerminalCard title="profile.json" accentBorder>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-md)', background: 'var(--accent-glow)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                &lt;/&gt;
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{profile.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginTop: '5px' }}>{profile.title}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
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

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '22px', marginBottom: '28px' }}>
              {profile.stats.map((stat) => (
                <div key={stat.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--accent)' }}>{stat.label}: </span>{stat.value}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: profile.social.github, icon: <GithubIcon />, label: 'github' },
                { href: profile.social.linkedin, icon: <LinkedinIcon />, label: 'linkedin' },
                { href: `mailto:${profile.social.email}`, icon: <EmailIcon />, label: 'email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{ width: '48px', height: '48px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'border-color var(--transition), color var(--transition)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </TerminalCard>
        </div>

        {/* Right — philosophy card */}
        <div style={{ width: '980px', flexShrink: 0 }}>
          <TerminalCard title="philosophy.md" showDots>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {profile.philosophy.paragraphs.map((para, i) => (
                <p key={i} style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: '1.85', fontFamily: 'var(--font-mono)', margin: 0 }}>{para}</p>
              ))}
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic', fontFamily: 'var(--font-mono)', margin: 0 }}>"{profile.philosophy.quote}"</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {profile.philosophy.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: '13px', color: 'var(--accent)', border: '1px solid var(--border-accent)', borderRadius: '20px', padding: '6px 16px', fontFamily: 'var(--font-mono)', background: 'var(--accent-glow)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </TerminalCard>
        </div>

      </div>
    </section>
  );
}

export default WhoAmI;