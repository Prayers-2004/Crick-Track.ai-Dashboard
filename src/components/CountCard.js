import React, { useState } from 'react';
import '../Dashboard.css';

const CountCard = () => {
  const [currentBall, setCurrentBall] = useState(0);
  const [currentOver, setCurrentOver] = useState(0);
  const [showRunsModal, setShowRunsModal] = useState(false);
  const [showWicketModal, setShowWicketModal] = useState(false);
  const [isNoBall, setIsNoBall] = useState(false);
  const [isFreeHit, setIsFreeHit] = useState(false);
  const [overs, setOvers] = useState([]);
  const [currentOverBalls, setCurrentOverBalls] = useState([]);
  const [editingBallIndex, setEditingBallIndex] = useState(null);
  const [showConfirmDiscard, setShowConfirmDiscard] = useState(null);
  const [selectedBallIndex, setSelectedBallIndex] = useState(null);

  const handleBallCount = () => {
    setShowRunsModal(true);
  };

  const handleNoBall = () => {
    setIsNoBall(true);
    setShowRunsModal(true);
  };

  const handleWicket = () => {
    setShowWicketModal(true);
  };

  const handleRunSelection = (runs) => {
    if (editingBallIndex !== null) {
      // Edit existing ball
      const newCurrentOverBalls = [...currentOverBalls];
      newCurrentOverBalls[editingBallIndex] = {
        ...newCurrentOverBalls[editingBallIndex],
        runs
      };
      setCurrentOverBalls(newCurrentOverBalls);
      setEditingBallIndex(null);
    } else {
      // Add new ball
      const newBall = {
        runs,
        isNoBall,
        isFreeHit,
        isWicket: false
      };
      
      const newCurrentOverBalls = [...currentOverBalls, newBall];
      setCurrentOverBalls(newCurrentOverBalls);

      // Only increment ball count if it's not a no-ball
      if (!isNoBall) {
        const newBallCount = currentBall + 1;
        setCurrentBall(newBallCount);

        // If over is complete (6 balls)
        if (newBallCount === 6) {
          setOvers([...overs, {
            overNumber: currentOver + 1,
            balls: newCurrentOverBalls,
            totalRuns: newCurrentOverBalls.reduce((sum, ball) => sum + ball.runs, 0)
          }]);
          setCurrentBall(0);
          setCurrentOver(currentOver + 1);
          setCurrentOverBalls([]);
        }
      }
    }

    setShowRunsModal(false);
    setIsNoBall(false);
    setIsFreeHit(false);
  };

  const handleWicketSelection = (wicketType) => {
    if (editingBallIndex !== null) {
      // Edit existing ball
      const newCurrentOverBalls = [...currentOverBalls];
      newCurrentOverBalls[editingBallIndex] = {
        ...newCurrentOverBalls[editingBallIndex],
        isWicket: true,
        wicketType,
        runs: 0
      };
      setCurrentOverBalls(newCurrentOverBalls);
      setEditingBallIndex(null);
    } else {
      // Add new ball
      const newBall = {
        runs: 0,
        isNoBall: false,
        isFreeHit: false,
        isWicket: true,
        wicketType
      };
      
      const newCurrentOverBalls = [...currentOverBalls, newBall];
      setCurrentOverBalls(newCurrentOverBalls);

      // Increment ball count
      const newBallCount = currentBall + 1;
      setCurrentBall(newBallCount);
    }
    setShowWicketModal(false);

    // If over is complete (6 balls)
    if (currentBall + 1 === 6) {
      setOvers([...overs, {
        overNumber: currentOver + 1,
        balls: currentOverBalls,
        totalRuns: currentOverBalls.reduce((sum, ball) => sum + ball.runs, 0)
      }]);
      setCurrentBall(0);
      setCurrentOver(currentOver + 1);
      setCurrentOverBalls([]);
    }
  };

  const handleBallClick = (index) => {
    setSelectedBallIndex(selectedBallIndex === index ? null : index);
  };

  const handleEditBall = (index) => {
    setEditingBallIndex(index);
    setSelectedBallIndex(null);
    const ball = currentOverBalls[index];
    if (ball.isWicket) {
      setShowWicketModal(true);
    } else {
      setIsNoBall(ball.isNoBall);
      setIsFreeHit(ball.isFreeHit);
      setShowRunsModal(true);
    }
  };

  const handleDiscardBall = (index) => {
    setShowConfirmDiscard(index);
    setSelectedBallIndex(null);
  };

  const confirmDiscardBall = (index) => {
    const newCurrentOverBalls = currentOverBalls.filter((_, i) => i !== index);
    setCurrentOverBalls(newCurrentOverBalls);
    
    // Adjust ball count
    const newBallCount = currentBall - 1;
    setCurrentBall(newBallCount);
    setShowConfirmDiscard(null);
  };

  const handleCloseModal = () => {
    setShowRunsModal(false);
    setShowWicketModal(false);
    setIsNoBall(false);
    setIsFreeHit(false);
    setEditingBallIndex(null);
    setShowConfirmDiscard(null);
  };

  const handleFreeHit = () => {
    setIsFreeHit(true);
    setShowRunsModal(true);
  };

  return (
    <>
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
            Track balls and runs per over with automated counting
          </p>
          <div className="over-display">
            <span className="current-over">Over: {currentOver}.{currentBall}</span>
          </div>
          <div className="ball-controls">
            <button
              className="nav-button count-button"
              onClick={handleBallCount}
            >
              Count Ball
            </button>
            <button
              className="nav-button no-ball-button"
              onClick={handleNoBall}
            >
              No Ball
            </button>
            <button
              className="nav-button wicket-button"
              onClick={handleWicket}
            >
              Wicket
            </button>
          </div>
        </div>
      </div>

      {/* Runs Selection Modal */}
      {showRunsModal && (
        <div className="runs-modal">
          <div className="runs-modal-content">
            <div className="modal-header">
              <h4>
                {editingBallIndex !== null ? 'Edit Ball' :
                 isNoBall ? 'No Ball - Select Runs' : 
                 isFreeHit ? 'Free Hit - Select Runs' : 
                 'Select Runs for Ball ' + (currentBall + 1)}
              </h4>
              <button className="close-modal-btn" onClick={handleCloseModal}>×</button>
            </div>
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
            {isNoBall && !isFreeHit && (
              <button
                className="free-hit-btn"
                onClick={handleFreeHit}
              >
                Free Hit
              </button>
            )}
          </div>
        </div>
      )}

      {/* Wicket Selection Modal */}
      {showWicketModal && (
        <div className="runs-modal">
          <div className="runs-modal-content">
            <div className="modal-header">
              <h4>Select Wicket Type</h4>
              <button className="close-modal-btn" onClick={handleCloseModal}>×</button>
            </div>
            <div className="wicket-buttons">
              <button
                className="wicket-btn"
                onClick={() => handleWicketSelection('Bowled')}
              >
                Bowled
              </button>
              <button
                className="wicket-btn"
                onClick={() => handleWicketSelection('Caught')}
              >
                Caught
              </button>
              <button
                className="wicket-btn"
                onClick={() => handleWicketSelection('LBW')}
              >
                LBW
              </button>
              <button
                className="wicket-btn"
                onClick={() => handleWicketSelection('Run Out')}
              >
                Run Out
              </button>
              <button
                className="wicket-btn"
                onClick={() => handleWicketSelection('Stumped')}
              >
                Stumped
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Discard Modal */}
      {showConfirmDiscard !== null && (
        <div className="runs-modal">
          <div className="runs-modal-content">
            <div className="modal-header">
              <h4>Confirm Discard</h4>
              <button className="close-modal-btn" onClick={handleCloseModal}>×</button>
            </div>
            <p className="confirm-message">Are you sure you want to discard this ball?</p>
            <div className="confirm-buttons">
              <button className="confirm-btn cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button 
                className="confirm-btn discard"
                onClick={() => confirmDiscardBall(showConfirmDiscard)}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Current Over and History */}
      <div className="overs-history">
        <h4>Current Over</h4>
        {currentOverBalls.length > 0 && (
          <div className="over-card current-over-card">
            <div className="over-number">Over {currentOver + 1}</div>
            <div className="balls-runs">
              {currentOverBalls.map((ball, ballIndex) => (
                <div key={ballIndex} className="ball-container">
                  <span 
                    className={`ball-run ${ball.isNoBall ? 'no-ball' : ''} ${ball.isFreeHit ? 'free-hit' : ''} ${ball.isWicket ? 'wicket' : ''} ${selectedBallIndex === ballIndex ? 'selected' : ''}`}
                    onClick={() => handleBallClick(ballIndex)}
                  >
                    {ball.isWicket ? 'W' : ball.runs}
                    {ball.isNoBall && <span className="ball-indicator">nb</span>}
                    {ball.isFreeHit && <span className="ball-indicator">fh</span>}
                    {ball.isWicket && <span className="ball-indicator">{ball.wicketType}</span>}
                  </span>
                  {selectedBallIndex === ballIndex && (
                    <div className="ball-actions">
                      <button 
                        className="edit-ball-btn"
                        onClick={() => handleEditBall(ballIndex)}
                        title="Edit Ball"
                      >
                        ✎
                      </button>
                      <button 
                        className="discard-ball-btn"
                        onClick={() => handleDiscardBall(ballIndex)}
                        title="Discard Ball"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="over-total">
              Total: {currentOverBalls.reduce((sum, ball) => sum + ball.runs, 0)} runs
            </div>
          </div>
        )}

        {overs.length > 0 && (
          <>
            <h4>Previous Overs</h4>
            {overs.map((over, index) => (
              <div key={index} className="over-card">
                <div className="over-number">Over {over.overNumber}</div>
                <div className="balls-runs">
                  {over.balls.map((ball, ballIndex) => (
                    <span 
                      key={ballIndex} 
                      className={`ball-run ${ball.isNoBall ? 'no-ball' : ''} ${ball.isFreeHit ? 'free-hit' : ''} ${ball.isWicket ? 'wicket' : ''}`}
                    >
                      {ball.isWicket ? 'W' : ball.runs}
                      {ball.isNoBall && <span className="ball-indicator">nb</span>}
                      {ball.isFreeHit && <span className="ball-indicator">fh</span>}
                      {ball.isWicket && <span className="ball-indicator">{ball.wicketType}</span>}
                    </span>
                  ))}
                </div>
                <div className="over-total">
                  Total: {over.totalRuns} runs
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CountCard;