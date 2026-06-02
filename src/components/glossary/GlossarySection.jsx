import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

export default function GlossarySection({ terms }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState(null);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(terms?.map(t => t.category).filter(Boolean))];
    return cats;
  }, [terms]);

  const filtered = useMemo(() => {
    if (!terms) return [];
    return terms.filter(t => {
      const matchSearch = search === '' ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.arabic.includes(search) ||
        t.explanation.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || t.category === category;
      return matchSearch && matchCat;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [terms, search, category]);

  return (
    <div>
      <h1 className="section-title">Glossary</h1>
      <p className="section-subtitle">قاموس المصطلحات مع البحث والتصنيف</p>

      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="glossary-cats">
        {categories.map(c => (
          <button
            key={c}
            className={`glossary-cat-btn ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="glossary-list">
        {filtered.map((term, i) => (
          <div
            key={i}
            className={`glossary-item ${selectedTerm === i ? 'expanded' : ''}`}
            onClick={() => setSelectedTerm(selectedTerm === i ? null : i)}
          >
            <div className="glossary-item-header">
              <div>
                <span className="glossary-term">{term.term}</span>
                <span className="glossary-arabic">{term.arabic}</span>
                {term.category && <span className="glossary-cat">{term.category}</span>}
              </div>
            </div>
            {selectedTerm === i && (
              <div className="glossary-detail">
                <p>{term.explanation}</p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="glossary-empty">No terms found matching your search.</div>
        )}
      </div>

      <style>{`
        .glossary-cats {
          display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px;
        }
        .glossary-cat-btn {
          padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border);
          background: transparent; color: var(--text-secondary); cursor: pointer;
          font-size: 13px; font-family: inherit; transition: all 0.2s;
        }
        .glossary-cat-btn:hover { border-color: var(--accent-dim); color: var(--accent); }
        .glossary-cat-btn.active { background: var(--accent); color: #0f172a; border-color: var(--accent); }
        .glossary-list { display: flex; flex-direction: column; gap: 4px; }
        .glossary-item {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-sm); cursor: pointer;
          transition: all 0.2s; overflow: hidden;
        }
        .glossary-item:hover { border-color: var(--border-hover); }
        .glossary-item.expanded { border-color: var(--accent-dim); }
        .glossary-item-header {
          padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
        }
        .glossary-item-header div { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .glossary-term { font-size: 14px; font-weight: 600; color: var(--accent); }
        .glossary-arabic { font-size: 14px; color: var(--text-primary); }
        .glossary-cat {
          font-size: 11px; padding: 2px 8px; border-radius: 10px;
          background: var(--accent-dim); color: var(--accent);
        }
        .glossary-detail {
          padding: 0 16px 16px; border-top: 1px solid var(--border);
          padding-top: 12px; margin-top: 4px;
        }
        .glossary-detail p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
        .glossary-empty { text-align: center; padding: 32px; color: var(--text-muted); }
      `}</style>
    </div>
  );
}
