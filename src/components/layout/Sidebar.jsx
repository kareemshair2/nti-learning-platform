import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tracks } from '../../data/tracks';
import { Shield, Code2, Brain, Cloud, Server, Cpu, Palette, TrendingUp, X, ChevronDown, Search } from 'lucide-react';

const iconMap = {
  Shield, Code2, Brain, Cloud, Server, Cpu, Palette, TrendingUp
};

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState(tracks);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTracks(tracks.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredTracks(tracks);
    }
  }, [searchQuery]);

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={onClose}>
            <div className="logo-icon">
              <span>NTI</span>
            </div>
            <div className="logo-text">
              <span className="logo-title">NTI Learning</span>
              <span className="logo-sub">Summer Training Guide</span>
            </div>
          </Link>
          <button className="sidebar-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-search">
          <Search size={16} className="sidebar-search-icon" />
          <input
            type="text"
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-title">Tracks</div>
            {filteredTracks.map(track => {
              const Icon = iconMap[track.icon] || Shield;
              const isActive = location.pathname === `/track/${track.id}`;
              return (
                <Link
                  key={track.id}
                  to={`/track/${track.id}`}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="sidebar-link-icon" style={{ color: track.color }}>
                    <Icon size={18} />
                  </span>
                  <div className="sidebar-link-text">
                    <span className="sidebar-link-title">{track.title}</span>
                    <span className="sidebar-link-desc">{track.desc}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        <style>{`
          .sidebar {
            width: var(--sidebar-width);
            height: 100vh;
            background: var(--bg-sidebar);
            border-right: 1px solid var(--border);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 50;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }
          .sidebar-header {
            padding: 16px 20px;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .sidebar-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
          }
          .logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--accent), var(--accent-hover));
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 13px;
            color: #0f172a;
          }
          .logo-text { display: flex; flex-direction: column; }
          .logo-title { font-weight: 700; font-size: 15px; color: var(--text-primary); }
          .logo-sub { font-size: 11px; color: var(--text-muted); }
          .sidebar-close { display: none; background: none; border: none; color: var(--text-muted); cursor: pointer; }
          @media (max-width: 768px) { .sidebar-close { display: flex; } }
          .sidebar-search {
            padding: 12px 16px;
            position: relative;
          }
          .sidebar-search input {
            width: 100%;
            padding: 8px 12px 8px 36px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text-primary);
            font-size: 13px;
            font-family: inherit;
          }
          .sidebar-search input:focus { outline: none; border-color: var(--accent); }
          .sidebar-search-icon {
            position: absolute;
            left: 28px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
          }
          .sidebar-nav { padding: 8px 12px; flex: 1; }
          .sidebar-section { margin-bottom: 8px; }
          .sidebar-section-title {
            font-size: 11px;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 8px 8px 4px;
          }
          .sidebar-link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 10px;
            border-radius: 8px;
            color: var(--text-secondary);
            text-decoration: none;
            transition: all 0.2s;
            margin-bottom: 2px;
          }
          .sidebar-link:hover {
            background: var(--bg-card);
            color: var(--text-primary);
          }
          .sidebar-link.active {
            background: var(--accent-dim);
            color: var(--accent);
          }
          .sidebar-link-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            background: var(--bg-card);
          }
          .sidebar-link.active .sidebar-link-icon { background: rgba(56,189,248,0.15); }
          .sidebar-link-text {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }
          .sidebar-link-title {
            font-size: 13px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .sidebar-link-desc {
            font-size: 11px;
            color: var(--text-muted);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}</style>
      </aside>
    </>
  );
}
