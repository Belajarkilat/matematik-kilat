import React from 'react';
import { useLocation } from 'react-router-dom';

// Jenama payung NaikGred. Ia hanya muncul pada halaman utama, bukan semasa
// kuiz, supaya tiada apa-apa menarik mata anak ketika dia sedang menjawab.
const LALUAN = ['/', '/new-profile', '/hub', '/settings'];

export default function NaikGredKaki() {
  const { pathname } = useLocation();
  if (!LALUAN.includes(pathname)) return null;

  return (
    <footer className="jenama-kaki">
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <rect x="6" y="38" width="12" height="18" rx="4.5" fill="#2F8874" />
        <rect x="22" y="27" width="12" height="29" rx="4.5" fill="#7ED3BF" />
        <path
          d="M38 20 L32.6 20 Q30 20 31.6 18 L41.8 6 Q44 3.4 46.2 6 L56.4 18 Q58 20 55.4 20 L50 20 L50 51.5 Q50 56 45.5 56 L42.5 56 Q38 56 38 51.5 Z"
          fill="#FFC24D"
        />
      </svg>
      <span>
        Sebuah produk{' '}
        <span className="jenama-kaki__nama">
          <i>Naik</i>
          <b>Gred</b>
        </span>
      </span>
    </footer>
  );
}
