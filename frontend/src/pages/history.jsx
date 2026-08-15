import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext.jsx';
import { Link } from 'react-router-dom';
import { Calendar, Hash, AlertCircle, Inbox, Video } from 'lucide-react';
import AppHeader from '../components/AppHeader.jsx';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        if (Array.isArray(history)) {
          setMeetings(history);
        } else if (history && history._id) {
          setMeetings([history]);
        } else {
          setMeetings([]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load meeting history. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const SkeletonCard = () => (
    <div className="card" style={{ padding: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="skeleton" style={{ height: 14, width: '60%' }} />
        <div className="skeleton" style={{ height: 12, width: '35%' }} />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />

      {/* Main */}
      <main style={{ flex: 1, maxWidth: 720, margin: '0 auto', width: '100%', padding: 'var(--space-8) var(--space-6)' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 8 }}>
            Meeting History
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            A record of all the meetings you've participated in.
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: 24 }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && meetings.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Inbox size={28} strokeWidth={1.5} />
            </div>
            <h3>No meeting history yet</h3>
            <p>When you join or host meetings, they'll appear here for easy reference.</p>
            <Link to="/home" className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>
              Start a Meeting
            </Link>
          </div>
        )}

        {/* Meeting cards */}
        {!loading && meetings.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {meetings.map((e, i) => (
              <div
                key={e._id || i}
                className="card"
                style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', transition: 'all 150ms ease' }}
                onMouseEnter={el => { el.currentTarget.style.borderColor = 'var(--border-strong)'; el.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={el => { el.currentTarget.style.borderColor = 'var(--border)'; el.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'var(--accent-subtle)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)',
                }}>
                  <Video size={20} strokeWidth={1.8} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Hash size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {e.meetingCode}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <Calendar size={12} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                      {formatDate(e.date)}{e.date ? ` · ${formatTime(e.date)}` : ''}
                    </span>
                  </div>
                </div>

                {/* Re-join button */}
                <Link
                  to={`/${e.meetingCode}`}
                  className="btn btn-secondary btn-sm"
                  style={{ flexShrink: 0 }}
                >
                  Rejoin
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}