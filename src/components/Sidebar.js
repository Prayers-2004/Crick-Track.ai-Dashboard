import React from 'react';
import '../Dashboard.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>CricketAI</h2>
      </div>
      <nav className="sidebar-nav">
        <a href="/" className="nav-item active">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="/about" className="nav-item">
          <i className="fas fa-info-circle"></i>
          <span>About Us</span>
        </a>
        <a href="/contact" className="nav-item">
          <i className="fas fa-envelope"></i>
          <span>Contact Us</span>
        </a>
        <a href="/settings" className="nav-item">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar; 