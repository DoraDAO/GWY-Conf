import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SequentialCardsSection.css';

gsap.registerPlugin(ScrollTrigger);

const SequentialCardsSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const left = leftRef.current;
    const cardsContainer = cardsRef.current;

    if (!left || !cardsContainer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(left,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      const cards = cardsContainer.querySelectorAll('.sequential-card');
      gsap.fromTo(cards,
        { 
          opacity: 0, 
          scale: 0.7,
          y: 80,
          rotation: -15
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: (index) => (index - 2) * 3,
          duration: 0.8,
          stagger: 0.12,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: cardsContainer,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      const pill = cardsContainer.querySelector('.username-pill-sequential');
      if (pill) {
        gsap.fromTo(pill,
          { opacity: 0, scale: 0, rotation: -20 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: pill,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            delay: 0.8
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const cards = [
    { color: '#F97316', label: 'Speaker 1' },
    { color: '#10B981', label: 'Workshop' },
    { color: '#FDE047', label: 'Bounty' },
    { color: '#991B1B', label: 'Networking' },
    { color: '#3B82F6', label: 'Panel' },
  ];

  return (
    <section ref={sectionRef} className="sequential-cards-section section">
      <div className="container sequential-container">
        <div ref={leftRef} className="sequential-left">
          <div 
            className="sequential-thumbnail" 
            style={{ background: 'var(--gradient-pink-purple)' }}
          >
            <span style={{ color: 'white', fontWeight: 'bold' }}>GWY</span>
          </div>
          <h2 className="sequential-headline">
            GWY Night Camp
          </h2>
          <p className="sequential-subtitle">
            Starting from 7th feb.
          </p>
          <p className="sequential-description">
            Designed to ease you into the conference with focused sessions and early connections.
          </p>
        </div>

        <div ref={cardsRef} className="sequential-right">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="sequential-card"
              style={{ 
                background: card.color,
                zIndex: index
              }}
              whileHover={{ scale: 1.05, rotate: (index - 2) * 3 + 2, y: -5 }}
            >
              <div className="sequential-card-label">
                {card.label}
              </div>
            </motion.div>
          ))}
          <div className="pill pill-orange username-pill-sequential">
            @gwyspeaker
          </div>
        </div>
      </div>
    </section>
  );
};

export default SequentialCardsSection;
