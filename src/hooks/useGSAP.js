import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  return { gsap, ScrollTrigger };
};

export const useFadeInUp = (delay = 0) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay,
        ease: 'power3.out',
      }
    );
  }, [delay]);

  return ref;
};

export const useScrollFadeIn = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: options.y || 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 1,
          ease: options.ease || 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: options.start || 'top 85%',
            end: options.end || 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [options.y, options.duration, options.ease, options.start, options.end]);

  return ref;
};

export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

export const useStaggerChildren = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.children;
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: options.y || 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.8,
          stagger: options.stagger || 0.1,
          ease: options.ease || 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: options.start || 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [options.y, options.duration, options.stagger, options.ease, options.start]);

  return ref;
};

export const useScaleOnScroll = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          scale: options.from || 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: options.duration || 1.2,
          ease: options.ease || 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: options.start || 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [options.from, options.duration, options.ease, options.start]);

  return ref;
};

export const useHorizontalScroll = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(element.children);
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => '+=' + element.offsetWidth,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};
