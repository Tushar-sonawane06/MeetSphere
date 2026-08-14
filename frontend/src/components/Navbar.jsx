import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Video, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem('token');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <nav className="navbar" style={{ boxShadow: scrolled ? 'var(--shadow-sm)' : 'none' }}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <Video size={18} strokeWidth={2.5} />
            </div>
            MeetSphere
          </Link>

          {/* Desktop nav */}
          <ul className="navbar-nav">
            <li><Link to="/" className={isActive('/')}>Home</Link></li>
            <li><Link to="/about" className={isActive('/about')}>About</Link></li>
            <li><Link to="/faq" className={isActive('/faq')}>FAQ</Link></li>
            <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {isAuth ? (
              <>
                <Link to="/home" className="btn btn-ghost btn-sm">Dashboard</Link>
                <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/auth" className="btn btn-ghost btn-sm">Sign In</Link>
                <Link to="/auth" className="btn btn-primary btn-sm">Get Started</Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              className="navbar-hamburger"
              onClick={() => setMenuOpen(m => !m)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
        <div className="divider" style={{ margin: '4px 0' }} />
        {isAuth ? (
          <>
            <Link to="/home">Dashboard</Link>
            <button className="btn btn-danger btn-sm" style={{ alignSelf: 'flex-start' }} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth">Sign In</Link>
            <Link to="/auth" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }}>Get Started</Link>
          </>
        )}
      </div>
    </>
  );
}
