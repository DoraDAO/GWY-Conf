import React from 'react';
import { motion } from 'framer-motion';
import './MarqueeSection.css';

const MarqueeSection = () => {
  const marqueeText = "Culture • Career • Creativity • Powered by Doradao • Women Who Build • Network & Grow • ";
  const icons = ['🎤', '🏆', '👥', '📅', '⭐', '🤝', '💼', '🎨'];

  return (
    <section className="marquee-section">
      <div className="marquee-background">
        <div className="marquee-content">
          <motion.div
            className="marquee-track"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <span className="marquee-text">{marqueeText + marqueeText + marqueeText}</span>
          </motion.div>
        </div>

        <div className="floating-icons-container">
          {icons.map((icon, index) => (
            <motion.div
              key={index}
              className="floating-icon-marquee"
              animate={{
                y: [0, -15, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 3 + (index * 0.4),
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                left: `${(index * 12) + 10}%`,
                top: `${40 + (index % 2) * 20}%`
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
