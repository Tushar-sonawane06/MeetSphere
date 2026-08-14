import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Video, Home, LogOut, Sun, Moon, Monitor, Bell, Shield, Volume2, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import withAuth from '../utils/withAuth';

function SettingsPage() {
  const navigate = useNavigate();
  const { themeSetting, setThemeSetting, theme } = useTheme();
  const [success, setSuccess] = useState("");

  const [notifs, setNotifs] = useState({ email: true, desktop: true });
  const [privacy, setPrivacy] = useState({ storeHistory: true, knockToJoin: false });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSave = () => {
    setSuccess("Settings updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      {/* ── Internal Navbar ────────────────────────────── */}
      <header style={{
        height: 'var(--navbar-h)',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--space-6)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.02em', textDecoration: 'none' }}>
          <div style={{ width: 30, height: 30, background: 'var(--accent)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Video size={16} strokeWidth={2.5} />
          </div>
          MeetSphere
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/home" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Home size={14} />
            Dashboard
          </Link>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--error)' }}>
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────── */}
      <main style={{ flex: 1, maxWidth: 720, margin: '0 auto', width: '100%', padding: 'var(--space-10) var(--space-6)' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 8 }}>
            Settings
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Configure and personalize your MeetSphere workspace.
          </p>
        </div>

        {success && (
          <div className="alert alert-success" style={{ marginBottom: 24 }}>
            <CheckCircle size={16} style={{ flexShrink: 0 }} />
            <span>{success}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Appearance Selection */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              Appearance
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 20 }}>
              Customize the look and feel of MeetSphere on your device.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { value: 'light', label: 'Light Mode', icon: Sun },
                { value: 'dark', label: 'Dark Mode', icon: Moon },
                { value: 'system', label: 'System default', icon: Monitor },
              ].map(opt => {
                const Icon = opt.icon;
                const active = themeSetting === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setThemeSetting(opt.value)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                      padding: '16px', borderRadius: 'var(--radius-md)',
                      background: active ? 'var(--accent-subtle)' : 'var(--bg-raised)',
                      border: active ? '2px solid var(--accent)' : '2px solid var(--border)',
                      cursor: 'pointer', color: active ? 'var(--accent)' : 'var(--text-secondary)',
                      transition: 'all 150ms ease',
                    }}
                  >
                    <Icon size={20} />
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audio & Video Information */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Volume2 size={16} /> Audio & Video
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 16 }}>
              Set up camera and audio devices before entering calls.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-raised)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>System Camera</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Auto-detected browser webcam</p>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--success)', fontWeight: 600 }}>Connected</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-raised)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>Default Microphone</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Primary system input device</p>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--success)', fontWeight: 600 }}>Connected</span>
              </div>
            </div>
          </div>

          {/* Notifications config */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={16} /> Notifications
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 20 }}>
              Control when and how you receive alerts.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notifs.email}
                  onChange={e => setNotifs(n => ({ ...n, email: e.target.checked }))}
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>Email Reminders</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Receive digest summaries of missed meeting chats</p>
                </div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notifs.desktop}
                  onChange={e => setNotifs(n => ({ ...n, desktop: e.target.checked }))}
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>Desktop Notifications</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Show browser alerts when a call begins or message arrives</p>
                </div>
              </label>
            </div>
          </div>

          {/* Privacy settings */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} /> Privacy & Safety
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 20 }}>
              Adjust security settings for your created rooms.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={privacy.storeHistory}
                  onChange={e => setPrivacy(p => ({ ...p, storeHistory: e.target.checked }))}
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>Store Meeting History</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Keep records of your joined codes on your dashboard</p>
                </div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={privacy.knockToJoin}
                  onChange={e => setPrivacy(p => ({ ...p, knockToJoin: e.target.checked }))}
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>Knock to Join (Lobby)</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Force external guests to wait until the host approves entry</p>
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start', marginTop: 12 }}
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}

export default withAuth(SettingsPage);
