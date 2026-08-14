import { Link } from 'react-router-dom';
import { Video, Zap, Globe, Shield, Code2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function AboutPage() {
  const tech = [
    { name: 'React 19', desc: 'Modern UI with hooks and context' },
    { name: 'WebRTC', desc: 'Peer-to-peer video & audio' },
    { name: 'Socket.io', desc: 'Real-time signaling & chat' },
    { name: 'Node.js / Express', desc: 'Backend API & websocket server' },
    { name: 'MongoDB', desc: 'User data & meeting history' },
    { name: 'JWT Auth', desc: 'Secure stateless authentication' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="page-offset" style={{ flex: 1 }}>
        {/* Hero */}
        <section className="section" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <p className="section-label">About</p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 20 }}>
              Built for real-world collaboration
            </h1>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              MeetSphere is a full-stack video conferencing application built to demonstrate real-time peer-to-peer communication using WebRTC and Socket.io. It was created as a portfolio project that showcases practical engineering across the full stack.
            </p>
          </div>
        </section>

        {/* What is it */}
        <section className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <h2 className="section-heading">What is MeetSphere?</h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
              MeetSphere lets users create and join video meeting rooms directly in their browser, with no plugins or downloads required. Participants can communicate via HD video, microphone audio, screen sharing, and real-time text chat.
            </p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              The application uses WebRTC for direct peer-to-peer media streaming and Socket.io for signaling, room management, and chat. Authentication is handled with JWT tokens stored in localStorage.
            </p>
          </div>
        </section>

        {/* Tech stack */}
        <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p className="section-label">Technology</p>
              <h2 className="section-heading" style={{ margin: '0 auto 16px' }}>Built with modern tools</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
              {tech.map(t => (
                <div key={t.name} className="card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Code2 size={16} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{t.name}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="section-heading" style={{ margin: '0 auto 16px' }}>Try it yourself</h2>
            <p className="section-subheading" style={{ margin: '0 auto 32px' }}>Create an account and start a meeting in seconds.</p>
            <Link to="/auth" className="btn btn-primary btn-lg">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
