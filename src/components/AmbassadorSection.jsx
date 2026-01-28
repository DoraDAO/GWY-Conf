import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, DollarSign, Star, Megaphone, Sparkles, Rocket, Palette, Gem } from 'lucide-react';
import './AmbassadorSection.css';

const AmbassadorSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const buttonY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const card1Rotate = useTransform(scrollYProgress, [0, 0.5], [0, 360]);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.5], [0, -360]);
  const card3Rotate = useTransform(scrollYProgress, [0.2, 0.7], [0, 180]);

  const benefits = [
    { icon: <Target size={32} />, title: 'Exclusive Access', desc: 'Early access to events and content' },
    { icon: <DollarSign size={32} />, title: 'Earn Rewards', desc: 'Get bounties and incentives' },
    { icon: <Star size={32} />, title: 'Build Network', desc: 'Connect with amazing women' },
    { icon: <Megaphone size={32} />, title: 'Amplify Voice', desc: 'Share your story with community' }
  ];

  return (
    <section ref={sectionRef} className="ambassador-section">
      <div className="ambassador-content-wrapper">
        <motion.div 
          className="sticky-join-button"
          style={{ y: buttonY, opacity: buttonOpacity }}
        >
          <motion.button
            className="btn btn-gradient join-now-btn"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={18} /> Join Now <Rocket size={18} />
          </motion.button>
        </motion.div>

        <div className="container">
          <motion.div 
            className="ambassador-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="ambassador-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join the
              </motion.span>{' '}
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Ambassador
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Program
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="ambassador-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              Build, lead, and grow with Girls Who Yap.
            </motion.p>
          </motion.div>
          <div className="ambassador-cards-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="ambassador-card"
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: index % 2 === 0 ? 5 : -5,
                  transition: { duration: 0.3 }
                }}
                style={{
                  rotate: index === 0 ? card1Rotate : index === 1 ? card2Rotate : index === 2 ? card3Rotate : 0
                }}
              >
                <motion.div 
                  className="card-icon"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {benefit.icon}
                </motion.div>
                <motion.h3 
                  className="card-title"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {benefit.title}
                </motion.h3>
                <motion.p 
                  className="card-desc"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {benefit.desc}
                </motion.p>
              </motion.div>
            ))}
          </div>
          <div className="floating-icons">
            <motion.svg
              className="float-icon icon-1"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <circle cx="20" cy="20" r="18" fill="#FF006E" opacity="0.8" />
              <path d="M20 10 L25 20 L20 30 L15 20 Z" fill="white" />
            </motion.svg>

            <motion.svg
              className="float-icon icon-2"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              animate={{ 
                y: [0, 30, 0],
                rotate: [0, -180, -360]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <rect x="10" y="10" width="30" height="30" rx="5" fill="#9333EA" opacity="0.7" />
              <circle cx="25" cy="25" r="8" fill="white" />
            </motion.svg>

            <motion.svg
              className="float-icon icon-3"
              width="35"
              height="35"
              viewBox="0 0 35 35"
              animate={{ 
                y: [0, -25, 0],
                x: [0, 15, 0],
                rotate: [0, 90, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <polygon points="17.5,5 25,20 17.5,30 10,20" fill="#06B6D4" opacity="0.8" />
            </motion.svg>

            <motion.div
              className="float-emoji emoji-1"
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 20, -20, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Star size={24} />
            </motion.div>

            <motion.div
              className="float-emoji emoji-2"
              animate={{ 
                y: [0, 25, 0],
                x: [0, -20, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Gem size={24} />
            </motion.div>

            <motion.div
              className="float-emoji emoji-3"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Palette size={24} />
            </motion.div>
          </div>
          <motion.div 
            className="ambassador-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              Ready to make an impact?
            </motion.p>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now <Rocket size={18} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AmbassadorSection;