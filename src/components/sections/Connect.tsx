import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_j4paahd';
const TEMPLATE_ID = 'template_aw7idi5';
const PUBLIC_KEY = 'pT0zBHd4G2r7a0D_H';

interface FormState { from_name: string; from_email: string; message: string; }

function Connect() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>({ from_name: '', from_email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
      setSubmitted(true);
    } catch {
      setError('$ Error: transmission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '15px', outline: 'none', transition: 'border-color var(--transition)' };
  const labelStyle: React.CSSProperties = { fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px', display: 'block' };

  return (
    <section
      id="connect"
      style={{
        minHeight: '100vh',
        padding: '80px 120px 120px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontSize: '16px' }}>🔒</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '16px' }}>$ connect.secure()</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--red)', display: 'block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--yellow)', display: 'block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--green)', display: 'block' }} />
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginLeft: '8px' }}>secure_channel.sh</span>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>● ENCRYPTED</span>
          </div>

          <div style={{ padding: '32px' }}>
            {!submitted ? (
              <>
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '8px' }}>$ Establishing secure connection...</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--text-secondary)' }}>$ Channel ready. Transmit your message below.</div>
                </div>
                <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={labelStyle}>👤 identifier</label>
                      <input type="text" name="from_name" placeholder="Your name" value={form.from_name} onChange={handleChange} required style={inputStyle} onFocus={(e) => (e.target.style.borderColor = 'var(--border-accent)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                    </div>
                    <div>
                      <label style={labelStyle}>✉️ return_address</label>
                      <input type="email" name="from_email" placeholder="your@email.com" value={form.from_email} onChange={handleChange} required style={inputStyle} onFocus={(e) => (e.target.style.borderColor = 'var(--border-accent)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>💬 payload</label>
                    <textarea name="message" placeholder="Your message..." value={form.message} onChange={handleChange} required rows={6} style={{ ...inputStyle, resize: 'vertical' }} onFocus={(e) => (e.target.style.borderColor = 'var(--border-accent)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
                    <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '6px' }}>{form.message.length}/1000</div>
                  </div>
                  {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--red)' }}>{error}</div>}
                  <button type="submit" disabled={loading} style={{ alignSelf: 'flex-start', background: loading ? 'var(--accent-glow)' : 'var(--accent)', color: loading ? 'var(--accent)' : '#0a0e13', border: 'none', borderRadius: 'var(--radius-md)', padding: '14px 32px', fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all var(--transition)' }}>
                    {loading ? '$ transmitting...' : '$ transmit()'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: '32px', marginBottom: '20px' }}>✅</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: 'var(--green)', marginBottom: '10px' }}>[OK] Message transmitted successfully.</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-secondary)' }}>I'll get back to you shortly.</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '52px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Built with precision. Deployed with confidence.</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)' }}>© 2026 Edwin Mwai — All systems operational.</p>
        </div>
      </div>
    </section>
  );
}

export default Connect;