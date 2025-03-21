import React from 'react';
import '../Dashboard.css';

const BallHistory = ({ history }) => {
  return (
    <div className="ball-history">
      <h3>Analysis History</h3>
      <div className="history-cards">
        {history.map((ball, index) => (
          <div key={index} className="history-card">
            <div className="history-card-content">
              <div className="ball-number">Ball #{ball.number}</div>
              <div className="ball-stats">
                <p><strong>Speed:</strong> {ball.speed} mph</p>
                <p><strong>Spin:</strong> {ball.spin}°</p>
                <p><strong>Swing:</strong> {ball.swing}°</p>
              </div>
              <div className="ball-timestamp">
                {new Date(ball.timestamp).toLocaleTimeString()}
              </div>
              <div className="ball-type">
                {getBallType(ball.spin, ball.speed)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine ball type based on spin and speed
const getBallType = (spin, speed) => {
  if (speed >= 90) {
    return 'Fast Ball';
  } else if (parseFloat(spin) >= 0.3) {
    return 'Spin Ball';
  } else if (parseFloat(spin) >= 0.2) {
    return 'Medium Spin';
  } else {
    return 'Regular Ball';
  }
};

export default BallHistory; 