import { useState } from 'react';
import { Mail, GitFork, ExternalLink, Send, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is a frontend-only demo form
    setSent(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="page-offset" style={{ flex: 1 }}>
        <section className="section">
          <div className="container" style={{ maxWidth: 800 }}>
            <div style={{ marginBottom: 48 }}>
              <p className="section-label">Contact</p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 12 }}>
                Get in touch
              </h1>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
                Have a question or want to discuss this project? Reach out via the form or social links below.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, flexWrap: 'wrap' }} className="contact-grid">
              {/* Info */}
              <div>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>Connect</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { icon: Mail, label: 'Email', value: 'Available on request', href: null },
                    { icon: GitFork, label: 'GitHub', value: 'github.com', href: 'https://github.com' },
                    { icon: ExternalLink, label: 'LinkedIn', value: 'linkedin.com', href: 'https://linkedin.com' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                        <item.icon size={18} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 2 }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noreferrer" style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 500 }}>{item.value}</a>
                        ) : (
                          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="card" style={{ padding: 32 }}>
                {sent ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '32px 0' }}>
                    <CheckCircle size={40} style={{ color: 'var(--success)' }} />
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)' }}>Message received!</h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      This is a demo form — no message was actually sent, but thanks for trying it out!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="input-group">
                      <label className="input-label" htmlFor="contact-name">Name</label>
                      <input id="contact-name" className="input" type="text" placeholder="Jane Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div className="input-group">
                      <label className="input-label" htmlFor="contact-email">Email</label>
                      <input id="contact-email" className="input" type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                    </div>
                    <div className="input-group">
                      <label className="input-label" htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        className="input"
                        rows={5}
                        placeholder="Your message…"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        required
                        style={{ height: 'auto', padding: '12px 16px', resize: 'vertical' }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', gap: 8 }}>
                      <Send size={15} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`@media (max-width: 640px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
