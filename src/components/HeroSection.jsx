import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  


  // Detect screen size for responsive animations

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  // Responsive spread values
  const spreadDistance = isMobile ? 0.5 : 1; // 50% on mobile
  
  // Extended scroll range for 4-stage animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });


  // 4-STAGE ANIMATION TIMELINE:
  // Stage 1 (0 - 0.15): Original stacked position
  // Stage 2 (0.15 - 0.35): Explode/fan out
  // Stage 3 (0.35 - 0.55): Reform back to original
  // Stage 4 (0.55 - 0.85): Transition down to next section
  
  const spread = spreadDistance;
  
  // Card 1 (leftmost) - moves UP and left in stage 2, returns in stage 3, moves down-left in stage 4
  const card1Y = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -180, -180, 0, 700]
  );
  const card1X = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -260 * spread, -260 * spread, 0, -80 * spread]
  );
  const card1Rotate = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [2, -12, -12, 2, -6]
  );
  const card1Scale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [1, 0.92, 0.92, 1, 0.8]
  );
  
  // Card 2 - moves UP and left, returns, moves down-left
  const card2Y = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -160, -160, 0, 650]
  );
  const card2X = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -180 * spread, -180 * spread, 0, -50 * spread]
  );
  const card2Rotate = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [1, -8, -8, 1, -4]
  );
  const card2Scale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [1, 0.94, 0.94, 1, 0.85]
  );
  
  // Card 3 (left-center) - moves UP and slight left, returns, moves down
  const card3Y = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -140, -140, 0, 600]
  );
  const card3X = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -60 * spread, -60 * spread, 0, -20 * spread]
  );
  const card3Rotate = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -3, -3, 0, -2]
  );
  const card3Scale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [1, 0.96, 0.96, 1, 0.85]
  );
  
  // Card 4 (right-center) - moves UP and slight right, returns, moves down
  const card4Y = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -140, -140, 0, 600]
  );
  const card4X = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, 60 * spread, 60 * spread, 0, 20 * spread]
  );
  const card4Rotate = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, 3, 3, 0, 2]
  );
  const card4Scale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [1, 0.96, 0.96, 1, 0.85]
  );
  
  // Card 5 - moves UP and right, returns, moves down-right
  const card5Y = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -160, -160, 0, 650]
  );
  const card5X = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, 180 * spread, 180 * spread, 0, 50 * spread]
  );
  const card5Rotate = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [1, 8, 8, 1, 4]
  );
  const card5Scale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [1, 0.94, 0.94, 1, 0.85]
  );
  
  // Card 6 (rightmost) - moves UP and right, returns, moves down-right
  const card6Y = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, -180, -180, 0, 700]
  );
  const card6X = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [0, 260 * spread, 260 * spread, 0, 80 * spread]
  );
  const card6Rotate = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [2, 12, 12, 2, 6]
  );
  const card6Scale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.85], 
    [1, 0.92, 0.92, 1, 0.8]
  );

  // Headline fades out during stage 2
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.3], [0, -50]);

  // Content appears below cards during stage 2 (explode), disappears before reform
  const contentOpacity = useTransform(scrollYProgress, [0.22, 0.27, 0.32, 0.38], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.22, 0.27], [50, 0]);

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
          A conference where women lead the conversation
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
              opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.35, 0.5], [0, 1, 1, 0]), 
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
              opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.35, 0.5], [0, 1, 1, 0]), 
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
          style={{ 
            opacity: contentOpacity, 
            y: contentY,
            x: '-50%'
          }}
        >
          <p className="hero-description">
            GirlsWhoYap Conference is a creator-first gathering for women builders, thinkers, creators, and leaders across tech, web3, AI, design, product, media, and culture.
          </p>
          <div className="hero-cta-group">
            <a href="https://forms.gle/GMrrwXAg67THNBN58" className="btn btn-primary">
              Night Camp
            </a>
            <a 
              href="https://doradao.substack.com/p/girls-who-yap-conf-launch" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Pre-Conf
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
