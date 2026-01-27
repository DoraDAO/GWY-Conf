import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './EditorialSection.css';

const EditorialSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const words = ["Gateway", "to", "bold", "voices."];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="editorial-section section">
      <div className="container editorial-container">
        <motion.div 
          className="editorial-text"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="editorial-eyebrow">CLASS BY GIRLS WHO YAP</p>
          <h2 className="editorial-headline">
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                style={{ 
                  display: 'inline-block', 
                  marginRight: index < words.length - 1 ? '0.3em' : 0,
                  color: index === 2 ? 'var(--color-text-secondary)' : 'var(--color-text-primary)'
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>
        
        <motion.div 
          className="editorial-image-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="editorial-image" style={{ background: 'linear-gradient(135deg, #FF006E 0%, #9333EA 100%)' }}>
            <div className="editorial-placeholder-text">Conference Image</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialSection;
