import { useState } from 'react';
import './App.css';
import FrontPage from './components/FrontPage';
import BackPage from './components/BackPage';

function App() {
  const [showBackPage, setShowBackPage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleShowBackPage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowBackPage(true);
      setIsTransitioning(false);
    }, 400);
  };

  const handleShowFrontPage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowBackPage(false);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="app-wrapper">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Page Content with Transition */}
      <div className={`page-content ${isTransitioning ? 'transitioning' : ''}`}>
        {showBackPage ? (
          <BackPage onBack={handleShowFrontPage} />
        ) : (
          <FrontPage onClick={handleShowBackPage} />
        )}
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
}

export default App;