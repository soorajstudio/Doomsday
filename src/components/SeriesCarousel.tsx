import React, { useRef } from 'react';
import { RECOMMENDED_SERIES, SeriesRecommendation } from '../data/doomsdayData';
import { SeriesCard } from './SeriesCard';
import { ChevronLeft, ChevronRight, Tv } from 'lucide-react';

interface SeriesCarouselProps {
  onSelectSeries: (series: SeriesRecommendation) => void;
}

export const SeriesCarousel: React.FC<SeriesCarouselProps> = ({ onSelectSeries }) => {
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
          <Tv className="section-icon emerald-text" size={24} />
          <div>
            <h2 className="section-title">Series to Watch Before Avengers: Doomsday</h2>
            <p className="section-desc">Essential Marvel series revealing the Multiverse Tree, TVA operations, and mystical realities.</p>
          </div>
        </div>

        <div className="carousel-nav-arrows">
          <button className="nav-arrow-btn" onClick={() => scroll('left')} aria-label="Previous Series">
            <ChevronLeft size={20} />
          </button>
          <button className="nav-arrow-btn" onClick={() => scroll('right')} aria-label="Next Series">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel-track-container" ref={scrollRef}>
        <div className="carousel-track">
          {RECOMMENDED_SERIES.map((series) => (
            <SeriesCard key={series.id} series={series} onClick={onSelectSeries} />
          ))}
        </div>
      </div>
    </section>
  );
};
