import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '10px 14px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color var(--transition)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    marginBottom: '6px',
    display: 'block',
  };

  return (
    <section
      id="connect"
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
        <span style={{ color: 'var(--accent)', fontSize: '16px' }}>🔒</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
          $ connect.secure()
        </span>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--red)', display: 'block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--yellow)', display: 'block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--green)', display: 'block' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginLeft: '8px' }}>
                secure_channel.sh
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
              ● ENCRYPTED
            </span>
          </div>

          <div style={{ padding: '24px' }}>
            {!submitted ? (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    $ Establishing secure connection...
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    $ Channel ready. Transmit your message below.
                  </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>👤 identifier</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--border-accent)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>✉️ return_address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--border-accent)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>💬 payload</label>
                    <textarea
                      name="message"
                      placeholder="Your message..."
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--border-accent)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                    />
                    <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                      {form.message.length}/1000
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      alignSelf: 'flex-start',
                      background: loading ? 'var(--accent-glow)' : 'var(--accent)',
                      color: loading ? 'var(--accent)' : '#0a0e13',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px 24px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all var(--transition)',
                    }}
                  >
                    {loading ? '$ transmitting...' : '$ transmit()'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '24px', marginBottom: '16px' }}>✅</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--green)', marginBottom: '8px' }}>
                  [OK] Message transmitted successfully.
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  I'll get back to you shortly.
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
            Built with precision. Deployed with confidence.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)' }}>
            © 2026 Edwin Mwai — All systems operational.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Connect;