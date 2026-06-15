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
        background: 'rgba(10, 14, 19, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '44px',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'block',
          }}
        />
        <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>
          edwin.mwai://os
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {navLinks.map((link) => {
          const id = link.href.replace('#', '');
          const isActive = activeSection === id;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                fontSize: '12px',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color var(--transition)',
                fontFamily: 'var(--font-mono)',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = 'var(--text-primary)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color = isActive
                  ? 'var(--accent)'
                  : 'var(--text-secondary)')
              }
            >
              {link.label}
            </a>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TLS</span>
        <span style={{ fontSize: '11px', color: 'var(--green)' }}>● 100%</span>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>⏱ {time}</span>
      </div>
    </nav>
  );
}

export default Navbar;