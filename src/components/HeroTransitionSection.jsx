import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./HeroTransitionSection.css";

const HeroTransitionSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  });

  const textOpacity = useTransform(scroll, [0.1, 0.25], [0, 1]);
  const textY = useTransform(scroll, [0.1, 0.25], [30, 0]);

  const explodeProgress = useTransform(scroll, [0.25, 0.65], [0, 1]);

  const buttonOpacity = useTransform(scroll, [0.2, 0.4], [0, 1]);
  const buttonY = useTransform(scroll, [0.2, 0.4], [20, 0]);

  const cards = [
    { id: 1, color: "#06B6D4", label: "Bounties", x: 100, y: 0, r: -4 },
    { id: 2, color: "#9333EA", label: "Girls Who Yap", x: 200, y: 0, r: 6 },
    { id: 3, color: "#FF006E", label: "Doradao", x: 300, y: 0, r: -5 },
    { id: 4, color: "#F97316", label: "Speaker", x: 400, y: 0, r: 7 },
    { id: 5, color: "#10B981", label: "Conference", x: 500, y: 0, r: 5 },
    { id: 6, color: "#3B82F6", label: "Community", x: 250, y: 0, r: -6 }
  ];

  return (
    <section ref={sectionRef} className="hero-transition-section">
      <div className="hero-transition-container">

        {/* LEFT – CTA */}
        <motion.div
          className="cta-content"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Join the Ambassador Program
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Build, lead and grow with Girls Who Yap.
          </motion.p>
          <motion.button
            className="btn btn-primary"
            style={{ opacity: buttonOpacity, y: buttonY }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Now
          </motion.button>
        </motion.div>

        {/* RIGHT – CARDS */}
        <div className="hero-transition-cards">
          {cards.map((card, index) => {
            const x = useTransform(explodeProgress, [0, 1], [0, card.x]);
            const y = useTransform(explodeProgress, [0, 1], [0, card.y]);
            const rotate = useTransform(explodeProgress, [0, 1], [0, card.r]);

            return (
              <motion.div
                key={card.id}
                className="hero-transition-card"
                style={{
                  background: card.color,
                  x,
                  y,
                  rotate,
                  zIndex: 6 - index
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + (index * 0.1),
                  ease: [0.4, 0, 0.2, 1]
                }}
                whileHover={{ scale: 1.05, rotate: card.r + 5 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                >
                  {card.label}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HeroTransitionSection;