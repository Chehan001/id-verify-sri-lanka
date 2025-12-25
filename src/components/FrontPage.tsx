import '../style/FrontPage.css';
import nicImage from '../assets/nic.png';

interface FrontPageProps {
  onClick: () => void;
}

function FrontPage({ onClick }: FrontPageProps) {
  return (
    <div className="front-page">
      <div className="front-content">
        {/* Title Section */}
        <div className="title-section">
          <h1 className="main-title">Check NIC Details</h1>
          <p className="subtitle">
            Verify Sri Lankan National Identity Card Information
          </p>
        </div>

        {/* NIC Card Display */}
        <div className="nic-card-container" onClick={onClick}>
          <div className="card-glow"></div>
          <div className="hover-overlay">
            <div className="overlay-content">
              <div className="pulse-ring"></div>
              <div className="click-icon">👆</div>
              <p className="click-text">Click to Start</p>
            </div>
          </div>
          
          <div className="nic-card-image">
            <div className="card-shine"></div>
            <img src={nicImage} alt="Sri Lankan National Identity Card" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;