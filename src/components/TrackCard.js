import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const TrackCard = ({ onAnalysis }) => {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [metrics, setMetrics] = useState({
    speed: null,
    spin: null,
    swing: null
  });
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const finalMetricsRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleAdminPanel = () => {
    stopCamera();
    setIsFullScreen(false);
    navigate('/dashboard');
  };

  // Simulated ball tracking - replace with actual tracking logic
  const simulateTracking = () => {
    setIsTracking(true);
    let currentMetrics = {
      speed: 85,
      spin: 0.1,
      swing: 23.2
    };

    // Reset final metrics
    finalMetricsRef.current = null;

    // Simulate real-time updates
    const updateInterval = setInterval(() => {
      currentMetrics = {
        speed: Math.floor(Math.random() * (95 - 75) + 75), // 75-95 mph
        spin: (Math.random() * 0.5).toFixed(1), // 0.0-0.5 degrees
        swing: (Math.random() * (25 - 20) + 20).toFixed(1) // 20-25 degrees
      };
      setMetrics(currentMetrics);
      // Store the latest metrics in ref
      finalMetricsRef.current = currentMetrics;
    }, 500);

    // Stop after 3 seconds and save the final metrics
    setTimeout(() => {
      clearInterval(updateInterval);
      setIsTracking(false);
      // Use the stored final metrics for analysis
      if (finalMetricsRef.current) {
        onAnalysis(finalMetricsRef.current);
      }
    }, 3000);
  };

  const handleTrack = () => {
    setIsFullScreen(true);
    startCamera();
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    stopCamera();
    setMetrics({
      speed: null,
      spin: null,
      swing: null
    });
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <>
      {/* Full-Screen Camera View */}
      {isFullScreen && (
        <div className="camera-overlay">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="camera-view"
          />
          <canvas ref={canvasRef} className="tracking-canvas" />
          
          {/* Time and Battery Status */}
          <div className="status-bar">
            <span className="time">08:06</span>
            <span className="battery">
              <i className="fas fa-battery-full"></i>
            </span>
          </div>

          {/* Metrics Display */}
          <div className="metrics-container">
            <div className="metric-box">
              <div className="metric-label">Speed</div>
              <div className="metric-value">
                {metrics.speed ? `${metrics.speed} mph` : '85 mph'}
              </div>
            </div>
            
            <div className="metric-box">
              <div className="metric-label">Spin</div>
              <div className="metric-value">
                {metrics.spin ? `${metrics.spin}°` : '0.1°'}
              </div>
            </div>
            
            <div className="metric-box">
              <div className="metric-label">Swing</div>
              <div className="metric-value">
                {metrics.swing ? `${metrics.swing}°` : '23.2°'}
              </div>
            </div>
          </div>

          {/* Admin Panel Button */}
          <button 
            className="admin-panel-btn"
            onClick={handleAdminPanel}
          >
            Admin Panel
          </button>

          {/* Ball Tracking Line */}
          {isTracking && <div className="tracking-line" />}

          {/* Camera Controls */}
          <div className="camera-controls">
            <button 
              className="control-button track-btn"
              onClick={simulateTracking}
              disabled={isTracking}
            >
              {isTracking ? 'Tracking...' : 'Track Ball'}
            </button>
            <button 
              className="control-button close-btn"
              onClick={closeFullScreen}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Track Card */}
      <div className="card">
        <div className="card-image">
          <img
            src="/trackcard.jpg"
            alt="Track the Ball"
            className="card-img"
          />
        </div>
        <div className="card-content">
          <h2 className="card-title">Track Ball</h2>
          <p className="card-description">
            Analyze ball speed, spin, and swing with AI-powered tracking
          </p>
          <button
            className="nav-button track-button"
            onClick={handleTrack}
          >
            Start Tracking
          </button>
        </div>
      </div>
    </>
  );
};

export default TrackCard;