import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ReadingProgress from './components/layout/ReadingProgress';
import HomePage from './pages/HomePage';
import TrackPage from './pages/TrackPage';
import './styles/global.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="main-content">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <ReadingProgress />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/track/:trackId" element={<TrackPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
