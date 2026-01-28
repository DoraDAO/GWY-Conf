import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Ticket } from 'lucide-react';
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
      <motion.div 
        className="container pricing-container"
        initial={{ opacity: 0, rotate: 1 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div 
          className="pricing-left"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div 
            className="pricing-icon"
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Ticket size={32} />
          </motion.div>
          <motion.h2 
            className="pricing-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            Conference Pass
          </motion.h2>
          <motion.p 
            className="pricing-description"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            Join Girls Who Yap for a full day of culture, career workshops, and creative networking.
          </motion.p>
        </motion.div>

        <div className="pricing-tiers">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`pricing-card ${tier.featured ? 'pricing-card-featured' : ''}`}
              initial={{ opacity: 0, y: 40, rotate: -3 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 40, rotate: -3 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1), ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.03, rotate: 1, y: -5 }}
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
      </motion.div>
    </section>
  );
};

export default PricingSection;
