import React from 'react';

/**
 * Cincin bonus masa.
 *
 * Ini bukan kiraan menurun yang boleh menamatkan soalan. Tiada budak kehilangan
 * markah kerana lambat berfikir. Ia hanya menandakan tempoh untuk mendapat
 * bonus, jadi ia mekanik ganjaran dan bukan hukuman.
 *
 * Cincin ini diherakkan oleh satu animasi CSS pada satu elemen sahaja. React
 * tidak dikemas kini setiap saat, kerana melukis semula skrin kuiz enam puluh
 * kali sesaat mematikan telefon Android murah.
 *
 * Warnanya kekal kuning sampai habis. Bertukar merah pada saat akhir ialah
 * bahasa jam bom, dan itu yang membina kebimbangan matematik.
 */

const R = 26;
const CIRC = 2 * Math.PI * R;

function BonusTimer({ seconds, running, spent }) {
  const reduced = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const label = spent ? 'Tempoh bonus tamat' : `Bonus dalam ${seconds} saat`;

  return (
    <div className={spent ? 'btimer btimer--spent' : 'btimer'} title={label}>
      <svg viewBox="0 0 64 64" role="img" aria-label={label}>
        <circle className="btimer__track" cx="32" cy="32" r={R} />
        {!reduced && (
          <circle
            className="btimer__ring"
            cx="32"
            cy="32"
            r={R}
            style={{
              strokeDasharray: CIRC,
              // Dijeda, bukan diulang, supaya cincin berhenti tepat di tempat
              // budak menekan semak.
              animationDuration: `${seconds}s`,
              animationPlayState: running ? 'running' : 'paused'
            }}
          />
        )}
      </svg>
      <span className="btimer__bolt" aria-hidden="true">⚡</span>
    </div>
  );
}

export default BonusTimer;
