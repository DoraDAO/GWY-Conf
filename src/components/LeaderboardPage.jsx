import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './LeaderboardSection.css';

const LeaderboardPage = () => {
  const pageRef = useRef(null);
  const [totalAmbassadors] = useState(5);
  const [year] = useState(new Date().getFullYear());

  // sample data
  const leaderboardData = [
    {
      position: 1,
      name: "Ambassador 1",
      points: 2450
    },
    {
      position: 2,
      name: "Ambassador 2", 
      points: 2180
    },
    {
      position: 3,
      name: "Ambassador 3",
      points: 1950
    },
    {
      position: 4,
      name: "Ambassador 4",
      points: 1820
    },
    {
      position: 5,
      name: "Ambassador 5",
      points: 1650
    }
  ];

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    gsap.fromTo(page,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }
    );

    const rows = page.querySelectorAll('.leaderboard-row');
    gsap.fromTo(rows,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3
      }
    );
  }, []);

  const getRankIcon = (position) => {
    switch(position) {
      case 1: return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
          <text x="12" y="16" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">1</text>
        </svg>
      );
      case 2: return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="2"/>
          <text x="12" y="16" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">2</text>
        </svg>
      );
      case 3: return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#CD7F32" stroke="#B8860B" strokeWidth="2"/>
          <text x="12" y="16" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">3</text>
        </svg>
      );
      default: return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#666" stroke="#888" strokeWidth="2"/>
          <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{position}</text>
        </svg>
      );
    }
  };

  const getRankClass = (position) => {
    switch(position) {
      case 1: return 'rank-gold';
      case 2: return 'rank-silver';
      case 3: return 'rank-bronze';
      default: return 'rank-default';
    }
  };

  return (
    <div ref={pageRef} className="leaderboard-section">
      <div className="container">
        <div className="leaderboard-header">
          <motion.div 
            className="leaderboard-title-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="leaderboard-title">AMBASSADOR LEADERBOARD</h1>
          </motion.div>
          
          <div className="leaderboard-stats">
            <div className="stat-item">
              <div className="live-indicator">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="6" fill="#FF0000" className="live-dot"/>
                </svg>
                <span className="stat-label">LIVE</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-value">{totalAmbassadors}</span>
              <span className="stat-label">Total Ambassadors</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{year}</span>
            </div>
          </div>
        </div>

        <motion.div 
          className="leaderboard-table"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="table-header">
            <div className="header-cell pos-header">POS</div>
            <div className="header-cell ambassador-header">AMBASSADOR</div>
            <div className="header-cell points-header">POINTS</div>
          </div>

          <div className="table-body">
            {leaderboardData.map((ambassador, index) => (
              <motion.div
                key={ambassador.position}
                className={`leaderboard-row ${getRankClass(ambassador.position)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="rank-cell">
                  <span className="rank-icon">{getRankIcon(ambassador.position)}</span>
                </div>
                
                <div className="ambassador-cell">
                  <div className="ambassador-avatar">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="25" fill="#ff6b35"/>
                      <circle cx="25" cy="20" r="8" fill="#fff"/>
                      <path d="M10 40c0-8.284 6.716-15 15-15s15 6.716 15 15" fill="#fff"/>
                    </svg>
                  </div>
                  <span className="ambassador-name">{ambassador.name}</span>
                </div>
                
                <div className="points-cell">
                  <span className="points-value">{ambassador.points.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;