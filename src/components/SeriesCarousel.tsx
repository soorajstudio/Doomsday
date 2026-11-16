import React, { useRef } from 'react';
import { RECOMMENDED_SERIES, SeriesRecommendation } from '../data/doomsdayData';
import { SeriesCard } from './SeriesCard';
import { ChevronLeft, ChevronRight, Tv } from 'lucide-react';

interface SeriesCarouselProps {
  onSelectSeries: (series: SeriesRecommendation) => void;
  searchQuery?: string;
}

export const SeriesCarousel: React.FC<SeriesCarouselProps> = ({ onSelectSeries, searchQuery = '' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredSeries = RECOMMENDED_SERIES.filter((series) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      series.title.toLowerCase().includes(q) ||
      series.significance.toLowerCase().includes(q) ||
      series.characters.some((c) => c.toLowerCase().includes(q)) ||
      series.phase.toLowerCase().includes(q)
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
    <section id="series-section" className="lateral-section">
      <div className="lateral-section-header">
        <div className="lateral-title-group">
          <div className="lateral-icon-container">
            <Tv size={22} className="lateral-icon-teal" />
          </div>
          <div>
            <h2 className="lateral-section-title">Series to Watch Before Avengers: Doomsday</h2>
            <p className="lateral-section-subtitle">
              Essential Marvel series revealing the Multiverse Tree, TVA operations, and mystical realities.
            </p>
          </div>
        </div>

        <div className="lateral-arrow-group">
          <button
            className="lateral-arrow-btn"
            onClick={() => scroll('left')}
            aria-label="Previous Series"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="lateral-arrow-btn"
            onClick={() => scroll('right')}
            aria-label="Next Series"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="lateral-carousel-container" ref={scrollRef}>
        <div className="lateral-carousel-track lateral-poster-track">
          {filteredSeries.length > 0 ? (
            filteredSeries.map((series) => (
              <SeriesCard key={series.id} series={series} onClick={onSelectSeries} />
            ))
          ) : (
            <div className="lateral-empty-results">No series match "{searchQuery}"</div>
          )}
        </div>
      </div>
    </section>
  );
};
