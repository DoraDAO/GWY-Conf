import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const card1Y = useTransform(scrollYProgress, [0, 0.5], [0, -400]);
  const card1X = useTransform(scrollYProgress, [0, 0.5], [0, -300]);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.5], [2, -45]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  
  const card2Y = useTransform(scrollYProgress, [0, 0.5], [0, -350]);
  const card2X = useTransform(scrollYProgress, [0, 0.5], [0, -180]);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  
  const card3Y = useTransform(scrollYProgress, [0, 0.5], [0, -300]);
  const card3X = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const card3Rotate = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const card3Scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const card4Y = useTransform(scrollYProgress, [0, 0.5], [0, -300]);
  const card4X = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const card4Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const card4Scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const card5Y = useTransform(scrollYProgress, [0, 0.5], [0, -350]);
  const card5X = useTransform(scrollYProgress, [0, 0.5], [0, 180]);
  const card5Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 30]);
  const card5Scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  
  const card6Y = useTransform(scrollYProgress, [0, 0.5], [0, -400]);
  const card6X = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
  const card6Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 45]);
  const card6Scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.5], [0, -80]);

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
              opacity: textOpacity, 
              x: card2X, 
              y: useTransform(card2Y, (y) => y - 180),
              scale: card2Scale
            }}
          >
            @doradao
          </motion.div>
          
          <motion.div
            className="pill pill-teal username-pill"
            style={{ 
              opacity: textOpacity, 
              x: card6X, 
              y: useTransform(card6Y, (y) => y - 160),
              scale: card6Scale
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
            <a href="#register" className="btn btn-primary">
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
