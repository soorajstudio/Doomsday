import React, { useRef } from 'react';
import { DOMAINS, DomainItem } from '../data/doomsdayData';
import { DomainCard } from './DomainCard';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';

interface DomainCarouselProps {
  onSelectDomain: (domain: DomainItem) => void;
}

export const DomainCarousel: React.FC<DomainCarouselProps> = ({ onSelectDomain }) => {
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
    <section id="domains-section" className="section-block">
      <div className="section-header">
        <div className="section-title-wrap">
          <Compass className="section-icon emerald-text" size={24} />
          <div>
            <h2 className="section-title">Conquered Realities &amp; Battleworld Domains</h2>
            <p className="section-desc">Territories salvaged from the multiversal incursion collapse under imperial rule.</p>
          </div>
        </div>

        <div className="carousel-nav-arrows">
          <button className="nav-arrow-btn" onClick={() => scroll('left')} aria-label="Previous Domains">
            <ChevronLeft size={20} />
          </button>
          <button className="nav-arrow-btn" onClick={() => scroll('right')} aria-label="Next Domains">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel-track-container" ref={scrollRef}>
        <div className="carousel-track">
          {DOMAINS.map((domain) => (
            <DomainCard key={domain.id} domain={domain} onClick={onSelectDomain} />
          ))}
        </div>
      </div>
    </section>
  );
};
