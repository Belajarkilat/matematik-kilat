import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSettingsService } from '../services/settingsService';
import { getLanguageService } from '../services/languageService';
import LanguageSelector from '../components/LanguageSelector';

function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({});
  const [testSoundPlayed, setTestSoundPlayed] = useState(false);
  const [language, setLanguage] = useState('ms');
  const ss = getSettingsService();
  const ls = getLanguageService();
  const audioContextRef = React.useRef(null);

  useEffect(() => {
    setSettings(ss.getSettings());
    setLanguage(ls.getLanguage());
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('AudioContext not available:', e);
    }
  }, []);

  const playTestSound = () => {
    if (!audioContextRef.current || !settings.soundEnabled) return;

    try {
      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      const volume = settings.volume / 100;
      gain.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);

      setTestSoundPlayed(true);
      setTimeout(() => setTestSoundPlayed(false), 300);
    } catch (e) {
      console.warn('Sound playback failed:', e);
    }
  };

  const handleVolumeChange = (e) => {
    const value = parseInt(e.target.value);
    ss.setVolume(value);
    setSettings(ss.getSettings());
  };

  const handleToggleSound = () => {
    const newState = ss.toggleSound();
    setSettings(ss.getSettings());
  };

  const handleDifficultyChange = (e) => {
    ss.setPreferredDifficulty(e.target.value);
    setSettings(ss.getSettings());
  };

  const handleHintsChange = (e) => {
    ss.setHintsPerQuiz(parseInt(e.target.value));
    setSettings(ss.getSettings());
  };

  const handleResetSettings = () => {
    if (confirm('Reset lahat ng settings sa default?')) {
      ss.resetToDefaults();
      setSettings(ss.getSettings());
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: 'linear-gradient(135deg, #FF6B35 0%, #8338EC 100%)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            marginBottom: '20px',
            color: 'white'
          }}
        >
          ← Bumalik
        </button>

        <div className="card card--primary" style={{ marginBottom: '30px' }}>
          <h1 style={{ color: 'white', margin: '0 0 10px 0' }}>⚙️ Settings</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>I-customize ang iyong experience</p>
        </div>

        {/* Sound Settings */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>🔊 Sound Settings</h2>

          {/* Sound Toggle */}
          <div style={{ marginBottom: '15px', padding: '12px', background: 'rgba(0,0,0,0.05)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Enable Sound</span>
              <button
                onClick={handleToggleSound}
                style={{
                  background: settings.soundEnabled ? '#4CAF50' : '#999',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {settings.soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Volume Slider */}
          {settings.soundEnabled && (
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Volume</span>
                <span style={{ fontSize: '1.2rem', color: '#FF6B35', fontWeight: 'bold' }}>{settings.volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.volume}
                onChange={handleVolumeChange}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '5px',
                  background: '#FF6B35',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
              <button
                onClick={playTestSound}
                style={{
                  marginTop: '12px',
                  background: '#FF6B35',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%',
                  transform: testSoundPlayed ? 'scale(0.95)' : 'scale(1)',
                  transition: 'transform 0.1s'
                }}
              >
                🔊 Test Sound
              </button>
            </div>
          )}
        </div>

        {/* Language Settings */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>🌐 Language / Bahasa</h2>
          <LanguageSelector onLanguageChange={() => window.location.reload()} />
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '12px', textAlign: 'center' }}>
            Pilih bahasa untuk antamuka aplikasi
          </p>
        </div>

        {/* Difficulty Settings */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>🎯 Preferred Difficulty</h2>
          <select
            value={settings.preferredDifficulty || 'sederhana'}
            onChange={handleDifficultyChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #FF6B35',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              background: 'white',
              color: '#333'
            }}
          >
            <option value="mudah">😊 Mudah (1x points)</option>
            <option value="sederhana">😌 Sederhana (2x points)</option>
            <option value="cabaran">🚀 Cabaran (3x points)</option>
            <option value="ultra">💎 Ultra (5x points)</option>
          </select>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '8px' }}>
            Ito ang default level kapag pumili ka ng chapter
          </p>
        </div>

        {/* Hints Settings */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>💡 Hints Per Quiz</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {[0, 1, 2, 3].map(count => (
              <button
                key={count}
                onClick={() => ss.setHintsPerQuiz(count) && setSettings(ss.getSettings())}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: settings.hintsPerQuiz === count ? '3px solid #FF6B35' : '2px solid #DDD',
                  background: settings.hintsPerQuiz === count ? '#FFE5D8' : 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  transition: 'all 0.2s'
                }}
              >
                {count === 0 ? 'None' : `${count} 💡`}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '12px' }}>
            Bilang ng hints na available sa bawat quiz session
          </p>
        </div>

        {/* Theme Settings */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>🌙 Theme</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {['light', 'dark', 'system'].map(t => (
              <button
                key={t}
                onClick={() => ss.setTheme(t) && setSettings(ss.getSettings())}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: settings.theme === t ? '3px solid #FF6B35' : '2px solid #DDD',
                  background: settings.theme === t ? '#FFE5D8' : 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize'
                }}
              >
                {t === 'light' ? '☀️ Light' : t === 'dark' ? '🌙 Dark' : '💻 System'}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="card" style={{ marginBottom: '20px', background: 'rgba(255,107,53,0.1)', borderColor: '#FF6B35' }}>
          <button
            onClick={handleResetSettings}
            style={{
              width: '100%',
              padding: '12px',
              background: '#FF6B35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🔄 Reset sa Default
          </button>
        </div>

        {/* Footer Info */}
        <div style={{ textAlign: 'center', color: 'white', fontSize: '0.9rem', marginTop: '30px' }}>
          <p>✓ Settings ay auto-save sa device mo</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
