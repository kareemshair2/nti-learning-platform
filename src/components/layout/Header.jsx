import { useState, useEffect } from 'react';
import { Menu, Search, BookOpen } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tracks } from '../../data/tracks';

export default function Header({ onMenuClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = tracks.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.desc.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (trackId) => {
    setSearchOpen(false);
    setQuery('');
    navigate(`/track/${trackId}`);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-left">
          <button className="header-menu-btn" onClick={onMenuClick}>
            <Menu size={20} />
          </button>
          <div className="header-breadcrumb">
            <BookOpen size={16} />
            <span>NTI Summer Training Guide</span>
          </div>
        </div>

        <div className="header-right">
          <div className="header-search-wrapper">
            <button className="header-search-btn" onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={18} />
            </button>
            {searchOpen && (
              <div className="header-search-dropdown">
                <input
                  type="text"
                  placeholder="Search tracks..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoFocus
                />
                {results.length > 0 && (
                  <div className="header-search-results">
                    {results.map(t => (
                      <button key={t.id} className="search-result-item" onClick={() => handleSearch(t.id)}>
                        <span style={{ color: t.color }}>{t.title}</span>
                        <span className="search-result-desc">{t.desc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: var(--sidebar-width);
          right: 0;
          height: var(--header-height);
          z-index: 40;
          transition: all 0.3s;
          background: transparent;
        }
        .header.scrolled {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 0 32px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
        }
        .header-menu-btn:hover { background: var(--bg-card); }
        @media (max-width: 768px) { .header-menu-btn { display: flex; } }
        .header-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .header-right { display: flex; align-items: center; gap: 12px; }
        .header-search-wrapper { position: relative; }
        .header-search-btn {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          transition: all 0.2s;
        }
        .header-search-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .header-search-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 320px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .header-search-dropdown input {
          width: 100%;
          padding: 14px 16px;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          color: var(--text-primary);
          font-size: 14px;
          font-family: inherit;
        }
        .header-search-dropdown input:focus { outline: none; }
        .header-search-results { max-height: 240px; overflow-y: auto; }
        .search-result-item {
          width: 100%;
          padding: 10px 16px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-family: inherit;
          font-size: 13px;
          color: var(--text-primary);
        }
        .search-result-item:hover { background: var(--bg-card-hover); }
        .search-result-desc { font-size: 11px; color: var(--text-muted); }
        @media (max-width: 768px) {
          .header { left: 0; }
          .header-inner { padding: 0 16px; }
        }
      `}</style>
    </header>
  );
}
