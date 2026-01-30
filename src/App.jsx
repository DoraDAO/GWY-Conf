import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HeroTransitionSection from './components/HeroTransitionSection';
import EditorialSection from './components/EditorialSection';
import PartnersSection from './components/PartnersSection';
import FloatingCardsSection from './components/FloatingCardsSection';
import SequentialCardsSection from './components/SequentialCardsSection';
import VisionSection from './components/VisionSection';
import FeaturedSpeakerSection from './components/FeaturedSpeakerSection';
import AvatarGridSection from './components/AvatarGridSection';
import PricingSection from './components/PricingSection';
import MarqueeSection from './components/MarqueeSection';
import MarketplaceSection from './components/MarketplaceSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
       
        <HeroTransitionSection />
         <EditorialSection />
        <FloatingCardsSection />
        <PartnersSection />
        <VisionSection />
        <FeaturedSpeakerSection />
        
        <AvatarGridSection />
        <SequentialCardsSection />
        <PricingSection />
        <MarqueeSection />
        <MarketplaceSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;