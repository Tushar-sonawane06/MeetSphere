import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, Plus, Hash, ArrowRight } from 'lucide-react';
import { AuthContext } from '../contexts/authContext.jsx';
import AppHeader from '../components/AppHeader.jsx';
import withAuth from '../utils/withAuth';

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState('');
  const [joining, setJoining] = useState(false);
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;
    setJoining(true);
    try {
      await addToUserHistory(meetingCode.trim());
    } catch (_) { /* non-blocking */ }
    navigate(`/${meetingCode.trim()}`);
  };

  const handleNewMeeting = () => {
    const code = Math.random().toString(36).substring(2, 10);
    navigate(`/${code}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleJoinVideoCall();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />

      {/* ── Main Content ───────────────────────────────── */}
      <main style={{ flex: 1, padding: 'var(--space-8) var(--space-6)', maxWidth: 900, margin: '0 auto', width: '100%' }}>

        {/* Welcome */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 8 }}>
            {(() => {
              const hr = new Date().getHours();
              const name = localStorage.getItem("username") || "there";
              const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
              if (hr < 12) return `Good morning, ${capitalizedName} 👋`;
              if (hr < 18) return `Good afternoon, ${capitalizedName} 👋`;
              return `Good evening, ${capitalizedName} 👋`;
            })()}
          </h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
            Start a new meeting or join an existing room.
          </p>
        </div>

        {/* Quick Actions */}
        <div
          className="home-actions-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-4)', marginBottom: 32 }}
        >
          {/* New Meeting */}
          <button
            onClick={handleNewMeeting}
            style={{
              background: 'var(--accent)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 24px',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'white',
              transition: 'all 200ms ease',
              boxShadow: 'var(--shadow-md)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          >
            <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Plus size={22} strokeWidth={2.5} />
            </div>
            <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 4 }}>New Meeting</p>
            <p style={{ fontSize: 'var(--text-xs)', opacity: 0.8 }}>Start an instant room</p>
          </button>

          {/* Join meeting */}
          <div className="card" style={{ padding: '28px 24px' }}>
            <div style={{ width: 44, height: 44, background: 'var(--accent-subtle)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: 'var(--accent)' }}>
              <Hash size={22} strokeWidth={2} />
            </div>
            <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 4 }}>Join a Meeting</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 16 }}>Enter a room code</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="input"
                type="text"
                placeholder="Meeting code..."
                value={meetingCode}
                onChange={e => setMeetingCode(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ flex: 1, height: 38, fontSize: 'var(--text-sm)' }}
                id="meeting-code-input"
              />
              <button
                className={`btn btn-primary${joining ? ' btn-loading' : ''}`}
                onClick={handleJoinVideoCall}
                disabled={joining || !meetingCode.trim()}
                style={{ height: 38, padding: '0 14px', flexShrink: 0 }}
                aria-label="Join meeting"
              >
                {!joining && <ArrowRight size={16} />}
              </button>
            </div>
          </div>

          {/* History shortcut */}
          <Link to="/history" style={{ textDecoration: 'none' }}>
            <div
              className="card card-hover"
              style={{ padding: '28px 24px', height: '100%', cursor: 'pointer' }}
            >
              <div style={{ width: 44, height: 44, background: 'var(--bg-raised)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: 'var(--text-secondary)' }}>
                <Clock size={22} strokeWidth={1.8} />
              </div>
              <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 4 }}>Meeting History</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>View past sessions</p>
            </div>
          </Link>
        </div>

        {/* Tips / Info */}
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Quick Tips</h3>
          <div
            className="home-tips-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}
          >
            {[
              { icon: '🔗', tip: 'Share a meeting code with anyone to let them join your room' },
              { icon: '🎤', tip: 'Grant microphone and camera permissions when prompted' },
              { icon: '🖥️', tip: 'Use screen share to present or collaborate on documents' },
              { icon: '💬', tip: 'Open the chat panel to send messages during the meeting' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(HomeComponent);