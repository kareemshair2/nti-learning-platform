import { Award, BookOpen, Briefcase, Star } from 'lucide-react';

export default function CareerPath({ levels }) {
  if (!levels || levels.length === 0) {
    return (
      <div>
        <h1 className="section-title">Career Path</h1>
        <p className="section-subtitle">المسار الوظيفي من مبتدئ إلى خبير</p>
        <div className="highlight-box">Career path content being expanded.</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">Career Path</h1>
      <p className="section-subtitle">المسار الوظيفي - المهارات والشهادات المطلوبة لكل مستوى</p>

      <div className="career-timeline">
        {levels.map((level, i) => (
          <div key={i} className="career-level">
            <div className="career-level-header">
              <div className="career-dot">
                <Star size={14} />
              </div>
              <div className="career-level-info">
                <span className="career-level-name">{level.level}</span>
                <span className="career-level-exp">{level.exp}</span>
              </div>
              <div className="career-level-title">{level.title}</div>
              <div className="career-level-salary">{level.salary}</div>
            </div>
            <div className="career-level-body">
              <div className="career-col">
                <h4><Briefcase size={14} /> Skills</h4>
                <ul>
                  {level.skills?.map((s, j) => <li key={j}>{s}</li>)}
                </ul>
              </div>
              {level.certs && (
                <div className="career-col">
                  <h4><Award size={14} /> Certifications</h4>
                  <ul>
                    {level.certs?.map((c, j) => <li key={j}>{c}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .career-timeline { display: flex; flex-direction: column; gap: 12px; }
        .career-level {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden;
        }
        .career-level-header {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 20px; cursor: pointer;
          border-bottom: 1px solid var(--border);
        }
        .career-dot {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--accent-dim); color: var(--accent);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .career-level-info { display: flex; flex-direction: column; gap: 2px; min-width: 100px; }
        .career-level-name { font-weight: 600; font-size: 15px; }
        .career-level-exp { font-size: 12px; color: var(--text-muted); }
        .career-level-title { flex: 1; font-size: 14px; color: var(--text-secondary); }
        .career-level-salary { font-size: 14px; font-weight: 600; color: var(--accent); white-space: nowrap; }
        .career-level-body {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
          padding: 16px 20px;
        }
        .career-col h4 {
          font-size: 13px; font-weight: 600; margin-bottom: 8px;
          display: flex; align-items: center; gap: 6px; color: var(--accent);
        }
        .career-col ul { list-style: none; padding: 0; }
        .career-col li {
          font-size: 13px; color: var(--text-secondary); padding: 3px 0 3px 16px;
          position: relative;
        }
        .career-col li::before { content: '›'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
        @media (max-width: 768px) {
          .career-level-header { flex-wrap: wrap; }
          .career-level-body { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
