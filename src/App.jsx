import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initProfileService, getProfileService } from './services/profileService';
import { initFirebase } from './services/firebase';

// Pages
import ProfileSelector from './pages/ProfileSelector';
import AvatarBuilder from './pages/AvatarBuilder';
import Hub from './pages/Hub';
import ChapterMap from './pages/ChapterMap';
import Quiz from './pages/Quiz';
import ResultsPage from './pages/ResultsPage';
import Settings from './pages/Settings';
import VisualGallery from './pages/VisualGallery';

// Styles
import './styles/kilat-theme.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeProfile, setActiveProfile] = useState(null);
  const [profileService, setProfileService] = useState(null);

  useEffect(() => {
    // Initialize services
    const initServices = async () => {
      try {
        // Initialize profile service
        const ps = initProfileService();
        setProfileService(ps);

        // Initialize Firebase (if enabled)
        await initFirebase();

        // Load active profile
        const profile = ps.getActiveProfile();
        if (profile) {
          setActiveProfile(profile);
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setLoading(false);
      }
    };

    initServices();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FF6B35 0%, #8338EC 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <h1>Matematik Kilat</h1>
          <p>Sedang memuatkan...</p>
        </div>
      </div>
    );
  }

  const handleProfileChange = (profile) => {
    setActiveProfile(profile);
  };

  return (
    <Router basename="/matematik-kilat/">
      <Routes>
        <Route path="/" element={activeProfile ? <Navigate to="/hub" /> : <ProfileSelector onProfileChange={handleProfileChange} />} />
        <Route path="/new-profile" element={<ProfileSelector onProfileChange={handleProfileChange} />} />
        <Route path="/avatar" element={activeProfile ? <AvatarBuilder profile={activeProfile} /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        {import.meta.env.DEV && (
          <Route path="/dev/visuals" element={<VisualGallery />} />
        )}
        <Route path="/hub" element={activeProfile ? <Hub profile={activeProfile} /> : <Navigate to="/" />} />
        <Route path="/tahun/:tahun" element={activeProfile ? <ChapterMap profile={activeProfile} /> : <Navigate to="/" />} />
        <Route path="/quiz/:tahun/:chapter/:level" element={activeProfile ? <Quiz profile={activeProfile} /> : <Navigate to="/" />} />
        <Route path="/results/:tahun/:chapter/:level" element={activeProfile ? <ResultsPage profile={activeProfile} /> : <Navigate to="/" />} />
        {/* Catch-all: an unknown URL must never leave the child staring at a blank page. */}
        <Route path="*" element={<Navigate to={activeProfile ? '/hub' : '/'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
