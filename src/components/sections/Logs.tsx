const timeline = [
  { id: '1', year: '2025', title: 'Smart Personal Finance Tracker', organization: 'JKUAT — Final Year Project', description: 'Designed and developed a mobile-first financial management system for Kenyan university students with a Flutter frontend, Python Flask API, and an expert system for financial health scoring.', type: 'project' },
  { id: '2', year: '2024', title: 'Luxe Nails Parlour Platform', organization: 'Freelance', description: 'Built a full-stack business platform for a nail salon — public booking system with M-Pesa payments, admin dashboard, and full CI/CD deployment on Vercel.', type: 'freelance' },
  { id: '3', year: '2022–2026', title: 'BSc. Information Technology', organization: 'Jomo Kenyatta University of Agriculture and Technology', description: 'Studied software engineering, databases, networking, and system design. Built multiple projects across web, mobile, and backend domains.', type: 'education' },
];

const typeColors: Record<string, string> = {
  project: 'var(--accent)',
  freelance: 'var(--green)',
  education: 'var(--yellow)',
};

function Logs() {
  return (
    <section
      id="logs"
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
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '16px' }}>📋</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '15px' }}>$ cat logs/activity</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '1px', background: 'var(--border)' }} />
        {timeline.map((entry) => (
          <div key={entry.id} style={{ position: 'relative', marginBottom: '24px', paddingLeft: '28px' }}>
            <div style={{ position: 'absolute', left: '-17px', top: '20px', width: '10px', height: '10px', borderRadius: '50%', background: typeColors[entry.type], border: '2px solid var(--bg-primary)' }} />
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{entry.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>{entry.organization}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', color: typeColors[entry.type], border: `1px solid ${typeColors[entry.type]}40`, borderRadius: 'var(--radius-sm)', padding: '3px 10px', fontFamily: 'var(--font-mono)' }}>{entry.type}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{entry.year}</span>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', fontFamily: 'var(--font-mono)' }}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Logs;