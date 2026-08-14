import { Link } from 'react-router-dom';
import { Video, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-page)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 'var(--space-6)', textAlign: 'center',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', textDecoration: 'none', marginBottom: 48, letterSpacing: '-0.02em' }}>
        <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Video size={17} strokeWidth={2.5} />
        </div>
        MeetSphere
      </Link>

      {/* 404 visual */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: '8rem', fontWeight: 900, letterSpacing: '-0.06em', color: 'var(--border)', lineHeight: 1, userSelect: 'none' }}>
          404
        </div>
      </div>

      <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: 12 }}>
        This meeting room doesn't exist
      </h1>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', marginBottom: 40, maxWidth: 360, lineHeight: 1.7 }}>
        The page you're looking for has moved, expired, or was never created. Check the URL and try again.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary btn-lg">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <Link to="/home" className="btn btn-secondary btn-lg">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
