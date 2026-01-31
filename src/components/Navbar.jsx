import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [programOpen, setProgramOpen] = useState(false);
  const [ambassadorOpen, setAmbassadorOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const navRef = useRef(null);

  const handleNavigation = (page, e) => {
    e.preventDefault();
    if (page === 'home') {
      window.location.hash = '';
      setCurrentPage('home');
    } else {
      window.location.hash = page;
      setCurrentPage(page);
    }
    setProgramOpen(false);
    setAmbassadorOpen(false);
    setPartnerOpen(false);
  };
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastScroll = 0;
    
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        if (currentScroll > lastScroll && currentScroll > 100) {
          gsap.to(nav, { y: -100, duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' });
        }
        lastScroll = currentScroll;
      }
    });

    gsap.fromTo(nav, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div className="container navbar-container">
        <a 
          href="#home" 
          className="navbar-logo"
          onClick={(e) => handleNavigation('home', e)}
        >
          <img 
            src="/images/logo.png" 
            alt="logo" 
            className="navbar-logo-img"
          />
          <span className="navbar-logo-text">Girls Who Yap</span>
        </a>
        <div className="navbar-menu">
          <a href="#about" className="navbar-link">About</a>
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
                  <a 
                    href="#leaderboard" 
                    className="dropdown-item"
                    onClick={(e) => handleNavigation('leaderboard', e)}
                  >
                    Leaderboard
                  </a>
                  <a 
                    href="#apply" 
                    className="dropdown-item"
                  >
                    Apply Now
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className="navbar-dropdown"
            onMouseEnter={() => setPartnerOpen(true)}
            onMouseLeave={() => setPartnerOpen(false)}
          >
            <button className="navbar-link dropdown-trigger">
              Partner <span className="dropdown-arrow">▾</span>
            </button>
            <AnimatePresence>
              {partnerOpen && (
                <motion.div
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <a href="#community" className="dropdown-item">Community</a>
                  <a href="#media" className="dropdown-item">Media</a>
                  <a href="#sponsors" className="dropdown-item">Sponsors</a>
                  <a 
                    href="#institutions" 
                    className="dropdown-item"
                    onClick={(e) => handleNavigation('institutions', e)}
                  >
                    Institutions
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="#register" className="btn btn-primary navbar-cta">
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
