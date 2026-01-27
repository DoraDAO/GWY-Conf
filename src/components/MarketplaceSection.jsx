import { useRef, Fragment } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './MarketplaceSection.css';

const MarketplaceSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
      <motion.div 
        className="container marketplace-container"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* left */}
        <motion.div 
          className="marketplace-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.p 
            className="marketplace-eyebrow"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            E-COMMERCE
          </motion.p>
          <motion.h2 
            className="marketplace-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            Showcase, Sell,<br />
            <span className="text-accent">& acquire arts to</span><br />
            our marketplace.
          </motion.h2>
          <motion.p 
            className="marketplace-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            Dynamic community where artists and buyers seamlessly merge. ArtFusion 
            brings together creators and enthusiasts to share creativity.
          </motion.p>
          <motion.div 
            className="marketplace-cta-group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <a href="#join" className="btn btn-primary">
              Join Now
            </a>
          </motion.div>
        </motion.div>

        {/* right */}
        <div className="marketplace-cards-wrapper">
          {cards.map((card, index) => {
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
              <Fragment key={card.id}>
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
                  whileHover={{ scale: 1.05, rotate: card.rotate + 2 }}
                >
                  <motion.div 
                    className="card-placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="card-art-content"></div>
                  </motion.div>
                </motion.div>
                {card.username && (
                  <motion.div
                    className="card-username-tag"
                    style={{
                      x: useTransform(cardX, (x) => x + 20),
                      y: useTransform(cardY, (y) => y - 40),
                      opacity: cardOpacity,
                      zIndex: card.zIndex + 10
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                  >
                    {card.username}
                  </motion.div>
                )}
              </Fragment>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default MarketplaceSection;
