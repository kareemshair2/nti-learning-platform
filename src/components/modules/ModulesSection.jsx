import { useState } from 'react';
import { ChevronDown, Clock, Award, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

export default function ModulesSection({ modules }) {
  const [activeModule, setActiveModule] = useState(null);

  const toggle = (id) => setActiveModule(activeModule === id ? null : id);

  if (!modules || modules.length === 0) {
    return (
      <div className="highlight-box">
        <Lightbulb size={16} />
        <span>Modules data being expanded. Check back for detailed module content.</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">Modules</h1>
      <p className="section-subtitle">استعرض كل موديولات المسار بالتفصيل</p>

      <div className="accordion">
        {modules.map(mod => (
          <div key={mod.id} className={`accordion-item ${activeModule === mod.id ? 'active' : ''}`}>
            <button className="accordion-header" onClick={() => toggle(mod.id)}>
              <div className="mod-header">
                <div className="mod-title">{mod.title}</div>
                <div className="mod-meta">
                  <span className="mod-level">{mod.level}</span>
                  <span className="mod-time"><Clock size={12} />{mod.time}</span>
                  {mod.cert && <span className="mod-cert">{mod.cert}</span>}
                </div>
              </div>
              <ChevronDown size={18} className="icon" />
            </button>
            <div className="accordion-content">
              <div className="mod-section">
                <h4><Lightbulb size={16} /> Arabic Overview</h4>
                <p>{mod.overviewAr}</p>
              </div>

              <div className="mod-section">
                <h4>📖 English Overview</h4>
                <p>{mod.overviewEn}</p>
              </div>

              <div className="mod-section">
                <h4><AlertTriangle size={16} /> Why Is It Important?</h4>
                <div className="highlight-box">{mod.why}</div>
              </div>

              <div className="mod-section">
                <h4>📚 Concepts Covered</h4>
                <div className="concepts-list">
                  {mod.concepts?.map((c, i) => <span key={i} className="concept-tag">{c}</span>)}
                </div>
              </div>

              <div className="mod-section">
                <h4>🔧 Tools & Technologies</h4>
                <div className="concepts-list">
                  {mod.tools?.map((t, i) => <span key={i} className="tool-tag">{t}</span>)}
                </div>
              </div>

              <div className="mod-section">
                <h4><CheckCircle size={16} /> Real World Applications</h4>
                <ul className="mod-list">
                  {mod.applications?.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>

              <div className="mod-section">
                <h4><AlertTriangle size={16} /> Common Mistakes</h4>
                <ul className="mod-list mod-list-warn">
                  {mod.mistakes?.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>

              <div className="mod-section mod-summary">
                <h4>Summary</h4>
                <p>{mod.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .mod-header { display: flex; flex-direction: column; gap: 6px; text-align: left; }
        .mod-title { font-size: 15px; font-weight: 600; }
        .mod-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .mod-level { font-size: 11px; padding: 2px 8px; border-radius: 10px; background: var(--accent-dim); color: var(--accent); }
        .mod-time { font-size: 11px; display: flex; align-items: center; gap: 4px; color: var(--text-muted); }
        .mod-cert { font-size: 11px; padding: 2px 8px; border-radius: 10px; background: rgba(74,222,128,0.1); color: var(--success); }
        .mod-section { margin-bottom: 16px; }
        .mod-section h4 { font-size: 14px; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .mod-section p { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }
        .concepts-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .concept-tag {
          padding: 4px 12px; background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 6px; font-size: 13px; color: var(--text-secondary);
        }
        .tool-tag {
          padding: 4px 12px; background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.2);
          border-radius: 6px; font-size: 13px; color: var(--accent);
        }
        .mod-list { list-style: none; padding: 0; }
        .mod-list li { padding: 4px 0 4px 20px; position: relative; font-size: 14px; color: var(--text-secondary); }
        .mod-list li::before { content: '•'; position: absolute; left: 4px; color: var(--accent); }
        .mod-list-warn li::before { content: '⚠'; color: var(--warning); }
        .mod-summary { background: var(--accent-dim); border-radius: var(--radius-sm); padding: 16px; margin-top: 8px; }
        .mod-summary p { color: var(--accent); font-weight: 500; }
      `}</style>
    </div>
  );
}
