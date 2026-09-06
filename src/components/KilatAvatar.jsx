import React, { useId } from 'react';

/**
 * The one avatar renderer in the app.
 *
 * Blocky on purpose: the same squared, printed-block feel as the rest of the
 * "Buku Petak" system, so the child on the Hub is the child in the builder.
 * Outlines use the ink of the design system, never a generic black.
 */

const OUTLINE = '#0E1740';

// Accessories a child can wear. `songkok` and `tudung` are here because the
// pupils this app is for actually wear them; the rest are play.
export const HAT_TYPES = ['none', 'songkok', 'tudung', 'cap', 'crown', 'beanie', 'bow', 'flower'];

function Accessory({ type }) {
  switch (type) {
    case 'songkok':
      return (
        <g>
          <rect x="54" y="2" width="92" height="30" fill="#12173A" stroke={OUTLINE} strokeWidth="2" rx="3" />
          <rect x="50" y="28" width="100" height="10" fill="#1B2350" stroke={OUTLINE} strokeWidth="2" rx="2" />
        </g>
      );
    case 'tudung':
      // Covers the hair, frames the face without reaching the eyes, and falls
      // onto the chest. Kept off-white so it never fights the shirt colour.
      return (
        <g>
          <rect x="42" y="30" width="16" height="110" fill="#E4E9F8" stroke={OUTLINE} strokeWidth="2" rx="5" />
          <rect x="142" y="30" width="16" height="110" fill="#E4E9F8" stroke={OUTLINE} strokeWidth="2" rx="5" />
          <rect x="46" y="4" width="108" height="32" fill="#F4F6FF" stroke={OUTLINE} strokeWidth="2" rx="8" />
          <rect x="56" y="126" width="88" height="22" fill="#F4F6FF" stroke={OUTLINE} strokeWidth="2" rx="5" />
        </g>
      );
    case 'cap':
      return (
        <g>
          <rect x="52" y="0" width="96" height="22" fill="#2E3C7E" stroke={OUTLINE} strokeWidth="2" rx="4" />
          <rect x="44" y="20" width="112" height="10" fill="#46559C" stroke={OUTLINE} strokeWidth="2" rx="3" />
          <rect x="92" y="4" width="16" height="16" fill="#FFC300" stroke={OUTLINE} strokeWidth="1.5" rx="2" />
        </g>
      );
    case 'crown':
      return (
        <g>
          <path
            d="M 55 30 L 55 4 L 76 18 L 100 0 L 124 18 L 145 4 L 145 30 Z"
            fill="#FFC300"
            stroke={OUTLINE}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect x="93" y="20" width="14" height="8" fill="#C7363C" stroke={OUTLINE} strokeWidth="1.5" rx="1" />
        </g>
      );
    case 'beanie':
      return (
        <g>
          <rect x="52" y="6" width="96" height="26" fill="#7A4DD4" stroke={OUTLINE} strokeWidth="2" rx="4" />
          <rect x="48" y="28" width="104" height="12" fill="#F4F6FF" stroke={OUTLINE} strokeWidth="2" rx="3" />
          <rect x="92" y="-8" width="16" height="16" fill="#F4F6FF" stroke={OUTLINE} strokeWidth="2" rx="3" />
        </g>
      );
    case 'bow':
      return (
        <g>
          <rect x="30" y="24" width="22" height="22" fill="#C2529E" stroke={OUTLINE} strokeWidth="2" rx="3" />
          <rect x="148" y="24" width="22" height="22" fill="#C2529E" stroke={OUTLINE} strokeWidth="2" rx="3" />
        </g>
      );
    case 'flower':
      return (
        <g>
          <rect x="34" y="26" width="16" height="16" fill="#C2529E" stroke={OUTLINE} strokeWidth="2" rx="8" />
          <rect x="150" y="26" width="16" height="16" fill="#FFC300" stroke={OUTLINE} strokeWidth="2" rx="8" />
        </g>
      );
    default:
      return null;
  }
}

