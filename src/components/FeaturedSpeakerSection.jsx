import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './FeaturedSpeakerSection.css';

const FeaturedSpeakerSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  const avatars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    color: `hsl(${i * 30}, 70%, 60%)`
  }));

  return (
    <section ref={sectionRef} className="featured-speaker-section section">
      <div className="container">
        <div className="featured-grid-background">
          {avatars.map((avatar, index) => (
            <motion.div
              key={avatar.id}
              className="featured-avatar-small"
              style={{ background: avatar.color }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
          ))}
        </div>

        <motion.div
          className="featured-center-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="featured-image" style={{ background: 'var(--gradient-pink-purple)' }}>
            <div style={{ color: 'white', fontWeight: 'bold' }}>Featured Speaker</div>
          </div>
          <motion.button 
            className="featured-like-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ❤️ Save
          </motion.button>
          <div className="pill pill-orange featured-username">@speaker</div>
          <div className="featured-speaker-info">
            <p className="featured-speaker-name">Maria Rodriguez</p>
            <p className="featured-speaker-from">from Girls Who Yap</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSpeakerSection;
