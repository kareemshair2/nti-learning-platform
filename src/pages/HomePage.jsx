import { Link } from 'react-router-dom';
import { tracks } from '../data/tracks';
import { Shield, Code2, Brain, Cloud, Server, Cpu, Palette, TrendingUp, ArrowRight, BookOpen, Award } from 'lucide-react';

const iconMap = { Shield, Code2, Brain, Cloud, Server, Cpu, Palette, TrendingUp };

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-bg-glow" />
        <div className="hero-content">
          <div className="hero-badge">
            <Award size={14} />
            <span>NTI Summer Training 2025/2026</span>
          </div>
          <h1 className="hero-title">
            Interactive Learning<br />
            <span className="hero-gradient">Platform</span>
          </h1>
          <p className="hero-desc">
            دليل تعليمي شامل لبرنامج التدريب الصيفي للمعهد القومي للاتصالات (NTI).
            استكشف 8 مسارات تقنية من الصفر إلى الاحتراف.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">8</span>
              <span className="stat-label">Tracks</span>
            </div>
            <div className="stat">
              <span className="stat-value">30+</span>
              <span className="stat-label">Modules</span>
            </div>
            <div className="stat">
              <span className="stat-value">200+</span>
              <span className="stat-label">Concepts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="home-tracks">
        <div className="section-header">
          <h2 className="section-title">Explore Tracks</h2>
          <p className="section-subtitle">اختر مسارك التقني وابدأ رحلة التعلم</p>
        </div>
        <div className="tracks-grid">
          {tracks.map(track => {
            const Icon = iconMap[track.icon] || Shield;
            return (
              <Link key={track.id} to={`/track/${track.id}`} className="track-card">
                <div className="track-card-icon" style={{ background: `${track.color}15`, color: track.color }}>
                  <Icon size={24} />
                </div>
                <div className="track-card-number" style={{ color: track.color }}>{track.num}</div>
                <h3 className="track-card-title">{track.title}</h3>
                <p className="track-card-desc">{track.desc}</p>
                <div className="track-card-footer">
                  <span className="track-card-link">Start Learning</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .home-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 48px 80px;
        }
        .home-hero {
          text-align: center;
          padding: 60px 0 48px;
          position: relative;
        }
        .hero-bg-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(56,189,248,0.06), transparent);
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--accent-dim);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 20px;
          font-size: 13px;
          color: var(--accent);
          margin-bottom: 24px;
        }
        .hero-title {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .hero-gradient {
          background: linear-gradient(135deg, var(--accent), var(--accent-hover), #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-desc {
          font-size: 17px;
          color: var(--text-secondary);
          max-width: 560px;
          margin: 0 auto 32px;
          line-height: 1.7;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
        }
        .stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .stat-value { font-size: 32px; font-weight: 800; color: var(--accent); }
        .stat-label { font-size: 13px; color: var(--text-muted); }

        .section-header { margin-bottom: 28px; }
        .tracks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .track-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          text-decoration: none;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .track-card:hover {
          border-color: var(--accent-dim);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        .track-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .track-card-number {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 28px;
          font-weight: 800;
          opacity: 0.15;
        }
        .track-card-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .track-card-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .track-card-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .home-page { padding: 24px 16px; }
          .hero-title { font-size: 32px; }
          .hero-stats { gap: 24px; }
          .tracks-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
