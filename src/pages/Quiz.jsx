import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import { isLevelPaid } from '../services/licenceService';
import QuestionVisual from '../components/QuestionVisual';
import BonusTimer from '../components/BonusTimer';
import feedback, { prime } from '../services/feedbackService';

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

// Tempoh bonus, dalam saat, untuk aras Mudah dan Sederhana sahaja. Cabaran
// dan Ultra penuh soalan berayat yang perlu difikir, dan meletakkan jam di
// situ menghasilkan kebimbangan, bukan kelajuan.
//
// Nombor 19 dan 28 dipilih kerana kedua-duanya tarikh nombor 1 dalam sistem
// Chaldean, iaitu nombor nama app ini. Ia juga tempoh yang munasabah untuk
// satu soalan aras rendah.
const BONUS_SECONDS = { 1: 19, 2: 28 };
const BONUS_POINTS = 5;
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
  const [chapterTitle, setChapterTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // Pusingan ulang: soalan yang salah dijawab semula sebelum keputusan keluar.
  // Markah tetap datang dari pusingan pertama, jadi ini mengajar, bukan
  // menaikkan markah.
  const [phase, setPhase] = useState('main');
  const [queue, setQueue] = useState([]);
  const [qPos, setQPos] = useState(0);
  const [rAnswer, setRAnswer] = useState(undefined);
  const [rChecked, setRChecked] = useState(false);

  const [bonusCount, setBonusCount] = useState(0);
  const [gotBonus, setGotBonus] = useState(false);

  const startedAt = useRef(Date.now());
  const questionStart = useRef(Date.now());
  const levelNum = parseInt(level, 10);
  const bonusSeconds = BONUS_SECONDS[levelNum] || 0;

  useEffect(() => {
    if (isLevelPaid(levelNum)) navigate(`/buka?dari=${encodeURIComponent(`/tahun/${tahun}`)}`, { replace: true });
  }, [levelNum, tahun, navigate]);

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

        // Soalan yang salah pada percubaan lepas didahulukan, supaya perkara
        // yang belum difahami dijumpai semula dan bukan terlepas di hujung.
        const previouslyWrong = new Set(
          ps.getLevel(profile.id, tahun, chapterNumber(chapter), levelNum).wrongIds
        );
        if (previouslyWrong.size) {
          picked = [...picked].sort((a, b) => {
            const av = previouslyWrong.has(a.id) ? 0 : 1;
            const bv = previouslyWrong.has(b.id) ? 0 : 1;
            return av - bv;
          });
        }

        if (alive) {
          setQuestions(picked);
          setChapterTitle(chapterData.title || '');
          startedAt.current = Date.now();
          questionStart.current = Date.now();
        }
      } catch (e) {
        if (alive) setError(e.message);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => { alive = false; };
  }, [tahun, chapter, levelNum, profile.id, ps]);

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

  const reviewing = phase === 'review';
  const q = reviewing ? questions[queue[qPos]] : questions[currentIdx];
  const given = reviewing ? rAnswer : answers[currentIdx];
  const isChecked = reviewing ? rChecked : Boolean(checked[currentIdx]);
  const wasRight = isChecked && isAnswerCorrect(q, given);
  const isLast = reviewing ? qPos === queue.length - 1 : currentIdx === questions.length - 1;

  const handlePick = (value) => {
    if (isChecked) return;
    if (reviewing) setRAnswer(value);
    else setAnswers({ ...answers, [currentIdx]: value });
  };

  const handleCheck = () => {
    if (given === undefined || given === null || given === '') return;
    prime();
    const right = isAnswerCorrect(q, given);

    if (reviewing) {
      setRChecked(true);
      if (right) feedback.correct(); else feedback.wrong();
      return;
    }

    const elapsed = (Date.now() - questionStart.current) / 1000;
    const earnedBonus = right && bonusSeconds > 0 && elapsed <= bonusSeconds;

    setChecked({ ...checked, [currentIdx]: true });
    setGotBonus(earnedBonus);

    if (right) {
      const next = combo + 1;
      setCombo(next);
      setMaxCombo(Math.max(maxCombo, next));
      if (earnedBonus) {
        setBonusCount(bonusCount + 1);
        feedback.bonus();
      } else {
        feedback.correct();
      }
    } else {
      setCombo(0);
      feedback.wrong();
    }
  };

  const finish = () => {
    const wrongIds = [];
    const correct = questions.reduce((n, question, idx) => {
      const right = isAnswerCorrect(question, answers[idx]);
      if (!right) wrongIds.push(question.id);
      return n + (right ? 1 : 0);
    }, 0);

    const score = Math.round((correct / questions.length) * 100);
    const seconds = (Date.now() - startedAt.current) / 1000;

    const result = ps.recordQuiz(profile.id, {
      tahun,
      chapter: chapterNumber(chapter),
      chapterTitle,
      level: levelNum,
      score,
      correct,
      total: questions.length,
      seconds,
      combo: maxCombo,
      bonus: bonusCount,
      wrongIds
    });

    navigate(`/results/${tahun}/${chapter}/${levelNum}`, {
      state: {
        score,
        correct,
        total: questions.length,
        combo: maxCombo,
        stars: result.stars,
        starsBefore: result.starsBefore,
        points: result.points,
        streak: result.streak,
        newBadges: result.newBadges
      }
    });
  };

  const handleNext = () => {
    questionStart.current = Date.now();
    setGotBonus(false);

    if (reviewing) {
      if (isLast) { finish(); return; }
      setQPos(qPos + 1);
      setRAnswer(undefined);
      setRChecked(false);
      return;
    }

    if (!isLast) { setCurrentIdx(currentIdx + 1); return; }

    // Habis pusingan utama. Kalau ada yang salah, ulang yang itu dahulu.
    const wrong = questions
      .map((question, idx) => (isAnswerCorrect(question, answers[idx]) ? -1 : idx))
      .filter((idx) => idx >= 0);

    if (!wrong.length) { finish(); return; }

    setQueue(wrong);
    setQPos(0);
    setRAnswer(undefined);
    setRChecked(false);
    setPhase('review');
  };

  const optionClass = (idx) => {
    if (!isChecked) return given === idx ? 'option option--picked' : 'option';
    if (idx === q.correctAnswer) return 'option option--right';
    if (idx === given) return 'option option--wrong';
    return 'option option--dim';
  };

  // Warna sahaja tidak memadai: budak buta warna merah hijau melihat dua
  // petak yang sama. Tanda betul dan silang membawa maklumat yang sama.
  const optionMark = (idx) => {
    if (!isChecked) return null;
    if (idx === q.correctAnswer) return <span className="option__mark" aria-hidden="true">✓</span>;
    if (idx === given) return <span className="option__mark" aria-hidden="true">✕</span>;
    return null;
  };

  const answeredCount = reviewing ? questions.length : Object.keys(checked).length;
  const progress = reviewing ? 100 : Math.round((answeredCount / questions.length) * 100);
  const correctText = q.type === 'mcq' ? q.options[q.correctAnswer] : q.correctAnswer;

  const wrongSoFar = questions.filter(
    (question, idx) => checked[idx] && !isAnswerCorrect(question, answers[idx])
  ).length;

  const nextLabel = () => {
    if (!isLast) return 'Soalan seterusnya';
    if (reviewing || wrongSoFar === 0) return 'Lihat keputusan';
    return `Ulang ${wrongSoFar} soalan yang belum betul`;
  };

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
        <div className="quiz__count">
          {reviewing ? `${qPos + 1}/${queue.length}` : `${currentIdx + 1}/${questions.length}`}
        </div>
      </div>

      <div className="row" style={{ marginBottom: 12, justifyContent: 'space-between' }}>
        <span className="pill pill--quiet">{LEVEL_NAME[levelNum - 1]}</span>
        <div className="row" style={{ gap: 10 }}>
          {reviewing
            ? <span className="pill">Pusingan ulang</span>
            : combo >= 2 && <span className="pill">{combo} betul berturut-turut</span>}
          {!reviewing && bonusSeconds > 0 && (
            <BonusTimer
              key={currentIdx}
              seconds={bonusSeconds}
              running={!isChecked}
              spent={isChecked && !gotBonus}
            />
          )}
        </div>
      </div>

      {reviewing && qPos === 0 && !rChecked && (
        <div className="notice" style={{ marginBottom: 12 }}>
          Cuba sekali lagi soalan yang tadi belum betul. Markah kamu tidak berubah.
        </div>
      )}

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
                {optionMark(idx)}
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
              {gotBonus && <span className="kilat-tag">Kilat, +{BONUS_POINTS} poin</span>}
            </div>
            <div className="verdict__working">{q.working}</div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        {isChecked ? (
          <button className="btn btn--go btn--block" onClick={handleNext}>
            {nextLabel()}
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
