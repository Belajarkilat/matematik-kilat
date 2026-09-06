import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSettingsService } from '../services/settingsService';
import { getLanguageService } from '../services/languageService';
import LanguageSelector from '../components/LanguageSelector';

const DIFFICULTIES = [
  { value: 'mudah', label: 'Mudah' },
  { value: 'sederhana', label: 'Sederhana' },
  { value: 'cabaran', label: 'Cabaran' },
  { value: 'ultra', label: 'Ultra' }
];

const HINTS = [0, 1, 2, 3];

const THEMES = [
  { value: 'light', label: 'Cerah' },
  { value: 'dark', label: 'Gelap' },
  { value: 'system', label: 'Ikut peranti' }
];

function Settings() {
  const navigate = useNavigate();
  const ss = getSettingsService();
  const ls = getLanguageService();

  const [settings, setSettings] = useState({});
  const [language, setLanguage] = useState('ms');
  const [confirmReset, setConfirmReset] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setSettings(ss.getSettings());
    setLanguage(ls.getLanguage());
    try {
      audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      audioRef.current = null;
    }
  }, []);

  const refresh = () => setSettings(ss.getSettings());

  const playTestSound = () => {
    const ctx = audioRef.current;
    if (!ctx || !settings.soundEnabled) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.setValueAtTime((settings.volume / 100) * 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      /* Audio is a nicety here; a browser that blocks it changes nothing else. */
    }
  };

  return (
    <div className="page">
      <button className="back" onClick={() => navigate(-1)}>← Kembali</button>

      <div className="page__head">
        <div className="grow">
          <h1 className="page__title">Tetapan</h1>
          <div className="page__sub">Semua pilihan disimpan pada peranti ini</div>
        </div>
      </div>

      <div className="stack">
        <section className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Bunyi</h2>

          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontWeight: 700 }}>Bunyi dalam permainan</span>
            <button
              className={settings.soundEnabled ? 'btn btn--go btn--small' : 'btn btn--secondary btn--small'}
              onClick={() => { ss.toggleSound(); refresh(); }}
              aria-pressed={Boolean(settings.soundEnabled)}
            >
              {settings.soundEnabled ? 'Hidup' : 'Mati'}
            </button>
          </div>

          <label htmlFor="volume" className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontWeight: 700 }}>Kekuatan bunyi</span>
            <span className="muted">{settings.volume ?? 0}%</span>
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="100"
            value={settings.volume ?? 0}
            onChange={(e) => { ss.setVolume(parseInt(e.target.value, 10)); refresh(); }}
            style={{ width: '100%' }}
          />

          <button
            className="btn btn--secondary btn--block"
            style={{ marginTop: 12 }}
            onClick={playTestSound}
            disabled={!settings.soundEnabled}
          >
            Uji bunyi
          </button>
        </section>

        <section className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Bahasa</h2>
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={(lang) => { ls.setLanguage(lang); setLanguage(lang); }}
          />
          <p className="muted" style={{ marginTop: 10, fontSize: '0.9rem' }}>
            Bahasa untuk antara muka aplikasi. Soalan sentiasa dalam Bahasa Malaysia.
          </p>
        </section>

        <section className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 6 }}>Aras pilihan</h2>
          <p className="muted" style={{ marginBottom: 12, fontSize: '0.9rem' }}>
            Aras yang dibuka dahulu apabila kamu memilih sesuatu bab.
          </p>
          <select
            value={settings.preferredDifficulty || 'mudah'}
            onChange={(e) => { ss.setPreferredDifficulty(e.target.value); refresh(); }}
            aria-label="Aras pilihan"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </section>

        <section className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 6 }}>Bantuan setiap kuiz</h2>
          <p className="muted" style={{ marginBottom: 12, fontSize: '0.9rem' }}>
            Berapa kali kamu boleh minta petunjuk dalam satu kuiz.
          </p>
          <div className="levels" style={{ marginTop: 0 }}>
            {HINTS.map((n) => (
              <button
                key={n}
                className={settings.hintsPerQuiz === n ? 'level level--next' : 'level'}
                onClick={() => { ss.setHintsPerQuiz(n); refresh(); }}
                aria-pressed={settings.hintsPerQuiz === n}
              >
                <span className="level__name">{n === 0 ? 'Tiada' : n}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Rupa paparan</h2>
          <div className="levels" style={{ marginTop: 0, gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {THEMES.map((t) => (
              <button
                key={t.value}
                className={settings.theme === t.value ? 'level level--next' : 'level'}
                onClick={() => { ss.setTheme(t.value); refresh(); }}
                aria-pressed={settings.theme === t.value}
              >
                <span className="level__name">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 6 }}>Kembalikan tetapan asal</h2>
          <p className="muted" style={{ marginBottom: 12, fontSize: '0.9rem' }}>
            Ini menukar tetapan sahaja. Profil dan kemajuan kamu kekal.
          </p>
          {confirmReset ? (
            <div className="row" style={{ gap: 10 }}>
              <button
                className="btn btn--go grow"
                onClick={() => { ss.resetToDefaults(); refresh(); setConfirmReset(false); }}
              >
                Ya, kembalikan
              </button>
              <button className="btn btn--secondary grow" onClick={() => setConfirmReset(false)}>
                Batal
              </button>
            </div>
          ) : (
            <button className="btn btn--secondary btn--block" onClick={() => setConfirmReset(true)}>
              Kembalikan tetapan asal
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

export default Settings;
