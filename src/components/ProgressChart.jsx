import React from 'react';

/**
 * Progress Chart Component
 * Visual representation of progress across tahun/chapters
 */

function ProgressChart({ profile }) {
  if (!profile || !profile.progress) {
    return null;
  }

  // Calculate progress by tahun
  const tahunStats = [];
  for (let t = 1; t <= 6; t++) {
    let totalAttempted = 0;
    let totalCorrect = 0;

    for (let c = 1; c <= 5; c++) {
      for (let l = 1; l <= 4; l++) {
        const key = `t${t}_c${c}_l${l}`;
        if (profile.progress[key]) {
          totalAttempted += profile.progress[key].attempted;
          totalCorrect += profile.progress[key].correct;
        }
      }
    }

    const percentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    tahunStats.push({
      tahun: t,
      attempted: totalAttempted,
      correct: totalCorrect,
      percentage
    });
  }

  // Colors for each tahun
  const colors = ['#FF6B35', '#FF8C42', '#FFA500', '#FF9C42', '#FF6B9D', '#8338EC'];

  return (
    <div style={{ width: '100%' }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
        📊 Progress by Tahun
      </h3>

      {/* Bar Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {tahunStats.map((stat, idx) => (
          <div key={stat.tahun} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {/* Bar Container */}
            <div
              style={{
                width: '100%',
                height: '120px',
                background: 'rgba(0,0,0,0.1)',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid #DDD'
              }}
            >
              {/* Filled Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${stat.percentage}%`,
                  background: `linear-gradient(180deg, ${colors[idx]}, ${colors[idx]}dd)`,
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '4px'
                }}
              >
                {stat.percentage > 20 && (
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    {stat.percentage}%
                  </span>
                )}
              </div>

              {/* Percentage Text (on bar if small) */}
              {stat.percentage <= 20 && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#333',
                  fontWeight: 'bold',
                  fontSize: '0.85rem'
                }}>
                  {stat.percentage}%
                </div>
              )}
            </div>

            {/* Label */}
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>T{stat.tahun}</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {stat.attempted === 0 ? '---' : `${stat.correct}/${stat.attempted}`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        padding: '15px',
        background: 'rgba(0,0,0,0.05)',
        borderRadius: '8px'
      }}>
        {(() => {
          let totalAttempted = 0;
          let totalCorrect = 0;
          tahunStats.forEach(stat => {
            totalAttempted += stat.attempted;
            totalCorrect += stat.correct;
          });

          const overallPercentage = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

          return (
            <>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>Total</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF6B35' }}>
                  {totalAttempted}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>Correct</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4CAF50' }}>
                  {totalCorrect}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>Average</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8338EC' }}>
                  {overallPercentage}%
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}

export default ProgressChart;
