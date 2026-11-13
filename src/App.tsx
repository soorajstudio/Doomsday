import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DomainCarousel } from './components/DomainCarousel';
import { ThreatCarousel } from './components/ThreatCarousel';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { DomainItem, ThreatItem } from './data/doomsdayData';
import './App.css';

export const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<DomainItem | ThreatItem | null>(null);
  const [activeType, setActiveType] = useState<'domain' | 'threat' | null>(null);

  const handleSelectDomain = (domain: DomainItem) => {
    setActiveItem(domain);
    setActiveType('domain');
  };

  const handleSelectThreat = (threat: ThreatItem) => {
    setActiveItem(threat);
    setActiveType('threat');
  };

  const handleCloseModal = () => {
    setActiveItem(null);
    setActiveType(null);
  };

  return (
    <div className="doomsday-app">
      <Header />
      <main className="main-content">
        <Hero />
        <div className="carousels-container">
          <DomainCarousel onSelectDomain={handleSelectDomain} />
          <ThreatCarousel onSelectThreat={handleSelectThreat} />
        </div>
      </main>
      <Footer />
      <Modal item={activeItem} type={activeType} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
