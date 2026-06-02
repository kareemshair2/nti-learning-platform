import { useState } from 'react';
import { Lightbulb, BookOpen, Wrench, MessageSquare, RotateCcw } from 'lucide-react';

export default function QuickRevision({ data }) {
  const sections = [
    { id: 'concepts', label: 'Key Concepts', icon: Lightbulb, items: data?.keyConcepts },
    { id: 'terms', label: 'Important Terms', icon: BookOpen, items: data?.importantTerms },
    { id: 'tools', label: 'Must-Know Tools', icon: Wrench, items: data?.mustTools },
    { id: 'nuggets', label: 'Interview Nuggets', icon: MessageSquare, items: data?.interviewNuggets },
  ];

  const [flipped, setFlipped] = useState({});

  if (!data) {
    return (
      <div>
        <h1 className="section-title">Quick Revision</h1>
        <p className="section-subtitle">مراجعة سريعة قبل المقابلة - 15 دقيقة</p>
        <div className="highlight-box">Revision content being expanded.</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">Quick Revision</h1>
      <p className="section-subtitle">مراجعة سريعة - 15 دقيقة قبل المقابلة</p>

      {sections.map((section) => (
        <div key={section.id} className="rev-section">
          <div className="rev-header">
            <section.icon size={18} />
            <h2>{section.label}</h2>
          </div>
          <div className="rev-grid">
            {section.items?.map((item, i) => (
              <div key={i} className="rev-card">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rev-section">
        <div className="rev-header">
          <RotateCcw size={18} />
          <h2>Flashcards</h2>
        </div>
        <div className="flashcards-grid">
          {[
            { front: 'CIA Triad', back: 'Confidentiality, Integrity, Availability - أساس الأمن' },
            { front: 'Overfitting', back: 'النموذج يحفظ البيانات بدلاً من أن يتعلم' },
            { front: 'REST API', back: 'GET (قراءة), POST (إنشاء), PUT (تحديث), DELETE (حذف)' },
            { front: 'IaaS / PaaS / SaaS', back: 'بنية تحتية / منصة / برنامج كخدمة' },
          ].map((card, i) => (
            <div
              key={i}
              className={`flashcard ${flipped[i] ? 'flipped' : ''}`}
              onClick={() => setFlipped(prev => ({ ...prev, [i]: !prev[i] }))}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <strong>{card.front}</strong>
                  <span className="flashcard-hint">Click to reveal</span>
                </div>
                <div className="flashcard-back">
                  <p>{card.back}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .rev-section { margin-bottom: 28px; }
        .rev-header {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 12px; color: var(--accent);
        }
        .rev-header h2 { font-size: 18px; font-weight: 600; color: var(--text-primary); }
        .rev-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 8px;
        }
        .rev-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 14px 16px;
          transition: all 0.2s;
        }
        .rev-card:hover { border-color: var(--accent-dim); }
        .rev-card p { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
        .flashcards-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        @media (max-width: 768px) { .rev-grid, .flashcards-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
