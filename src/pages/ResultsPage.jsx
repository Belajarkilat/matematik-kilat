import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function ResultsPage({ profile }) {
  const { tahun, chapter } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || { score: 0, correct: 0, total: 0, combo: 0 };
  const canvasRef = useRef(null);

  useEffect(() => {
    // Confetti animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#FF6B35', '#2ECC71', '#3498DB', '#9B59B6', '#F39C12', '#FFC93C'];

    for (let i = 0; i < 100; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 5 + 3,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPieces.forEach((piece) => {
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.vy += 0.2; // gravity
        piece.rotation += piece.rotationSpeed;

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();
      });

      if (confettiPieces.some(p => p.y < canvas.height)) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  const getMessage = (score) => {
    if (score === 100) return { msg: 'Sempurna! 🌟', emoji: '👑' };
    if (score >= 80) return { msg: 'Cemerlang! 🎉', emoji: '⭐' };
    if (score >= 60) return { msg: 'Bagus! 😊', emoji: '👍' };
    if (score >= 40) return { msg: 'Terus Berusaha! 💪', emoji: '🔥' };
    return { msg: 'Jangan Menyerah! 💪', emoji: '😢' };
  };

  const result = getMessage(state.score);
  const bonusPoints = state.combo * 5;

  return (
    <div style={{ minHeight: '100vh', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)', position: 'relative', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div className="card card--success">
          <div style={{ fontSize: '5rem', marginBottom: '20px', animation: 'bounce 1s ease infinite' }}>
            {result.emoji}
          </div>
          <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '10px' }}>
            {result.msg}
          </h1>

          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px',
            color: 'white'
          }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>
              {state.score}%
            </div>
            <div style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
              Betul {state.correct} daripada {state.total} soalan
            </div>

            {state.combo > 0 && (
              <div style={{
                background: 'rgba(255,215,0,0.3)',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '10px',
                border: '2px solid #FFD700'
              }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                  🔥 COMBO {state.combo}!
                </div>
                <div style={{ fontSize: '0.9rem' }}>
                  +{bonusPoints} bonus points
                </div>
              </div>
            )}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            color: 'white',
            fontSize: '0.95rem'
          }}>
            Total Poin: {state.correct * 10 + bonusPoints}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={() => navigate(`/tahun/${tahun}`)}
              className="btn btn--primary"
              style={{ marginBottom: 0 }}
            >
              ← Kembali
            </button>
            <button
              onClick={() => navigate('/hub')}
              className="btn btn--ghost"
              style={{ marginBottom: 0 }}
            >
              🏠 Rumah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
