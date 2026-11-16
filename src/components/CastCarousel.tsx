import React, { useRef } from 'react';
import { DOOMSDAY_CAST, CastMember } from '../data/doomsdayData';
import { CastCard } from './CastCard';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

interface CastCarouselProps {
  onSelectCast: (cast: CastMember) => void;
}

export const CastCarousel: React.FC<CastCarouselProps> = ({ onSelectCast }) => {
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
    <section id="cast-section" className="section-block">
      <div className="section-header">
        <div className="section-title-wrap">
          <Users className="section-icon emerald-text" size={24} />
          <div>
            <h2 className="section-title">Cast &amp; Characters: Avengers Doomsday</h2>
            <p className="section-desc">The supreme sovereign, cosmic heralds, and multiverse survivors assembled for the ultimate incursion.</p>
          </div>
        </div>

        <div className="carousel-nav-arrows">
          <button className="nav-arrow-btn" onClick={() => scroll('left')} aria-label="Previous Cast">
            <ChevronLeft size={20} />
          </button>
          <button className="nav-arrow-btn" onClick={() => scroll('right')} aria-label="Next Cast">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel-track-container" ref={scrollRef}>
        <div className="carousel-track">
          {DOOMSDAY_CAST.map((cast) => (
            <CastCard key={cast.id} cast={cast} onClick={onSelectCast} />
          ))}
        </div>
      </div>
    </section>
  );
};
