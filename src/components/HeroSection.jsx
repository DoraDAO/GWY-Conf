import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const card1Scale = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.95, 0.9]);
  const card1X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, -200, -240]);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.2], [2, -8]);
  
  const card2X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, -120, -140]);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.2], [0, -5]);
  
  const card3X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, -30, -30]);
  const card3Rotate = useTransform(scrollYProgress, [0, 0.2], [0, -2]);
  
  const card4X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 60, 60]);
  const card4Rotate = useTransform(scrollYProgress, [0, 0.2], [0, 2]);
  
  const card5X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 150, 180]);
  const card5Rotate = useTransform(scrollYProgress, [0, 0.2], [0, 5]);
  
  const card6X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 240, 280]);
  const card6Rotate = useTransform(scrollYProgress, [0, 0.2], [0, 8]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.1], [0, 0]);

  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const contentX = useTransform(scrollYProgress, [0.4, 0.5], [-60, 0]);

  const cards = [
    { id: 1, color: '#9333EA', label: 'Girls Who Yap', x: card1X, rotate: card1Rotate, scale: card1Scale },
    { id: 2, color: '#06B6D4', label: 'Bounties', x: card2X, rotate: card2Rotate },
    { id: 3, color: '#F97316', label: 'Speaker', x: card3X, rotate: card3Rotate },
    { id: 4, color: '#FF006E', label: 'Doradao', x: card4X, rotate: card4Rotate },
    { id: 5, color: '#10B981', label: 'Conference', x: card5X, rotate: card5Rotate },
    { id: 6, color: '#3B82F6', label: 'Community', x: card6X, rotate: card6Rotate },
  ];

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-content-wrapper">
        <motion.h1 
          className="hero-headline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ opacity: textOpacity, y: textY }}
        >
          A Community Led Space<br />
          Shaped By People.
        </motion.h1>
        <div className="hero-cards-container">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="hero-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              style={{
                x: card.x,
                rotate: card.rotate,
                scale: card.scale || 1,
                background: card.color,
              }}
            >
              <motion.div 
                className="hero-card-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                {card.label}
              </motion.div>
            </motion.div>
          ))}
          <motion.div
            className="pill pill-purple username-pill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            style={{ opacity: textOpacity, x: card2X, y: -180 }}
          >
            @doradao
          </motion.div>
          <motion.div
            className="pill pill-teal username-pill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            style={{ opacity: textOpacity, x: card6X, y: -160 }}
          >
            @speaker
          </motion.div>
        </div>
        <motion.div 
          className="hero-bottom-content"
          style={{ opacity: contentOpacity, x: contentX }}
        >
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            What started as conversations, late night ideas  and a community that believed in showing up, is now evolving into a space where voices meet opportunity, stories turn into action and women shape what’s next.
          </motion.p>
          <motion.div 
            className="hero-cta-group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.a 
              href="#register" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
            <motion.a 
              href="https://doradao.substack.com/p/girls-who-yap-conf-launch" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read more
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;