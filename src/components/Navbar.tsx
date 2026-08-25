import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const navLinks = [
  { label: 'whoami', href: '#whoami' },
  { label: 'system.architecture()', href: '#architecture' },
  { label: 'deployments/', href: '#deployments' },
  { label: 'logs/activity', href: '#logs' },
  { label: 'connect.secure()', href: '#connect' },
];

function Navbar() {
  const [time, setTime] = useState('');
  const [activeSection, setActiveSection] = useState('whoami');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = ['whoami', 'architecture', 'deployments', 'logs', 'connect'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="navbar"
      data-open={mobileOpen}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        transition: 'background-color var(--transition), border-color var(--transition)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        height: '64px',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'block',
            boxShadow: '0 0 6px var(--accent)',
            flexShrink: 0,
          }}
        />
        <span className="navbar-brand-text" style={{ fontSize: '18px', color: 'var(--accent)', fontWeight: 600 }}>
          edwin.mwai://os
        </span>
      </div>

      {/* Nav links */}
      <div className={`navbar-links${mobileOpen ? ' open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {navLinks.map((link) => {
          const id = link.href.replace('#', '');
          const isActive = activeSection === id;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                fontSize: '14px',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color var(--transition)',
                fontFamily: 'var(--font-mono)',
                paddingBottom: '2px',
                borderBottom: isActive ? '1px solid var(--accent)' : '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = isActive
                  ? 'var(--accent)'
                  : 'var(--text-secondary)';
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>

      {/* Right side: status, theme toggle, mobile hamburger */}
      <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div className="navbar-status" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ fontSize: '15px', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>TLS</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <circle cx="12" cy="20" r="1" fill="var(--green)" />
          </svg>
          <span style={{ fontSize: '15px', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>100%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span style={{ fontSize: '15px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{time}</span>
        </div>
      </div>

      {/* Theme toggle */}
      <button
        type="button"
        className="navbar-theme-toggle"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={toggleTheme}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          background: 'transparent',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'border-color var(--transition), color var(--transition)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-accent)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
        }}
      >
        {theme === 'dark' ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        className="navbar-toggle"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span className="navbar-toggle-bar" />
        <span className="navbar-toggle-bar" />
        <span className="navbar-toggle-bar" />
      </button>
      </div>

      <style>{`
        .navbar-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 32px;
          height: 32px;
          padding: 0;
          flex-shrink: 0;
        }
        .navbar-toggle-bar {
          width: 100%;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .navbar[data-open="true"] .navbar-toggle-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .navbar[data-open="true"] .navbar-toggle-bar:nth-child(2) { opacity: 0; }
        .navbar[data-open="true"] .navbar-toggle-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        @media (max-width: 860px) {
          .navbar { padding: 0 16px !important; }
          .navbar-links, .navbar-status { display: none !important; }
          .navbar-toggle { display: flex; }

          .navbar-links.open {
            display: flex !important;
            flex-direction: column;
            align-items: stretch;
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            gap: 4px;
            padding: 12px 16px 20px;
            background: var(--nav-bg-solid);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
          }
          .navbar-links.open a {
            padding: 12px 8px;
            border-bottom: 1px solid var(--border) !important;
            width: 100%;
            box-sizing: border-box;
          }
        }

        @media (max-width: 380px) {
          .navbar-brand-text { font-size: 15px !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
