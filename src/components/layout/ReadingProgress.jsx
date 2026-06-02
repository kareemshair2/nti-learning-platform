import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
      setShowTop(scrollTop > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <div className="reading-progress">
        <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <button
        className={`back-to-top ${showTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
