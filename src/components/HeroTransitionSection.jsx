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

  const explodeProgress = useTransform(scroll, [0.1, 0.4], [0, 1]);

  const buttonOpacity = useTransform(scroll, [0.2, 0.4], [0, 1]);
  const buttonY = useTransform(scroll, [0.2, 0.4], [20, 0]);

  // Cards flow from top to bottom, moving rightward with open spacing
  const cards = [
    { id: 1, color: "#06B6D4", label: "Bounties", x: 100, y: -20, r: -3 },
    { id: 2, color: "#9333EA", label: "Girls Who Yap", x: 200, y: 40, r: 4 },
    { id: 3, color: "#FF006E", label: "Doradao", x: 300, y: 100, r: -2 },
    { id: 4, color: "#F97316", label: "Speaker", x: 400, y: 160, r: 5 },
    { id: 5, color: "#10B981", label: "Conference", x: 500, y: 220, r: -4 },
    { id: 6, color: "#3B82F6", label: "Community", x: 600, y: 280, r: 3 }
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
            What you’ll experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
           This is not about passive listening, it’s about active participation.

          </motion.p>
          <motion.button
            className="btn btn-primary"
            style={{ opacity: buttonOpacity, y: buttonY }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </motion.div>

        {/* RIGHT – CARDS */}
        <div className="hero-transition-cards">
          {cards.map((card, index) => {
            const x = useTransform(explodeProgress, [0, 1], [0, card.x]);
            const y = useTransform(explodeProgress, [0, 1], [0, card.y]);
            const rotate = useTransform(explodeProgress, [0, 1], [0, card.r]);
            const cardOpacity = useTransform(scroll, [0, 0.3, 0.5], [0, 0, 1]);

            return (
              <motion.div
                key={card.id}
                className="hero-transition-card"
                style={{
                  background: card.color,
                  x,
                  y,
                  rotate,
                  opacity: cardOpacity,
                  zIndex: 6 - index
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