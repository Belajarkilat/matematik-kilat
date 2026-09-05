import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import ProgressChart from '../components/ProgressChart';
import AnimatedAvatar from '../components/AnimatedAvatar';
import OfflineIndicator from '../components/OfflineIndicator';

function Hub({ profile }) {
  const navigate = useNavigate();
  const ps = getProfileService();
  const [avatarAnimation, setAvatarAnimation] = useState('idle');

  useEffect(() => {
    // Trigger avatar animation randomly
    const interval = setInterval(() => {
      const animations = ['idle', 'walk', 'bounce'];
      const random = animations[Math.floor(Math.random() * animations.length)];
      setAvatarAnimation(random);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const tahunZones = [
    { tahun: 1, emoji: '😊', label: 'Tahun 1', color: '#FF6B35', bgColor: '#FFE5D8', borderColor: '#FF5A2B' },
    { tahun: 2, emoji: '🎯', label: 'Tahun 2', color: '#FF8C42', bgColor: '#FFD9C0', borderColor: '#FF7D2F' },
    { tahun: 3, emoji: '🚀', label: 'Tahun 3', color: '#FFA500', bgColor: '#FFE4B5', borderColor: '#FF9500' },
    { tahun: 4, emoji: '💪', label: 'Tahun 4', color: '#FF9C42', bgColor: '#FFE4B5', borderColor: '#FF8C2F' },
    { tahun: 5, emoji: '🔥', label: 'Tahun 5', color: '#FF6B9D', bgColor: '#FFD4E5', borderColor: '#FF5A8C' },
    { tahun: 6, emoji: '👑', label: 'Tahun 6', color: '#8338EC', bgColor: '#E8D9FF', borderColor: '#7228C0' }
  ];

  // Calculate stats
  const stats = useMemo(() => {
    let totalAttempted = 0;
    let totalCorrect = 0;
    const allBadges = profile.badges || [];

    for (const key in profile.progress) {
      totalAttempted += profile.progress[key].attempted;
      totalCorrect += profile.progress[key].correct;
    }

    const correctPercentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    return {
      questionsAnswered: totalAttempted,
      highestScore: correctPercentage,
      badgesCount: allBadges.length,
      points: profile.totalPoints || 0
    };
  }, [profile]);

  const handleTahunSelect = (tahun) => {
    navigate(`/tahun/${tahun}`);
  };

  const handleSwitchProfile = () => {
    navigate('/new-profile');
  };

  const handleEditAvatar = () => {
    navigate('/avatar');
  };

  const overallProgress = ps.getOverallProgress(profile.id, profile.level);

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <OfflineIndicator />
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Top Bar with Avatar */}
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setAvatarAnimation(avatarAnimation === 'celebrate' ? 'idle' : 'celebrate')}>
            <AnimatedAvatar profile={profile} animation={avatarAnimation} size={100} />
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginTop: '8px' }}>
              {profile.name}
            </div>
          </div>

          <div>
            <h1 style={{ margin: '0 0 5px 0' }}>Matematik Kilat ⚡</h1>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Selamat belajar, {profile.name}! 👋
            </div>
            {/* Level/Tier Badge based on questions answered */}
            <div style={{
              marginTop: '8px',
              display: 'inline-block',
              background: 'linear-gradient(135deg, #FFD700, #FF9C42)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              color: '#1A1A1A'
            }}>
              Level {Math.min(6, Math.floor(stats.questionsAnswered / 50) + 1)}
              {' '}
              {['🌟', '⭐⭐', '🌟🌟🌟', '👑', '💎', '🏆'][Math.min(5, Math.floor(stats.questionsAnswered / 50))]}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={handleEditAvatar} className="btn btn--ghost" style={{ padding: '8px 12px', fontSize: '0.9rem' }}>
              👤 Avatar
            </button>
            <button onClick={handleSwitchProfile} className="btn btn--ghost" style={{ padding: '8px 12px', fontSize: '0.9rem' }}>
              🔄 Profil
            </button>
            <button onClick={() => navigate('/settings')} className="btn btn--ghost" style={{ padding: '8px 12px', fontSize: '0.9rem' }}>
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Progress Card */}
        <div className="card" style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="eyebrow">Overall Progress</div>
              <h2 style={{ margin: '5px 0 0 0' }}>{overallProgress}%</h2>
            </div>
            <div style={{ fontSize: '3rem' }}>⭐</div>
          </div>
          <div
            style={{
              background: '#E0E0E0',
              height: '20px',
              borderRadius: '10px',
              marginTop: '10px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                background: 'linear-gradient(90deg, #FF6B35, #8338EC)',
                height: '100%',
                width: `${overallProgress}%`,
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Stats Grid - COLORFUL & INTERACTIVE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px', marginBottom: '30px' }}>
          {[
            { emoji: '📝', label: 'Soalan', value: stats.questionsAnswered, color: '#FF6B35', bgColor: '#FFE5D8' },
            { emoji: '⭐', label: 'Markah', value: `${stats.highestScore}%`, color: '#FFD700', bgColor: '#FFFACD' },
            { emoji: '🏅', label: 'Lencana', value: stats.badgesCount, color: '#FF9C42', bgColor: '#FFE4B5' },
            { emoji: '💰', label: 'Poin', value: stats.points, color: '#2ECC71', bgColor: '#D4F8E8' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                textAlign: 'center',
                background: `linear-gradient(135deg, ${stat.bgColor} 0%, ${stat.color}10 100%)`,
                border: `4px solid ${stat.color}`,
                borderRadius: '14px',
                padding: '18px 14px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08) translateY(-5px)';
                e.currentTarget.style.boxShadow = `6px 8px 0px rgba(0,0,0,0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0,0,0,0.15)';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '8px', display: 'inline-block', animation: 'bounce 1.5s ease infinite' }}>
                {stat.emoji}
              </div>
              <div style={{ fontSize: '0.85rem', color: stat.color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {stat.label}
              </div>
              <h3 style={{
                margin: '8px 0 0 0',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: stat.color,
                textShadow: `2px 2px 0px rgba(255,255,255,0.5)`
              }}>
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Progress Chart */}
        <div className="card" style={{ marginBottom: '30px', padding: '20px' }}>
          <ProgressChart profile={profile} />
        </div>

        {/* Badges Section - EXPANDED */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '15px' }}>🏆 Lencana ({profile.badges?.length || 0}/7)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '12px' }}>
            {[
              'perfect-score', 'combo-master', 'speed-demon', 'perfect-week',
              '100-questions', 'all-grades-clear', 'streak-5'
            ].map((badgeId) => {
              const badgeInfo = ps.getAllBadges()[badgeId];
              const isUnlocked = profile.badges?.includes(badgeId);

              if (!badgeInfo) return null;

              return (
                <div
                  key={badgeId}
                  style={{
                    textAlign: 'center',
                    padding: '12px',
                    borderRadius: '12px',
                    background: isUnlocked
                      ? 'linear-gradient(135deg, #F39C12 0%, #F1C40F 100%)'
                      : 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
                    border: '3px solid #1A1A1A',
                    boxShadow: isUnlocked ? '4px 4px 0px rgba(0,0,0,0.3)' : '2px 2px 0px rgba(0,0,0,0.2)',
                    opacity: isUnlocked ? 1 : 0.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  title={badgeInfo.description}
                  onMouseEnter={(e) => {
                    if (isUnlocked) {
                      e.currentTarget.style.transform = 'scale(1.08) rotate(5deg)';
                      e.currentTarget.style.boxShadow = '6px 6px 0px rgba(0,0,0,0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = isUnlocked ? '4px 4px 0px rgba(0,0,0,0.3)' : '2px 2px 0px rgba(0,0,0,0.2)';
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '6px' }}>
                    {badgeInfo.emoji}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: isUnlocked ? '#8B5A00' : '#666',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {badgeInfo.name}
                  </div>
                  {!isUnlocked && (
                    <div style={{
                      fontSize: '0.6rem',
                      color: '#999',
                      marginTop: '4px'
                    }}>
                      🔒
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard Section */}
        <div style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #FFE5D8 0%, #FFD4B5 100%)', padding: '16px', borderRadius: '14px', border: '4px solid #FF6B35' }}>
          <h2 style={{ marginBottom: '15px', textAlign: 'center', color: '#FF6B35' }}>🏆 Papan Mata Teratas (Anda)</h2>
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '12px',
            border: '2px solid #FF6B35'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 2fr 0.8fr 1fr', gap: '12px', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px', paddingBottom: '10px', borderBottom: '2px solid #FF6B35' }}>
              <div>Ranking</div>
              <div>Nama Profile</div>
              <div>Lencana</div>
              <div style={{ textAlign: 'right' }}>Poin</div>
            </div>

            {/* Get sorted profiles by points */}
            {ps.getAllProfiles()
              .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
              .slice(0, 5)
              .map((p, idx) => (
                <div
                  key={p.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '0.4fr 2fr 0.8fr 1fr',
                    gap: '12px',
                    alignItems: 'center',
                    paddingBottom: '8px',
                    marginBottom: '8px',
                    borderBottom: '1px solid #FFE0D0',
                    fontWeight: idx < 3 ? 'bold' : 'normal'
                  }}
                >
                  <div style={{ fontSize: '1.1rem' }}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </div>
                  <div>{p.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    {p.badges?.length || 0}🏆
                  </div>
                  <div style={{ color: '#FF6B35', fontWeight: 'bold', textAlign: 'right' }}>{p.totalPoints || 0}</div>
                </div>
              ))}
          </div>
        </div>

        {/* World Map */}
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🌍 Dunia Matematik Kilat</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {tahunZones.map((zone) => {
            const progress = ps.getOverallProgress(profile.id, zone.tahun);
            return (
              <div
                key={zone.tahun}
                onClick={() => handleTahunSelect(zone.tahun)}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: `linear-gradient(135deg, ${zone.bgColor} 0%, ${zone.color}15 100%)`,
                  border: `5px solid ${zone.borderColor}`,
                  borderRadius: '16px',
                  padding: '20px 16px',
                  transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `6px 6px 0px rgba(0, 0, 0, 0.15)`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.08) rotate(2deg)';
                  e.currentTarget.style.boxShadow = '8px 12px 0px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '6px 6px 0px rgba(0, 0, 0, 0.15)';
                }}
              >
                {/* Shiny overlay effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transition: 'left 0.5s ease'
                }}
                onMouseEnter={(e) => { e.target.style.left = '100%'; }} />

                <div style={{ fontSize: '3.5rem', marginBottom: '10px', animation: 'bounce 1s ease infinite', display: 'inline-block' }}>
                  {zone.emoji}
                </div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 'bold', color: zone.borderColor }}>
                  {zone.label}
                </h3>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    height: '10px',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    marginBottom: '10px',
                    border: '2px solid rgba(0,0,0,0.1)'
                  }}
                >
                  <div
                    style={{
                      background: `linear-gradient(90deg, ${zone.color}, ${zone.borderColor})`,
                      height: '100%',
                      width: `${progress}%`,
                      transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.85rem', color: zone.borderColor, fontWeight: 'bold' }}>
                  {progress}% selesai {progress > 0 ? '✨' : '🎯'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Hub;
