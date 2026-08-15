import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import VideoMeetComponent from './pages/videoMeet.jsx';
import HomeComponent from './pages/home.jsx';
import History from './pages/history.jsx';
import AboutPage from './pages/about.jsx';
import FAQPage from './pages/faq.jsx';
import PrivacyPage from './pages/privacy.jsx';
import TermsPage from './pages/terms.jsx';
import ContactPage from './pages/contact.jsx';
import NotFoundPage from './pages/notFound.jsx';
import ProfilePage from './pages/profile.jsx';
import SettingsPage from './pages/settings.jsx';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/home' element={<HomeComponent />} />
            <Route path='/history' element={<History />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/faq' element={<FAQPage />} />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='/terms' element={<TermsPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/404' element={<NotFoundPage />} />
            <Route path='/:url' element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;