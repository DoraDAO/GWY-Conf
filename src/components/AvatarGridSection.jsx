import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './AvatarGridSection.css';

const AvatarGridSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const textY = useTransform(scrollProgress, [0.2, 0.5], [60, 0]);
  const textOpacity = useTransform(scrollProgress, [0.2, 0.5], [0, 1]);
  const textScale = useTransform(scrollProgress, [0.2, 0.5], [0.96, 1]);
  const topAvatars = [
    { id: 1, color: 'hsl(140, 60%, 50%)' },
    { id: 2, color: 'hsl(280, 65%, 55%)' },
    { id: 3, color: 'hsl(200, 60%, 60%)' },
    { id: 4, color: 'hsl(30, 70%, 60%)' },
    { id: 5, color: 'hsl(0, 65%, 55%)' },
    { id: 6, color: 'hsl(320, 60%, 60%)' },
    { id: 7, color: 'hsl(180, 65%, 50%)' },
    { id: 8, color: 'hsl(250, 60%, 58%)' },
    { id: 9, color: 'hsl(40, 70%, 55%)' },
    { id: 10, color: 'hsl(160, 65%, 52%)' },
  ];

  const bottomAvatars = [
    { id: 11, color: 'hsl(330, 65%, 60%)' },
    { id: 12, color: 'hsl(260, 60%, 55%)' },
    { id: 13, color: 'hsl(20, 70%, 58%)' },
    { id: 14, color: 'hsl(190, 65%, 52%)' },
    { id: 15, color: 'hsl(160, 60%, 50%)' },
    { id: 16, color: 'hsl(300, 65%, 60%)' },
    { id: 17, color: 'hsl(210, 60%, 55%)' },
    { id: 18, color: 'hsl(350, 65%, 58%)' },
    { id: 19, color: 'hsl(170, 60%, 52%)' },
    { id: 20, color: 'hsl(240, 65%, 60%)' },
  ];

  const doubledTopAvatars = [...topAvatars, ...topAvatars];
  const doubledBottomAvatars = [...bottomAvatars, ...bottomAvatars];

  return (
    <section ref={sectionRef} className="avatar-grid-section section">
      <div className="avatar-marquee-container">
        <div className="avatar-row avatar-row-top">
          <motion.div
            className="avatar-track"
            animate={{
              x: ['-50%',0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {doubledTopAvatars.map((avatar, index) => (
              <motion.div
                key={`top-${avatar.id}-${index}`}
                className="avatar-item-marquee"
                style={{
                  background: avatar.color,
                }}
                animate={{
                  y: [-25, 0, -25],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.15, 
                }}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="avatar-headline-wrapper"
          style={{
            y: textY,
            opacity: textOpacity,
            scale: textScale,
          }}
        >
          <h2 className="avatar-headline">
            you will find yourself among us
          </h2>
          <p className="avatar-subtext">
            dive into a dynamic community where artists and buyers seamlessly merge
          </p>
        </motion.div>

        <div className="avatar-row avatar-row-bottom">
          <motion.div
            className="avatar-track"
            animate={{
              x: [0, '-50%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {doubledBottomAvatars.map((avatar, index) => (
              <motion.div
                key={`bottom-${avatar.id}-${index}`}
                className="avatar-item-marquee"
                style={{
                  background: avatar.color,
                }}
                animate={{
                  y: [-25, 0, -25],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.12, 
                }}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AvatarGridSection;
