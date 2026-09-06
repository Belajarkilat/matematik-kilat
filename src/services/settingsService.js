/**
 * Settings Service - User preferences & settings
 * Handles volume, difficulty preference, hints, theme
 */

const SETTINGS_KEY = 'bk_matematik_settings_v1';

const DEFAULT_SETTINGS = {
  volume: 70, // 0-100
  preferredDifficulty: 'sederhana', // mudah, sederhana, cabaran, ultra
  hintsPerQuiz: 3, // Hints available per quiz session
  soundEnabled: true,
  hapticsEnabled: true,
  theme: 'light', // light, dark, or system
  autoAdvance: true,
  showOfflineIndicator: true
};

class SettingsService {
  constructor() {
    this.settings = this._loadSettings();
  }

  _loadSettings() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to load settings:', e);
    }
    return { ...DEFAULT_SETTINGS };
  }

  _save() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }

  /**
   * Get all settings
   */
  getSettings() {
    return { ...this.settings };
  }

  /**
   * Update a single setting
   */
  updateSetting(key, value) {
    this.settings[key] = value;
    this._save();
    return this.settings;
  }

  /**
   * Update multiple settings
   */
  updateSettings(updates) {
    this.settings = { ...this.settings, ...updates };
    this._save();
    return this.settings;
  }

  /**
   * Reset to defaults
   */
  resetToDefaults() {
    this.settings = { ...DEFAULT_SETTINGS };
    this._save();
    return this.settings;
  }

  /**
   * Get volume (0-1 for Web Audio API)
   */
  getVolumeLevel() {
    return this.settings.volume / 100;
  }

  /**
   * Set volume (0-100)
   */
  setVolume(volume) {
    const v = Math.max(0, Math.min(100, volume));
    this.settings.volume = v;
    this._save();
    return v;
  }

  /**
   * Toggle sound
   */
  toggleSound() {
    this.settings.soundEnabled = !this.settings.soundEnabled;
    this._save();
    return this.settings.soundEnabled;
  }

  /**
   * Set preferred difficulty
   */
  setPreferredDifficulty(difficulty) {
    this.settings.preferredDifficulty = difficulty;
    this._save();
    return this.settings.preferredDifficulty;
  }

  /**
   * Set hints per quiz
   */
  setHintsPerQuiz(count) {
    this.settings.hintsPerQuiz = Math.max(0, Math.min(5, count));
    this._save();
    return this.settings.hintsPerQuiz;
  }

  /**
   * Set theme preference
   */
  setTheme(theme) {
    if (['light', 'dark', 'system'].includes(theme)) {
      this.settings.theme = theme;
      this._save();
      this.applyTheme(theme);
    }
    return this.settings.theme;
  }

  /**
   * Menandakan dokumen supaya CSS boleh menukar token warna.
   *
   * Versi lama menggunakan `filter: invert(1)` pada seluruh badan halaman.
   * Itu menyongsangkan avatar, visual soalan dan setiap warna jenama sekali
   * gus, jadi warna kulit menjadi biru dan kertas berpetak menjadi hitam.
   * Sekarang hanya satu atribut ditulis, dan kertas menjadi gelap melalui
   * token dalam kilat-theme.css.
   */
  applyTheme(theme) {
    const root = document.documentElement;
    document.body.style.filter = '';

    if (theme === 'system') {
      root.removeAttribute('data-theme');
      return;
    }
    root.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }

  /**
   * Gegaran. Tiada kesan pada Safari iOS, yang tidak menyokong
   * `navigator.vibrate` langsung.
   */
  toggleHaptics() {
    this.settings.hapticsEnabled = !this.settings.hapticsEnabled;
    this._save();
    return this.settings.hapticsEnabled;
  }
}


// Singleton instance
let instance = null;

export function initSettingsService() {
  if (!instance) {
    instance = new SettingsService();
  }
  return instance;
}

export function getSettingsService() {
  if (!instance) {
    instance = initSettingsService();
  }
  return instance;
}

export default SettingsService;
