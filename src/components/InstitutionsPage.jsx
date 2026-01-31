import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './InstitutionsPage.css';

gsap.registerPlugin(ScrollTrigger);

const InstitutionsPage = () => {
  const pageRef = useRef(null);
  const cardsRef = useRef(null);
  const [flippedCard, setFlippedCard] = useState(null);

  useEffect(() => {
    const page = pageRef.current;
    const cardsContainer = cardsRef.current;
    
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

    if (cardsContainer) {
      const cards = cardsContainer.querySelectorAll('.institution-card');
      
      gsap.fromTo(cards, 
        {
          opacity: 0,
          scale: 0.6,
          rotationY: -45,
          y: 100,
          z: -200
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          y: 0,
          z: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainer,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      cards.forEach((card, index) => {
        gsap.to(card, {
          y: -15,
          rotationY: index % 2 === 0 ? 3 : -3,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: index * 0.2,
          scrollTrigger: {
            trigger: cardsContainer,
            start: 'top 50%',
            end: 'bottom 50%',
            toggleActions: 'play none none pause'
          }
        });
      });
    }
  }, []);

  const handleCardClick = (cardId) => {
    setFlippedCard(cardId);
    
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardElement) {
      gsap.to(cardElement, {
        rotationY: 360,
        scale: 0.9,
        y: -30,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setFlippedCard(null);
          gsap.to(cardElement, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    }
  };

  return (
    <div ref={pageRef} className="institutions-page">
      <div className="container">
        <motion.div 
          className="institutions-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="institutions-title">Our Partner Institutions</h1>
          <p className="institutions-subtitle">
            Discover our network of educational and corporate partners supporting Girls Who Yap
          </p>
        </motion.div>

        <motion.div 
          className="institutions-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="institutions-info">
            <h2>Contact</h2>
            <div className="address-info">
              <div className="address-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#ff6b35"/>
                </svg>
                <span>connectdoradao@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="map-container">
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d241294.64898498365!2d72.79635424219836!3d19.09761203283721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s123%20Emergency%20Lane%2C%20Mumbai%2C%20India!5e0!3m2!1sen!2sin!4v1728732339444!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Girls Who Yap Location"
              ></iframe>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="partner-institutions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3>Partner Institutions</h3>
          <div ref={cardsRef} className="institutions-grid">
            <motion.div 
              data-card-id="universities"
              className="institution-card"
              initial={{ opacity: 0, scale: 0.6, rotateY: -45, y: 100 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ 
                scale: 1.05,
                rotateX: 15,
                rotateY: 15,
                y: -20,
                z: 50,
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
              }}
              whileTap={{ 
                scale: 0.9,
                rotateY: 180,
                y: -30,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              onClick={() => handleCardClick('universities')}
            >
              <div className="institution-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#ff6b35"/>
                </svg>
              </div>
              <h4>Universities</h4>
              <p>Leading educational institutions supporting our mission</p>
            </motion.div>
            
            <motion.div 
              data-card-id="corporate"
              className="institution-card"
              initial={{ opacity: 0, scale: 0.6, rotateY: -45, y: 100 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ 
                scale: 1.05,
                rotateX: 15,
                rotateY: -15,
                y: -20,
                z: 50,
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
              }}
              whileTap={{ 
                scale: 0.9,
                rotateY: 180,
                y: -30,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              onClick={() => handleCardClick('corporate')}
            >
              <div className="institution-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="#ff6b35"/>
                </svg>
              </div>
              <h4>Corporate Partners</h4>
              <p>Industry leaders providing mentorship and opportunities</p>
            </motion.div>
            
            <motion.div 
              data-card-id="community"
              className="institution-card"
              initial={{ opacity: 0, scale: 0.6, rotateY: -45, y: 100 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
              transition={{ duration: 1.2, delay: 1.0, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ 
                scale: 1.05,
                rotateX: 15,
                rotateY: 10,
                y: -20,
                z: 50,
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
              }}
              whileTap={{ 
                scale: 0.9,
                rotateY: 180,
                y: -30,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              onClick={() => handleCardClick('community')}
            >
              <div className="institution-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#ff6b35"/>
                  <circle cx="12" cy="12" r="3" fill="#fff"/>
                </svg>
              </div>
              <h4>Community Centers</h4>
              <p>Local hubs fostering community engagement and growth</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InstitutionsPage;