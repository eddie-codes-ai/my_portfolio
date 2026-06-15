const timeline = [
  {
    id: '1',
    year: '2025',
    title: 'Smart Personal Finance Tracker',
    organization: 'JKUAT — Final Year Project',
    description:
      'Designed and developed a mobile-first financial management system for Kenyan university students with a Flutter frontend, Python Flask API, and an expert system for financial health scoring.',
    type: 'project',
  },
  {
    id: '2',
    year: '2024',
    title: 'Luxe Nails Parlour Platform',
    organization: 'Freelance',
    description:
      'Built a full-stack business platform for a nail salon — public booking system with M-Pesa payments, admin dashboard, and full CI/CD deployment on Vercel.',
    type: 'freelance',
  },
  {
    id: '3',
    year: '2022–2026',
    title: 'BSc. Information Technology',
    organization: 'Jomo Kenyatta University of Agriculture and Technology',
    description:
      'Studied software engineering, databases, networking, and system design. Built multiple projects across web, mobile, and backend domains.',
    type: 'education',
  },
];

const typeColors: Record<string, string> = {
  project: 'var(--accent)',
  freelance: 'var(--green)',
  education: 'var(--yellow)',
};

const typeLabels: Record<string, string> = {
  project: 'project',
  freelance: 'freelance',
  education: 'education',
};

function Logs() {
  return (
    <section
      id="logs"
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
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '16px' }}>📋</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
          $ cat logs/activity
        </span>
      </div>

      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        <div
          style={{
            position: 'absolute',
            left: '7px',
            top: '8px',
            bottom: '8px',
            width: '1px',
            background: 'var(--border)',
          }}
        />

        {timeline.map((entry) => (
          <div
            key={entry.id}
            style={{
              position: 'relative',
              marginBottom: '32px',
              paddingLeft: '28px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-17px',
                top: '6px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: typeColors[entry.type],
                border: '2px solid var(--bg-primary)',
              }}
            />

            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {entry.title}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      marginTop: '2px',
                    }}
                  >
                    {entry.organization}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      color: typeColors[entry.type],
                      border: `1px solid ${typeColors[entry.type]}40`,
                      borderRadius: 'var(--radius-sm)',
                      padding: '2px 8px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {typeLabels[entry.type]}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {entry.year}
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {entry.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Logs;