import React, { useState } from 'react';
import '../style/BackPage.css';

interface BackPageProps {
  onBack: () => void;
}

interface NICInfo {
  dateOfBirth: string;
  gender: string;
}

// NIC --> Parser Function
function parseNIC(nic: string): NICInfo | null {
  if (!nic) return null;
  
  const cleanNIC = nic.trim().toUpperCase();
  const oldFormat = /^(\d{9})([VX])$/;
  const newFormat = /^(\d{12})$/;
  
  let year: number;
  let dayOfYear: number;
  
  if (oldFormat.test(cleanNIC)) {
    const match = cleanNIC.match(oldFormat);
    if (!match) return null;
    year = parseInt('19' + match[1].substring(0, 2));
    dayOfYear = parseInt(match[1].substring(2, 5));
  } else if (newFormat.test(cleanNIC)) {
    year = parseInt(cleanNIC.substring(0, 4));
    dayOfYear = parseInt(cleanNIC.substring(4, 7));
  } else {
    return null;
  }
  
  const gender = dayOfYear > 500 ? 'Female' : 'Male';
  if (dayOfYear > 500) dayOfYear -= 500;
  
  const date = new Date(year, 0);
  date.setDate(dayOfYear);
  
  return {
    dateOfBirth: date.toLocaleDateString('en-GB'),
    gender: gender
  };
}

function BackPage({ onBack }: BackPageProps) {
  const [id, setId] = useState("");
  const [info, setInfo] = useState<NICInfo>({
    dateOfBirth: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  function handleSubmit() {
    setError("");
    setShowResults(false);
    
    if (!id.trim()) {
      setError("Please enter a NIC number");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const result = parseNIC(id);
      
      if (!result) {
        setError("Invalid NIC format. Use: 123456789V (old) or 200012345678 (new)");
        setInfo({ dateOfBirth: "", gender: "" });
        setIsLoading(false);
        return;
      }
      
      setInfo(result);
      setIsLoading(false);
      setShowResults(true);
    }, 1000);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="back-page">
      <div className="back-content">
        <div className="verification-card">
          {/* Close Button */}
          <button className="close-button" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Card Header */}
          <div className="verification-header">
            <div className="header-background"></div>
            <h2 className="verification-title">NIC Verification</h2>
            <p className="verification-subtitle">Enter your National Identity Card number below</p>
          </div>

          {/* Form Section */}
          <div className="form-container">
            {/* Format Guide */}
            <div className="format-info">
              <span className="info-icon">💡</span>
              <div className="info-text">
                <strong>Format:</strong> XXXXXXXXXV (old) or XXXXXXXXXXXX (new)
              </div>
            </div>

            {/* Input Field */}
            <div className="input-wrapper">
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`nic-input ${error ? 'error' : ''} ${id ? 'filled' : ''}`}
                placeholder=" "
                maxLength={12}
              />
              <label className="input-label">NIC Number</label>
              <div className="input-underline"></div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-box">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify NIC</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>

            {/* Results Section */}
            <div className={`results-container ${showResults ? 'show' : ''}`}>
              <div className="result-card" style={{ animationDelay: '0s' }}>
                <div className="result-icon">🔢</div>
                <div className="result-content">
                  <span className="result-label">NIC Number</span>
                  <span className="result-value">{id || '-'}</span>
                </div>
              </div>

              <div className="result-card" style={{ animationDelay: '0.1s' }}>
                <div className="result-icon">🎂</div>
                <div className="result-content">
                  <span className="result-label">Date of Birth</span>
                  <span className="result-value">{info.dateOfBirth || '-'}</span>
                </div>
              </div>

              <div className="result-card" style={{ animationDelay: '0.2s' }}>
                <div className="result-icon">{info.gender === 'Male' ? '👨' : info.gender === 'Female' ? '👩' : '👤'}</div>
                <div className="result-content">
                  <span className="result-label">Gender</span>
                  <span className="result-value">{info.gender || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackPage;