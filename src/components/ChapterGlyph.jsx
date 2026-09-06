import React from 'react';

/**
 * The mark for a chapter, drawn from the `glyph` field in the question data.
 *
 * Every chapter used to show the same book emoji, so five different topics
 * looked identical. Each mark now says something about its own topic and
 * carries the chapter's colour through to the panel spine.
 */

export const GLYPH_COLOR = {
  nombor: 'var(--mark-nombor)',
  pecahan: 'var(--mark-pecahan)',
  tambah: 'var(--mark-tambah)',
  tolak: 'var(--mark-tolak)',
  darab: 'var(--mark-darab)',
  tambahtolak: 'var(--mark-tambahtolak)',
  wangmasa: 'var(--mark-wangmasa)',
  bentuk: 'var(--mark-bentuk)'
};

function ChapterGlyph({ glyph = 'nombor', size = 40 }) {
  const color = GLYPH_COLOR[glyph] || GLYPH_COLOR.nombor;
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    'aria-hidden': true,
    focusable: 'false'
  };
  const stroke = {
    stroke: color,
    strokeWidth: 3.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none'
  };

  switch (glyph) {
    // Place value: three columns of decreasing height, like base-ten blocks.
    case 'nombor':
      return (
        <svg {...common}>
          <rect x="7" y="10" width="9" height="28" rx="2.5" fill={color} opacity="0.9" />
          <rect x="20" y="18" width="9" height="20" rx="2.5" fill={color} opacity="0.6" />
          <rect x="33" y="26" width="9" height="12" rx="2.5" fill={color} opacity="0.35" />
        </svg>
      );

    // Fractions: a circle with one quarter filled.
    case 'pecahan':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" {...stroke} />
          <path d="M24 24 L24 8 A16 16 0 0 1 40 24 Z" fill={color} />
          <line x1="24" y1="24" x2="8" y2="24" {...stroke} />
        </svg>
      );

    // Operations: plus over minus.
    case 'tambahtolak':
      return (
        <svg {...common}>
          <line x1="15" y1="8" x2="15" y2="24" {...stroke} />
          <line x1="7" y1="16" x2="23" y2="16" {...stroke} />
          <line x1="25" y1="34" x2="41" y2="34" {...stroke} />
          <circle cx="33" cy="16" r="3" fill={color} />
          <circle cx="15" cy="34" r="3" fill={color} />
        </svg>
      );

    // Addition: a plus built from two counted bars.
    case 'tambah':
      return (
        <svg {...common}>
          <rect x="19" y="8" width="10" height="32" rx="3" fill={color} />
          <rect x="8" y="19" width="32" height="10" rx="3" fill={color} />
        </svg>
      );

    // Subtraction: a bar with the removed portion shown as an outline.
    case 'tolak':
      return (
        <svg {...common}>
          <rect x="8" y="19" width="32" height="10" rx="3" fill={color} />
          <rect x="27" y="19" width="13" height="10" rx="3" fill="var(--paper)" stroke={color} strokeWidth="2.4" />
        </svg>
      );

    // Multiplication and division: an array of dots, three rows of two.
    case 'darab':
      return (
        <svg {...common}>
          {[0, 1, 2].map((r) =>
            [0, 1].map((c) => (
              <circle key={`${r}-${c}`} cx={16 + c * 16} cy={12 + r * 12} r="5"
                fill={color} opacity={0.55 + r * 0.15} />
            ))
          )}
        </svg>
      );

    // Money and time: a clock face with a coin behind it.
    case 'wangmasa':
      return (
        <svg {...common}>
          <circle cx="30" cy="18" r="11" fill={color} opacity="0.28" />
          <circle cx="19" cy="28" r="13" {...stroke} />
          <path d="M19 21 L19 28 L25 31" {...stroke} />
        </svg>
      );

    // Shape and space: a square with a triangle sitting on it.
    case 'bentuk':
      return (
        <svg {...common}>
          <rect x="8" y="24" width="17" height="16" rx="2" {...stroke} />
          <path d="M31 8 L42 28 L20 28 Z" fill={color} opacity="0.75" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="15" fill={color} opacity="0.5" />
        </svg>
      );
  }
}

export default ChapterGlyph;
