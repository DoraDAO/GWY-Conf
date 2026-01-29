import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PartnersSection.css';

gsap.registerPlugin(ScrollTrigger);

const PartnersSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
            Trusted by the <span style={{ fontWeight: 800 }}>best</span>.
          </h2>
          <p className="partners-subtext text-muted">
            Leading institutions and organizations supporting Girls Who Yap.
          </p>
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