import React, { useRef } from "react";
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

  /* -----------------------------
     PHASE 1 – Downward Drift
  ------------------------------*/
  const driftY = useTransform(scroll, [0.1, 0.25], [0, 100]);
  const driftRotate = useTransform(scroll, [0.1, 0.25], [0, 1]);

  /* -----------------------------
     PHASE 2 – Right Explosion
  ------------------------------*/
  const explodeProgress = useTransform(scroll, [0.25, 0.5], [0, 1]);

  /* -----------------------------
     CTA Reveal
  ------------------------------*/
  const ctaOpacity = useTransform(scroll, [0.6, 0.7], [0, 1]);
  const ctaY = useTransform(scroll, [0.6, 0.7], [20, 0]);
  const ctaScale = useTransform(scroll, [0.6, 0.7], [0.95, 1]);

  const cards = [
    { id: 1, color: "#9333EA", label: "Girls Who Yap", x: 280, y: 150, r: 6, z: 5 },
    { id: 2, color: "#06B6D4", label: "Bounties", x: 150, y: 80, r: -4, z: 6 },
    { id: 3, color: "#F97316", label: "Speaker", x: 400, y: 250, r: 7, z: 3 },
    { id: 4, color: "#FF006E", label: "Doradao", x: 320, y: 180, r: -5, z: 4 },
    { id: 5, color: "#10B981", label: "Conference", x: 200, y: 320, r: 5, z: 2 },
    { id: 6, color: "#3B82F6", label: "Community", x: 480, y: 120, r: -6, z: 1 }
  ];

  return (
    <section ref={sectionRef} className="hero-transition-section">
      <div className="hero-transition-container">

        {/* LEFT – CTA */}
        <motion.div
          className="cta-content"
          style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
        >
          <h2>Join the Ambassador Program</h2>
          <p>Build, lead, and grow with Girls Who Yap.</p>
          <motion.button
            className="btn-primary"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Join Now
          </motion.button>
        </motion.div>

        {/* RIGHT – CARDS */}
        <div className="hero-transition-cards">
          {cards.map(card => {
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
                  zIndex: card.z,
                  y: useTransform(
                    scroll,
                    v => driftY.get() + y.get()
                  ),
                  rotateZ: useTransform(
                    scroll,
                    v => driftRotate.get() + rotate.get()
                  )
                }}
              >
                {card.label}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HeroTransitionSection;

