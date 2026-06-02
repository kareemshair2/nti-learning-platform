import { Briefcase, MapPin, Target, TrendingUp } from 'lucide-react';

export default function TrackIntro({ data, trackInfo }) {
  return (
    <div>
      <div className="intro-header">
        <div className="intro-title-icon" style={{ background: `${trackInfo.color}15`, color: trackInfo.color }}>
          <span>{trackInfo.num}</span>
        </div>
        <div>
          <h1 className="section-title">{data.title}</h1>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>
      </div>

      <div className="intro-cards">
        <div className="info-card">
          <div className="card-icon"><Target size={20} /></div>
          <h3>ما هو المجال؟</h3>
          <p>{data.whatIs}</p>
        </div>
        <div className="info-card">
          <div className="card-icon" style={{background:'rgba(74,222,128,0.1)',color:'var(--success)'}}><Target size={20} /></div>
          <h3>English Definition</h3>
          <p>{data.whatIsEn}</p>
        </div>
      </div>

      <h2 style={{fontSize:'22px',fontWeight:700,margin:'32px 0 16px'}}>Why Is It Important?</h2>
      <div className="importance-grid">
        {data.importance?.map((item, i) => (
          <div key={i} className="importance-item">
            <div className="importance-icon"><TrendingUp size={18} /></div>
            <div>
              <strong>{item.reason}</strong>
              <p>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{fontSize:'22px',fontWeight:700,margin:'32px 0 16px'}}>Real World Applications</h2>
      <div className="badge-grid">
        {data.applications?.map((app, i) => (
          <span key={i} className="badge badge-accent"><MapPin size={12} />{app}</span>
        ))}
      </div>

      <h2 style={{fontSize:'22px',fontWeight:700,margin:'32px 0 16px'}}>Career Opportunities</h2>
      <div className="career-table-wrapper">
        <table className="comparison-table">
          <thead><tr><th>Job Title</th><th>Salary (Egypt)</th><th>Salary (Intl)</th></tr></thead>
          <tbody>
            {data.careers?.map((c, i) => (
              <tr key={i}><td>{c.title}</td><td>{c.salary}</td><td>{c.salaryInt}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{fontSize:'22px',fontWeight:700,margin:'32px 0 16px'}}>Learning Roadmap</h2>
      <div className="timeline">
        {data.roadmap?.map((step, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="roadmap-card">
              <div className="roadmap-header">
                <span className="roadmap-level">{step.level}</span>
                <span className="roadmap-period">{step.period}</span>
              </div>
              <ul className="roadmap-items">
                {step.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .intro-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
        .intro-title-icon {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 20px; flex-shrink: 0;
        }
        .intro-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .importance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .importance-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 16px; background: var(--bg-card); border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }
        .importance-icon {
          width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
          background: var(--accent-dim); color: var(--accent);
          display: flex; align-items: center; justify-content: center;
        }
        .importance-item strong { font-size: 14px; display: block; margin-bottom: 4px; }
        .importance-item p { font-size: 13px; color: var(--text-secondary); }
        .badge-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .career-table-wrapper { overflow-x: auto; border-radius: var(--radius); border: 1px solid var(--border); }
        .roadmap-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 16px 20px;
        }
        .roadmap-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .roadmap-level { font-weight: 700; font-size: 16px; color: var(--accent); }
        .roadmap-period { font-size: 12px; color: var(--text-muted); padding: 2px 10px; background: var(--accent-dim); border-radius: 12px; }
        .roadmap-items { list-style: none; padding: 0; margin: 0; }
        .roadmap-items li {
          padding: 4px 0; font-size: 14px; color: var(--text-secondary);
          position: relative; padding-left: 16px;
        }
        .roadmap-items li::before {
          content: '→'; position: absolute; left: 0; color: var(--accent);
        }
        @media (max-width: 768px) { .intro-cards, .importance-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
