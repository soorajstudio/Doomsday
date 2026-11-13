import React from 'react';
import { ThreatItem } from '../data/doomsdayData';

interface ThreatCardProps {
  threat: ThreatItem;
  onClick: (threat: ThreatItem) => void;
}

export const ThreatCard: React.FC<ThreatCardProps> = ({ threat, onClick }) => {
  return (
    <div className="carousel-card threat-card" onClick={() => onClick(threat)} tabIndex={0} role="button">
      <div className="card-image-wrap">
        <img src={threat.image} alt={threat.name} loading="lazy" className="card-image" />
        <div className="card-gradient"></div>
        <div className="card-badge-top">
          <span className={`badge-pill badge-${threat.status.toLowerCase()}`}>
            {threat.status}
          </span>
        </div>
        <div className="card-info-bottom">
          <h3 className="card-title">{threat.name}</h3>
          <p className="card-subtitle">{threat.alias}</p>
        </div>
      </div>
      <div className="card-hover-reveal">
        <span className="reveal-ruler">Fate: {threat.status}</span>
        <span className="reveal-cta">Review Dossier &rarr;</span>
      </div>
    </div>
  );
};
