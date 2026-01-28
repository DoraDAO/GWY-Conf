import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animationPresets = {
  fadeUp: {
    from: { opacity: 0, y: 80 },
    to: { 
      opacity: 1, 
      y: 0, 
      duration: 1.2, 
      ease: 'power3.out' 
    }
  },

  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { 
      opacity: 1, 
      scale: 1, 
      duration: 1, 
      ease: 'power2.out' 
    }
  },

  slideLeft: {
    from: { opacity: 0, x: -100 },
    to: { 
      opacity: 1, 
      x: 0, 
      duration: 1, 
      ease: 'power3.out' 
    }
  },

  slideRight: {
    from: { opacity: 0, x: 100 },
    to: { 
      opacity: 1, 
      x: 0, 
      duration: 1, 
      ease: 'power3.out' 
    }
  },

  rotateScale: {
    from: { opacity: 0, scale: 0.5, rotation: -20 },
    to: { 
      opacity: 1, 
      scale: 1, 
      rotation: 0, 
      duration: 1.2, 
      ease: 'back.out(1.7)' 
    }
  }
};

export const staggerChildren = (container, options = {}) => {
  const {
    stagger = 0.1,
    duration = 0.8,
    ease = 'power3.out',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 }
  } = options;

  const children = container.children;
  
  gsap.fromTo(children, from, {
    ...to,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
};

export const parallaxEffect = (element, speed = 0.5) => {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

export const horizontalScroll = (container) => {
  const sections = gsap.utils.toArray(container.children);
  
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => '+=' + container.offsetWidth
    }
  });
};

export const magneticButton = (button) => {
  const handleMouseMove = (e) => {
    const { left, top, width, height } = button.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;

    gsap.to(button, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export const revealOnScroll = (element, options = {}) => {
  const {
    start = 'top 85%',
    end = 'top 60%',
    ...animationOptions
  } = options;

  const preset = animationPresets[animationOptions.preset] || animationPresets.fadeUp;

  gsap.fromTo(element, preset.from, {
    ...preset.to,
    scrollTrigger: {
      trigger: element,
      start,
      end,
      toggleActions: 'play none none none'
    }
  });
};

export const splitTextAnimation = (element, options = {}) => {
  const {
    stagger = 0.05,
    duration = 0.8,
    delay = 0
  } = options;

  const text = element.textContent;
  const words = text.split(' ');
  
  element.innerHTML = words.map(word => 
    `<span class="word" style="display: inline-block; overflow: hidden;">
      <span style="display: inline-block;">${word}</span>
    </span>`
  ).join(' ');

  const wordElements = element.querySelectorAll('.word span');

  gsap.fromTo(wordElements,
    { opacity: 0, y: 100, rotateX: -90 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      stagger,
      ease: 'power3.out',
      delay
    }
  );
};

export const cardStackAnimation = (cards, options = {}) => {
  const {
    stagger = 0.1,
    duration = 0.8
  } = options;

  gsap.fromTo(cards,
    { 
      opacity: 0, 
      scale: 0.8,
      y: 60,
      rotation: -10
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      rotation: (index) => (index - cards.length / 2) * 3,
      duration,
      stagger,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: cards[0],
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
};

export const smoothScrollTo = (target, duration = 1.5) => {
  gsap.to(window, {
    scrollTo: { y: target, autoKill: true },
    duration,
    ease: 'power3.inOut'
  });
};

export const pageTransition = (onComplete) => {
  const tl = gsap.timeline({ onComplete });
  
  tl.to('.page-transition', {
    scaleY: 1,
    duration: 0.5,
    ease: 'power3.inOut',
    transformOrigin: 'bottom'
  })
  .to('.page-transition', {
    scaleY: 0,
    duration: 0.5,
    ease: 'power3.inOut',
    transformOrigin: 'top',
    delay: 0.2
  });
};

export default {
  animationPresets,
  staggerChildren,
  parallaxEffect,
  horizontalScroll,
  magneticButton,
  revealOnScroll,
  splitTextAnimation,
  cardStackAnimation,
  smoothScrollTo,
  pageTransition
};
