import React, { useRef } from 'react';
import { RECOMMENDED_MOVIES, MovieRecommendation } from '../data/doomsdayData';
import { MovieCard } from './MovieCard';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';

interface MovieCarouselProps {
  onSelectMovie: (movie: MovieRecommendation) => void;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({ onSelectMovie }) => {
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
    <section id="movies-section" className="section-block">
      <div className="section-header">
        <div className="section-title-wrap">
          <Film className="section-icon emerald-text" size={24} />
          <div>
            <h2 className="section-title">Movies to Watch Before Avengers: Doomsday</h2>
            <p className="section-desc">Key Marvel Cinematic Universe films establishing incursions, the Fantastic Four, and the path to Battleworld.</p>
          </div>
        </div>

        <div className="carousel-nav-arrows">
          <button className="nav-arrow-btn" onClick={() => scroll('left')} aria-label="Previous Movies">
            <ChevronLeft size={20} />
          </button>
          <button className="nav-arrow-btn" onClick={() => scroll('right')} aria-label="Next Movies">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel-track-container" ref={scrollRef}>
        <div className="carousel-track">
          {RECOMMENDED_MOVIES.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
          ))}
        </div>
      </div>
    </section>
  );
};
