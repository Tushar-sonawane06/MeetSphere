import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { AuthContext } from '../contexts/authContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Sun, Moon } from 'lucide-react';

export default function Authentication() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);

  const [formState, setFormState] = useState(0); // 0 = login, 1 = register
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { handleRegister, handleLogin } = useContext(AuthContext);
  const { theme, toggle } = useTheme();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const msg = await handleRegister(name, username, password);
        setSuccess(msg || 'Account created! You can now sign in.');
        setFormState(0);
        setName('');
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--bg-page)',
    }}>
      {/* Left panel — branding */}
      <div style={{
        flex: '0 0 45%',
        background: '#0d1117',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 48px',
        position: 'relative',
        overflow: 'hidden',
      }} className="auth-left-panel">
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(59,130,246,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(139,92,246,0.08)', pointerEvents: 'none' }} />

        {/* Logo */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'white', fontWeight: 700, fontSize: '18px', textDecoration: 'none', letterSpacing: '-0.02em', zIndex: 1 }}>
          <div style={{ width: 34, height: 34, background: '#3b82f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video size={18} strokeWidth={2.5} />
          </div>
          MeetSphere
        </Link>

        {/* Center content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
          {/* Mock meeting tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 40, maxWidth: 320 }}>
            {[
              { init: 'AM', color: '#3b82f6' },
              { init: 'SK', color: '#8b5cf6' },
              { init: 'JT', color: '#10b981' },
              { init: 'NL', color: '#f59e0b' },
            ].map((p, i) => (
              <div key={i} style={{
                aspectRatio: '16/9',
                background: `${p.color}18`,
                borderRadius: 10,
                border: i === 0 ? `1.5px solid ${p.color}` : '1.5px solid #30363d',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: 'white' }}>
                  {p.init}
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: 16 }}>
            Professional video meetings for everyone
          </h2>
          <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.7 }}>
            Real-time collaboration with HD video, screen sharing, and instant chat — all from your browser.
          </p>
        </div>

        <p style={{ fontSize: '12px', color: '#484f58', zIndex: 1 }}>
          © {new Date().getFullYear()} MeetSphere
        </p>
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
        position: 'relative',
      }}>
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="theme-toggle"
          style={{ position: 'absolute', top: 24, right: 24 }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <div style={{ width: '100%', maxWidth: 380 }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 8 }}>
              {formState === 0 ? 'Welcome back' : 'Create an account'}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {formState === 0
                ? 'Sign in to continue to your meetings.'
                : 'Sign up to start hosting and joining meetings.'}
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-raised)', borderRadius: 'var(--radius-md)', padding: 3, marginBottom: 28 }}>
            {['Sign In', 'Sign Up'].map((label, i) => (
              <button
                key={label}
                onClick={() => { setFormState(i); setError(''); setSuccess(''); }}
                style={{
                  flex: 1, height: 36, borderRadius: 'calc(var(--radius-md) - 2px)',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
                  background: formState === i ? 'var(--bg-surface)' : 'transparent',
                  color: formState === i ? 'var(--text-primary)' : 'var(--text-muted)',
                  boxShadow: formState === i ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 150ms ease',
                }}
              >{label}</button>
            ))}
          </div>

          {/* Alerts */}
          {error && (
            <div className="alert alert-error" style={{ marginBottom: 20 }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="alert alert-success" style={{ marginBottom: 20 }}>
              <CheckCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {formState === 1 && (
              <div className="input-group">
                <label className="input-label" htmlFor="fullname">Full Name</label>
                <input
                  id="fullname"
                  className="input"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div className="input-group">
              <label className="input-label" htmlFor="username">Username</label>
              <input
                id="username"
                className="input"
                type="text"
                placeholder="janedoe"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  className="input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete={formState === 0 ? 'current-password' : 'new-password'}
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
                  }}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary${loading ? ' btn-loading' : ''}`}
              style={{ height: 44, marginTop: 4, fontSize: '14px' }}
              disabled={loading}
            >
              {!loading && (formState === 0 ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '13px', color: 'var(--text-secondary)' }}>
            {formState === 0 ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              onClick={() => { setFormState(formState === 0 ? 1 : 0); setError(''); setSuccess(''); }}
              style={{ color: 'var(--accent)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              {formState === 0 ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link to="/" style={{ fontSize: '12px', color: 'var(--text-muted)', transition: 'color 150ms ease' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >← Back to home</Link>
          </div>
        </div>
      </div>

      {/* Responsive: hide left panel on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .auth-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}