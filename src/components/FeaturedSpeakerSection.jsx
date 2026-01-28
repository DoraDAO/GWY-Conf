import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import './FeaturedSpeakerSection.css';

const FeaturedSpeakerSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  const avatars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    color: `hsl(${i * 30}, 70%, 60%)`
  }));

  return (
    <section ref={sectionRef} className="featured-speaker-section section">
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="featured-grid-background">
          {avatars.map((avatar, index) => (
            <motion.div
              key={avatar.id}
              className="featured-avatar-small"
              style={{ background: avatar.color }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
          ))}
        </div>

        <motion.div
          className="featured-center-card"
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.02, rotate: 1 }}
        >
          <motion.div 
            className="featured-image" 
            style={{ background: 'var(--gradient-pink-purple)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div style={{ color: 'white', fontWeight: 'bold' }}>Featured Speaker</div>
          </motion.div>
          <motion.button 
            className="featured-like-btn"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={18} fill="currentColor" /> Save
          </motion.button>
          <motion.div 
            className="pill pill-orange featured-username"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            @speaker
          </motion.div>
          <motion.div 
            className="featured-speaker-info"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="featured-speaker-name">Maria Rodriguez</p>
            <p className="featured-speaker-from">from Girls Who Yap</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedSpeakerSection;
