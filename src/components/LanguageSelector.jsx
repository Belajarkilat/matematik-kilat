import React from 'react';
import { getLanguageService } from '../services/languageService';

function LanguageSelector({ onLanguageChange }) {
  const ls = getLanguageService();
  const currentLanguage = ls.getLanguage();
  const languages = ls.getAvailableLanguages();

  const handleLanguageChange = (lang) => {
    ls.setLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: currentLanguage === lang.code ? '3px solid white' : '2px solid rgba(255,255,255,0.5)',
            background: currentLanguage === lang.code
              ? 'linear-gradient(135deg, #FF6B35 0%, #8338EC 100%)'
              : 'rgba(255,255,255,0.1)',
            color: 'white',
            fontWeight: currentLanguage === lang.code ? 'bold' : 'normal',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.95rem'
          }}
          onMouseEnter={(e) => {
            if (currentLanguage !== lang.code) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentLanguage !== lang.code) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }
          }}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;
