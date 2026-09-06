import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import AnimatedAvatar from '../components/AnimatedAvatar';
import OfflineIndicator from '../components/OfflineIndicator';

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

  const years = useMemo(
    () => YEARS.map((t) => ({ t, ...ps.getClearedCount(profile.id, t, 5, 4) })),
    [profile, ps]
  );

  const totalCleared = years.reduce((n, y) => n + y.done, 0);
  const totalLevels = years.reduce((n, y) => n + y.total, 0);

  // Send the child back to the year they are already working through.
  const inProgress = years.find((y) => y.done > 0 && y.done < y.total);
  const resumeYear = inProgress ? inProgress.t : (totalCleared ? 6 : 1);

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
        onClick={() => navigate(`/tahun/${resumeYear}`)}
      >
        {totalCleared ? `Sambung Tahun ${resumeYear}` : 'Mula belajar Tahun 1'}
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

      <h2 className="section-title">Pilih tahun</h2>
      <div className="years">
        {years.map(({ t, done, total }) => (
          <button key={t} className="year" onClick={() => navigate(`/tahun/${t}`)}>
            <div className="year__n">{t}</div>
            <div className="year__label">Tahun {t}</div>
            <div className="meter">
              <div className="meter__fill" style={{ width: `${(done / total) * 100}%` }} />
            </div>
            <div className="stat__label" style={{ marginTop: 6 }}>{done}/{total} aras</div>
          </button>
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
