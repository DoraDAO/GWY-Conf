import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SequentialCardsSection.css';

const SequentialCardsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cards = [
    { color: '#F97316', label: 'Speaker 1' },
    { color: '#10B981', label: 'Workshop' },
    { color: '#FDE047', label: 'Bounty' },
    { color: '#991B1B', label: 'Networking' },
    { color: '#3B82F6', label: 'Panel' },
  ];

  return (
    <section ref={sectionRef} className="sequential-cards-section section">
      <div className="container sequential-container">
        <motion.div 
          className="sequential-left"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="sequential-thumbnail" style={{ background: 'var(--gradient-pink-purple)' }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>GWY</span>
          </div>
          <h2 className="sequential-headline">Where Women Meet Opportunity</h2>
          <p className="sequential-subtitle">CULTURE & CAREER</p>
          <p className="sequential-description">
            Allowing speakers to showcase their voice and attendees to find 
            unique, inspiring sessions.
          </p>
        </motion.div>

        <div className="sequential-right">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="sequential-card"
              style={{ 
                background: card.color,
                rotate: (index - 2) * 3,
                zIndex: index
              }}
              initial={{ opacity: 0, scale: 0.8, y: 60 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1, 
                y: 0 
              } : { 
                opacity: 0, 
                scale: 0.8, 
                y: 60 
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + (index * 0.12),
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="sequential-card-label">{card.label}</div>
            </motion.div>
          ))}
          <motion.div
            className="pill pill-orange username-pill-sequential"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            @gwyspeaker
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SequentialCardsSection;
