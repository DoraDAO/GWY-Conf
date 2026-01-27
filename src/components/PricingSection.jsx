import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './PricingSection.css';

const PricingSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const tiers = [
    { name: 'Early Bird', price: '$79', label: 'Early Bird Special', note: 'Register before March 1st', featured: false },
    { name: 'Standard', price: '$99', label: 'Standard Registration', note: 'Full conference access', featured: true },
    { name: 'VIP', price: '$149', label: 'VIP Experience', note: 'Plus exclusive after-party', featured: false },
  ];

  return (
    <section ref={sectionRef} className="pricing-section section">
      <div className="container pricing-container">
        <motion.div 
          className="pricing-left"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="pricing-icon">🎟️</div>
          <h2 className="pricing-headline">Conference Pass</h2>
          <p className="pricing-description">
            Join Girls Who Yap for a full day of culture, career workshops, and creative networking.
          </p>
        </motion.div>

        <div className="pricing-tiers">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`pricing-card ${tier.featured ? 'pricing-card-featured' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
            >
              {tier.featured && <div className="pricing-badge">Popular</div>}
              <p className="pricing-tier-label">{tier.label}</p>
              <div className="pricing-price">
                <span className="pricing-currency">$</span>
                <span className="pricing-amount">{tier.price.replace('$', '')}</span>
                <span className="pricing-period">.99</span>
              </div>
              <p className="pricing-note">{tier.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
