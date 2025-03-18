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
import TrackCard from './components/TrackCard';
import CountCard from './components/CountCard';
import './Dashboard.css';

const Dashboard = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [ballCount, setBallCount] = useState(0);

  const handleCountClick = () => {
    setBallCount(prevCount => prevCount + 1);
  };

  const toggleCounting = () => {
    setIsCounting(!isCounting);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="dashboard-container">
        <TrackCard />
        <CountCard onCountClick={handleCountClick} ballCount={ballCount} toggleCounting={toggleCounting} isCounting={isCounting} />
      </div>
    </div>
  );
};

export default Dashboard;