import React from 'react';
import { MovieRecommendation } from '../data/doomsdayData';

interface MovieCardProps {
  movie: MovieRecommendation;
  onClick: (movie: MovieRecommendation) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div className="carousel-card" onClick={() => onClick(movie)} tabIndex={0} role="button">
      <div className="card-image-wrap">
        <img src={movie.image} alt={movie.title} loading="lazy" className="card-image" />
        <div className="card-gradient"></div>
        <div className="card-badge-top">
          <span className="badge-pill badge-safe">
            {movie.phase}
          </span>
        </div>
        <div className="card-info-bottom">
          <h3 className="card-title">{movie.title}</h3>
          <p className="card-subtitle">{movie.significance}</p>
        </div>
      </div>
      <div className="card-hover-reveal">
        <span className="reveal-ruler">{movie.year} • {movie.runtime}</span>
        <span className="reveal-cta">Why It Matters &rarr;</span>
      </div>
    </div>
  );
};
