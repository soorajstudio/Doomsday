import React, { useRef } from 'react';
import { THREATS, ThreatItem } from '../data/doomsdayData';
import { ThreatCard } from './ThreatCard';
import { ChevronLeft, ChevronRight, Skull } from 'lucide-react';

interface ThreatCarouselProps {
  onSelectThreat: (threat: ThreatItem) => void;
}

export const ThreatCarousel: React.FC<ThreatCarouselProps> = ({ onSelectThreat }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section-block">
      <div className="section-header">
        <div className="section-title-wrap">
          <Skull className="section-icon emerald-text" size={24} />
          <div>
            <h2 className="section-title">Threats to the Throne (Vanquished by Doom)</h2>
            <p className="section-desc">Entities and cosmic conquerors that dared contest the absolute authority of God Emperor Doom.</p>
          </div>
        </div>

        <div className="carousel-nav-arrows">
          <button className="nav-arrow-btn" onClick={() => scroll('left')} aria-label="Previous Threats">
            <ChevronLeft size={20} />
          </button>
          <button className="nav-arrow-btn" onClick={() => scroll('right')} aria-label="Next Threats">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel-track-container" ref={scrollRef}>
        <div className="carousel-track">
          {THREATS.map((threat) => (
            <ThreatCard key={threat.id} threat={threat} onClick={onSelectThreat} />
          ))}
        </div>
      </div>
    </section>
  );
};
