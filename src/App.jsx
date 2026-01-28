import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <HeroSection />
        <HeroTransitionSection />
        <FloatingCardsSection />
        <PartnersSection />
        <VisionSection />
        <FeaturedSpeakerSection />
        <EditorialSection />
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