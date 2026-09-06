import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import QuestionVisual from '../components/QuestionVisual';

// Compares a submitted answer against a question's key.
// MCQ answers are option indices. Written answers are compared numerically when
// both sides are numbers, so "15.70", "15.7" and "RM 15.70" all count for a key
// of 15.7; anything else falls back to a whitespace-insensitive text match so
// "3 kg 500 g" and "(3, 4)" still work.
export function isAnswerCorrect(q, given) {
  if (given === undefined || given === null || given === '') return false;
  if (q.type === 'mcq') return given === q.correctAnswer;

  const text = (v) => String(v).trim().toLowerCase().replace(/\s+/g, '');
  const numeric = (v) => {
    const cleaned = String(v).trim().toLowerCase()
      .replace(/^rm/, '')
      .replace(/[\s,]/g, '');
    if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
    return parseFloat(cleaned);
  };

  const a = numeric(given);
  const b = numeric(q.correctAnswer);
  if (a !== null && b !== null) return Math.abs(a - b) < 1e-9;

  return text(given) === text(q.correctAnswer);
}

const LEVEL_NAME = ['Mudah', 'Sederhana', 'Cabaran', 'Ultra'];
const DIFFICULTIES = ['mudah', 'sederhana', 'cabaran'];

function chapterNumber(id) {
  const m = /-b(\d+)$/.exec(id || '');
  return m ? parseInt(m[1], 10) : 1;
}

function Quiz({ profile }) {
  const { tahun, chapter, level } = useParams();
  const navigate = useNavigate();
  const ps = getProfileService();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  const levelNum = parseInt(level, 10);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/matematik-kilat/data/questions/tahun${tahun}.json`);
        if (!res.ok) throw new Error(`Fail soalan tidak dijumpai (${res.status})`);
        const data = await res.json();
        const chapterData = data.chapters[chapterNumber(chapter) - 1];
        if (!chapterData) throw new Error('Bab ini tiada dalam fail soalan');

        const baseDifficulty = levelNum === 4 ? 'cabaran' : DIFFICULTIES[levelNum - 1];
        let picked = chapterData.questions
          .filter((q) => q.difficulty === baseDifficulty)
          .slice(0, 10);

        if (levelNum === 4) {
          picked = picked.map((q) => ({ ...q, difficulty: 'ultra', points: q.points * 5 }));
        }
        if (!picked.length) throw new Error('Aras ini tiada soalan');
        if (alive) setQuestions(picked);
      } catch (e) {
        if (alive) setError(e.message);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => { alive = false; };
  }, [tahun, chapter, levelNum]);

  if (loading) {
    return (
      <div className="page" style={{ display: 'grid', placeItems: 'center', minHeight: '70vh' }}>
        <div className="center">
          <div className="spinner" style={{ margin: '0 auto 16px' }} />
          <div className="on-ink-muted">Menyediakan soalan…</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <button className="back" onClick={() => navigate(`/tahun/${tahun}`)}>← Kembali</button>
        <div className="paper paper--plain center">
          <h2 style={{ marginBottom: 8 }}>Kuiz ini tidak dapat dimulakan</h2>
          <p className="muted" style={{ marginBottom: 16 }}>{error}</p>
          <button className="btn btn--go" onClick={() => navigate(`/tahun/${tahun}`)}>
            Pilih bab lain
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const given = answers[currentIdx];
  const isChecked = Boolean(checked[currentIdx]);
  const wasRight = isChecked && isAnswerCorrect(q, given);
  const isLast = currentIdx === questions.length - 1;
  const answeredCount = Object.keys(checked).length;

  const handlePick = (value) => {
    if (isChecked) return;
    setAnswers({ ...answers, [currentIdx]: value });
  };

  const handleCheck = () => {
    if (given === undefined || given === null || given === '') return;
    const right = isAnswerCorrect(q, given);
    setChecked({ ...checked, [currentIdx]: true });
    if (right) {
      const next = combo + 1;
      setCombo(next);
      setMaxCombo(Math.max(maxCombo, next));
    } else {
      setCombo(0);
    }
  };

  const finish = () => {
    const correct = questions.reduce(
      (n, question, idx) => n + (isAnswerCorrect(question, answers[idx]) ? 1 : 0), 0
    );
    const score = Math.round((correct / questions.length) * 100);
    ps.updateProgress(profile.id, tahun, chapterNumber(chapter), levelNum, '', score >= 50);
    navigate(`/results/${tahun}/${chapter}/${levelNum}`, {
      state: { score, correct, total: questions.length, combo: maxCombo }
    });
  };

  const handleNext = () => (isLast ? finish() : setCurrentIdx(currentIdx + 1));

  const optionClass = (idx) => {
    if (!isChecked) return given === idx ? 'option option--picked' : 'option';
    if (idx === q.correctAnswer) return 'option option--right';
    if (idx === given) return 'option option--wrong';
    return 'option option--dim';
  };

  const progress = Math.round((answeredCount / questions.length) * 100);
  const correctText = q.type === 'mcq' ? q.options[q.correctAnswer] : q.correctAnswer;

  return (
    <div className="page">
      <div className="quiz__bar">
        <button className="back" onClick={() => navigate(`/tahun/${tahun}`)} aria-label="Keluar dari kuiz">
          ← Keluar
        </button>
        <div className="grow">
          <div
            className="meter meter--onInk"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="meter__fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="quiz__count">{currentIdx + 1}/{questions.length}</div>
      </div>

      <div className="row" style={{ marginBottom: 12, justifyContent: 'space-between' }}>
        <span className="pill pill--quiet">{LEVEL_NAME[levelNum - 1]}</span>
        {combo >= 2 && <span className="pill">{combo} betul berturut-turut</span>}
      </div>

      <div className="paper">
        <div className="quiz__question">{q.text}</div>

        <QuestionVisual visual={q.visual} />

        {q.type === 'mcq' && q.options?.length ? (
          <div className="options">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                className={optionClass(idx)}
                onClick={() => handlePick(idx)}
                disabled={isChecked}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <input
            className="answer-input"
            type="text"
            inputMode="decimal"
            value={given ?? ''}
            onChange={(e) => handlePick(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') (isChecked ? handleNext() : handleCheck());
            }}
            disabled={isChecked}
            placeholder="Tulis jawapan"
          />
        )}

        {isChecked && (
          <div className={`verdict ${wasRight ? 'verdict--right' : 'verdict--wrong'} pop`}>
            <div className="verdict__head">
              {wasRight ? 'Betul' : `Belum betul. Jawapannya ${correctText}`}
            </div>
            <div className="verdict__working">{q.working}</div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        {isChecked ? (
          <button className="btn btn--go btn--block" onClick={handleNext}>
            {isLast ? 'Lihat keputusan' : 'Soalan seterusnya'}
          </button>
        ) : (
          <button
            className="btn btn--go btn--block"
            onClick={handleCheck}
            disabled={given === undefined || given === null || given === ''}
          >
            Semak jawapan
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
