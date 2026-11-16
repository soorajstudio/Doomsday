import React, { useRef } from 'react';
import { RECOMMENDED_MOVIES, MovieRecommendation } from '../data/doomsdayData';
import { MovieCard } from './MovieCard';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';

interface MovieCarouselProps {
  onSelectMovie: (movie: MovieRecommendation) => void;
  searchQuery?: string;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({ onSelectMovie, searchQuery = '' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredMovies = RECOMMENDED_MOVIES.filter((movie) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      movie.title.toLowerCase().includes(q) ||
      movie.significance.toLowerCase().includes(q) ||
      movie.characters.some((c) => c.toLowerCase().includes(q)) ||
      movie.phase.toLowerCase().includes(q)
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
    <section id="movies-section" className="lateral-section">
      <div className="lateral-section-header">
        <div className="lateral-title-group">
          <div className="lateral-icon-container">
            <Film size={22} className="lateral-icon-teal" />
          </div>
          <div>
            <h2 className="lateral-section-title">Movies to Watch Before Avengers: Doomsday</h2>
            <p className="lateral-section-subtitle">
              Say Marvel Cinematic Universe: Phase 6 is here, and it all builds towards the epic showdown.
            </p>
          </div>
        </div>

        <div className="lateral-arrow-group">
          <button
            className="lateral-arrow-btn"
            onClick={() => scroll('left')}
            aria-label="Previous Movies"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="lateral-arrow-btn"
            onClick={() => scroll('right')}
            aria-label="Next Movies"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="lateral-carousel-container" ref={scrollRef}>
        <div className="lateral-carousel-track lateral-poster-track">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
            ))
          ) : (
            <div className="lateral-empty-results">No movies match "{searchQuery}"</div>
          )}
        </div>
      </div>
    </section>
  );
};
