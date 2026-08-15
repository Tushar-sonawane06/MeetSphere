import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Video, Home, History, User, Settings, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';

/**
 * Reusable internal app header for authenticated pages.
 * Props:
 *   links — array of { to, icon, label } shown as nav items
 *   showLogout — bool (default true)
 */
export default function AppHeader({ links = [], showLogout = true }) {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => setOpen(false), [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const defaultLinks = [
    { to: '/home',     icon: Home,     label: 'Dashboard' },
    { to: '/history',  icon: History,  label: 'History' },
    { to: '/profile',  icon: User,     label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;

  return (
    <>
      <header className="app-header">
        {/* Logo */}
        <Link to="/" className="app-header-logo">
          <div className="app-header-logo-icon">
            <Video size={16} strokeWidth={2.5} />
          </div>
          <span className="app-header-logo-text">MeetSphere</span>
        </Link>

        {/* Desktop nav */}
        <nav className="app-header-nav">
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`btn btn-ghost btn-sm app-header-link${location.pathname === to ? ' active' : ''}`}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          {showLogout && (
            <button
              className="btn btn-ghost btn-sm app-header-link"
              onClick={handleLogout}
              style={{ color: 'var(--error)' }}
            >
              <LogOut size={14} />
              Logout
            </button>
          )}
        </nav>

        {/* Mobile right: theme + hamburger */}
        <div className="app-header-mobile-right">
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className="navbar-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`app-header-drawer${open ? ' open' : ''}`}>
        {navLinks.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`app-drawer-link${location.pathname === to ? ' active' : ''}`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
        {showLogout && (
          <>
            <div className="divider" style={{ margin: '4px 0' }} />
            <button
              className="app-drawer-link"
              onClick={handleLogout}
              style={{ color: 'var(--error)', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}
