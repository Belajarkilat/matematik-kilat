import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getProfileService, STAR_CUTOFF, STARS_TO_ADVANCE } from '../services/profileService';
import { isLevelPaid } from '../services/licenceService';
import Stars from '../components/Stars';

function verdictFor(stars, score) {
  if (stars === 3) return { head: 'Tiga bintang', note: 'Semua betul. Aras ini sudah dikuasai sepenuhnya.' };
  if (stars === 2) return { head: 'Dikuasai', note: 'Aras seterusnya sudah dibuka. Cuba lagi untuk tiga bintang.' };
  if (stars === 1) {
    return {
      head: 'Satu bintang',
      note: `Perlu ${STAR_CUTOFF[1]}% untuk membuka aras seterusnya. Kamu dapat ${score}%.`
    };
  }
  if (score >= 30) return { head: 'Hampir', note: 'Baca semula langkah kerja, kemudian cuba sekali lagi.' };
  return { head: 'Belum lulus', note: 'Cuba aras Mudah dahulu untuk membina asas.' };
}

function ResultsPage({ profile }) {
  const { tahun, chapter, level } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const ps = getProfileService();

  const state = location.state || {
    score: 0, correct: 0, total: 0, combo: 0, stars: 0, starsBefore: 0, points: 0, streak: 0, newBadges: []
  };

  const stars = state.stars || 0;
  const advanced = stars >= STARS_TO_ADVANCE;
  const verdict = verdictFor(stars, state.score);
  const allBadges = ps.getAllBadges();
  const earned = (state.newBadges || []).map((id) => allBadges[id]).filter(Boolean);

  // Confetti is a reward, so it only runs on a pass, and never for anyone who
  // has asked the system to reduce motion.
  useEffect(() => {
    if (!advanced) return undefined;
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
  }, [advanced]);

  const levelNum = parseInt(level, 10);
  const nextLevel = Math.min(4, levelNum + 1);
  const nextIsPaid = isLevelPaid(nextLevel);

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
          <div className="stars stars--big">
            <Stars count={stars} size={44} label={`${stars} daripada 3 bintang`} />
          </div>

          <div className="score" style={{ marginTop: 10 }}>{state.score}%</div>
          <div className="score__label">
            {state.correct} betul daripada {state.total} soalan
          </div>

          <h2 style={{ marginTop: 18, fontSize: '1.3rem' }}>{verdict.head}</h2>
          <p className="muted" style={{ marginTop: 6 }}>{verdict.note}</p>

          <div className="stats" style={{ marginTop: 18, gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="stat">
              <div className="stat__num">{state.combo}</div>
              <div className="stat__label">Rentetan terbaik</div>
            </div>
            <div className="stat">
              <div className="stat__num">{state.points}</div>
              <div className="stat__label">Poin</div>
            </div>
            <div className="stat">
              <div className="stat__num">{state.streak}</div>
              <div className="stat__label">Hari berturut</div>
            </div>
          </div>
        </div>

        {earned.length > 0 && (
          <div className="paper paper--plain" style={{ marginBottom: 16 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Lencana baharu</div>
            <div className="badges">
              {earned.map((b) => (
                <div className="badge" key={b.name}>
                  <span className="badge__emoji">{b.emoji}</span>
                  <div>
                    <div className="badge__name">{b.name}</div>
                    <div className="badge__note">{b.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="stack">
          {advanced && levelNum < 4 && !nextIsPaid && (
            <button
              className="btn btn--go btn--block"
              onClick={() => navigate(`/quiz/${tahun}/${chapter}/${nextLevel}`)}
            >
              Teruskan ke aras seterusnya
            </button>
          )}
          {advanced && levelNum < 4 && nextIsPaid && (
            <button className="btn btn--go btn--block" onClick={() => navigate('/buka')}>
              Buka aras Cabaran dan Ultra
            </button>
          )}
          <button
            className={advanced ? 'btn btn--paper btn--block' : 'btn btn--go btn--block'}
            onClick={() => navigate(`/quiz/${tahun}/${chapter}/${level}`)}
          >
            {stars === 3 ? 'Main aras ini sekali lagi' : 'Cuba lagi untuk lebih bintang'}
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
