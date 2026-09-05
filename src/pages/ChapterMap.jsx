import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';

function ChapterMap({ profile }) {
  const { tahun } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const ps = getProfileService();

  useEffect(() => {
    const loadChapters = async () => {
      try {
        console.log(`[ChapterMap] Loading chapters for tahun: ${tahun}`);
        const url = `/matematik-kilat/data/questions/tahun${tahun}.json`;
        console.log(`[ChapterMap] Fetching from: ${url}`);

        const response = await fetch(url);
        console.log(`[ChapterMap] Response status: ${response.status}`);
        console.log(`[ChapterMap] Response OK: ${response.ok}`);

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text.substring(0, 100)}`);
        }

        const text = await response.text();
        console.log(`[ChapterMap] Response text length: ${text.length}`);
        console.log(`[ChapterMap] First 200 chars:`, text.substring(0, 200));

        const data = JSON.parse(text);
        console.log(`[ChapterMap] Parsed data:`, data);
        console.log(`[ChapterMap] Data chapters:`, data.chapters);

        if (!data || !data.chapters || data.chapters.length === 0) {
          throw new Error(`Invalid data structure: chapters is ${data?.chapters}`);
        }

        setChapters(data.chapters);
      } catch (error) {
        console.error('[ChapterMap] CRITICAL ERROR:', error);
        alert(`Error: ${error.message}`);
        navigate('/hub');
      } finally {
        setLoading(false);
      }
    };
    loadChapters();
  }, [tahun, navigate]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FF6B35 0%, #8338EC 100%)',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>
          Sedang memuatkan bab...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/hub')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ← Kembali
        </button>

        <div className="card card--primary" style={{ marginBottom: '30px' }}>
          <h1 style={{ color: 'white', margin: '0 0 10px 0' }}>Tahun {tahun}</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Pilih bab untuk mula belajar</p>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {chapters.map(chapter => (
            <div key={chapter.id} className="card">
              <h2 style={{ margin: '0 0 15px 0' }}>📚 {chapter.title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
                {['mudah', 'sederhana', 'cabaran', 'ultra'].map((difficulty, idx) => {
                  const levelNum = idx + 1;
                  const labels = ['😊 Mudah', '😌 Sederhana', '🚀 Cabaran', '💎 Ultra'];
                  // Safe chapter number parsing (format: "d1-b1" -> 1)
                  const chapterNum = parseInt(chapter.id?.split('-')[1]) || 1;
                  const progress = ps.getProgressPercentage(profile.id, tahun, chapterNum, levelNum);

                  return (
                    <button
                      key={difficulty}
                      onClick={() => navigate(`/quiz/${tahun}/${chapter.id}/${levelNum}`)}
                      className="btn btn--primary"
                      style={{
                        flexDirection: 'column',
                        height: '100px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div>{labels[idx]}</div>
                      <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>{progress}%</div>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'rgba(255,255,255,0.3)',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          background: 'rgba(255,255,255,0.8)',
                          height: '100%',
                          width: `${progress}%`
                        }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChapterMap;
