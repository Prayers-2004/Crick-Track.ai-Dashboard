import React, { useState } from 'react';
import '../Dashboard.css';

const BallCounter = () => {
  const [currentBall, setCurrentBall] = useState(0);
  const [currentOver, setCurrentOver] = useState(0);
  const [showRunsModal, setShowRunsModal] = useState(false);
  const [overs, setOvers] = useState([]);
  const [currentOverRuns, setCurrentOverRuns] = useState([]);

  const handleBallCount = () => {
    setShowRunsModal(true);
  };

  const handleRunSelection = (runs) => {
    const newBallCount = currentBall + 1;
    const newOverRuns = [...currentOverRuns, runs];
    
    setCurrentOverRuns(newOverRuns);
    setCurrentBall(newBallCount);
    setShowRunsModal(false);

    // If over is complete (6 balls)
    if (newBallCount === 6) {
      setOvers([...overs, {
        overNumber: currentOver + 1,
        runs: newOverRuns,
        totalRuns: newOverRuns.reduce((sum, run) => sum + run, 0)
      }]);
      setCurrentBall(0);
      setCurrentOver(currentOver + 1);
      setCurrentOverRuns([]);
    }
  };

  return (
    <div className="ball-counter">
      <div className="counter-header">
        <h3>Ball Counter</h3>
        <div className="over-display">
          <span className="current-over">Over: {currentOver}.{currentBall}</span>
        </div>
      </div>

      <button className="count-ball-btn" onClick={handleBallCount}>
        Count Ball
      </button>

      {showRunsModal && (
        <div className="runs-modal">
          <div className="runs-modal-content">
            <h4>Select Runs</h4>
            <div className="runs-buttons">
              {[0, 1, 2, 3, 4, 5, 6].map((runs) => (
                <button
                  key={runs}
                  className="run-btn"
                  onClick={() => handleRunSelection(runs)}
                >
                  {runs} {runs === 1 ? 'Run' : 'Runs'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="overs-history">
        <h4>Overs History</h4>
        {overs.map((over, index) => (
          <div key={index} className="over-card">
            <div className="over-number">Over {over.overNumber}</div>
            <div className="balls-runs">
              {over.runs.map((runs, ballIndex) => (
                <span key={ballIndex} className="ball-run">
                  {runs}
                </span>
              ))}
            </div>
            <div className="over-total">
              Total: {over.totalRuns} runs
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BallCounter; 