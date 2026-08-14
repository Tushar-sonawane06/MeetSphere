import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Video, User, Mail, Shield, Key, LogOut, CheckCircle, Home, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Sun, Moon } from 'lucide-react';
import withAuth from '../utils/withAuth';

function ProfilePage() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  
  const username = localStorage.getItem("username") || "tushar";
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  const email = `${username.toLowerCase()}@meetsphere.com`;
  
  const [successMsg, setSuccessMsg] = useState("");
  const [pwForm, setPwForm] = useState({ current: "", newPassword: "", confirm: "" });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirm) {
      alert("New passwords do not match.");
      return;
    }
    setSuccessMsg("Password updated successfully! (Demo Simulation)");
    setPwForm({ current: "", newPassword: "", confirm: "" });
    setTimeout(() => setSuccessMsg(""), 4000);
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
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
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
      <main style={{ flex: 1, maxWidth: 800, margin: '0 auto', width: '100%', padding: 'var(--space-10) var(--space-6)' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 8 }}>
            My Profile
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Manage your account settings and credentials.
          </p>
        </div>

        {successMsg && (
          <div className="alert alert-success" style={{ marginBottom: 24 }}>
            <CheckCircle size={16} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-6)' }} className="profile-grid">
          {/* Left panel: Avatar & summary */}
          <div className="card" style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'fit-content' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'var(--accent)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 700, marginBottom: 16,
              boxShadow: 'var(--shadow-md)'
            }}>
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{displayName}</h2>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 24 }}>@{username.toLowerCase()}</p>
            
            <div className="divider" style={{ width: '100%', margin: '16px 0' }} />
            
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                <Shield size={14} style={{ color: 'var(--text-muted)' }} />
                <span>Account Type: <strong style={{ color: 'var(--text-primary)' }}>Free Plan</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                <Clock size={14} style={{ color: 'var(--text-muted)' }} />
                <span>Registered: <strong style={{ color: 'var(--text-primary)' }}>August 2026</strong></span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', marginTop: 24, gap: 8, color: 'var(--error)', borderColor: 'rgba(220, 38, 38, 0.2)' }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>

          {/* Right panel: Details & Password change */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Details card */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Profile Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="input-group">
                  <span className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={14} /> Full Name
                  </span>
                  <input className="input" type="text" value={displayName} readOnly style={{ background: 'var(--bg-raised)', cursor: 'not-allowed' }} />
                </div>
                <div className="input-group">
                  <span className="input-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Mail size={14} /> Email Address
                  </span>
                  <input className="input" type="email" value={email} readOnly style={{ background: 'var(--bg-raised)', cursor: 'not-allowed' }} />
                </div>
              </div>
            </div>

            {/* Password Change card */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Change Password</h3>
              <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label" htmlFor="current-pw">Current Password</label>
                  <input
                    id="current-pw"
                    className="input"
                    type="password"
                    placeholder="••••••••"
                    value={pwForm.current}
                    onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label" htmlFor="new-pw">New Password</label>
                  <input
                    id="new-pw"
                    className="input"
                    type="password"
                    placeholder="••••••••"
                    value={pwForm.newPassword}
                    onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))}
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label" htmlFor="confirm-pw">Confirm New Password</label>
                  <input
                    id="confirm-pw"
                    className="input"
                    type="password"
                    placeholder="••••••••"
                    value={pwForm.confirm}
                    onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', gap: 8 }}>
                  <Key size={14} /> Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <style>{`@media (max-width: 640px) { .profile-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

export default withAuth(ProfilePage);
