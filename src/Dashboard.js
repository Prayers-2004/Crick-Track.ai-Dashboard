// import React from 'react';
// import Navbar from './components/Navbar';
// import TrackCard from './components/TrackCard';
// import CountCard from './components/CountCard';
// import './Dashboard.css';

// const Dashboard = () => {
//   return (
//     <div className="page-container">
//       <Navbar />
//       <div className="dashboard-container">
//         <TrackCard />
//         <CountCard />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TrackCard from './components/TrackCard';
import CountCard from './components/CountCard';
import BallHistory from './components/BallHistory';
import './Dashboard.css';

const Dashboard = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [ballCount, setBallCount] = useState(0);
  const [ballHistory, setBallHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Fast',
    'Medium',
    'Spin',
    'Yorker',
    'Bouncer',
    'Swing',
    'Seam'
  ];

  const handleCountClick = () => {
    setBallCount(prevCount => prevCount + 1);
  };

  const handleBallAnalysis = (analysisData) => {
    const newBall = {
      number: ballHistory.length + 1,
      ...analysisData,
      timestamp: new Date(),
    };
    setBallHistory(prev => [newBall, ...prev]);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="dashboard-content">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for a ball type..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          
          <div className="categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="features-container">
            <TrackCard onAnalysis={handleBallAnalysis} />
            <CountCard 
              onCountClick={handleCountClick} 
              ballCount={ballCount} 
              isCounting={isCounting}
              setIsCounting={setIsCounting}
            />
          </div>
          <BallHistory history={ballHistory} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;