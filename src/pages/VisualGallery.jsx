import React, { useEffect, useState } from 'react';
import QuestionVisual from '../components/QuestionVisual';

/**
 * Development-only gallery: renders one example of every visual type found in
 * the question bank, so a change to QuestionVisual can be eyeballed in one
 * screen instead of by playing six quizzes.
 */
function VisualGallery() {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const load = async () => {
      const seen = new Map();
      for (let t = 1; t <= 6; t += 1) {
        const res = await fetch(`/matematik-kilat/data/questions/tahun${t}.json`);
        if (!res.ok) continue;
        const data = await res.json();
        data.chapters.forEach((ch) =>
          ch.questions.forEach((q) => {
            if (!q.visual) return;
            const key =
              q.visual.type + (q.visual.shape ? `-${q.visual.shape}` : '');
            if (!seen.has(key)) seen.set(key, q);
          })
        );
      }
      setSamples([...seen.entries()]);
    };
    load();
  }, []);

  return (
    <div style={{ padding: 20, background: '#6B2D6B', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ fontSize: '1.3rem', marginBottom: 16 }}>
        Galeri visual ({samples.length} jenis)
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 18
        }}
      >
        {samples.map(([key, q]) => (
          <div key={key} style={{ background: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 14 }}>
            <div style={{ fontSize: '0.75rem', opacity: 0.75, marginBottom: 6 }}>{key}</div>
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: '0.9rem' }}>{q.text}</div>
            <QuestionVisual visual={q.visual} />
            <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>
              Jawapan: {q.options ? q.options[q.correctAnswer] : q.correctAnswer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisualGallery;
