import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { trackContent, tracks } from '../data/tracks';
import Breadcrumb from '../components/layout/Breadcrumb';
import TrackIntro from '../components/track/TrackIntro';
import ModulesSection from '../components/modules/ModulesSection';
import GlossarySection from '../components/glossary/GlossarySection';
import ToolsSection from '../components/tools/ToolsSection';
import InterviewSection from '../components/interview/InterviewSection';
import CareerPath from '../components/career/CareerPath';
import QuickRevision from '../components/revision/QuickRevision';
import { BookOpen, GraduationCap, BookMarked, Wrench, MessageSquare, Briefcase, Zap } from 'lucide-react';

const sections = [
  { id: 'intro', label: 'Introduction', icon: BookOpen },
  { id: 'modules', label: 'Modules', icon: GraduationCap },
  { id: 'glossary', label: 'Glossary', icon: BookMarked },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
  { id: 'career', label: 'Career Path', icon: Briefcase },
  { id: 'revision', label: 'Quick Revision', icon: Zap },
];

export default function TrackPage() {
  const { trackId } = useParams();
  const [activeSection, setActiveSection] = useState('intro');
  const trackInfo = tracks.find(t => t.id === trackId);
  const content = trackContent[trackId];

  if (!trackInfo || !content) {
    return <div className="page-content"><p>Track not found</p></div>;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'intro': return <TrackIntro data={content.intro} trackInfo={trackInfo} />;
      case 'modules': return <ModulesSection modules={content.modules} />;
      case 'glossary': return <GlossarySection terms={content.glossary} />;
      case 'tools': return <ToolsSection tools={content.tools} />;
      case 'interview': return <InterviewSection questions={content.interview} />;
      case 'career': return <CareerPath levels={content.career} />;
      case 'revision': return <QuickRevision data={content.revision} />;
      default: return null;
    }
  };

  return (
    <div className="page-content">
      <Breadcrumb items={[
        { label: trackInfo.title }
      ]} />

      <div className="track-nav">
        {sections.map(s => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              className={`track-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveSection(s.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Icon size={16} />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="track-content">
        {renderSection()}
      </div>

      <style>{`
        .track-nav {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          margin-bottom: 32px;
          background: var(--bg-card);
          padding: 4px;
          border-radius: 10px;
        }
        .track-nav-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          font-family: inherit;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .track-nav-btn:hover { color: var(--text-secondary); background: var(--bg-card-hover); }
        .track-nav-btn.active {
          background: var(--accent);
          color: #0f172a;
        }
        .track-content {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .track-nav { overflow-x: auto; flex-wrap: nowrap; }
          .track-nav-btn { font-size: 12px; padding: 6px 10px; }
        }
      `}</style>
    </div>
  );
}
