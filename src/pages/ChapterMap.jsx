import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import { isLevelPaid } from '../services/licenceService';
import ChapterGlyph, { GLYPH_COLOR } from '../components/ChapterGlyph';
import Stars from '../components/Stars';

const LEVELS = [
  { n: 1, name: 'Mudah' },
  { n: 2, name: 'Sederhana' },
  { n: 3, name: 'Cabaran' },
  { n: 4, name: 'Ultra' }
];

// Chapter ids look like "d3-b2": the chapter number is the digit after the "b".
function chapterNumber(id) {
  const m = /-b(\d+)$/.exec(id || '');
  return m ? parseInt(m[1], 10) : 1;
}

function ChapterMap({ profile }) {
  const { tahun } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ps = getProfileService();

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/matematik-kilat/data/questions/tahun${tahun}.json`);
        if (!res.ok) throw new Error(`Fail soalan tidak dijumpai (${res.status})`);
        const data = await res.json();
        if (!data?.chapters?.length) throw new Error('Fail soalan tiada bab');
        if (alive) setChapters(data.chapters);
      } catch (e) {
        if (alive) setError(e.message);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => { alive = false; };
  }, [tahun]);

  if (loading) {
    return (
      <div className="page" style={{ display: 'grid', placeItems: 'center', minHeight: '70vh' }}>
        <div className="center">
          <div className="spinner" style={{ margin: '0 auto 16px' }} />
          <div className="on-ink-muted">Membuka Tahun {tahun}…</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <button className="back" onClick={() => navigate('/hub')}>← Kembali</button>
        <div className="paper paper--plain center">
          <h2 style={{ marginBottom: 8 }}>Soalan Tahun {tahun} tidak dapat dibuka</h2>
          <p className="muted" style={{ marginBottom: 16 }}>{error}</p>
          <button className="btn btn--go" onClick={() => window.location.reload()}>Cuba lagi</button>
        </div>
      </div>
    );
  }

  const cleared = ps.getClearedCount(profile.id, tahun, chapters.length, LEVELS.length);

  return (
    <div className="page">
      <button className="back" onClick={() => navigate('/hub')}>← Kembali</button>

      <div className="page__head">
        <div className="grow">
          <h1 className="page__title">Tahun {tahun}</h1>
          <div className="page__sub">
            {cleared.done} daripada {cleared.total} aras sudah dikuasai
          </div>
        </div>
        <span className="pill pill--quiet">{chapters.length} bab</span>
      </div>

      <div className="stack">
        {chapters.map((chapter) => {
          const num = chapterNumber(chapter.id);
          const spine = GLYPH_COLOR[chapter.glyph] || GLYPH_COLOR.nombor;

          return (
            <section
              key={chapter.id}
              className="paper paper--plain paper--spine"
              style={{ '--spine': spine }}
            >
              <div className="row" style={{ alignItems: 'flex-start' }}>
                <ChapterGlyph glyph={chapter.glyph} size={40} />
                <div className="grow">
                  <h2 style={{ fontSize: '1.1rem' }}>{chapter.title}</h2>
                  <div className="muted" style={{ fontSize: '0.85rem' }}>
                    {chapter.questions.length} soalan
                  </div>
                </div>
              </div>

              <div className="levels">
                {LEVELS.map(({ n, name }) => {
                  const row = ps.getLevel(profile.id, tahun, num, n);
                  const open = ps.isLevelOpen(profile.id, tahun, num, n);
                  const paid = isLevelPaid(n);
                  const done = row.stars >= 2;
                  const isNext = open && !paid && !done;

                  const cls = paid ? 'level level--paid'
                    : done ? 'level level--done'
                      : !open ? 'level level--locked'
                        : isNext ? 'level level--next' : 'level';

                  const meta = () => {
                    if (paid) return 'Perlu kod';
                    if (!open) return 'Berkunci';
                    if (row.attempts) return `${row.bestScore}%`;
                    return 'Mula';
                  };

                  const label = paid
                    ? `${name}, perlu kod untuk membuka`
                    : !open
                      ? `${name}, berkunci sehingga aras sebelumnya dapat dua bintang`
                      : `${name}, ${row.attempts ? `${row.stars} daripada 3 bintang, markah terbaik ${row.bestScore} peratus` : 'belum dicuba'}`;

                  return (
                    <button
                      key={n}
                      className={cls}
                      disabled={!open && !paid}
                      onClick={() => navigate(paid ? '/buka' : `/quiz/${tahun}/${chapter.id}/${n}`)}
                      aria-label={label}
                    >
                      <span className="level__name">{name}</span>
                      {open && !paid && row.attempts > 0 && (
                        <span className="level__stars"><Stars count={row.stars} size={13} /></span>
                      )}
                      <span className="level__meta">{meta()}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default ChapterMap;
