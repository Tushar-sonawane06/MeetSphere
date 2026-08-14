import { Link } from 'react-router-dom';
import { Video, Mic, Monitor, Users, Shield, Zap, MessageSquare, Globe, ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

/* ── Hero visual: mock meeting UI ──────────────────────── */
function MeetingPreview() {
  const participants = [
    { name: 'Alex M.',  initials: 'AM', color: '#3b82f6', mic: true,  cam: true },
    { name: 'Sara K.',  initials: 'SK', color: '#8b5cf6', mic: false, cam: true },
    { name: 'James T.', initials: 'JT', color: '#10b981', mic: true,  cam: false },
    { name: 'Nina L.',  initials: 'NL', color: '#f59e0b', mic: true,  cam: true },
  ];

  return (
    <div style={{
      position: 'relative',
      background: '#0d1117',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid #30363d',
      boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
      width: '100%',
      maxWidth: '580px',
    }}>
      {/* Top bar */}
      <div style={{ padding: '10px 14px', background: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f85149' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#d29922' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#3fb950' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11px', color: '#8b949e' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3fb950' }} />
          <span>Meeting in progress</span>
        </div>
        <span style={{ fontSize: '11px', color: '#8b949e', fontFamily: 'monospace' }}>ms-hq7f2k</span>
      </div>

      {/* Video grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', padding: '4px', background: '#0d1117' }}>
        {participants.map((p) => (
          <div key={p.name} style={{
            aspectRatio: '16/9',
            background: p.cam ? `linear-gradient(135deg, ${p.color}22, ${p.color}11)` : '#161b22',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden',
            border: p.name === 'Alex M.' ? `2px solid ${p.color}` : '2px solid transparent',
          }}>
            {/* Avatar */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 600, color: 'white', fontFamily: 'Inter,sans-serif',
              }}>{p.initials}</div>
            </div>
            {/* Name tag */}
            <div style={{
              position: 'absolute', bottom: 6, left: 6,
              background: 'rgba(0,0,0,0.6)', borderRadius: '4px',
              padding: '2px 6px', fontSize: '10px', color: 'white',
              display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter,sans-serif',
            }}>
              <span>{p.name}</span>
              {!p.mic && <span style={{ color: '#f85149' }}>🔇</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Chat panel hint */}
      <div style={{ display: 'flex', borderTop: '1px solid #30363d' }}>
        <div style={{ flex: 1, padding: '8px 10px' }}>
          {[
            { name: 'Sara K.', msg: 'Can everyone see my screen?', time: '2:41 PM' },
            { name: 'James T.', msg: 'Yes! Looks good 👍', time: '2:41 PM' },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: 6, fontSize: '10px', fontFamily: 'Inter,sans-serif' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600 }}>{m.name}</span>
              <span style={{ color: '#8b949e', marginLeft: 4 }}>{m.msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls bar */}
      <div style={{
        padding: '8px', background: '#161b22',
        borderTop: '1px solid #30363d',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        {[
          { icon: '🎤', active: true },
          { icon: '📷', active: true },
          { icon: '🖥️', active: false },
          { icon: '💬', active: false },
          { icon: '👥', active: false },
        ].map((ctrl, i) => (
          <div key={i} style={{
            width: 32, height: 32, borderRadius: 6,
            background: ctrl.active ? 'rgba(59,130,246,0.2)' : '#21262d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', cursor: 'pointer',
          }}>{ctrl.icon}</div>
        ))}
        <div style={{
          width: 32, height: 32, borderRadius: 6, background: '#f85149',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', cursor: 'pointer',
        }}>✕</div>
      </div>
    </div>
  );
}

/* ── Feature card ──────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="card card-hover" style={{ padding: '24px', transition: 'all 200ms ease', cursor: 'default' }}>
      <div style={{
        width: 44, height: 44, borderRadius: 'var(--radius-md)',
        background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)', marginBottom: 'var(--space-4)',
      }}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

/* ── Step card ─────────────────────────────────────────── */
function StepCard({ num, title, desc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--radius-full)',
        background: 'var(--accent)', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 'var(--text-sm)', fontWeight: 700, flexShrink: 0,
      }}>{num}</div>
      <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  );
}

export default function LandingPage() {
  const isAuth = !!localStorage.getItem('token');
  const features = [
    { icon: Video,         title: 'HD Video Meetings',      desc: 'Crystal-clear video powered by WebRTC. No plugins, no downloads — works right in your browser.' },
    { icon: Mic,           title: 'Real-time Audio',        desc: 'Reliable, low-latency audio so every participant is heard clearly during discussions.' },
    { icon: Monitor,       title: 'Screen Sharing',         desc: 'Share your screen with one click. Present, demo, or collaborate on documents effortlessly.' },
    { icon: MessageSquare, title: 'In-meeting Chat',        desc: 'Send messages and share links without interrupting the conversation flow.' },
    { icon: Users,         title: 'Participant Management', desc: 'See all participants in one place with audio/video status at a glance.' },
    { icon: Shield,        title: 'Secure Authentication',  desc: 'JWT-based auth keeps your account and meetings protected at every step.' },
    { icon: Zap,           title: 'Instant Meetings',       desc: 'Jump into a meeting in seconds using a simple room code — no scheduling required.' },
    { icon: Globe,         title: 'Works Everywhere',       desc: 'Fully responsive design works on desktop, tablet, and mobile — any device, any browser.' },
  ];

  const benefits = [
    'No software installation required',
    'Works on any modern browser',
    'Real-time WebRTC peer-to-peer connections',
    'Secure JWT authentication',
    'Meeting history tracking',
    'Responsive across all screen sizes',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{
        paddingTop: 'calc(var(--navbar-h) + 80px)',
        paddingBottom: '80px',
        background: 'var(--bg-page)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 64,
            flexWrap: 'wrap',
          }}>
            {/* Left: copy */}
            <div style={{ flex: '1 1 360px', maxWidth: 520 }} className="animate-fade-in-up">
              <div className="badge badge-blue" style={{ marginBottom: 'var(--space-5)' }}>
                <span className="badge-dot" />
                Modern video meetings, built for teams
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-5)',
              }}>
                Connect. Collaborate.<br />
                <span style={{ color: 'var(--accent)' }}>Meet anywhere.</span>
              </h1>

              <p style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 'var(--space-8)',
              }}>
                High-quality video meetings with real-time chat, screen sharing, and a beautifully simple experience — designed for modern teams.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <Link to={isAuth ? "/home" : "/auth"} className="btn btn-primary btn-lg">
                  {isAuth ? "Go to Dashboard" : "Get Started — It's Free"}
                  <ArrowRight size={18} />
                </Link>
                <Link to={isAuth ? "/home" : "/auth?guest=1"} className="btn btn-secondary btn-lg">
                  Join a Meeting
                </Link>
              </div>

              <div style={{ marginTop: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex' }}>
                  {['#3b82f6','#8b5cf6','#10b981','#f59e0b'].map((c, i) => (
                    <div key={i} style={{
                      width: 28, height: 28, borderRadius: '50%', background: c,
                      border: '2px solid var(--bg-page)',
                      marginLeft: i > 0 ? -8 : 0,
                    }} />
                  ))}
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>500+</strong> meetings hosted
                </p>
              </div>
            </div>

            {/* Right: meeting preview */}
            <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>
              <MeetingPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STRIP ──────────────────────────────────── */}
      <section style={{
        borderBlock: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        padding: '20px 0',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {['WebRTC', 'Socket.io', 'Node.js', 'MongoDB', 'React 19', 'JWT Auth'].map(tech => (
              <span key={tech} style={{
                fontSize: 'var(--text-sm)', fontWeight: 600,
                color: 'var(--text-muted)', letterSpacing: '0.05em',
              }}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section className="section" id="features">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <p className="section-label">Features</p>
            <h2 className="section-heading" style={{ margin: '0 auto var(--space-4)' }}>
              Everything you need for great meetings
            </h2>
            <p className="section-subheading" style={{ margin: '0 auto' }}>
              Built with modern web technologies to deliver a seamless, real-time collaboration experience.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <p className="section-label">How It Works</p>
            <h2 className="section-heading" style={{ margin: '0 auto var(--space-4)' }}>
              Start meeting in three steps
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-8)', position: 'relative' }}>
            <StepCard num={1} title="Create an Account" desc="Register with your name and username in seconds. No email verification or credit card required." />
            <StepCard num={2} title="Start or Join a Meeting" desc="Create a new room or enter a meeting code shared by a colleague to jump straight in." />
            <StepCard num={3} title="Collaborate in Real Time" desc="Video, audio, screen sharing, and chat — all working together without any additional software." />
          </div>
        </div>
      </section>

      {/* ── WHY THIS PLATFORM ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <p className="section-label">Why MeetSphere</p>
              <h2 className="section-heading">Simple, fast, and genuinely useful</h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
                MeetSphere was built to solve the problem of overly complex video tools. We focused on making the core experience — joining, talking, sharing — as frictionless as possible.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', listStyle: 'none' }}>
                {benefits.map(b => (
                  <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    <Check size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats panel */}
            <div style={{ flex: '1 1 280px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              {[
                { val: '< 1s', label: 'Average join time' },
                { val: '4+',   label: 'Concurrent participants' },
                { val: 'P2P',  label: 'Direct WebRTC connections' },
                { val: '100%', label: 'Browser-based, no plugins' },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em' }}>{s.val}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-heading" style={{ margin: '0 auto var(--space-4)' }}>
            Ready for your next meeting?
          </h2>
          <p className="section-subheading" style={{ margin: '0 auto var(--space-8)' }}>
            Create an account in seconds and start your first meeting right now.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={isAuth ? "/home" : "/auth"} className="btn btn-primary btn-lg">
              {isAuth ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-secondary btn-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}