import { motion } from 'framer-motion';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MarketplaceSection.css';

gsap.registerPlugin(ScrollTrigger);

const MarketplaceSection = () => {

  const [flippedCard, setFlippedCard] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsRef.current;
    
    if (!section || !cardsContainer) return;

    const ctx = gsap.context(() => {
      const cards = cardsContainer.querySelectorAll('.marketplace-feature-card');
      
      gsap.fromTo(cards, 
        {
          opacity: 0,
          scale: 0.6,
          rotationY: -45,
          y: 100,
          z: -200
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          y: 0,
          z: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.to(cards[0], {
        y: -20,
        rotationY: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleActions: 'play none none pause'
        }
      });

      gsap.to(cards[1], {
        y: -15,
        rotationY: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: 0.5,
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleActions: 'play none none pause'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      id: 1,
      title: 'Connect',
      subtitle: 'with community',
      description: 'Join passionate creators, innovators, and changemakers to share ideas, collaborate, and build meaningful connections.',
      buttonText: "Let's Connect",
      buttonLink: '#connect',
      background: 'linear-gradient(135deg, #C41E5B 0%, #E91E63 100%)',
      textColor: '#ffffff',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
          <circle cx="12" cy="12" r="3" fill="#fff"/>
        </svg>
      ),

  const cards = [
    {
      id: 1,
      title: 'Meets',
      subtitle: 'new people',
      description: 'Creators and enthusiasts to share, discover, and purchase unique artworks.',
      buttonText: "Let's Meet",
      buttonLink: '#meet',
      background: 'linear-gradient(135deg, #C41E5B 0%, #E91E63 100%)',
      textColor: '#ffffff',
      icon: '✏️',
      imageType: 'person'
    },
    {
      id: 2,

      title: 'Discover',
      subtitle: 'new opportunities',
      description: 'Explore events, workshops, and networking sessions designed to accelerate your growth and expand your horizons.',
      buttonText: 'Explore Events',
      buttonLink: '#events',
      background: '#FAFAFA',
      textColor: '#000000',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        </svg>
      ),

      title: 'Archive',
      subtitle: 'of new arts',
      description: 'Canvas Carousel is the platform where artists can ride the wave of creativity, showcasing their work to a broad audience.',
      buttonText: 'Archives',
      buttonLink: '#archives',
      background: '#FAFAFA',
      textColor: '#000000',
      icon: '🎨',

      imageType: 'flower'
    }
  ];

  const handleCardClick = (cardId) => {
    setFlippedCard(cardId);
    
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardElement) {
      gsap.to(cardElement, {
        rotationY: 360,
        scale: 0.9,
        y: -30,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setFlippedCard(null);
          gsap.to(cardElement, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    }
  };

  return (

    <section ref={sectionRef} className="marketplace-section section">
      <div ref={cardsRef} className="marketplace-cards-container">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            data-card-id={card.id}

    <section className="marketplace-section section">
      <div className="marketplace-cards-container">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}

            className="marketplace-feature-card"
            style={{
              background: card.background,
              color: card.textColor
            }}

            initial={{ opacity: 0, scale: 0.6, rotateY: -45, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 1.2, 
              delay: index * 0.3,
              ease: [0.4, 0, 0.2, 1] 
            }}
            whileHover={{ 
              scale: 1.05,
              rotateX: 15,
              rotateY: index === 0 ? 15 : -15,
              y: -20,
              z: 50,
              transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
            }}
            whileTap={{ 
              scale: 0.9,
              rotateY: 180,
              y: -30,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            onClick={() => handleCardClick(card.id)}
          >

            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              ease: [0.4, 0, 0.2, 1] 
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Icon */}

            <motion.div 
              className="card-icon"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.2) }}

              whileHover={{ 
                scale: 1.1, 
                rotateZ: 10,
                transition: { duration: 0.2 } 
              }}

            >
              {card.icon}
            </motion.div>


            {/* Content */}

            <div className="card-content">
              <motion.h3 
                className="card-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
              >
                {card.title}<br />
                {card.subtitle}
              </motion.h3>
              
              <motion.p 
                className="card-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + (index * 0.2) }}
              >
                {card.description}
              </motion.p>
              
              <motion.a
                href={card.buttonLink}
                className="card-button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.2) }}

                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 } 
                }}

                whileHover={{ scale: 1.05 }}

                whileTap={{ scale: 0.95 }}
              >
                {card.buttonText}
              </motion.a>
            </div>


            <motion.div 
              className={`card-image card-image-${card.imageType}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.2) }}
            ></motion.div>

            {/* Decorative Image */}
            <div className={`card-image card-image-${card.imageType}`}></div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MarketplaceSection;
