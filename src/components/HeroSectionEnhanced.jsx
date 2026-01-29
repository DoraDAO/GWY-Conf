import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef(null);
  const contentRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const card1Scale = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.95, 0.9]);
  const card1X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, -200, -240]);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.2], [2, -8]);
  
  const card2X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, -120, -140]);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.2], [0, -5]);
  
  const card3X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, -30, -30]);
  const card3Rotate = useTransform(scrollYProgress, [0, 0.2], [0, -2]);
  
  const card4X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 60, 60]);
  const card4Rotate = useTransform(scrollYProgress, [0, 0.2], [0, 2]);
  
  const card5X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 150, 180]);
  const card5Rotate = useTransform(scrollYProgress, [0, 0.2], [0, 5]);
  
  const card6X = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 240, 280]);
  const card6Rotate = useTransform(scrollYProgress, [0, 0.2], [0, 8]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.1], [0, 0]);

  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const contentX = useTransform(scrollYProgress, [0.4, 0.5], [-60, 0]);

  useEffect(() => {
    const headline = headlineRef.current;
    const cards = cardsRef.current;
    const content = contentRef.current;

    if (!headline || !cards || !content) return;

    const ctx = gsap.context(() => {
      const words = headline.querySelectorAll('.word');
      gsap.fromTo(words,
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.5
        }
      );

      const cardElements = cards.querySelectorAll('.hero-card');
      gsap.fromTo(cardElements,
        { 
          opacity: 0, 
          scale: 0.5,
          y: 100,
          rotation: -20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: (index) => (index - 2.5) * 4,
          duration: 1,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          delay: 0.8
        }
      );

      const pills = cards.querySelectorAll('.username-pill');
      gsap.fromTo(pills,
        { opacity: 0, scale: 0, y: -50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(2)',
          delay: 1.5
        }
      );

      gsap.fromTo(content,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const cards = [
    { id: 1, color: '#9333EA', label: 'Girls Who Yap', x: card1X, rotate: card1Rotate, scale: card1Scale },
    { id: 2, color: '#06B6D4', label: 'Bounties', x: card2X, rotate: card2Rotate },
    { id: 3, color: '#F97316', label: 'Speaker', x: card3X, rotate: card3Rotate },
    { id: 4, color: '#FF006E', label: 'Doradao', x: card4X, rotate: card4Rotate },
    { id: 5, color: '#10B981', label: 'Conference', x: card5X, rotate: card5Rotate },
    { id: 6, color: '#3B82F6', label: 'Community', x: card6X, rotate: card6Rotate },
  ];

  const headlineText = "A Community Led Space Shaped By People.";
  const words = headlineText.split(' ');

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-content-wrapper">
        <h1 ref={headlineRef} className="hero-headline" style={{ opacity: textOpacity, y: textY }}>
          {words.map((word, index) => (
            <span key={index} className="word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
              {word}
              {index === 4 && <br />}
            </span>
          ))}
        </h1>
        <div ref={cardsRef} className="hero-cards-container">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="hero-card"
              style={{
                x: card.x,
                rotate: card.rotate,
                scale: card.scale || 1,
                background: card.color,
              }}
            >
              <div className="hero-card-content">
                {card.label}
              </div>
            </motion.div>
          ))}
          <motion.div
            className="pill pill-purple username-pill"
            style={{ opacity: textOpacity, x: card2X, y: -180 }}
          >
            @doradao
          </motion.div>
          <motion.div
            className="pill pill-teal username-pill"
            style={{ opacity: textOpacity, x: card6X, y: -160 }}
          >
            @speaker
          </motion.div>
        </div>
        <div ref={contentRef} className="hero-bottom-content" style={{ opacity: contentOpacity, x: contentX }}>
          <p className="hero-description">
            What started as conversations, late night ideas and a community that believed in showing up, is now evolving into a space where voices meet opportunity, stories turn into action and women shape what's next.
          </p>
          <div className="hero-cta-group">
            <a href="#register" className="btn btn-primary">
              Get Started
            </a>
            <a 
              href="https://doradao.substack.com/p/girls-who-yap-conf-launch" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
