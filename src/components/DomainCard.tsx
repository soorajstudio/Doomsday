import React from 'react';
import { DomainItem } from '../data/doomsdayData';

interface DomainCardProps {
  domain: DomainItem;
  onClick: (domain: DomainItem) => void;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, onClick }) => {
  return (
    <div className="carousel-card" onClick={() => onClick(domain)} tabIndex={0} role="button">
      <div className="card-image-wrap">
        <img src={domain.image} alt={domain.title} loading="lazy" className="card-image" />
        <div className="card-gradient"></div>
        <div className="card-badge-top">
          <span className={`badge-pill badge-${domain.dangerLevel.toLowerCase()}`}>
            {domain.dangerLevel}
          </span>
        </div>
        <div className="card-info-bottom">
          <h3 className="card-title">{domain.title}</h3>
          <p className="card-subtitle">{domain.subtitle}</p>
        </div>
      </div>
      <div className="card-hover-reveal">
        <span className="reveal-ruler">Ruler: {domain.ruler}</span>
        <span className="reveal-cta">Inspect Sector &rarr;</span>
      </div>
    </div>
  );
};
