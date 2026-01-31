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

  const card1X = useTransform(scrollYProgress, [0.1, 0.22, 0.4, 0.55, 0.68], [0, 0, 0, -350, -500]);
  const card1Y = useTransform(scrollYProgress, [0.1, 0.22, 0.4, 0.55, 0.68], [-50, -50, -50, -100, -150]);
  const card1RotateY = useTransform(scrollYProgress, [0.1, 0.22, 0.4, 0.55, 0.68], [0, 0, 360, 360, 360]);
  const card1Scale = useTransform(scrollYProgress, [0.1, 0.22, 0.4, 0.55, 0.68], [0, 1, 1, 1, 0.8]);
  const card1Opacity = useTransform(scrollYProgress, [0.1, 0.14, 0.55, 0.68], [0, 1, 1, 0]);
  
  const card2X = useTransform(scrollYProgress, [0.12, 0.24, 0.42, 0.57, 0.7], [0, 0, 0, 0, 0]);
  const card2Y = useTransform(scrollYProgress, [0.12, 0.24, 0.42, 0.57, 0.7], [-50, -50, -50, -80, -130]);
  const card2RotateY = useTransform(scrollYProgress, [0.12, 0.24, 0.42, 0.57, 0.7], [0, 0, 360, 360, 360]);
  const card2Scale = useTransform(scrollYProgress, [0.12, 0.24, 0.42, 0.57, 0.7], [0, 1, 1, 1, 0.8]);
  const card2Opacity = useTransform(scrollYProgress, [0.12, 0.16, 0.57, 0.7], [0, 1, 1, 0]);
  
  const card3X = useTransform(scrollYProgress, [0.14, 0.26, 0.44, 0.59, 0.72], [0, 0, 0, 450, 650]);
  const card3Y = useTransform(scrollYProgress, [0.14, 0.26, 0.44, 0.59, 0.72], [-50, -50, -50, -100, -150]);
  const card3RotateY = useTransform(scrollYProgress, [0.14, 0.26, 0.44, 0.59, 0.72], [0, 0, 360, 360, 360]);
  const card3Scale = useTransform(scrollYProgress, [0.14, 0.26, 0.44, 0.59, 0.72], [0, 1, 1, 1, 0.8]);
  const card3Opacity = useTransform(scrollYProgress, [0.14, 0.18, 0.59, 0.72], [0, 1, 1, 0]);

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.3, 0.7, 1]);
  const textScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.95, 1, 1.05]);

  const cards = [
    { id: 1, color: '#FF006E', x: card1X, y: card1Y, rotateY: card1RotateY, scale: card1Scale, opacity: card1Opacity },
    { id: 2, color: '#9333EA', x: card2X, y: card2Y, rotateY: card2RotateY, scale: card2Scale, opacity: card2Opacity },
    { id: 3, color: '#06B6D4', x: card3X, y: card3Y, rotateY: card3RotateY, scale: card3Scale, opacity: card3Opacity },
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
                rotateY: card.rotateY,
                scale: card.scale,
                opacity: card.opacity,
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
