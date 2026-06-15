import { useState } from 'react';

interface FormState { name: string; email: string; message: string; }

function Connect() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = { width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px 14px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '14px', outline: 'none', transition: 'border-color var(--transition)' };
  const labelStyle: React.CSSProperties = { fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '6px', display: 'block' };

  return (
    <section
      id="connect"
      style={{
        minHeight: '100vh',
        padding: '80px 80px 120px',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '16px' }}>🔒</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '15px' }}>$ connect.secure()</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--red)', display: 'block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--yellow)', display: 'block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--green)', display: 'block' }} />
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginLeft: '8px' }}>secure_channel.sh</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>● ENCRYPTED</span>
          </div>

          <div style={{ padding: '28px' }}>
            {!submitted ? (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '6px' }}>$ Establishing secure connection...</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-secondary)' }}>$ Channel ready. Transmit your message below.</div>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>👤 identifier</label>
                      <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required style={inputStyle} onFocus={(e) => (e.target.style.borderColor = 'var(--border-accent)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                    </div>
                    <div>
                      <label style={labelStyle}>✉️ return_address</label>
                      <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required style={inputStyle} onFocus={(e) => (e.target.style.borderColor = 'var(--border-accent)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>💬 payload</label>
                    <textarea name="message" placeholder="Your message..." value={form.message} onChange={handleChange} required rows={5} style={{ ...inputStyle, resize: 'vertical' }} onFocus={(e) => (e.target.style.borderColor = 'var(--border-accent)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                    <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>{form.message.length}/1000</div>
                  </div>
                  <button type="submit" disabled={loading} style={{ alignSelf: 'flex-start', background: loading ? 'var(--accent-glow)' : 'var(--accent)', color: loading ? 'var(--accent)' : '#0a0e13', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 28px', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all var(--transition)' }}>
                    {loading ? '$ transmitting...' : '$ transmit()'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>✅</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--green)', marginBottom: '8px' }}>[OK] Message transmitted successfully.</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)' }}>I'll get back to you shortly.</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Built with precision. Deployed with confidence.</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)' }}>© 2026 Edwin Mwai — All systems operational.</p>
        </div>
      </div>
    </section>
  );
}

export default Connect;