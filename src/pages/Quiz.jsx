import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import { getSettingsService } from '../services/settingsService';

function Quiz({ profile }) {
  const { tahun, chapter, level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState({});
  const [feedback, setFeedback] = useState({}); // { idx: 'correct'|'wrong' }
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [revealedHint, setRevealedHint] = useState({});
  const [showWorking, setShowWorking] = useState({});
  const audioContextRef = useRef(null);
  const ps = getProfileService();
  const ss = getSettingsService();

  // Initialize audio context once
  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('AudioContext not available:', e);
    }
  }, []);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        console.log(`[Quiz] Loading questions for tahun: ${tahun}, chapter: ${chapter}, level: ${level}`);
        const url = `/matematik-kilat/data/questions/tahun${tahun}.json`;
        console.log(`[Quiz] Fetching from: ${url}`);

        const response = await fetch(url);
        console.log(`[Quiz] Response status: ${response.status}`);
        console.log(`[Quiz] Response OK: ${response.ok}`);

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text.substring(0, 100)}`);
        }

        const text = await response.text();
        console.log(`[Quiz] Response text length: ${text.length}`);
        console.log(`[Quiz] First 200 chars:`, text.substring(0, 200));

        const data = JSON.parse(text);
        console.log(`[Quiz] Parsed data:`, data);
        console.log(`[Quiz] Data chapters count: ${data?.chapters?.length}`);

        if (!data || !data.chapters || data.chapters.length === 0) {
          throw new Error(`Invalid data structure: chapters is ${data?.chapters}`);
        }

        // Parse chapter ID format: "d1-b1" -> extract "1" from "b1"
        const chapterPart = chapter.split('-')[1]; // "b1"
        const chapterNum = parseInt(chapterPart.substring(1)); // "1" -> 1
        console.log(`[Quiz] Chapter ID: ${chapter}, parsed to chapterNum: ${chapterNum}`);

        if (!chapterNum || isNaN(chapterNum) || chapterNum < 1 || chapterNum > data.chapters.length) {
          throw new Error(`Invalid chapter number: ${chapterNum} (from ID: ${chapter})`);
        }

        const chapterData = data.chapters[chapterNum - 1];
        const levelNum = parseInt(level);

        console.log(`[Quiz] Chapter data:`, chapterData);
        console.log(`[Quiz] Chapter data type:`, typeof chapterData);
        console.log(`[Quiz] Questions in chapter:`, chapterData?.questions?.length);

        if (!chapterData) {
          throw new Error(`Chapter data not found at index ${chapterNum - 1}`);
        }

        if (!Array.isArray(chapterData.questions)) {
          console.error(`[Quiz] chapterData.questions is not an array:`, chapterData.questions);
          throw new Error(`Chapter questions is not an array: ${typeof chapterData.questions}`);
        }

        // Handle Ultra difficulty (reuse Cabaran with 5x multiplier)
        const levelDifficulties = ['mudah', 'sederhana', 'cabaran'];
        const baseDifficulty = levelNum === 4 ? 'cabaran' : levelDifficulties[levelNum - 1];

        let levelQuestions = chapterData.questions
          .filter(q => q.difficulty === baseDifficulty)
          .slice(0, 10);

        console.log(`[Quiz] Filtered questions for level ${levelNum}:`, levelQuestions.length);

        // Mark Ultra questions with higher difficulty for scoring
        if (levelNum === 4) {
          levelQuestions = levelQuestions.map(q => ({
            ...q,
            difficulty: 'ultra',
            points: q.points * 5 // 5x points for ultra
          }));
        }

        console.log(`[Quiz] Final questions set:`, levelQuestions.length);
        setQuestions(levelQuestions);
        // Initialize hints from settings
        setHintsRemaining(ss.getSettings().hintsPerQuiz);
        setLoading(false);
      } catch (error) {
        console.error('[Quiz] CRITICAL ERROR:', error);
        alert(`Quiz Error: ${error.message}`);
        navigate('/hub');
      }
    };
    loadQuestions();
  }, [tahun, chapter, level, navigate]);

  const playSound = (type = 'click') => {
    const settings = ss.getSettings();
    if (!audioContextRef.current || !settings.soundEnabled) return;

    try {
      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      const volumeLevel = settings.volume / 100;

      if (type === 'correct') {
        oscillator.frequency.value = 800;
        gain.gain.setValueAtTime(volumeLevel * 0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      } else if (type === 'wrong') {
        oscillator.frequency.value = 400;
        gain.gain.setValueAtTime(volumeLevel * 0.2, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
      }
    } catch (e) {
      console.warn('Sound playback failed:', e);
    }
  };

  const handleSubmitAnswer = () => {
    if (answers[currentIdx] === undefined && answers[currentIdx] !== 0) return;

    const q = questions[currentIdx];
    let isCorrect = false;

    if (q.type === 'mcq') {
      isCorrect = answers[currentIdx] === q.correctAnswer;
    } else {
      // Input type - compare as numbers with validation
      const inputValue = parseInt(answers[currentIdx]);
      if (isNaN(inputValue)) {
        // Invalid input - mark as wrong
        isCorrect = false;
      } else {
        isCorrect = inputValue === q.correctAnswer;
      }
    }

    setSubmitted({ ...submitted, [currentIdx]: true });
    setFeedback({ ...feedback, [currentIdx]: isCorrect ? 'correct' : 'wrong' });

    if (isCorrect) {
      playSound('correct');
      setCombo(combo + 1);
      if (combo + 1 > maxCombo) setMaxCombo(combo + 1);
    } else {
      playSound('wrong');
      setCombo(0);
    }

    // Auto advance after 800ms
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        handleFinish();
      }
    }, 800);
  };

  const handleAnswer = (value) => {
    if (!submitted[currentIdx]) {
      setAnswers({ ...answers, [currentIdx]: value });
    }
  };

  const handleNext = () => {
    if (!submitted[currentIdx]) {
      handleSubmitAnswer();
    } else if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (q.type === 'mcq') {
        if (answers[idx] === q.correctAnswer) {
          correct++;
        }
      } else {
        if (parseInt(answers[idx]) === q.correctAnswer) {
          correct++;
        }
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);

    // Update progress
    const chapterNum = parseInt(chapter.split('-')[1]);
    ps.updateProgress(profile.id, tahun, chapterNum, parseInt(level), '', finalScore >= 50);

    // Unlock badges
    const unlockedBadges = [];
    if (finalScore === 100) {
      ps.unlockBadge(profile.id, 'perfect-score');
      unlockedBadges.push('perfect-score');
    }
    if (maxCombo >= 5) {
      ps.unlockBadge(profile.id, 'combo-master');
      unlockedBadges.push('combo-master');
    }
    if (maxCombo >= 3) {
      ps.unlockBadge(profile.id, 'streak-5');
    }

    // Check for other badges
    const newBadges = ps.checkAndUnlockBadges(profile.id);
    unlockedBadges.push(...newBadges);

    // Calculate points with difficulty multiplier
    const difficultyMultiplier = { mudah: 1, sederhana: 2, cabaran: 3, ultra: 5 }[q.difficulty] || 1;
    const basePoints = correct * 10 * difficultyMultiplier;
    const comboBonus = maxCombo > 0 ? maxCombo * 5 : 0;
    ps.addPoints(profile.id, basePoints + comboBonus);

    setTimeout(() => {
      navigate(`/results/${tahun}/${chapter}/${level}`, {
        state: { score: finalScore, correct, total: questions.length, combo: maxCombo }
      });
    }, 500);
  };

  const handleUseHint = () => {
    if (hintsRemaining <= 0 || submitted[currentIdx]) return;

    const q = questions[currentIdx];
    let hint = '';

    if (q.type === 'mcq') {
      // For MCQ, show the letter of the correct answer
      const correctLetterIndex = q.correctAnswer;
      const letters = ['A', 'B', 'C', 'D'];
      hint = `Jawaban betul ay option ${letters[correctLetterIndex]}`;
    } else {
      // For input type, give a range or category hint
      const correctAnswer = q.correctAnswer;
      const range = Math.ceil(correctAnswer * 0.1);
      hint = `Ang sagot ay nasa ${correctAnswer - range} hanggang ${correctAnswer + range}`;
    }

    setRevealedHint({ ...revealedHint, [currentIdx]: hint });
    setHintsRemaining(hintsRemaining - 1);
  };

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
          Sedang memuatkan soalan...
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const difficultyLabels = { mudah: '😊 Mudah', sederhana: '😌 Sederhana', cabaran: '🚀 Cabaran' };
  const isAnswered = submitted[currentIdx];
  const feedbackType = feedback[currentIdx];

  // Render mini avatar (top corner)
  const MiniAvatar = () => {
    const gender = profile.avatar?.gender || 'neutral';
    const skinColor = profile.avatar?.skinColor || '#f4c4a0';
    const hairColor = profile.avatar?.hairColor || '#8B4513';
    const outfitColor = profile.avatar?.outfitColor || '#FF6B35';

    return (
      <svg viewBox="0 0 60 90" style={{ width: '50px', height: '75px' }}>
        {/* Head */}
        <circle cx="30" cy="24" r="15" fill={skinColor} stroke="#1A1A1A" strokeWidth="1.5" />
        {/* Hair */}
        {gender === 'girl' ? (
          <path d="M 15 24 Q 15 8, 30 10 Q 45 8, 45 24 Q 45 32, 30 40 Q 15 32, 15 24 Z" fill={hairColor} stroke="#1A1A1A" strokeWidth="1.5" />
        ) : (
          <path d="M 15 24 Q 15 8, 30 10 Q 45 8, 45 24" fill={hairColor} stroke="#1A1A1A" strokeWidth="1.5" />
        )}
        {/* Eyes */}
        <circle cx="24" cy="21" r="2" fill="#1A1A1A" />
        <circle cx="36" cy="21" r="2" fill="#1A1A1A" />
        {/* Smile */}
        <path d="M 24 28 Q 30 31, 36 28" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
        {/* Body */}
        <rect x="21" y="40" width="18" height="20" fill={outfitColor} stroke="#1A1A1A" strokeWidth="1.5" rx="3" />
        {/* Legs */}
        <line x1="27" y1="60" x2="27" y2="80" stroke="#1A1A1A" strokeWidth="2" />
        <line x1="33" y1="60" x2="33" y2="80" stroke="#1A1A1A" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: 'linear-gradient(135deg, #FF6B35 0%, #8338EC 100%)' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
        {/* Avatar in top-right corner */}
        <div style={{
          position: 'absolute',
          top: -10,
          right: 0,
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '12px',
          padding: '8px',
          border: '3px solid white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <MiniAvatar />
        </div>
        {/* Combo Counter - BIGGER & BOLDER */}
        {combo > 0 && (
          <div style={{
            textAlign: 'center',
            fontSize: combo > 3 ? '3rem' : '2.5rem',
            marginBottom: '15px',
            animation: 'pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            color: '#FFD700',
            textShadow: '0 0 20px rgba(255,215,0,1), 0 0 40px rgba(255,107,53,0.6)',
            fontWeight: 'bold',
            letterSpacing: '2px'
          }}>
            {'🔥'.repeat(Math.min(combo, 5))} COMBO {combo}! {'🔥'.repeat(Math.min(combo, 5))}
          </div>
        )}

        {/* Progress Bar */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>{difficultyLabels[q.difficulty]}</span>
            <span style={{ fontWeight: 'bold' }}>{currentIdx + 1}/{questions.length}</span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              background: '#FFC93C',
              height: '100%',
              width: `${((currentIdx + 1) / questions.length) * 100}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Question Card with Feedback */}
        <div
          className="card card--primary"
          style={{
            marginBottom: '20px',
            color: 'white',
            background: isAnswered
              ? (feedbackType === 'correct'
                ? 'linear-gradient(160deg, #2ECC71 0%, #27AE60 100%)'
                : 'linear-gradient(160deg, #E74C3C 0%, #C0392B 100%)')
              : 'linear-gradient(160deg, rgba(255,107,53,0.8) 0%, rgba(131,56,236,0.8) 100%)',
            transition: 'all 0.3s ease',
            border: isAnswered ? '4px solid white' : '4px solid rgba(255,255,255,0.5)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', flex: 1 }}>{q.q}</h2>
            {isAnswered && (
              <div style={{ fontSize: '2rem', marginLeft: '10px' }}>
                {feedbackType === 'correct' ? '✓' : '✗'}
              </div>
            )}
          </div>

          {q.type === 'mcq' ? (
            <div style={{ display: 'grid', gap: '12px' }}>
              {q.options.map((choice, idx) => {
                const buttonColors = ['#FF6B35', '#3498DB', '#2ECC71', '#F39C12'];
                const btnColor = buttonColors[idx % buttonColors.length];
                const isSelected = answers[currentIdx] === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={isAnswered}
                    className="btn"
                    style={{
                      justifyContent: 'flex-start',
                      background:
                        isAnswered
                          ? (idx === q.correctAnswer
                            ? `linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)`
                            : idx === answers[currentIdx] ? `linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)` : 'rgba(255,255,255,0.1)')
                          : (isSelected ? `linear-gradient(135deg, ${btnColor} 0%, ${btnColor}dd 100%)` : `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)`),
                      color: 'white',
                      border: isSelected && !isAnswered ? `3px solid white` : `2px solid rgba(255,255,255,0.5)`,
                      opacity: isAnswered && idx !== q.correctAnswer && idx !== answers[currentIdx] ? 0.4 : 1,
                      cursor: isAnswered ? 'default' : 'pointer',
                      transform: isSelected && !isAnswered ? 'scale(1.02)' : 'scale(1)',
                      fontSize: '1rem',
                      fontWeight: isSelected ? '700' : '600',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (!isAnswered) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = isSelected ? 'scale(1.02)' : 'scale(1)';
                    }}
                  >
                    <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {choice}
                    {isAnswered && idx === q.correctAnswer && (
                      <span style={{ marginLeft: 'auto', fontSize: '1.5rem' }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              type="number"
              value={answers[currentIdx] || ''}
              onChange={(e) => handleAnswer(parseInt(e.target.value) || 0)}
              disabled={isAnswered}
              placeholder="Masukkan jawapan"
              style={{
                padding: '12px',
                fontSize: '1rem',
                border: '2px solid white',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.9)',
                color: '#1A1A1A',
                cursor: isAnswered ? 'default' : 'text'
              }}
            />
          )}
        </div>

        {/* Hint Section */}
        {revealedHint[currentIdx] && (
          <div style={{
            background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)',
            color: 'white',
            padding: '12px 15px',
            borderRadius: '12px',
            marginBottom: '15px',
            border: '3px solid #D68910',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
            fontSize: '0.95rem',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            💡 {revealedHint[currentIdx]}
          </div>
        )}

        {/* Hints Remaining */}
        <div style={{
          textAlign: 'center',
          marginBottom: '15px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          color: '#666'
        }}>
          💡 Hints Remaining: {hintsRemaining}
        </div>

        {/* Working/Solution Section */}
        {isAnswered && feedbackType === 'wrong' && q.working && (
          <div style={{
            background: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)',
            color: 'white',
            padding: '15px',
            borderRadius: '12px',
            marginBottom: '15px',
            border: '3px solid #1F618D',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.2)'
          }}>
            {!showWorking[currentIdx] ? (
              <button
                onClick={() => setShowWorking({ ...showWorking, [currentIdx]: true })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  border: '2px solid white',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                📖 Tunjuk Jalan Kerja
              </button>
            ) : (
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '0.95rem' }}>
                  📖 Jalan Kerja:
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {q.working}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: hintsRemaining > 0 && !revealedHint[currentIdx] && !isAnswered ? '1fr 1fr 1fr' : '1fr 1fr', gap: '10px' }}>
          <button
            onClick={() => currentIdx > 0 ? setCurrentIdx(currentIdx - 1) : null}
            className="btn btn--ghost"
            disabled={currentIdx === 0 || isAnswered}
          >
            ← Kembali
          </button>
          {hintsRemaining > 0 && !revealedHint[currentIdx] && !isAnswered && (
            <button
              onClick={handleUseHint}
              className="btn btn--ghost"
              style={{ background: 'rgba(243, 156, 18, 0.2)', color: '#F39C12', border: '2px solid #F39C12' }}
            >
              💡 Hint ({hintsRemaining})
            </button>
          )}
          <button
            onClick={handleNext}
            className="btn btn--primary"
            disabled={answers[currentIdx] === undefined && !isAnswered}
          >
            {isAnswered
              ? (currentIdx === questions.length - 1 ? 'Selesai ✓' : 'Seterusnya →')
              : 'Hantar Jawapan'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
