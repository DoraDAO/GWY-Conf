import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './EditorialSection.css';

const EditorialSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const words = ["Gateway", "to", "bold", "voices."];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="editorial-section section">
      <motion.div 
        className="container editorial-container"
        initial={{ opacity: 0, rotate: -1 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div 
          className="editorial-text"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p 
            className="editorial-eyebrow"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            CLASS BY GIRLS WHO YAP
          </motion.p>
          <h2 className="editorial-headline">
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                style={{ 
                  display: 'inline-block', 
                  marginRight: index < words.length - 1 ? '0.3em' : 0,
                  color: index === 2 ? 'var(--color-text-secondary)' : 'var(--color-text-primary)'
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>
        
        <motion.div 
          className="editorial-image-wrapper"
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.95, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.05, rotate: 2, y: -10 }}
        >
          <motion.div 
            className="editorial-image" 
            style={{ background: 'linear-gradient(135deg, #FF006E 0%, #9333EA 100%)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div 
              className="editorial-placeholder-text"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Conference Image
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EditorialSection;
