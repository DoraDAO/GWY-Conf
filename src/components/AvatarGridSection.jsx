import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './AvatarGridSection.css';

const AvatarGridSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const textY = useTransform(scrollProgress, [0.2, 0.5], [60, 0]);
  const textOpacity = useTransform(scrollProgress, [0.2, 0.5], [0, 1]);
  const textScale = useTransform(scrollProgress, [0.2, 0.5], [0.96, 1]);
  const topAvatars = [
    { id: 1, left: '5%', top: '10%', color: 'hsl(140, 60%, 50%)', delay: 0 },
    { id: 2, left: '15%', top: '25%', color: 'hsl(280, 65%, 55%)', delay: 0.5 },
    { id: 3, left: '25%', top: '5%', color: 'hsl(200, 60%, 60%)', delay: 1 },
    { id: 4, left: '35%', top: '20%', color: 'hsl(30, 70%, 60%)', delay: 1.5 },
    { id: 5, left: '48%', top: '8%', color: 'hsl(0, 65%, 55%)', delay: 0.3 },
    { id: 6, left: '62%', top: '18%', color: 'hsl(320, 60%, 60%)', delay: 0.8 },
    { id: 7, left: '72%', top: '5%', color: 'hsl(180, 65%, 50%)', delay: 1.2 },
    { id: 8, left: '82%', top: '22%', color: 'hsl(250, 60%, 58%)', delay: 0.6 },
    { id: 9, left: '92%', top: '12%', color: 'hsl(40, 70%, 55%)', delay: 1.8 },
  ];

  const bottomAvatars = [
    { id: 10, left: '3%', top: '75%', color: 'hsl(330, 65%, 60%)', delay: 0.4 },
    { id: 11, left: '12%', top: '68%', color: 'hsl(260, 60%, 55%)', delay: 1.3 },
    { id: 12, left: '22%', top: '80%', color: 'hsl(20, 70%, 58%)', delay: 0.7 },
    { id: 13, left: '34%', top: '72%', color: 'hsl(190, 65%, 52%)', delay: 1.6 },
    { id: 14, left: '44%', top: '82%', color: 'hsl(160, 60%, 50%)', delay: 0.2 },
    { id: 15, left: '56%', top: '70%', color: 'hsl(300, 65%, 60%)', delay: 1.1 },
    { id: 16, left: '66%', top: '78%', color: 'hsl(210, 60%, 55%)', delay: 0.9 },
    { id: 17, left: '78%', top: '68%', color: 'hsl(350, 65%, 58%)', delay: 1.4 },
    { id: 18, left: '88%', top: '75%', color: 'hsl(170, 60%, 52%)', delay: 0.5 },
    { id: 19, left: '95%', top: '82%', color: 'hsl(240, 65%, 60%)', delay: 1.7 },
  ];

  return (
    <section ref={sectionRef} className="avatar-grid-section section">
      <div className="avatar-scattered-container">
        {topAvatars.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            className="avatar-item-scattered"
            style={{
              left: avatar.left,
              top: avatar.top,
              background: avatar.color
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.sin(index) * 5, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 6 + (index * 0.4),
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: avatar.delay
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          />
        ))}
        {bottomAvatars.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            className="avatar-item-scattered"
            style={{
              left: avatar.left,
              top: avatar.top,
              background: avatar.color
            }}
            animate={{
              y: [0, 12, 0],
              x: [0, Math.cos(index) * 5, 0],
              rotate: [2, -2, 2],
            }}
            transition={{
              duration: 5.5 + (index * 0.3),
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: avatar.delay
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          />
        ))}
        <motion.div 
          className="avatar-headline-wrapper"
          style={{
            y: textY,
            opacity: textOpacity,
            scale: textScale
          }}
        >
          <h2 className="avatar-headline">
            You will find yourself among us
          </h2>
          <p className="avatar-subtext">
            Dive into a dynamic community where artists and buyers seamlessly merge.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AvatarGridSection;
