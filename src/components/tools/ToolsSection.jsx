import { useState } from 'react';
import { ChevronDown, ThumbsUp, ThumbsDown, Repeat } from 'lucide-react';

export default function ToolsSection({ tools }) {
  const [expanded, setExpanded] = useState(null);

  if (!tools || tools.length === 0) {
    return (
      <div>
        <h1 className="section-title">Tools Reference</h1>
        <p className="section-subtitle">الأدوات والتقنيات المستخدمة في المسار</p>
        <div className="highlight-box">Tools reference being expanded.</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">Tools Reference</h1>
      <p className="section-subtitle">الأدوات والتقنيات المستخدمة - مع المقارنات ومستوى الطلب</p>

      <div className="tools-grid">
        {tools.map((tool, i) => (
          <div key={i} className="tool-card" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="tool-card-header">
              <div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-desc">{tool.desc}</p>
              </div>
              <div className="tool-demand">
                <span className={`demand-badge ${tool.demand === 'إجباري' || tool.demand === 'الأعلى' || tool.demand === 'عالي جدًا' || tool.demand === 'مرتفع جدًا' ? 'high' : tool.demand === 'مرتفع' || tool.demand === 'عالي' ? 'mid' : 'low'}`}>
                  {tool.demand}
                </span>
              </div>
            </div>

            {expanded === i && (
              <div className="tool-details">
                <div className="tool-detail-section">
                  <h4><ThumbsUp size={14} /> When to Use</h4>
                  <p>{tool.use}</p>
                </div>

                <div className="tool-detail-section">
                  <h4><ThumbsUp size={14} /> Advantages</h4>
                  <ul className="tool-pros">
                    {tool.pros?.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </div>

                <div className="tool-detail-section">
                  <h4><ThumbsDown size={14} /> Limitations</h4>
                  <ul className="tool-cons">
                    {tool.cons?.map((c, j) => <li key={j}>{c}</li>)}
                  </ul>
                </div>

                <div className="tool-detail-section">
                  <h4><Repeat size={14} /> Alternatives</h4>
                  <p>{tool.alt}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .tools-grid { display: flex; flex-direction: column; gap: 8px; }
        .tool-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 16px 20px;
          cursor: pointer; transition: all 0.2s;
        }
        .tool-card:hover { border-color: var(--border-hover); }
        .tool-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
        .tool-name { font-size: 16px; font-weight: 600; color: var(--accent); margin-bottom: 4px; }
        .tool-desc { font-size: 13px; color: var(--text-secondary); }
        .demand-badge {
          font-size: 11px; padding: 4px 10px; border-radius: 10px;
          white-space: nowrap; font-weight: 500;
        }
        .demand-badge.high { background: rgba(74,222,128,0.1); color: var(--success); }
        .demand-badge.mid { background: rgba(251,191,36,0.1); color: var(--warning); }
        .demand-badge.low { background: rgba(248,113,113,0.1); color: var(--error); }
        .tool-details { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
        .tool-detail-section { margin-bottom: 12px; }
        .tool-detail-section h4 { font-size: 13px; font-weight: 600; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; color: var(--text-primary); }
        .tool-detail-section p { font-size: 13px; color: var(--text-secondary); }
        .tool-pros, .tool-cons { list-style: none; padding: 0; }
        .tool-pros li, .tool-cons li { font-size: 13px; color: var(--text-secondary); padding: 2px 0 2px 16px; position: relative; }
        .tool-pros li::before { content: '+'; position: absolute; left: 0; color: var(--success); font-weight: 700; }
        .tool-cons li::before { content: '-'; position: absolute; left: 0; color: var(--error); font-weight: 700; }
      `}</style>
    </div>
  );
}
