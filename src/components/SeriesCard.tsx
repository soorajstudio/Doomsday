import React from 'react';
import { SeriesRecommendation } from '../data/doomsdayData';
import { Star, Play } from 'lucide-react';

interface SeriesCardProps {
  series: SeriesRecommendation;
  onClick: (series: SeriesRecommendation) => void;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({ series, onClick }) => {
  return (
    <div
      className="lateral-poster-card"
      onClick={() => onClick(series)}
      tabIndex={0}
      role="button"
      aria-label={`${series.title} (${series.year})`}
    >
      <div className="lateral-poster-wrap">
        <img
          src={series.image}
          alt={series.title}
          loading="lazy"
          className="lateral-poster-img"
        />
        <div className="lateral-poster-gradient"></div>

        {/* Top-Right Star Rating Badge */}
        <div className="lateral-rating-badge">
          <Star size={11} fill="#eab308" color="#eab308" className="star-icon" />
          <span>{series.rating || '7.5'}</span>
        </div>

        {/* Center Circular Play Button */}
        <div className="lateral-center-play">
          <div className="lateral-play-circle">
            <Play size={13} fill="#ffffff" color="#ffffff" style={{ marginLeft: '2px' }} />
          </div>
        </div>

        {/* Bottom Title & Genre/Seasons */}
        <div className="lateral-poster-info">
          <h3 className="lateral-poster-title">{series.title}</h3>
          <p className="lateral-poster-sub">
            {series.seasons} • {series.genres || 'Marvel Studios'}
          </p>
        </div>
      </div>
    </div>
  );
};
