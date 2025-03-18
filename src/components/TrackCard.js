import React, { useState, useRef, useEffect } from 'react';
import '../Dashboard.css';

const TrackCard = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState('');
  const [ballSpeed, setBallSpeed] = useState(null);
  const [ballSwing, setBallSwing] = useState(null);
  const [ballLength, setBallLength] = useState(null); // Replaced pace with length

  const videoRef = useRef(null);

  // Function to start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setTrackingStatus('Failed to access camera.');
    }
  };

  // Function to stop the camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // Function to simulate ball tracking
  const simulateTracking = () => {
    setIsTracking(true);
    setTrackingStatus('Tracking ball movement...');

    // Simulate ball tracking for 3 seconds
    setTimeout(() => {
      const speed = (Math.random() * 150).toFixed(2); // Random speed between 0 and 150 km/h
      const swing = (Math.random() * 10).toFixed(2); // Random swing between 0 and 10 degrees
      const lengths = ['Short', 'Good', 'Full', 'Yorker', 'Full Toss']; // Possible lengths
      const length = lengths[Math.floor(Math.random() * lengths.length)]; // Random length

      setBallSpeed(speed);
      setBallSwing(swing);
      setBallLength(length); // Set the length of the ball
      setTrackingStatus('Ball movement analyzed successfully!');
      setIsTracking(false);
    }, 3000);
  };

  // Function to handle the Track button click
  const handleTrack = () => {
    setIsFullScreen(true); // Open full-screen mode
    startCamera();
    simulateTracking();
  };

  // Function to close full-screen mode
  const closeFullScreen = () => {
    setIsFullScreen(false);
    stopCamera();
    setBallSpeed(null);
    setBallSwing(null);
    setBallLength(null); // Reset length
    setTrackingStatus('');
  };

  // Cleanup camera on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <>
      {/* Full-Screen Camera */}
      {isFullScreen && (
        <div className="full-screen-overlay">
          <div className="full-screen-content">
            <video ref={videoRef} autoPlay playsInline className="full-screen-video" />
            {trackingStatus && (
              <p className="tracking-status">{trackingStatus}</p>
            )}
            {ballSpeed !== null && (
              <div className="tracking-results">
                <p>Speed: {ballSpeed} km/h</p>
                <p>Swing: {ballSwing}°</p>
                <p>Length: {ballLength}</p> {/* Display length of the ball */}
              </div>
            )}
            <button
              className="nav-button close-button"
              onClick={closeFullScreen}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Track Card */}
      <div className="card track-card">
        <div className="card-image">
          <img
            src="/Track the speed of ball with ai tool.jpg"
            alt="Track the Ball"
            className="card-img"
          />
        </div>
        <div className="card-content">
          <h2 className="card-title">Track the Ball</h2>
          <p className="card-description">
            Analyze ball movement with AI-powered detection technology
          </p>
          <button
            className="nav-button track-button"
            onClick={handleTrack}
            disabled={isTracking}
          >
            {isTracking ? 'Tracking...' : 'Track'}
          </button>
        </div>
      </div>
    </>
  );
};

export default TrackCard;