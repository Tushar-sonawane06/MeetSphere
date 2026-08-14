import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const faqs = [
  { q: 'What is MeetSphere?', a: 'MeetSphere is a browser-based video conferencing platform that lets you create and join meeting rooms with HD video, audio, screen sharing, and real-time chat — no downloads required.' },
  { q: 'How do I create a meeting?', a: 'Sign in to your account and click "New Meeting" on the dashboard. A unique room will be created instantly. Share the room code with anyone you want to invite.' },
  { q: 'How do I join a meeting?', a: 'Click "Join a Meeting" on the dashboard, enter the meeting code you received, and click Join. You can also enter the code URL directly in your browser.' },
  { q: 'Can I share my screen?', a: 'Yes. During a meeting, click the screen share button in the control bar. Your browser will ask you to select which window or tab to share.' },
  { q: 'Does it work on mobile?', a: 'The application is fully responsive and works on mobile browsers. However, for the best experience with screen sharing and camera controls, a desktop browser is recommended.' },
  { q: 'Is an account required?', a: 'An account is required to create meetings and track your meeting history. However, participants can join an existing room using a guest name without an account.' },
  { q: 'Is my data secure?', a: 'Authentication uses JWT tokens. Video and audio are transmitted directly peer-to-peer via WebRTC — they do not pass through our servers. Meeting codes are stored in MongoDB for history tracking.' },
  { q: 'How many people can join a meeting?', a: 'The application supports multiple participants simultaneously. Performance depends on network conditions, since WebRTC uses peer-to-peer connections.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ overflow: 'hidden', transition: 'all 150ms ease' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>{q}</span>
        <ChevronDown size={18} style={{ color: 'var(--text-muted)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} />
      </button>
      {open && (
        <div style={{ padding: '0 24px 18px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{a}</div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="page-offset" style={{ flex: 1 }}>
        <section className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <div style={{ marginBottom: 48 }}>
              <p className="section-label">FAQ</p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 12 }}>
                Frequently asked questions
              </h1>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
                Everything you need to know about MeetSphere.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
