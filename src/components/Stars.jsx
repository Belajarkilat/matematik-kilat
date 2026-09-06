import React from 'react';

/**
 * Tiga bintang satu aras. Bintang yang belum dikutip kekal dilukis supaya
 * budak nampak berapa banyak lagi yang tinggal, bukan hanya apa yang ada.
 */

function Star({ filled, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <path
        d="M12 2.6l2.9 5.9 6.5 0.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-0.9z"
        fill={filled ? 'currentColor' : 'rgba(14,23,64,0.24)'}
        stroke={filled ? '#0E1740' : 'transparent'}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stars({ count = 0, size = 18, label }) {
  return (
    <div
      className="stars"
      role="img"
      aria-label={label || `${count} daripada 3 bintang`}
    >
      {[1, 2, 3].map((n) => (
        <Star key={n} filled={n <= count} size={size} />
      ))}
    </div>
  );
}

export default Stars;
