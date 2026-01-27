import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './MarketplaceSection.css';

const MarketplaceSection = () => {
  const sectionRef = useRef(null);
  
  // Track scroll progress for card explosion animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring for animations
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Cards data with positions for the "exploded" layout
  const cards = [
    { 
      id: 1, 
      color: '#8B1A1A', 
      image: 'art1',
      username: '@howard',
      initialX: 0,
      finalX: 50,
      finalY: -20,
      rotate: -8,
      zIndex: 5
    },
    { 
      id: 2, 
      color: '#E63946', 
      image: 'art2',
      username: null,
      initialX: 0,
      finalX: 180,
      finalY: 10,
      rotate: 3,
      zIndex: 6
    },
    { 
      id: 3, 
      color: '#F1FAEE', 
      image: 'art3',
      username: '@robin',
      initialX: 0,
      finalX: 320,
      finalY: -30,
      rotate: 5,
      zIndex: 4
    },
    { 
      id: 4, 
      color: '#457B9D', 
      image: 'art4',
      username: null,
      initialX: 0,
      finalX: 450,
      finalY: 35,
      rotate: -4,
      zIndex: 3
    },
    { 
      id: 5, 
      color: '#FFD60A', 
      image: 'art5',
      username: null,
      initialX: 0,
      finalX: 580,
      finalY: -10,
      rotate: 7,
      zIndex: 2
    },
  ];

  return (
    <section ref={sectionRef} className="marketplace-section section">
      <div className="container marketplace-container">
        {/* Left Content */}
        <motion.div 
          className="marketplace-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="marketplace-eyebrow">
            E-COMMERCE
          </p>
          <h2 className="marketplace-headline">
            Showcase, Sell,<br />
            <span className="text-accent">& acquire arts to</span><br />
            our marketplace.
          </h2>
          <p className="marketplace-description">
            Dynamic community where artists and buyers seamlessly merge. ArtFusion 
            brings together creators and enthusiasts to share creativity.
          </p>
          <div className="marketplace-cta-group">
            <a href="#join" className="btn btn-primary">
              Join Now
            </a>
          </div>
        </motion.div>

        {/* Right - Exploding Cards */}
        <div className="marketplace-cards-wrapper">
          {cards.map((card, index) => {
            // Animate from center to exploded position
            const cardX = useTransform(
              scrollProgress,
              [0.2, 0.5],
              [card.initialX, card.finalX]
            );
            const cardY = useTransform(
              scrollProgress,
              [0.2, 0.5],
              [0, card.finalY]
            );
            const cardRotate = useTransform(
              scrollProgress,
              [0.2, 0.5],
              [0, card.rotate]
            );
            const cardOpacity = useTransform(
              scrollProgress,
              [0.15, 0.3],
              [0, 1]
            );

            return (
              <React.Fragment key={card.id}>
                <motion.div
                  className="marketplace-card-explode"
                  style={{
                    x: cardX,
                    y: cardY,
                    rotate: cardRotate,
                    opacity: cardOpacity,
                    background: card.color,
                    zIndex: card.zIndex
                  }}
                >
                  <div className="card-placeholder">
                    {/* Placeholder for actual images */}
                    <div className="card-art-content"></div>
                  </div>
                </motion.div>

                {/* Username tags */}
                {card.username && (
                  <motion.div
                    className="card-username-tag"
                    style={{
                      x: useTransform(cardX, (x) => x + 20),
                      y: useTransform(cardY, (y) => y - 40),
                      opacity: cardOpacity,
                      zIndex: card.zIndex + 10
                    }}
                  >
                    {card.username}
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
