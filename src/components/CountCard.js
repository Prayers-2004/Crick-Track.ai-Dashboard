import React, { useState } from 'react';
import '../Dashboard.css';

const CountCard = () => {
  const [ballCount, setBallCount] = useState(0);
  const [isFullScreenCounting, setIsFullScreenCounting] = useState(false);

  // Function to open full-screen counting
  const openFullScreenCounting = () => {
    setIsFullScreenCounting(true);
  };

  // Function to close full-screen counting
  const closeFullScreenCounting = () => {
    setIsFullScreenCounting(false);
  };

  // Function to increment the ball count
  const handleCount = () => {
    setBallCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      {/* Card */}
      <div className="card counter-card">
        <div className="card-image">
          <img
            src="/cricket ball counter.jpg"
            alt="Cricket Ball Counter"
            className="card-img"
          />
        </div>
        <div className="card-content">
          <h2 className="card-title">Ball Counter</h2>
          <p className="card-description">
            Keep precise track of every ball with automated counting
          </p>
          <button
            className="nav-button count-button"
            onClick={openFullScreenCounting}
          >
            Count
          </button>
        </div>
      </div>

      {/* Full-Screen Counting Overlay */}
      {isFullScreenCounting && (
        <div className="full-screen-overlay">
          <div className="full-screen-content">
            <h3>Interactive Ball Counter</h3>
            <p className="ball-count">Balls Counted: {ballCount}</p>
                  <button
              className="nav-button count-button"
              onClick={handleCount}
            >
              Count Ball
            </button>
            
            
            <p>Click the button to count each ball:</p>
            <button
              className="nav-button close-button"
              onClick={closeFullScreenCounting}
            >
              Close
            </button>
      
          </div>
        </div>
      )}
    </>
  );
};

export default CountCard;