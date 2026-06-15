import { useEffect, useState } from 'react';

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
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(10, 14, 19, 0.92)',
        backdropFilter: 'blur(12px)',
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
          }}
        />
        <span style={{ fontSize: '18px', color: 'var(--accent)', fontWeight: 600 }}>
          edwin.mwai://os
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
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

      {/* Right side status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
    </nav>
  );
}

export default Navbar;