import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './FloatingCardsSection.css';

const FloatingCardsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  const cards = [
    { id: 1, color: '#FF006E', y: useTransform(scrollYProgress, [0, 0.5], [-20, 20]) },
    { id: 2, color: '#9333EA', y: useTransform(scrollYProgress, [0, 0.5], [0, -15]) },
    { id: 3, color: '#06B6D4', y: useTransform(scrollYProgress, [0, 0.5], [10, 25]) },
  ];

  return (
    <section ref={sectionRef} className="floating-cards-section section">
      <motion.div className="floating-cards-content" style={{ opacity }}>
        <h2 className="floating-cards-text">
          Whether you're a <span className="highlight-teal">speaker</span>, attendee, or sponsor,{' '}
          <span className="highlight-orange">Girls Who Yap</span> connects{' '}
          <span className="text-muted">culture, community, and opportunity.</span>
        </h2>

        <div className="floating-cards-stack">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="floating-card"
              style={{
                background: card.color,
                scale: cardScale,
                y: card.y,
                rotate: (index - 1) * 4,
                zIndex: 3 - index
              }}
            />
          ))}
        </div>

        <div className="floating-icons">
          <div className="floating-icon">🎤</div>
          <div className="floating-icon">🏆</div>
          <div className="floating-icon">👥</div>
        </div>
      </motion.div>
    </section>
  );
};

export default FloatingCardsSection;
