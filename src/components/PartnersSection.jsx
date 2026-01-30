import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PartnersSection.css';

gsap.registerPlugin(ScrollTrigger);

const PartnersSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  
  const fullText = "Trusted by the best.";

  // Typewriter effect
  useEffect(() => {
    if (isInView && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80); // Typing speed in milliseconds

      return () => clearTimeout(timeout);
    } else if (currentIndex === fullText.length && !typingComplete) {
      // Hide cursor when typing is complete
      setTimeout(() => {
        setShowCursor(false);
        setTypingComplete(true);
      }, 500);
    }
  }, [isInView, currentIndex, fullText, typingComplete]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(header,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  const partners = [
    'Partner 1', 'Partner 2', 'Partner 3', 
    'Partner 4', 'Partner 5', 'Partner 6'
  ];

  const loopedPartners = [...partners, ...partners];

  return (
    <section ref={sectionRef} className="partners-section section">
      <div className="container">
        <div ref={headerRef} className="partners-header">
          <h2 className="partners-headline">
            {displayedText}
            {showCursor && <span className="typewriter-cursor">|</span>}
          </h2>
          <AnimatePresence>
            {typingComplete && (
              <motion.p
                className="partners-subtext text-muted"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                Leading institutions and organizations supporting Girls Who Yap.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="partners-marquee">
          <motion.div
            className="partners-marquee-track"
            animate={{ x: ["0%", "-50%"] }}
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