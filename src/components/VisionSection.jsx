import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Palette, Handshake, Sparkles, DollarSign, Shield, BookOpen, Target, Megaphone } from 'lucide-react';
import './VisionSection.css';

gsap.registerPlugin(ScrollTrigger);

const VisionSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const iconsRef = useRef(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    const icons = iconsRef.current;

    if (!left || !right || !icons) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(left,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(right,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: right,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      const iconItems = icons.querySelectorAll('.vision-icon-item');
      gsap.fromTo(iconItems,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: icons,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const iconComponents = [
    <Palette key="palette" size={24} />,
    <Handshake key="handshake" size={24} />,
    <Sparkles key="sparkles" size={24} />,
    <DollarSign key="dollar" size={24} />,
    <Shield key="shield" size={24} />,
    <BookOpen key="book" size={24} />,
    <Target key="target" size={24} />,
    <Megaphone key="megaphone" size={24} />
  ];

  return (
    <section ref={sectionRef} className="vision-section section">
      <div className="container vision-container">
        <div ref={leftRef} className="vision-left">
          <div className="vision-icon">
            <Eye size={32} />
          </div>
          <h2 className="vision-headline">
            Pre-Conference Experiences
          </h2>
          <p className="vision-description">
           Smaller, focused pre-conference sessions to learn, connect, and collaborate.

          </p>

          <button className="vision-learn-btn">Learn More</button>


          <div ref={iconsRef} className="vision-icons-grid">
            {iconComponents.map((icon, index) => (
              <div key={index} className="vision-icon-item">
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="vision-right">
          <div className="vision-card-container">
            <div className="vision-tabs">
              <button className="vision-tab active">Experience</button>
            </div>
            <div className="vision-cards-grid">
              {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <motion.div 
                  key={num} 
                  className="vision-grid-card"
                  style={{ background: `hsl(${num * 60}, 70%, 60%)` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
