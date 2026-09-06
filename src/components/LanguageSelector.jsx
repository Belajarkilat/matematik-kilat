import React from 'react';
import { getLanguageService } from '../services/languageService';

/**
 * Language picker.
 *
 * The buttons used to be white text on a translucent white fill, which made
 * every unselected language invisible on the light settings panel. They now
 * use the shared level-tile classes, so the selected one is the only thing
 * carrying the accent.
 */
function LanguageSelector({ onLanguageChange }) {
  const ls = getLanguageService();
  const current = ls.getLanguage();
  const languages = ls.getAvailableLanguages();

  const pick = (code) => {
    ls.setLanguage(code);
    if (onLanguageChange) onLanguageChange(code);
  };

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => pick(lang.code)}
          className={current === lang.code ? 'level level--next' : 'level'}
          style={{ flex: '1 1 120px' }}
          aria-pressed={current === lang.code}
        >
          <span className="level__name">{lang.name}</span>
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;
