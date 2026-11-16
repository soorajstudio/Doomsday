import React, { useRef } from 'react';
import { DOOMSDAY_CAST, CastMember } from '../data/doomsdayData';
import { CastCard } from './CastCard';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

interface CastCarouselProps {
  onSelectCast: (cast: CastMember) => void;
  searchQuery?: string;
}

export const CastCarousel: React.FC<CastCarouselProps> = ({ onSelectCast, searchQuery = '' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredCast = DOOMSDAY_CAST.filter((cast) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cast.name.toLowerCase().includes(q) ||
      cast.character.toLowerCase().includes(q) ||
      cast.role.toLowerCase().includes(q)
    );
  });

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
    <section id="cast-section" className="lateral-section">
      <div className="lateral-section-header">
        <div className="lateral-title-group">
          <div className="lateral-icon-container">
            <Users size={22} className="lateral-icon-teal" />
          </div>
          <div>
            <h2 className="lateral-section-title">Cast &amp; Characters: Avengers Doomsday</h2>
            <p className="lateral-section-subtitle">
              The legendary Avengers, brought together once again for the ultimate showdown.
            </p>
          </div>
        </div>

        <div className="lateral-arrow-group">
          <button
            className="lateral-arrow-btn"
            onClick={() => scroll('left')}
            aria-label="Previous Cast Members"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="lateral-arrow-btn"
            onClick={() => scroll('right')}
            aria-label="Next Cast Members"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="lateral-carousel-container" ref={scrollRef}>
        <div className="lateral-carousel-track lateral-cast-track">
          {filteredCast.length > 0 ? (
            filteredCast.map((cast) => (
              <CastCard key={cast.id} cast={cast} onClick={onSelectCast} />
            ))
          ) : (
            <div className="lateral-empty-results">No cast members match "{searchQuery}"</div>
          )}
        </div>
      </div>
    </section>
  );
};
