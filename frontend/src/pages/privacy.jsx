import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>{title}</h2>
      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="page-offset" style={{ flex: 1 }}>
        <section className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <div style={{ marginBottom: 48 }}>
              <p className="section-label">Legal</p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 12 }}>Privacy Policy</h1>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <Section title="Overview">
              <p>MeetSphere is a portfolio/demonstration project. This privacy policy describes what data is collected and how it is used. We are committed to being transparent about our data practices.</p>
            </Section>

            <Section title="Data We Collect">
              <p><strong style={{ color: 'var(--text-primary)' }}>Account data:</strong> When you register, we store your name, username, and a hashed version of your password in MongoDB.</p>
              <br />
              <p><strong style={{ color: 'var(--text-primary)' }}>Meeting history:</strong> When you join a meeting room, the meeting code and timestamp are saved to your account for the history feature.</p>
              <br />
              <p><strong style={{ color: 'var(--text-primary)' }}>Video & audio:</strong> Media streams are transmitted directly peer-to-peer via WebRTC and are <em>not</em> routed through or stored on our servers.</p>
            </Section>

            <Section title="Cookies & Local Storage">
              <p>We store your authentication token in browser localStorage to keep you signed in. No third-party cookies or tracking pixels are used.</p>
            </Section>

            <Section title="Third Parties">
              <p>MeetSphere does not share any personal data with third parties. STUN servers (Google's public STUN) are used solely for WebRTC connection setup and do not process personal data.</p>
            </Section>

            <Section title="Data Retention">
              <p>Account data and meeting history are retained for as long as your account exists. You can contact us to request account deletion.</p>
            </Section>

            <Section title="Contact">
              <p>If you have questions about this policy, please use the <a href="/contact" style={{ color: 'var(--accent)' }}>contact form</a>.</p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
