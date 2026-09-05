import React, { useEffect, useState } from 'react';

/**
 * Confetti Component
 * Shows celebratory confetti animation
 */

function Confetti({ active = true }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (!active) return;

    // Generate confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
      emoji: ['🎉', '🎊', '⭐', '🌟', '💫', '🏆', '🎈'][Math.floor(Math.random() * 7)]
    }));

    setConfetti(pieces);
  }, [active]);

  if (!active || confetti.length === 0) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }}>
      {confetti.map(piece => (
        <div
          key={piece.id}
          style={{
            position: 'absolute',
            left: `${piece.left}%`,
            top: '-20px',
            fontSize: '2rem',
            animation: `fall ${piece.duration}s linear ${piece.delay}s infinite`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0.8
          }}
        >
          {piece.emoji}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Confetti;
