import { useState, useMemo } from 'react';
import { Shuffle, CheckCircle } from 'lucide-react';

export default function InterviewSection({ questions }) {
  const [activeTab, setActiveTab] = useState('hr');
  const [randomIndex, setRandomIndex] = useState(null);
  const [shownAnswers, setShownAnswers] = useState({});

  const tabs = [
    { id: 'hr', label: 'HR Questions' },
    { id: 'technical', label: 'Technical' },
    { id: 'scenario', label: 'Scenario' },
  ];

  const filtered = useMemo(() => {
    if (!questions) return [];
    return questions.filter(q => q.type === activeTab);
  }, [questions, activeTab]);

  const getRandom = () => {
    if (filtered.length === 0) return;
    const idx = Math.floor(Math.random() * filtered.length);
    setRandomIndex(idx);
    setShownAnswers({});
  };

  const toggleAnswer = (idx) => {
    setShownAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!questions || questions.length === 0) {
    return (
      <div>
        <h1 className="section-title">Interview Preparation</h1>
        <p className="section-subtitle">التحضير للمقابلات الشخصية والتقنية</p>
        <div className="highlight-box">Interview content being expanded.</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">Interview Preparation</h1>
      <p className="section-subtitle">أسئلة متوقعة مع نماذج إجابات - درجات صعوبة متنوعة</p>

      <div className="interview-toolbar">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab.id); setRandomIndex(null); setShownAnswers({}); }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button className="btn btn-ghost" onClick={getRandom}>
          <Shuffle size={16} />
          Random Question
        </button>
      </div>

      <div className="interview-list">
        {(randomIndex !== null ? [filtered[randomIndex]] : filtered).map((q, idx) => {
          const realIdx = randomIndex !== null ? idx : idx;
          return (
            <div key={realIdx} className="interview-item">
              <div className="interview-q">
                <div className="interview-q-header">
                  <span className="interview-q-text">{q.q}</span>
                  {q.difficulty && (
                    <span className={`difficulty ${q.difficulty}`}>{q.difficulty}</span>
                  )}
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => toggleAnswer(realIdx)}
                >
                  {shownAnswers[realIdx] ? 'Hide Answer' : 'Show Answer'}
                </button>
              </div>
              {shownAnswers[realIdx] && (
                <div className="interview-a">
                  <div className="interview-a-label">
                    <CheckCircle size={14} />
                    Model Answer
                  </div>
                  <p>{q.a}</p>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="glossary-empty">No questions in this category yet.</div>
        )}
      </div>

      <style>{`
        .interview-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: 24px; flex-wrap: wrap;
        }
        .interview-list { display: flex; flex-direction: column; gap: 8px; }
        .interview-item {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-sm); overflow: hidden;
        }
        .interview-q {
          padding: 16px 20px; display: flex; justify-content: space-between;
          align-items: flex-start; gap: 12px;
        }
        .interview-q-header { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .interview-q-text { font-size: 14px; font-weight: 500; }
        .btn-sm { padding: 6px 12px; font-size: 12px; }
        .interview-a {
          padding: 0 20px 16px; border-top: 1px solid var(--border);
          padding-top: 12px; margin-top: 4px;
        }
        .interview-a-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: var(--success); margin-bottom: 8px;
        }
        .interview-a p { font-size: 14px; color: var(--text-secondary); line-height: 1.7; white-space: pre-wrap; }
      `}</style>
    </div>
  );
}
