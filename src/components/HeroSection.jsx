import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const spreadDistance = isMobile ? 0.5 : 1;  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const spread = [0, 0.3, 0.7];
  const card1Y = useTransform(scrollYProgress, [0, 0.6], [0, 40]);
  const card1X = useTransform(scrollYProgress, spread, [0, -120 * spreadDistance, -260 * spreadDistance]);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.6], [2, -12]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  
  const card2Y = useTransform(scrollYProgress, [0, 0.6], [0, 20]);
  const card2X = useTransform(scrollYProgress, spread, [0, -80 * spreadDistance, -180 * spreadDistance]);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.6], [1, -8]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94]);
  
  const card3Y = useTransform(scrollYProgress, [0, 0.6], [0, 0]);
  const card3X = useTransform(scrollYProgress, spread, [0, -30 * spreadDistance, -60 * spreadDistance]);
  const card3Rotate = useTransform(scrollYProgress, [0, 0.6], [0, -3]);
  const card3Scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);
  
  const card4Y = useTransform(scrollYProgress, [0, 0.6], [0, 0]);
  const card4X = useTransform(scrollYProgress, spread, [0, 30 * spreadDistance, 60 * spreadDistance]);
  const card4Rotate = useTransform(scrollYProgress, [0, 0.6], [0, 3]);
  const card4Scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);
  
  const card5Y = useTransform(scrollYProgress, [0, 0.6], [0, 20]);
  const card5X = useTransform(scrollYProgress, spread, [0, 80 * spreadDistance, 180 * spreadDistance]);
  const card5Rotate = useTransform(scrollYProgress, [0, 0.6], [1, 8]);
  const card5Scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94]);
  
  const card6Y = useTransform(scrollYProgress, [0, 0.6], [0, 40]);
  const card6X = useTransform(scrollYProgress, spread, [0, 120 * spreadDistance, 260 * spreadDistance]);
  const card6Rotate = useTransform(scrollYProgress, [0, 0.6], [2, 12]);
  const card6Scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.4, 0.6], [40, 0]);

  const cards = [
    { id: 1, color: '#9333EA', label: 'Girls Who Yap', y: card1Y, x: card1X, rotate: card1Rotate, scale: card1Scale, z: 6 },
    { id: 2, color: '#06B6D4', label: 'Bounties', y: card2Y, x: card2X, rotate: card2Rotate, scale: card2Scale, z: 5 },
    { id: 3, color: '#F97316', label: 'Speaker', y: card3Y, x: card3X, rotate: card3Rotate, scale: card3Scale, z: 4 },
    { id: 4, color: '#FF006E', label: 'Doradao', y: card4Y, x: card4X, rotate: card4Rotate, scale: card4Scale, z: 3 },
    { id: 5, color: '#10B981', label: 'Conference', y: card5Y, x: card5X, rotate: card5Rotate, scale: card5Scale, z: 2 },
    { id: 6, color: '#3B82F6', label: 'Community', y: card6Y, x: card6X, rotate: card6Rotate, scale: card6Scale, z: 1 },
  ];

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-content-wrapper">
        <motion.h1 
          className="hero-headline"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          style={{ 
            opacity: textOpacity, 
            y: textY,
          }}
        >
          A Community Led Space<br />
          Shaped By People.
        </motion.h1>
        
        <div className="hero-cards-container">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="hero-card"
              style={{
                x: card.x,
                y: card.y,
                rotate: card.rotate,
                scale: card.scale,
                background: card.color,
                zIndex: card.z,
              }}
            >
              <div className="hero-card-content">
                {card.label}
              </div>
            </motion.div>
          ))}
          
          <motion.div
            className="pill pill-purple username-pill"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.6, 0.7], [0, 1]), 
              x: card2X, 
              y: useTransform(card2Y, (y) => y - 150),
              scale: card2Scale
            }}
          >
            @doradao
          </motion.div>
          
          <motion.div
            className="pill pill-teal username-pill"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.6, 0.7], [0, 1]), 
              x: card5X, 
              y: useTransform(card5Y, (y) => y - 150),
              scale: card5Scale
            }}
          >
            @speaker
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-bottom-content"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <p className="hero-description">
            What started as conversations, late night ideas and a community that believed in showing up, is now evolving into a space where voices meet opportunity, stories turn into action and women shape what's next.
          </p>
          <div className="hero-cta-group">
            <a href="https://forms.gle/GMrrwXAg67THNBN58" className="btn btn-primary">
              Get Started
            </a>
            <a 
              href="https://doradao.substack.com/p/girls-who-yap-conf-launch" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Read more
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
