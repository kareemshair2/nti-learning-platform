import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-item">
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items?.map((item, i) => (
        <span key={i} className="breadcrumb-row">
          <ChevronRight size={14} className="breadcrumb-sep" />
          {item.path ? (
            <Link to={item.path} className="breadcrumb-item">{item.label}</Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
      <style>{`
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .breadcrumb-row { display: flex; align-items: center; gap: 4px; }
        .breadcrumb-sep { color: var(--text-muted); }
        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb-item:hover { color: var(--accent); }
        .breadcrumb-current { color: var(--text-secondary); font-weight: 500; }
      `}</style>
    </nav>
  );
}
