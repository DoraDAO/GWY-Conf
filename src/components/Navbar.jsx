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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false); // Close mobile menu on navigation
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
                  <a 
                    href="#ticket" 
                    className="dropdown-item"
                    onClick={(e) => handleNavigation('ticket', e)}
                  >
                    Ticket
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
        
        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Drawer */}
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">Menu</span>
                <button 
                  className="mobile-menu-close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              
              <div className="mobile-menu-content">
                <a 
                  href="#about" 
                  className="mobile-menu-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                
                {/* Program Dropdown */}
                <div className="mobile-dropdown">
                  <button 
                    className="mobile-dropdown-trigger"
                    onClick={() => setProgramOpen(!programOpen)}
                  >
                    Program <span className={`dropdown-arrow ${programOpen ? 'open' : ''}`}>▾</span>
                  </button>
                  <AnimatePresence>
                    {programOpen && (
                      <motion.div
                        className="mobile-dropdown-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <a 
                          href="#bounty" 
                          className="mobile-dropdown-item"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Bounty
                        </a>
                        <a 
                          href="#meetups" 
                          className="mobile-dropdown-item"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Meetups
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Ambassador Dropdown */}
                <div className="mobile-dropdown">
                  <button 
                    className="mobile-dropdown-trigger"
                    onClick={() => setAmbassadorOpen(!ambassadorOpen)}
                  >
                    Ambassador <span className={`dropdown-arrow ${ambassadorOpen ? 'open' : ''}`}>▾</span>
                  </button>
                  <AnimatePresence>
                    {ambassadorOpen && (
                      <motion.div
                        className="mobile-dropdown-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <a 
                          href="#leaderboard" 
                          className="mobile-dropdown-item"
                          onClick={(e) => handleNavigation('leaderboard', e)}
                        >
                          Leaderboard
                        </a>
                        <a 
                          href="#apply" 
                          className="mobile-dropdown-item"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Apply Now
                        </a>
                        <a 
                          href="#ticket" 
                          className="mobile-dropdown-item"
                          onClick={(e) => handleNavigation('ticket', e)}
                        >
                          Ticket
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Partner Dropdown */}
                <div className="mobile-dropdown">
                  <button 
                    className="mobile-dropdown-trigger"
                    onClick={() => setPartnerOpen(!partnerOpen)}
                  >
                    Partner <span className={`dropdown-arrow ${partnerOpen ? 'open' : ''}`}>▾</span>
                  </button>
                  <AnimatePresence>
                    {partnerOpen && (
                      <motion.div
                        className="mobile-dropdown-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <a 
                          href="#community" 
                          className="mobile-dropdown-item"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Community
                        </a>
                        <a 
                          href="#media" 
                          className="mobile-dropdown-item"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Media
                        </a>
                        <a 
                          href="#sponsors" 
                          className="mobile-dropdown-item"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sponsors
                        </a>
                        <a 
                          href="#institutions" 
                          className="mobile-dropdown-item"
                          onClick={(e) => handleNavigation('institutions', e)}
                        >
                          Institutions
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a 
                  href="#register" 
                  className="btn btn-primary mobile-menu-cta"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
