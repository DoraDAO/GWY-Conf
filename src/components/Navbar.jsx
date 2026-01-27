import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [programOpen, setProgramOpen] = useState(false);
  const [ambassadorOpen, setAmbassadorOpen] = useState(false);

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#home" className="navbar-logo">
          Girls Who Yap
        </a>

        {/* Menu Items */}
        <div className="navbar-menu">
          <a href="#about" className="navbar-link">About</a>
          
          {/* Program Dropdown */}
          <div 
            className="navbar-dropdown"
            onMouseEnter={() => setProgramOpen(true)}
            onMouseLeave={() => setProgramOpen(false)}
          >
            <button className="navbar-link dropdown-trigger">
              Program <span className="dropdown-arrow">▾</span>
            </button>
            <AnimatePresence>
              {programOpen && (
                <motion.div
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <a href="#bounty" className="dropdown-item">Bounty</a>
                  <a href="#meetups" className="dropdown-item">Meetups</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ambassador Dropdown */}
          <div 
            className="navbar-dropdown"
            onMouseEnter={() => setAmbassadorOpen(true)}
            onMouseLeave={() => setAmbassadorOpen(false)}
          >
            <button className="navbar-link dropdown-trigger">
              Ambassador <span className="dropdown-arrow">▾</span>
            </button>
            <AnimatePresence>
              {ambassadorOpen && (
                <motion.div
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <a href="#leaderboard" className="dropdown-item">Leaderboard</a>
                  <a href="#partner" className="dropdown-item">Partner</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#community" className="navbar-link">Community</a>
          <a href="#media" className="navbar-link">Media</a>
          <a href="#sponsors" className="navbar-link">Sponsors</a>
          <a href="#institutions" className="navbar-link">Institutions</a>

          {/* Register CTA */}
          <a href="#register" className="btn btn-primary navbar-cta">
            Register
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
