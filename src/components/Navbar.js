import React from 'react';
import '../Dashboard.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Cricket Analytics</h1>
      </div>
      <div className="navbar-profile">
        <div className="profile-notifications">
          <i className="fas fa-bell"></i>
        </div>
        <div className="profile-info">
          <span className="profile-name">Mitul</span>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
            alt="Profile"
            className="profile-avatar"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;