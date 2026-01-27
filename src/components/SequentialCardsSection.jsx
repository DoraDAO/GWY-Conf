import { useRef } from 'react';
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
      <motion.div 
        className="container sequential-container"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div 
          className="sequential-left"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div 
            className="sequential-thumbnail" 
            style={{ background: 'var(--gradient-pink-purple)' }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <span style={{ color: 'white', fontWeight: 'bold' }}>GWY</span>
          </motion.div>
          <motion.h2 
            className="sequential-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            Where Women Meet Opportunity
          </motion.h2>
          <motion.p 
            className="sequential-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            CULTURE & CAREER
          </motion.p>
          <motion.p 
            className="sequential-description"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            Allowing speakers to showcase their voice and attendees to find 
            unique, inspiring sessions.
          </motion.p>
        </motion.div>

        <div className="sequential-right">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="sequential-card"
              style={{ 
                background: card.color,
                zIndex: index
              }}
              initial={{ opacity: 0, scale: 0.8, y: 60, rotate: (index - 2) * 5 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotate: (index - 2) * 3
              } : { 
                opacity: 0, 
                scale: 0.8, 
                y: 60,
                rotate: (index - 2) * 5
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + (index * 0.12),
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ scale: 1.05, rotate: (index - 2) * 3 + 2, y: -5 }}
            >
              <motion.div 
                className="sequential-card-label"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (index * 0.12) }}
              >
                {card.label}
              </motion.div>
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
      </motion.div>
    </section>
  );
};

export default SequentialCardsSection;
