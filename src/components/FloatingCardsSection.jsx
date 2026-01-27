import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Mic, Trophy, Users } from 'lucide-react';
import './FloatingCardsSection.css';

const FloatingCardsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  const cards = [
    { id: 1, color: '#FF006E', y: useTransform(scrollYProgress, [0, 0.5], [-20, 20]), rotate: useTransform(scrollYProgress, [0, 0.5], [-5, 5]) },
    { id: 2, color: '#9333EA', y: useTransform(scrollYProgress, [0, 0.5], [0, -15]), rotate: useTransform(scrollYProgress, [0, 0.5], [0, -3]) },
    { id: 3, color: '#06B6D4', y: useTransform(scrollYProgress, [0, 0.5], [10, 25]), rotate: useTransform(scrollYProgress, [0, 0.5], [3, -4]) },
  ];

  const iconComponents = [
    <Mic size={24} />,
    <Trophy size={24} />,
    <Users size={24} />
  ];

  return (
    <section ref={sectionRef} className="floating-cards-section section">
      <motion.div className="floating-cards-content" style={{ opacity }}>
        <motion.h2 
          className="floating-cards-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
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
                scale: cardScale,
                y: card.y,
                rotate: card.rotate,
                zIndex: 3 - index
              }}
              initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
                rotate: (index - 1) * 4
              } : { 
                opacity: 0, 
                scale: 0.7,
                rotate: -10
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + (index * 0.15), 
                ease: [0.4, 0, 0.2, 1] 
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: (index - 1) * 4 + 5,
                y: -10,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
            />
          ))}
        </div>

        <div className="floating-icons">
          {iconComponents.map((icon, index) => (
            <motion.div 
              key={index}
              className="floating-icon"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                y: [0, -8, 0]
              } : { 
                opacity: 0, 
                scale: 0, 
                rotate: -20 
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.5 + (index * 0.1), ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 0.5, delay: 0.5 + (index * 0.1), ease: [0.4, 0, 0.2, 1] },
                rotate: { duration: 0.5, delay: 0.5 + (index * 0.1), ease: [0.4, 0, 0.2, 1] },
                y: {
                  duration: 2 + (index * 0.3),
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.2, 
                rotate: 10,
                transition: { duration: 0.2 }
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FloatingCardsSection;
