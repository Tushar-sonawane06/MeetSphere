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

export default function TermsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main className="page-offset" style={{ flex: 1 }}>
        <section className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <div style={{ marginBottom: 48 }}>
              <p className="section-label">Legal</p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: 12 }}>Terms of Service</h1>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <Section title="Acceptance">
              <p>By using MeetSphere, you agree to these terms. MeetSphere is a portfolio/demonstration project and is provided as-is without warranty.</p>
            </Section>

            <Section title="Permitted Use">
              <p>You may use MeetSphere for lawful purposes only. You agree not to use the platform to:</p>
              <ul style={{ marginTop: 12, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Transmit illegal, harmful, or abusive content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to disrupt or gain unauthorized access to the service</li>
              </ul>
            </Section>

            <Section title="Account Responsibility">
              <p>You are responsible for maintaining the security of your credentials. Do not share your password. You are responsible for all activity that occurs under your account.</p>
            </Section>

            <Section title="No Warranty">
              <p>MeetSphere is provided "as is" without any warranties, express or implied. We make no guarantees about uptime, reliability, or fitness for any particular purpose.</p>
            </Section>

            <Section title="Limitation of Liability">
              <p>To the extent permitted by law, the developers of MeetSphere shall not be liable for any indirect, incidental, or consequential damages arising from use of the service.</p>
            </Section>

            <Section title="Changes">
              <p>We may update these terms at any time. Continued use of MeetSphere after changes constitutes acceptance of the updated terms.</p>
            </Section>

            <Section title="Contact">
              <p>Questions about these terms? Use the <a href="/contact" style={{ color: 'var(--accent)' }}>contact form</a>.</p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
