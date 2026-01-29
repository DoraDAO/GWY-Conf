import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mic, Trophy, Users } from 'lucide-react';
import './FloatingCardsSection.css';

const FloatingCardsSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const card1X = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -600, -800]);
  const card1Y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -100, -150]);
  const card1Rotate = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -25, -35]);
  const card1RotateY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -30, -45]);
  const card1Scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.8, 0.6]);
  
  const card2X = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -350, -500]);
  const card2Y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 50, 80]);
  const card2Rotate = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -15, -20]);
  const card2RotateY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -20, -30]);
  const card2Scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.85, 0.7]);
  
  const card3X = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 350, 500]);
  const card3Y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -50, -80]);
  const card3Rotate = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 15, 20]);
  const card3RotateY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 20, 30]);
  const card3Scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.85, 0.7]);

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.3, 0.7, 1]);
  const textScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.95, 1, 1.05]);

  const cards = [
    { id: 1, color: '#FF006E', x: card1X, y: card1Y, rotate: card1Rotate, rotateY: card1RotateY, scale: card1Scale },
    { id: 2, color: '#9333EA', x: card2X, y: card2Y, rotate: card2Rotate, rotateY: card2RotateY, scale: card2Scale },
    { id: 3, color: '#06B6D4', x: card3X, y: card3Y, rotate: card3Rotate, rotateY: card3RotateY, scale: card3Scale },
  ];

  const iconComponents = [
    <Mic key="mic" size={24} />,
    <Trophy key="trophy" size={24} />,
    <Users key="users" size={24} />
  ];

  return (
    <section ref={sectionRef} className="floating-cards-section section">
      <div className="floating-cards-content">
        <motion.h2 
          className="floating-cards-text"
          style={{ 
            opacity: textOpacity,
            scale: textScale
          }}
        >
          Whether you're a <span className="highlight-teal">speaker</span>, attendee, or sponsor,{' '}
          <span className="highlight-orange">Girls Who Yap</span> connects{' '}
          <span className="text-muted">culture, community, and opportunity.</span>
        </motion.h2>

        <div className="floating-cards-stack">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="floating-card"
              style={{
                background: card.color,
                x: card.x,
                y: card.y,
                rotate: card.rotate,
                rotateY: card.rotateY,
                scale: card.scale,
                zIndex: 3 - index,
              }}
            />
          ))}
        </div>

        <div className="floating-icons">
          {iconComponents.map((icon, index) => (
            <motion.div 
              key={index}
              className="floating-icon"
              animate={{ 
                y: [0, -15, 0]
              }}
              transition={{ 
                duration: 2.5 + (index * 0.3),
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.3, 
                rotateY: 180,
                transition: { duration: 0.4 }
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FloatingCardsSection;
