import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Card animations based on scroll - smaller spread for compact layout
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

  // Text visible from start - no fade in needed
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.1], [0, 0]);

  // Content reveal (final frame)
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
        {/* Headline */}
        <motion.h1 
          className="hero-headline"
          style={{ opacity: textOpacity, y: textY }}
        >
          A place to display your<br />
          masterpiece.
        </motion.h1>

        {/* Card Stack */}
        <div className="hero-cards-container">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="hero-card"
              style={{
                x: card.x,
                rotate: card.rotate,
                scale: card.scale || 1,
                background: card.color,
              }}
            >
              <div className="hero-card-content">
                {card.label}
              </div>
            </motion.div>
          ))}
          
          {/* Username Pills */}
          <motion.div
            className="pill pill-purple username-pill"
            style={{ opacity: textOpacity, x: card2X, y: -180 }}
          >
            @doradao
          </motion.div>
          <motion.div
            className="pill pill-teal username-pill"
            style={{ opacity: textOpacity, x: card6X, y: -160 }}
          >
            @speaker
          </motion.div>
        </div>

        {/* Content Reveal Section */}
        <motion.div 
          className="hero-bottom-content"
          style={{ opacity: contentOpacity, x: contentX }}
        >
          <p className="hero-description">
            Artists can display their masterpieces, and buyers can discover and<br />
            invest in unique creative works from talented creators.
          </p>
          <div className="hero-cta-group">
            <a href="#register" className="btn btn-primary">
              Join for $9.99/m
            </a>
            <a href="#about" className="btn btn-secondary">
              Read more
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
