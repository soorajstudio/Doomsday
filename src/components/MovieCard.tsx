import React from 'react';
import { MovieRecommendation } from '../data/doomsdayData';
import { Star, Play } from 'lucide-react';

interface MovieCardProps {
  movie: MovieRecommendation;
  onClick: (movie: MovieRecommendation) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      className="lateral-poster-card"
      onClick={() => onClick(movie)}
      tabIndex={0}
      role="button"
      aria-label={`${movie.title} (${movie.year})`}
    >
      <div className="lateral-poster-wrap">
        <img
          src={movie.image}
          alt={movie.title}
          loading="lazy"
          className="lateral-poster-img"
        />
        <div className="lateral-poster-gradient"></div>

        {/* Top-Right Star Rating Badge */}
        <div className="lateral-rating-badge">
          <Star size={11} fill="#eab308" color="#eab308" className="star-icon" />
          <span>{movie.rating || '7.5'}</span>
        </div>

        {/* Center Circular Play Button */}
        <div className="lateral-center-play">
          <div className="lateral-play-circle">
            <Play size={13} fill="#ffffff" color="#ffffff" style={{ marginLeft: '2px' }} />
          </div>
        </div>

        {/* Bottom Title & Genre */}
        <div className="lateral-poster-info">
          <h3 className="lateral-poster-title">{movie.title}</h3>
          <p className="lateral-poster-sub">
            {movie.genres || 'Action • Sci-Fi'}
          </p>
        </div>
      </div>
    </div>
  );
};
