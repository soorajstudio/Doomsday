import React from 'react';
import { CastMember } from '../data/doomsdayData';

interface CastCardProps {
  cast: CastMember;
  onClick: (cast: CastMember) => void;
}

export const CastCard: React.FC<CastCardProps> = ({ cast, onClick }) => {
  return (
    <div
      className="carousel-card cast-card-item"
      onClick={() => onClick(cast)}
      tabIndex={0}
      role="button"
      aria-label={`${cast.name} as ${cast.character}`}
    >
      <div className="card-image-wrap">
        <img
          src={cast.image}
          alt={cast.name}
          loading="lazy"
          className="card-image cast-image"
        />
        <div className="card-gradient"></div>
        <div className="card-badge-top">
          <span className="badge-pill badge-cast">
            {cast.role}
          </span>
        </div>
        <div className="card-info-bottom">
          <h3 className="card-title cast-character-title">{cast.character}</h3>
          <p className="card-subtitle cast-actor-subtitle">{cast.name}</p>
        </div>
      </div>
      <div className="card-hover-reveal">
        <span className="reveal-ruler">Dossier Intel</span>
        <span className="reveal-cta">Character Bio &rarr;</span>
      </div>
    </div>
  );
};
