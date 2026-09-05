import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';

function Quiz({ profile }) {
  const { tahun, chapter, level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(true);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  const ps = getProfileService();

  // Load questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const url = `/matematik-kilat/data/questions/tahun${tahun}.json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load');

        const data = await response.json();
        const chapterNum = parseInt(chapter.split('-')[1].substring(1));
        const chapterData = data.chapters[chapterNum - 1];
        const levelNum = parseInt(level);

        const difficulties = ['mudah', 'sederhana', 'cabaran'];
        const baseDifficulty = levelNum === 4 ? 'cabaran' : difficulties[levelNum - 1];

        let levelQuestions = chapterData.questions
          .filter(q => q.difficulty === baseDifficulty)
          .slice(0, 10);

        if (levelNum === 4) {
          levelQuestions = levelQuestions.map(q => ({
            ...q,
            difficulty: 'ultra',
            points: q.points * 5
          }));
        }

        setQuestions(levelQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        alert('Error loading questions');
        navigate('/hub');
      }
    };
    loadQuestions();
  }, [tahun, chapter, level, navigate]);

  if (loading || !questions.length) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'white', background: 'linear-gradient(135deg, #FF6B35 0%, #8338EC 100%)', minHeight: '100vh' }}>Loading questions...</div>;
  }

  const q = questions[currentIdx];
  const isAnswered = submitted[currentIdx];
  const feedbackType = feedback[currentIdx];

  const handleAnswer = (value) => {
    if (!isAnswered) {
      setAnswers({ ...answers, [currentIdx]: value });
    }
  };

  const handleSubmit = () => {
    if (answers[currentIdx] === undefined && answers[currentIdx] !== 0) return;

    let isCorrect = false;
    if (q.type === 'mcq') {
      isCorrect = answers[currentIdx] === q.correctAnswer;
    } else {
      isCorrect = parseInt(answers[currentIdx]) === q.correctAnswer;
    }

    setSubmitted({ ...submitted, [currentIdx]: true });
    setFeedback({ ...feedback, [currentIdx]: isCorrect ? 'correct' : 'wrong' });

    if (isCorrect) {
      setCombo(combo + 1);
      if (combo + 1 > maxCombo) setMaxCombo(combo + 1);
    } else {
      setCombo(0);
    }

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
        setAnswers({});
        setSubmitted({});
        setFeedback({});
      } else {
        handleFinish();
      }
    }, 1000);
  };

  const handleFinish = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (q.type === 'mcq') {
        if (answers[idx] === q.correctAnswer) correct++;
      } else {
        if (parseInt(answers[idx]) === q.correctAnswer) correct++;
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);
    const chapterNum = parseInt(chapter.split('-')[1].substring(1));
    ps.updateProgress(profile.id, tahun, chapterNum, parseInt(level), '', finalScore >= 50);

    navigate('/results', {
      state: { score: finalScore, correct, total: questions.length, combo: maxCombo }
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #FF6B35 0%, #8338EC 100%)',
      color: 'white'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ marginBottom: '30px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
          Question {currentIdx + 1} / {questions.length}
        </div>

        {/* Question Card */}
        <div style={{
          background: 'rgba(0,0,0,0.2)',
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '30px',
          border: '3px solid rgba(255,255,255,0.3)'
        }}>
          {/* QUESTION TEXT */}
          <div style={{
            fontSize: '1.6rem',
            fontWeight: 'bold',
            marginBottom: '30px',
            lineHeight: '1.8',
            color: '#FFFFFF',
            textAlign: 'center'
          }}>
            {q.text}
          </div>

          {/* Answers */}
          {q.type === 'mcq' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {q.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  style={{
                    padding: '15px',
                    fontSize: '1.1rem',
                    background: isAnswered
                      ? (idx === q.correctAnswer ? '#2ECC71' : idx === answers[currentIdx] ? '#E74C3C' : 'rgba(255,255,255,0.05)')
                      : (answers[currentIdx] === idx ? '#FFD700' : 'rgba(255,255,255,0.2)'),
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '10px',
                    cursor: isAnswered ? 'default' : 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={answers[currentIdx] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                disabled={isAnswered}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '1.1rem',
                  borderRadius: '10px',
                  border: '2px solid #FFD700',
                  marginBottom: '10px',
                  boxSizing: 'border-box'
                }}
                placeholder="Type your answer"
              />
            </div>
          )}

          {/* Feedback */}
          {isAnswered && (
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '1.4rem', fontWeight: 'bold' }}>
              {feedbackType === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
            </div>
          )}
        </div>

        {/* Action Button */}
        {!isAnswered && (
          <button
            onClick={handleSubmit}
            disabled={answers[currentIdx] === undefined && answers[currentIdx] !== 0}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.3rem',
              background: '#FFD700',
              color: '#333',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: answers[currentIdx] === undefined && answers[currentIdx] !== 0 ? 0.5 : 1
            }}
          >
            Submit Answer
          </button>
        )}

        {isAnswered && (
          <button
            onClick={() => {
              if (currentIdx < questions.length - 1) {
                setCurrentIdx(currentIdx + 1);
              } else {
                handleFinish();
              }
            }}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.3rem',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {currentIdx === questions.length - 1 ? '🏁 Finish Quiz' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
