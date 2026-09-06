import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initProfileService, getProfileService } from './services/profileService';
import { initFirebase } from './services/firebase';
import { getSettingsService } from './services/settingsService';
import KilatMark from './components/KilatMark';
import feedback from './services/feedbackService';

// Pages
import ProfileSelector from './pages/ProfileSelector';
import AvatarBuilder from './pages/AvatarBuilder';
import Hub from './pages/Hub';
import ChapterMap from './pages/ChapterMap';
import Quiz from './pages/Quiz';
import ResultsPage from './pages/ResultsPage';
import Settings from './pages/Settings';
import VisualGallery from './pages/VisualGallery';
import ParentReport from './pages/ParentReport';
import Unlock from './pages/Unlock';

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

        // Tema disimpan antara sesi, jadi ia mesti disapu semula pada mula.
        const ss = getSettingsService();
        ss.applyTheme(ss.getSettings().theme);

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

  // Rasa native datang dari setiap sentuhan memberi jawapan, bukan hanya
  // sentuhan yang penting. Satu pengendali di peringkat dokumen memberi
  // setiap butang dalam app klik dan gegaran yang sama, dan ia juga membuka
  // konteks audio pada sentuhan pertama seperti yang pelayar wajibkan.
  useEffect(() => {
    const onPress = (e) => {
      const hit = e.target.closest('button, .option, .level, .year, .swatch, .choice');
      if (!hit || hit.disabled) return;
      feedback.tap();
    };
    document.addEventListener('pointerdown', onPress, true);
    return () => document.removeEventListener('pointerdown', onPress, true);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <KilatMark size={64} />
          </div>
          <h1 className="page__title">Matematik Kilat</h1>
          <p className="page__sub">Sedang memuatkan...</p>
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
        <Route path="/avatar" element={activeProfile ? <AvatarBuilder profile={activeProfile} onProfileChange={handleProfileChange} /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/buka" element={<Unlock />} />
        <Route path="/laporan" element={activeProfile ? <ParentReport profile={activeProfile} /> : <Navigate to="/" />} />
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
