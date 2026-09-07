import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import AnimatedAvatar from '../components/AnimatedAvatar';
import OfflineIndicator from '../components/OfflineIndicator';
import ChapterGlyph from '../components/ChapterGlyph';
import { SUBJECTS } from '../services/subjectService';

const YEARS = [1, 2, 3, 4, 5, 6];

function Hub({ profile }) {
  const navigate = useNavigate();
  const ps = getProfileService();
  const [avatarAnimation, setAvatarAnimation] = useState('idle');

  useEffect(() => {
    const id = setInterval(() => {
      const moves = ['idle', 'walk', 'bounce'];
      setAvatarAnimation(moves[Math.floor(Math.random() * moves.length)]);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // App memegang salinan profil, jadi nombor seperti poin dan jumlah soalan
  // pada salinan itu tidak berubah selepas satu kuiz direkodkan. Baca terus
  // dari perkhidmatan supaya papan pemuka sentiasa menunjukkan yang terkini.
  const live = ps.getProfile(profile.id) || profile;

  const stats = useMemo(() => ({
    stars: ps.getTotalStars(live.id),
    questions: live.totalQuestions || 0,
    badges: (live.badges || []).length,
    points: live.totalPoints || 0
  }), [live, ps]);

  const streak = ps.getStreak(profile.id);

  // Setiap subjek dikira berasingan, kerana budak yang kuat Matematik dan
  // belum menyentuh Sains perlu nampak kedua-dua fakta itu, bukan satu
  // nombor bercampur yang tidak bermakna.
  const subjects = useMemo(() => SUBJECTS.map((sub) => {
    const years = YEARS.map((t) => ({ t, ...ps.getClearedCount(profile.id, sub.id, t, 5, 4) }));
    const done = years.reduce((n, y) => n + y.done, 0);
    const total = years.reduce((n, y) => n + y.total, 0);
    const inProgress = years.find((y) => y.done > 0 && y.done < y.total);
    return { ...sub, years, done, total, resumeYear: inProgress ? inProgress.t : (done ? 6 : 1) };
  }), [profile, ps]);

  const totalCleared = subjects.filter((s) => s.ready).reduce((n, s) => n + s.done, 0);
  const totalLevels = subjects.filter((s) => s.ready).reduce((n, s) => n + s.total, 0);

  // Sambung subjek yang sedang dikerjakan; kalau belum ada, mula dengan yang
  // pertama dalam senarai.
  const ready = subjects.filter((s) => s.ready);
  const resume = ready.find((s) => s.done > 0 && s.done < s.total) || ready[0] || subjects[0];

  const allBadges = ps.getAllBadges();
  const earned = (live.badges || []).map((id) => allBadges[id]).filter(Boolean);

  return (
    <div className="page">
      <OfflineIndicator />

      <div className="page__head">
        <button
          onClick={() => navigate('/avatar')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label="Ubah avatar"
        >
          <AnimatedAvatar profile={profile} animation={avatarAnimation} size={56} />
        </button>
        <div className="grow">
          <h1 className="page__title">Hai, {profile.name}</h1>
          <div className="page__sub">
            {totalCleared} daripada {totalLevels} aras dikuasai
          </div>
        </div>
        <button className="btn btn--quiet btn--small" onClick={() => navigate('/settings')}>
          Tetapan
        </button>
      </div>

      <button
        className="btn btn--go btn--block"
        style={{ fontSize: '1.15rem', minHeight: 64 }}
        onClick={() => navigate(`/${resume.id}/tahun/${resume.resumeYear}`)}
      >
        {resume.done
          ? `Sambung ${resume.name} Tahun ${resume.resumeYear}`
          : `Mula belajar ${resume.name} Tahun 1`}
      </button>

      {/* Rentetan harian ialah sebab budak kembali esok, jadi ia duduk tinggi
          dan bukan tersembunyi antara statistik di bawah. */}
      <div className={streak.playedToday ? 'streak streak--on' : 'streak'}>
        <span className="streak__flame" aria-hidden="true">{streak.days > 0 ? '🔥' : '⭐'}</span>
        <div className="grow">
          <div className="streak__num">
            {streak.days > 0 ? `${streak.days} hari berturut-turut` : 'Mula rentetan kamu'}
          </div>
          <div className="streak__note">
            {streak.playedToday
              ? 'Sudah belajar hari ini. Jumpa lagi esok.'
              : 'Habiskan satu aras hari ini untuk menambah sehari.'}
          </div>
        </div>
        {streak.best > 0 && (
          <div className="streak__best">
            <div className="streak__bestNum">{streak.best}</div>
            <div className="streak__bestLabel">terbaik</div>
          </div>
        )}
      </div>

      <h2 className="section-title">Pilih subjek</h2>
      <div className="subjects">
        {subjects.map((sub) => (
          <div key={sub.id} className="subject">
            <div className="subject__head">
              <span className="subject__mark">
                <ChapterGlyph glyph={sub.glyph} size={30} />
              </span>
              <div className="grow">
                <div className="subject__name">{sub.name}</div>
                <div className="subject__note">
                  {sub.ready ? `${sub.done}/${sub.total} aras dikuasai` : 'Soalan sedang ditulis'}
                </div>
              </div>
              {!sub.ready && <span className="pill pill--quiet">Akan datang</span>}
            </div>
            {sub.ready && (
            <div className="years">
              {sub.years.map(({ t, done, total }) => (
                <button
                  key={t}
                  className="year"
                  onClick={() => navigate(`/${sub.id}/tahun/${t}`)}
                >
                  <div className="year__n">{t}</div>
                  <div className="year__label">Tahun {t}</div>
                  <div className="meter">
                    <div className="meter__fill" style={{ width: `${(done / total) * 100}%` }} />
                  </div>
                  <div className="stat__label" style={{ marginTop: 6 }}>{done}/{total} aras</div>
                </button>
              ))}
            </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="section-title">Kemajuan kamu</h2>
      <div className="stats">
        <div className="stat">
          <div className="stat__num">{stats.stars}</div>
          <div className="stat__label">Bintang</div>
        </div>
        <div className="stat">
          <div className="stat__num">{stats.questions}</div>
          <div className="stat__label">Soalan dijawab</div>
        </div>
        <div className="stat">
          <div className="stat__num">{stats.badges}</div>
          <div className="stat__label">Lencana</div>
        </div>
        <div className="stat">
          <div className="stat__num">{stats.points}</div>
          <div className="stat__label">Poin</div>
        </div>
      </div>

      <h2 className="section-title">Lencana</h2>
      <div className="paper paper--plain">
        {earned.length ? (
          <div className="badges">
            {earned.map((b, i) => (
              <div key={i} className="badge">
                <span className="badge__emoji">{b.emoji}</span>
                <div>
                  <div className="badge__name">{b.name}</div>
                  <div className="badge__note">{b.description}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">
            Habiskan satu aras untuk mendapat lencana pertama kamu.
          </p>
        )}
      </div>

      <div className="row" style={{ marginTop: 24, gap: 10, flexWrap: 'wrap' }}>
        <button className="btn btn--quiet btn--small grow" onClick={() => navigate('/avatar')}>
          Ubah avatar
        </button>
        <button className="btn btn--quiet btn--small grow" onClick={() => navigate('/laporan')}>
          Laporan ibu bapa
        </button>
        <button className="btn btn--quiet btn--small grow" onClick={() => navigate('/new-profile')}>
          Tukar profil
        </button>
      </div>
    </div>
  );
}

export default Hub;
