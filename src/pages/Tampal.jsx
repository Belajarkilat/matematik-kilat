import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import { isUnlocked } from '../services/licenceService';
import { getSubject } from '../services/subjectService';
import { tampalUrl, recordTampal } from '../services/tampalService';
import feedback, { prime } from '../services/feedbackService';
import Stars from '../components/Stars';

// Tampal Label: budak menarik label ke kotak pada rajah, atau menekan label
// kemudian menekan kotak. Kedua-dua cara mesti berfungsi, kerana menarik
// sukar pada telefon kecil dan mustahil dengan papan kekunci.

function chapterNumber(id) {
  const m = /-b(\d+)$/.exec(id || '');
  return m ? parseInt(m[1], 10) : 1;
}

function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

const fmtMasa = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const MATA_SETIAP_LABEL = 5;

function Tampal({ profile }) {
  const { subjek, tahun, chapter } = useParams();
  const subject = getSubject(subjek);
  const navigate = useNavigate();
  const ps = getProfileService();
  const balik = `/${subject.id}/tahun/${tahun}`;

  const [bab, setBab] = useState(null);
  const [error, setError] = useState(null);
  const [r, setR] = useState(0);
  const [board, setBoard] = useState({ placed: {}, pool: [] });
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [tally, setTally] = useState({ right: 0, total: 0 });
  const [hasil, setHasil] = useState(null);
  const [hot, setHot] = useState(null);
  const [saat, setSaat] = useState(0);
  const [pop, setPop] = useState(null);
  const mula = useRef(Date.now());
  const tarik = useRef(null);

  // Bab pertama setiap tahun percuma, supaya semua orang boleh mencuba Tampal.
  const percuma = chapterNumber(chapter) === 1;
  useEffect(() => {
    if (!percuma && !isUnlocked()) navigate(`/buka?dari=${encodeURIComponent(balik)}`, { replace: true });
  }, [percuma, balik, navigate]);

  useEffect(() => {
    let alive = true;
    fetch(tampalUrl(subject.id, tahun))
      .then((res) => {
        if (!res.ok) throw new Error(`Fail Tampal tidak dijumpai (${res.status})`);
        return res.json();
      })
      .then((data) => {
        const b = data.chapters?.find((c) => c.id === chapter);
        if (!b || !b.rounds?.length) throw new Error('Bab ini belum ada Tampal Label');
        if (alive) setBab(b);
      })
      .catch((e) => alive && setError(e.message));
    return () => { alive = false; };
  }, [subject.id, tahun, chapter]);

  const R = bab?.rounds[r];

  useEffect(() => {
    if (!R) return;
    setBoard({ placed: {}, pool: shuffle([...R.pins.map((p) => p.a), ...(R.umpan || [])]) });
    setSelected(null);
    setChecked(false);
  }, [R]);

  useEffect(() => {
    if (hasil) return undefined;
    const t = setInterval(() => setSaat(Math.floor((Date.now() - mula.current) / 1000)), 500);
    return () => clearInterval(t);
  }, [hasil]);

  /* ------------------------------------------------------ tindakan -- */

  const place = useCallback((t, i) => {
    setBoard(({ placed, pool }) => {
      const p = { ...placed };
      let q = pool.slice();
      const lama = p[i];
      const dari = Object.keys(p).find((k) => p[k] === t);
      if (dari !== undefined) {
        delete p[dari];
        if (lama !== undefined && Number(dari) !== i) p[dari] = lama;
      } else {
        q = q.filter((x) => x !== t);
        if (lama !== undefined) q.push(lama);
      }
      p[i] = t;
      return { placed: p, pool: q };
    });
    setSelected(null);
    setPop(i);
    feedback.tap();
  }, []);

  const unplace = useCallback((i) => {
    setBoard(({ placed, pool }) => {
      if (placed[i] === undefined) return { placed, pool };
      const p = { ...placed };
      const t = p[i];
      delete p[i];
      return { placed: p, pool: [...pool, t] };
    });
    setSelected(null);
  }, []);

  const tapPool = (t) => {
    if (checked) return;
    setSelected((s) => (s && s.from === 'pool' && s.t === t ? null : { from: 'pool', t }));
  };

  const tapSlot = (i) => {
    if (checked) return;
    if (selected) {
      if (selected.from === 'slot' && selected.i === i) { unplace(i); return; }
      place(selected.t, i);
      return;
    }
    if (board.placed[i] !== undefined) setSelected({ from: 'slot', i, t: board.placed[i] });
  };

  // Tarik dengan penunjuk. Label hanya menjadi "hantu" selepas bergerak
  // lebih 6px, jadi sentuhan biasa kekal sebagai tekan-pilih.
  const mulaTarik = (e, from, t, i) => {
    if (checked || e.button > 0) return;
    prime();
    const st = { x: e.clientX, y: e.clientY, moved: false, ghost: null, from, t, i };
    tarik.current = st;
    const bawah = (ev) => document.elementFromPoint(ev.clientX, ev.clientY);
    const gerak = (ev) => {
      if (!st.moved && Math.hypot(ev.clientX - st.x, ev.clientY - st.y) > 6) {
        st.moved = true;
        st.ghost = document.createElement('div');
        st.ghost.className = 'tampal-tag tampal-ghost';
        st.ghost.textContent = t;
        document.body.appendChild(st.ghost);
      }
      if (st.moved) {
        ev.preventDefault();
        st.ghost.style.left = `${ev.clientX}px`;
        st.ghost.style.top = `${ev.clientY}px`;
        const s = bawah(ev)?.closest('.tampal-slot');
        setHot(s ? Number(s.dataset.i) : null);
      }
    };
    const lepas = (ev) => {
      window.removeEventListener('pointermove', gerak);
      window.removeEventListener('pointerup', lepas);
      window.removeEventListener('pointercancel', lepas);
      tarik.current = null;
      setHot(null);
      if (st.moved) {
        st.ghost.remove();
        const el = bawah(ev);
        const s = el?.closest('.tampal-slot');
        if (s) place(t, Number(s.dataset.i));
        else if (from === 'slot' && el?.closest('.tampal-tray')) unplace(i);
      } else if (from === 'pool') tapPool(t);
      else tapSlot(i);
    };
    window.addEventListener('pointermove', gerak, { passive: false });
    window.addEventListener('pointerup', lepas);
    window.addEventListener('pointercancel', lepas);
  };

  useEffect(() => () => { tarik.current?.ghost?.remove(); }, []);

  const hantar = () => {
    const right = R.pins.filter((p, i) => board.placed[i] === p.a).length;
    setChecked(true);
    setSelected(null);
    setTally((t) => ({ right: t.right + right, total: t.total + R.pins.length }));
    if (right === R.pins.length) feedback.correct();
    else feedback.wrong();
  };

  const seterusnya = () => {
    if (r < bab.rounds.length - 1) {
      setR(r + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const pct = Math.round(tally.right / tally.total * 100);
    const rekod = recordTampal(profile.id, subject.id, tahun, chapter, pct);
    const mata = tally.right * MATA_SETIAP_LABEL;
    try { ps.addPoints(profile.id, mata); } catch { /* profil dipadam di tab lain */ }
    if (rekod.stars === 3) feedback.celebrate(); else if (rekod.stars) feedback.star();
    setHasil({ pct, mata, stars: rekod.stars, isBest: rekod.isBest, saat: Math.floor((Date.now() - mula.current) / 1000) });
  };

  const mainSemula = () => {
    mula.current = Date.now();
    setSaat(0);
    setTally({ right: 0, total: 0 });
    setHasil(null);
    if (r === 0) setBoard({ placed: {}, pool: shuffle([...R.pins.map((p) => p.a), ...(R.umpan || [])]) });
    setR(0);
    setChecked(false);
  };

  /* ------------------------------------------------------- paparan -- */

  if (error) {
    return (
      <div className="page">
        <button className="back" onClick={() => navigate(balik)}>← Kembali</button>
        <div className="paper paper--plain center">
          <h2 style={{ marginBottom: 8 }}>Tampal Label tidak dapat dibuka</h2>
          <p className="muted" style={{ marginBottom: 16 }}>{error}</p>
          <button className="btn btn--go" onClick={() => window.location.reload()}>Cuba lagi</button>
        </div>
      </div>
    );
  }

  if (!bab) {
    return (
      <div className="page" style={{ display: 'grid', placeItems: 'center', minHeight: '70vh' }}>
        <div className="center">
          <div className="spinner" style={{ margin: '0 auto 16px' }} />
          <div className="on-ink-muted">Menyediakan rajah…</div>
        </div>
      </div>
    );
  }

  if (hasil) {
    const tajuk = hasil.stars === 3 ? 'Semua label tepat!' : hasil.stars === 2 ? 'Bagus, sikit lagi!' : hasil.stars === 1 ? 'Dah separuh jalan' : 'Jom cuba sekali lagi';
    return (
      <div className="page">
        <div className="paper paper--plain center tampal-akhir">
          <Stars count={hasil.stars} size={44} />
          <h2 className="page__title" style={{ color: 'var(--text)' }}>{tajuk}</h2>
          <p className="muted">{bab.title}</p>
          <div className="tampal-tally">
            <div><b>{tally.right}/{tally.total}</b><span>label betul</span></div>
            <div><b>+{hasil.mata}</b><span>mata</span></div>
            <div><b>{fmtMasa(hasil.saat)}</b><span>masa</span></div>
          </div>
          {hasil.isBest && tally.total > 0 && <p className="tampal-rekod">Rekod terbaik baharu untuk bab ini.</p>}
          <button className="btn btn--go btn--block" onClick={mainSemula}>Main semula</button>
          <button className="btn btn--secondary btn--block" onClick={() => navigate(balik)}>Kembali ke senarai bab</button>
        </div>
      </div>
    );
  }

  const { placed, pool } = board;
  const penuh = Object.keys(placed).length === R.pins.length;
  const betulIni = checked ? R.pins.filter((p, i) => placed[i] === p.a).length : 0;
  const garis = R.pins.map((p) => (p.p
    ? `<line x1="${p.p[0]}" y1="${p.p[1]}" x2="${p.x}" y2="${p.y}" stroke="#17225A" stroke-width="2"/><circle cx="${p.p[0]}" cy="${p.p[1]}" r="5" fill="#FFC300" stroke="#17225A" stroke-width="2"/>`
    : '')).join('');
  const svg = R.svg.replace('</svg>', `${garis}</svg>`);
  const pilihSlot = selected && !checked;

  return (
    <div className="page page--tampal">
      <div className="quiz__bar">
        <button className="back" onClick={() => navigate(balik)} aria-label="Keluar dari Tampal Label">✕</button>
        <div className="grow">
          <div className="tampal-dots" aria-label={`Pusingan ${r + 1} daripada ${bab.rounds.length}`}>
            {bab.rounds.map((_, i) => <i key={i} className={i < r ? 'done' : i === r ? 'on' : ''} />)}
          </div>
        </div>
        <div className="quiz__count">{fmtMasa(saat)}</div>
      </div>

      <div className="tampal-head">
        <span className="pill pill--quiet">Tampal Label · Tahun {tahun}</span>
        <h1 className="tampal-title">{R.nama}</h1>
        <p className="tampal-ask">{R.tanya}</p>
      </div>

      <div className="tampal-board">
        <div className="tampal-scene" style={{ aspectRatio: `${R.W} / ${R.H}` }}>
          <div className="tampal-svg" dangerouslySetInnerHTML={{ __html: svg }} />
          {R.pins.map((p, i) => {
            const v = placed[i];
            const ok = checked && v === p.a;
            const cls = ['tampal-slot',
              v !== undefined && 'is-filled',
              (pilihSlot && !(selected.from === 'slot' && selected.i === i)) || hot === i ? 'is-hot' : '',
              selected?.from === 'slot' && selected.i === i && 'is-picked',
              checked && (ok ? 'is-ok' : 'is-bad'),
              pop === i && 'is-pop'].filter(Boolean).join(' ');
            return (
              <div
                key={`${r}-${i}`}
                className={cls}
                data-i={i}
                role="button"
                tabIndex={checked ? -1 : 0}
                aria-label={`Kotak ${i + 1}${v ? `, berisi ${v}` : ', kosong'}${checked ? (ok ? ', betul' : `, salah, jawapan ${p.a}`) : ''}`}
                style={{ left: `${p.x / R.W * 100}%`, top: `${p.y / R.H * 100}%`, width: `${p.w / R.W * 100}%` }}
                onPointerDown={(e) => { if (v !== undefined) mulaTarik(e, 'slot', v, i); }}
                onClick={() => { if (v === undefined) tapSlot(i); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tapSlot(i); } }}
                onAnimationEnd={() => setPop(null)}
              >
                <span className="tampal-num">{i + 1}</span>
                <span className="tampal-in">
                  {v}
                  {checked && !ok && <span className="tampal-fix">{v ? `Jawapan: ${p.a}` : p.a}</span>}
                </span>
                {checked && <span className="tampal-mark">{ok ? '✓' : '✗'}</span>}
              </div>
            );
          })}
        </div>

        <div className="tampal-side">
          <div className="tampal-tray" onClick={() => { if (selected?.from === 'slot') unplace(selected.i); }}>
            <span className="tampal-lbl">Label</span>
            <div className="tampal-chips">
              {pool.length
                ? pool.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`tampal-tag${selected?.from === 'pool' && selected.t === t ? ' is-sel' : ''}`}
                    disabled={checked}
                    onPointerDown={(e) => mulaTarik(e, 'pool', t)}
                    onClick={(e) => { e.stopPropagation(); if (e.detail === 0) tapPool(t); }}
                  >
                    {t}
                  </button>
                ))
                : <span className="tampal-empty">{checked ? 'Semakan siap.' : 'Semua kotak sudah berisi.'}</span>}
            </div>
          </div>

          {!checked ? (
            <>
              <button className="btn btn--go btn--block" disabled={!penuh} onClick={hantar}>Hantar jawapan</button>
              <p className="tampal-hint">
                {penuh
                  ? 'Semua kotak berisi. Hantar bila dah yakin.'
                  : selected
                    ? 'Sekarang tekan kotak untuk tampal.'
                    : `Tarik label ke kotak, atau tekan label kemudian tekan kotak. Tinggal ${R.pins.length - Object.keys(placed).length} kotak.`}
              </p>
            </>
          ) : (
            <>
              <div className={`verdict ${betulIni === R.pins.length ? 'verdict--right' : 'verdict--wrong'}`}>
                <div className="verdict__head">{betulIni} daripada {R.pins.length} betul</div>
                <div className="verdict__working">
                  {betulIni === R.pins.length ? 'Semua tepat. Hebat!' : 'Tengok jawapan pada kotak merah, kemudian teruskan.'}
                </div>
              </div>
              <button className="btn btn--go btn--block" style={{ marginTop: 12 }} onClick={seterusnya}>
                {r < bab.rounds.length - 1 ? 'Pusingan seterusnya' : 'Lihat keputusan'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tampal;
