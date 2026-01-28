import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, Palette, Handshake, Sparkles, DollarSign, Shield, BookOpen, Target, Megaphone } from 'lucide-react';
import './VisionSection.css';

const VisionSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const iconComponents = [
    <Palette size={24} />,
    <Handshake size={24} />,
    <Sparkles size={24} />,
    <DollarSign size={24} />,
    <Shield size={24} />,
    <BookOpen size={24} />,
    <Target size={24} />,
    <Megaphone size={24} />
  ];

  return (
    <section ref={sectionRef} className="vision-section section">
      <motion.div 
        className="container vision-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div 
          className="vision-left"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div 
            className="vision-icon"
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Eye size={32} />
          </motion.div>
          <motion.h2 
            className="vision-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            Our vision for <span className="text-muted">women in culture and tech.</span>
          </motion.h2>
          <motion.p 
            className="vision-description"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            Every piece of art tells a story. Echoes of Expression allows artists 
            to showcase their personal journeys through their work.
          </motion.p>

          <div className="vision-icons-grid">
            {iconComponents.map((icon, index) => (
              <motion.div
                key={index}
                className="vision-icon-item"
                initial={{ opacity: 0, y: -20, rotate: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: -20, rotate: -10 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + (index * 0.08),
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="vision-right"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div 
            className="vision-card-container"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div 
              className="vision-tabs"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <button className="vision-tab active">Business</button>
              <button className="vision-tab">Personal</button>
              <button className="vision-create-btn">+ Create</button>
            </motion.div>
            <div className="vision-cards-grid">
              {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <motion.div 
                  key={num} 
                  className="vision-grid-card"
                  style={{ background: `hsl(${num * 60}, 70%, 60%)` }}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + (index * 0.08),
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VisionSection;
