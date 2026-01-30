import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import './FeaturedSpeakerSection.css';

const FeaturedSpeakerSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  // Scroll-based animation for featured card
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Featured card: scales from 0.2 to 1 early in the scroll (faster)
  const cardScale = useTransform(scrollYProgress, [0.2, 0.4], [0.2, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  
  // Featured card: moves from very top to center as it scales
  const cardY = useTransform(scrollYProgress, [0.2, 0.4], [-400, 0]);
  
  // Background grid: appears only after card has settled in center
  const gridOpacity = useTransform(scrollYProgress, [0.38, 0.5], [0, 1]);
  const gridScale = useTransform(scrollYProgress, [0.38, 0.5], [0.8, 1]);

  const avatars = Array.from({ length: 24 }, (_, i) => ({
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
        <motion.div 
          className="featured-grid-background"
          style={{
            opacity: gridOpacity,
            scale: gridScale
          }}
        >
          {avatars.map((avatar, index) => (
            <div
              key={avatar.id}
              className="featured-avatar-small"
              style={{ background: avatar.color }}
            />
          ))}
        </motion.div>

        <motion.div
          className="featured-center-card"
          style={{ 
            scale: cardScale,
            opacity: cardOpacity,
            y: cardY
          }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="featured-image" 
            style={{ background: 'var(--gradient-pink-purple)' }}
          >
            <div style={{ color: 'white', fontWeight: 'bold' }}>Featured Speaker</div>
          </motion.div>
          <motion.button 
            className="featured-like-btn"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={18} fill="currentColor" /> Save
          </motion.button>
          <motion.div 
            className="pill pill-orange featured-username"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: 1.3, ease: [0.4, 0, 0.2, 1] }}
          >
            @speaker
          </motion.div>
          <motion.div 
            className="featured-speaker-info"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 1.4, ease: [0.4, 0, 0.2, 1] }}
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
