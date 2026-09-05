import React from 'react';

/**
 * Proper Roblox-Style Avatar Component
 * Creates realistic-looking Roblox minifigure style characters
 */

function RobloxAvatar({ profile, size = 200 }) {
  const gender = profile?.avatar?.gender || 'neutral';
  const skinColor = profile?.avatar?.skinColor || '#f4c4a0';
  const hairColor = profile?.avatar?.hairColor || '#8B4513';
  const outfitColor = profile?.avatar?.outfitColor || '#FF6B35';
  const faceType = profile?.avatar?.faceType || 'smile';

  const scale = size / 200;

  // Face expressions
  const getFaceMarkings = () => {
    switch (faceType) {
      case 'happy':
        return (
          <>
            <circle cx="70" cy="45" r="5" fill="#1A1A1A" />
            <circle cx="130" cy="45" r="5" fill="#1A1A1A" />
            <path d="M 75 60 Q 100 72, 125 60" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case 'cool':
        return (
          <>
            <rect x="65" y="40" width="15" height="12" fill="#1A1A1A" rx="2" />
            <rect x="120" y="40" width="15" height="12" fill="#1A1A1A" rx="2" />
            <line x1="80" y1="46" x2="90" y2="46" stroke="#4A90E2" strokeWidth="2" />
            <line x1="110" y1="46" x2="120" y2="46" stroke="#4A90E2" strokeWidth="2" />
            <path d="M 85 65 Q 100 70, 115 65" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 'excited':
        return (
          <>
            <circle cx="70" cy="42" r="6" fill="#1A1A1A" />
            <circle cx="130" cy="42" r="6" fill="#1A1A1A" />
            <circle cx="70" cy="42" r="2" fill="#FFF" />
            <circle cx="130" cy="42" r="2" fill="#FFF" />
            <path d="M 80 65 Q 100 78, 120 65" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
            <path d="M 85 68 L 82 72" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
            <path d="M 115 68 L 118 72" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      default: // smile
        return (
          <>
            <circle cx="70" cy="45" r="5" fill="#1A1A1A" />
            <circle cx="130" cy="45" r="5" fill="#1A1A1A" />
            <circle cx="70" cy="45" r="2" fill="#FFF" />
            <circle cx="130" cy="45" r="2" fill="#FFF" />
            <path d="M 75 60 Q 100 70, 125 60" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 200 280"
      style={{
        width: size,
        height: size * 1.4,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
      }}
    >
      {/* Head - Cubic style */}
      <defs>
        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: skinColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: skinColor, stopOpacity: 0.9 }} />
        </linearGradient>
        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: hairColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: hairColor, stopOpacity: 0.85 }} />
        </linearGradient>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: outfitColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: outfitColor, stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>

      {/* Hair - on top */}
      {gender === 'girl' ? (
        <>
          {/* Long hair for girl */}
          <rect x="55" y="15" width="90" height="35" fill="url(#hairGradient)" stroke="#1A1A1A" strokeWidth="2" />
          {/* Hair ponytail on sides */}
          <rect x="40" y="45" width="15" height="40" fill={hairColor} stroke="#1A1A1A" strokeWidth="1.5" opacity="0.8" />
          <rect x="145" y="45" width="15" height="40" fill={hairColor} stroke="#1A1A1A" strokeWidth="1.5" opacity="0.8" />
        </>
      ) : (
        <>
          {/* Boy hair */}
          <rect x="50" y="15" width="100" height="32" fill="url(#hairGradient)" stroke="#1A1A1A" strokeWidth="2" />
        </>
      )}

      {/* Head */}
      <rect x="55" y="40" width="90" height="90" fill="url(#headGradient)" stroke="#1A1A1A" strokeWidth="2" rx="3" />

      {/* Face Details */}
      <g>{getFaceMarkings()}</g>

      {/* Head shading/highlight */}
      <rect x="58" y="43" width="25" height="80" fill="#FFF" opacity="0.15" stroke="none" rx="2" />

      {/* Neck */}
      <rect x="80" y="125" width="40" height="12" fill={skinColor} stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Body/Torso */}
      <rect x="50" y="135" width="100" height="85" fill="url(#bodyGradient)" stroke="#1A1A1A" strokeWidth="2" rx="3" />

      {/* Body highlight */}
      <rect x="53" y="138" width="30" height="80" fill="#FFF" opacity="0.2" stroke="none" rx="2" />

      {/* Arms */}
      <g>
        {/* Left Arm */}
        <rect x="20" y="150" width="30" height="28" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" rx="4" />
        <rect x="15" y="175" width="15" height="25" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" rx="3" />
        {/* Right Arm */}
        <rect x="150" y="150" width="30" height="28" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" rx="4" />
        <rect x="170" y="175" width="15" height="25" fill={skinColor} stroke="#1A1A1A" strokeWidth="2" rx="3" />
      </g>

      {/* Legs */}
      <g>
        {/* Left Leg */}
        <rect x="65" y="220" width="20" height="55" fill="#2C3E50" stroke="#1A1A1A" strokeWidth="2" rx="2" />
        <rect x="60" y="270" width="30" height="12" fill="#333" stroke="#1A1A1A" strokeWidth="1.5" rx="2" />
        {/* Right Leg */}
        <rect x="115" y="220" width="20" height="55" fill="#34495E" stroke="#1A1A1A" strokeWidth="2" rx="2" />
        <rect x="110" y="270" width="30" height="12" fill="#555" stroke="#1A1A1A" strokeWidth="1.5" rx="2" />
      </g>

      {/* Badges/Accessories - Star on chest */}
      <g opacity="0.9">
        <circle cx="100" cy="160" r="8" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
        <text x="100" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FFA500">
          ★
        </text>
      </g>
    </svg>
  );
}

export default RobloxAvatar;
