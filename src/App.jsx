import React from 'react';
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
  return (
    <div className="app">
      <Navbar />
      <main>
        <HeroSection />
        <HeroTransitionSection />
        <EditorialSection />
        <PartnersSection />
        <FloatingCardsSection />
        <SequentialCardsSection />
        <VisionSection />
        <FeaturedSpeakerSection />
        <AvatarGridSection />
        <PricingSection />
        <MarqueeSection />
        <MarketplaceSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
