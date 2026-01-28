import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Trophy, Users, Calendar, Star, Handshake, Briefcase, Palette } from 'lucide-react';
import './MarqueeSection.css';

const MarqueeSection = () => {
  const sectionRef = useRef(null);
  
  const marqueeText = "Culture • Career • Creativity • Powered by DoraDAO • Women Who Build • Network & Grow • ";
  const iconComponents = [
    <Mic size={20} />, 
    <Trophy size={20} />, 
    <Users size={20} />, 
    <Calendar size={20} />, 
    <Star size={20} />, 
    <Handshake size={20} />, 
    <Briefcase size={20} />, 
    <Palette size={20} />
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="marquee-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="marquee-background">
        <div className="marquee-content">
          <motion.div
            className="marquee-track"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <span className="marquee-text">{marqueeText + marqueeText + marqueeText}</span>
          </motion.div>
        </div>

        <div className="floating-icons-container">
          {iconComponents.map((icon, index) => (
            <motion.div
              key={index}
              className="floating-icon-marquee"
              animate={{
                y: [0, -15, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 3 + (index * 0.4),
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                left: `${(index * 12) + 10}%`,
                top: `${40 + (index % 2) * 20}%`
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default MarqueeSection;
