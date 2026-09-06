import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const PASS = 50;

function verdictFor(score) {
  if (score === 100) return { head: 'Semua betul', note: 'Aras ini sudah dikuasai sepenuhnya.' };
  if (score >= 80) return { head: 'Cemerlang', note: 'Hampir semua betul. Teruskan ke aras seterusnya.' };
  if (score >= PASS) return { head: 'Lulus', note: 'Aras seterusnya sudah dibuka.' };
  if (score >= 30) return { head: 'Hampir', note: 'Baca semula langkah kerja, kemudian cuba sekali lagi.' };
  return { head: 'Belum lulus', note: 'Cuba aras Mudah dahulu untuk membina asas.' };
}

function ResultsPage() {
  const { tahun, chapter, level } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);

  const state = location.state || { score: 0, correct: 0, total: 0, combo: 0 };
  const passed = state.score >= PASS;
  const verdict = verdictFor(state.score);
  const bonus = state.combo * 5;
  const points = state.correct * 10 + bonus;

  // Confetti is a reward, so it only runs on a pass, and never for anyone who
  // has asked the system to reduce motion.
  useEffect(() => {
    if (!passed) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FFC300', '#148F5F', '#3E6FD9', '#C2529E', '#E2711D'];
    const pieces = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.15
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.rot += p.spin;
        if (p.y < canvas.height + 40) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.5);
        ctx.restore();
      });
      if (alive) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => raf && cancelAnimationFrame(raf);
  }, [passed]);

  const nextLevel = Math.min(4, parseInt(level, 10) + 1);

  return (
    <div className="page" style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="paper center pop" style={{ marginBottom: 16 }}>
          <div className="score">{state.score}%</div>
          <div className="score__label">
            {state.correct} betul daripada {state.total} soalan
          </div>

          <h2 style={{ marginTop: 18, fontSize: '1.3rem' }}>{verdict.head}</h2>
          <p className="muted" style={{ marginTop: 6 }}>{verdict.note}</p>

          <div className="stats" style={{ marginTop: 18, gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="stat">
              <div className="stat__num">{state.correct}</div>
              <div className="stat__label">Betul</div>
            </div>
            <div className="stat">
              <div className="stat__num">{state.combo}</div>
              <div className="stat__label">Rentetan terbaik</div>
            </div>
            <div className="stat">
              <div className="stat__num">{points}</div>
              <div className="stat__label">Poin</div>
            </div>
          </div>
        </div>

        <div className="stack">
          {passed && parseInt(level, 10) < 4 && (
            <button
              className="btn btn--go btn--block"
              onClick={() => navigate(`/quiz/${tahun}/${chapter}/${nextLevel}`)}
            >
              Teruskan ke aras seterusnya
            </button>
          )}
          <button
            className="btn btn--paper btn--block"
            onClick={() => navigate(`/quiz/${tahun}/${chapter}/${level}`)}
          >
            Cuba aras ini sekali lagi
          </button>
          <button className="btn btn--quiet btn--block" onClick={() => navigate(`/tahun/${tahun}`)}>
            Pilih bab lain
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
