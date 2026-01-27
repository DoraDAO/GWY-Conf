import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './VisionSection.css';

const VisionSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const icons = ['🎨', '🤝', '🔮', '💰', '🛡️', '📚', '🎯', '📢'];

  return (
    <section ref={sectionRef} className="vision-section section">
      <div className="container vision-container">
        <motion.div 
          className="vision-left"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="vision-icon">👁️</div>
          <h2 className="vision-headline">
            Our vision for <span className="text-muted">women in culture and tech.</span>
          </h2>
          <p className="vision-description">
            Every piece of art tells a story. Echoes of Expression allows artists 
            to showcase their personal journeys through their work.
          </p>

          <div className="vision-icons-grid">
            {icons.map((icon, index) => (
              <motion.div
                key={index}
                className="vision-icon-item"
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.4 + (index * 0.08)
                }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="vision-right"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="vision-card-container">
            <div className="vision-tabs">
              <button className="vision-tab active">Business</button>
              <button className="vision-tab">Personal</button>
              <button className="vision-create-btn">+ Create</button>
            </div>
            <div className="vision-cards-grid">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div 
                  key={num} 
                  className="vision-grid-card"
                  style={{ background: `hsl(${num * 60}, 70%, 60%)` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
