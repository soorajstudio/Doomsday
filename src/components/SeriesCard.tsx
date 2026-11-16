import React from 'react';
import { SeriesRecommendation } from '../data/doomsdayData';

interface SeriesCardProps {
  series: SeriesRecommendation;
  onClick: (series: SeriesRecommendation) => void;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({ series, onClick }) => {
  return (
    <div className="carousel-card threat-card" onClick={() => onClick(series)} tabIndex={0} role="button">
      <div className="card-image-wrap">
        <img src={series.image} alt={series.title} loading="lazy" className="card-image" />
        <div className="card-gradient"></div>
        <div className="card-badge-top">
          <span className="badge-pill badge-guarded">
            {series.seasons}
          </span>
        </div>
        <div className="card-info-bottom">
          <h3 className="card-title">{series.title}</h3>
          <p className="card-subtitle">{series.significance}</p>
        </div>
      </div>
      <div className="card-hover-reveal">
        <span className="reveal-ruler">{series.episodes}</span>
        <span className="reveal-cta">Series Brief &rarr;</span>
      </div>
    </div>
  );
};
