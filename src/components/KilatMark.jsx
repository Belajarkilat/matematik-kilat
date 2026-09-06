import React from 'react';

/**
 * Lambang Matematik Kilat.
 *
 * Skrin mula dahulu memakai emoji kilat sebagai lambang. Emoji dilukis
 * berbeza pada setiap telefon dan bukan milik sesiapa, jadi ia tidak boleh
 * menjadi tanda jenama. Ini bentuk tetap, dengan sempadan dakwat tebal yang
 * sama seperti setiap blok lain dalam app.
 */

function KilatMark({ size = 72, title = 'Matematik Kilat' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <path
        d="M62 6 L24 52 L45 52 L38 94 L78 44 L55 44 Z"
        fill="#FFC300"
        stroke="#0E1740"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default KilatMark;