function KilatAvatar({ profile, size = 200 }) {
  const uid = useId().replace(/:/g, '');
  const a = profile?.avatar || {};
  const gender = a.gender || 'neutral';
  const skinColor = a.skinColor || '#E8B98F';
  const hairColor = a.hairColor || '#3A2A1C';
  const outfitColor = a.outfitColor || '#3E6FD9';
  const hatType = a.hatType || 'none';
  const faceType = a.faceType || 'smile';

  const headId = `head-${uid}`;
  const hairId = `hair-${uid}`;
  const bodyId = `body-${uid}`;

  // A tudung covers the hair, so drawing hair underneath only makes it poke out.
  const showHair = hatType !== 'tudung';

  const face = () => {
    switch (faceType) {
      case 'cool':
        return (
          <>
            <rect x="64" y="40" width="18" height="13" fill={OUTLINE} rx="2" />
            <rect x="118" y="40" width="18" height="13" fill={OUTLINE} rx="2" />
            <rect x="82" y="45" width="36" height="3" fill={OUTLINE} />
            <path d="M 82 66 Q 100 72, 118 66" fill="none" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case 'excited':
        return (
          <>
            <circle cx="70" cy="43" r="7" fill={OUTLINE} />
            <circle cx="130" cy="43" r="7" fill={OUTLINE} />
            <circle cx="72" cy="41" r="2.5" fill="#FFF" />
            <circle cx="132" cy="41" r="2.5" fill="#FFF" />
            <path d="M 78 63 Q 100 79, 122 63" fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
          </>
        );
      default: // smile
        return (
          <>
            <circle cx="70" cy="45" r="5.5" fill={OUTLINE} />
            <circle cx="130" cy="45" r="5.5" fill={OUTLINE} />
            <circle cx="72" cy="43" r="2" fill="#FFF" />
            <circle cx="132" cy="43" r="2" fill="#FFF" />
            <path d="M 76 62 Q 100 72, 124 62" fill="none" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 200 285"
      role="img"
      aria-label="Avatar"
      style={{ width: size, height: size * 1.4, display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={headId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={skinColor} />
          <stop offset="100%" stopColor={skinColor} stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id={hairId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={hairColor} />
          <stop offset="100%" stopColor={hairColor} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={bodyId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={outfitColor} />
          <stop offset="100%" stopColor={outfitColor} stopOpacity="0.88" />
        </linearGradient>
      </defs>

      {/* Hair, drawn before the head so it reads as sitting behind it */}
      {showHair && (gender === 'girl' ? (
        <g>
          <rect x="55" y="14" width="90" height="36" fill={`url(#${hairId})`} stroke={OUTLINE} strokeWidth="2" rx="4" />
          <rect x="40" y="44" width="16" height="44" fill={hairColor} stroke={OUTLINE} strokeWidth="1.5" rx="3" />
          <rect x="144" y="44" width="16" height="44" fill={hairColor} stroke={OUTLINE} strokeWidth="1.5" rx="3" />
        </g>
      ) : (
        <rect x="50" y="14" width="100" height="33" fill={`url(#${hairId})`} stroke={OUTLINE} strokeWidth="2" rx="4" />
      ))}

      {/* Head */}
      <rect x="55" y="40" width="90" height="90" fill={`url(#${headId})`} stroke={OUTLINE} strokeWidth="2" rx="4" />
      <rect x="58" y="43" width="24" height="80" fill="#FFF" opacity="0.14" rx="2" />
      <g>{face()}</g>

      {/* Neck */}
      <rect x="80" y="126" width="40" height="12" fill={skinColor} stroke={OUTLINE} strokeWidth="1.5" />

      {/* Torso */}
      <rect x="50" y="135" width="100" height="85" fill={`url(#${bodyId})`} stroke={OUTLINE} strokeWidth="2" rx="4" />
      <rect x="53" y="138" width="28" height="79" fill="#FFF" opacity="0.18" rx="2" />

      {/* Arms */}
      <rect x="20" y="150" width="30" height="28" fill={outfitColor} stroke={OUTLINE} strokeWidth="2" rx="4" />
      <rect x="16" y="176" width="24" height="24" fill={skinColor} stroke={OUTLINE} strokeWidth="2" rx="4" />
      <rect x="150" y="150" width="30" height="28" fill={outfitColor} stroke={OUTLINE} strokeWidth="2" rx="4" />
      <rect x="160" y="176" width="24" height="24" fill={skinColor} stroke={OUTLINE} strokeWidth="2" rx="4" />

      {/* Legs */}
      <rect x="64" y="220" width="22" height="52" fill="#2E3C7E" stroke={OUTLINE} strokeWidth="2" rx="3" />
      <rect x="58" y="268" width="32" height="14" fill="#17225A" stroke={OUTLINE} strokeWidth="1.5" rx="3" />
      <rect x="114" y="220" width="22" height="52" fill="#2E3C7E" stroke={OUTLINE} strokeWidth="2" rx="3" />
      <rect x="110" y="268" width="32" height="14" fill="#17225A" stroke={OUTLINE} strokeWidth="1.5" rx="3" />

      {/* The lightning badge: the one accent mark the mascot carries */}
      <path
        d="M 103 150 L 92 166 L 99 166 L 96 180 L 108 163 L 101 163 Z"
        fill="#FFC300"
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <Accessory type={hatType} />
    </svg>
  );
}

export default KilatAvatar;
