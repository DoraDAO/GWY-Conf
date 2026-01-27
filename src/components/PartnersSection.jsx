import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './PartnersSection.css';

const PartnersSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const partners = [
    'Partner 1', 'Partner 2', 'Partner 3', 
    'Partner 4', 'Partner 5', 'Partner 6'
  ];

  // Duplicate array to make seamless loop
  const loopedPartners = [...partners, ...partners];

  return (
    <section ref={sectionRef} className="partners-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="partners-header"
        >
          <h2 className="partners-headline">
            Trusted by the <span style={{ fontWeight: 800 }}>best</span>.
          </h2>
          <p className="partners-subtext text-muted">
            Leading institutions and organizations supporting Girls Who Yap.
          </p>
        </motion.div>

        {/* Marquee wrapper */}
        <div className="partners-marquee">
          <motion.div
            className="partners-marquee-track"
            animate={{ x: ["0%", "-50%"] }} // move left
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {loopedPartners.map((partner, index) => (
              <div key={index} className="partner-logo">
                {partner}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

