import React from 'react';
import { CastMember } from '../data/doomsdayData';

interface CastCardProps {
  cast: CastMember;
  onClick: (cast: CastMember) => void;
}

export const CastCard: React.FC<CastCardProps> = ({ cast, onClick }) => {
  return (
    <div
      className="lateral-cast-card"
      onClick={() => onClick(cast)}
      tabIndex={0}
      role="button"
      aria-label={`${cast.name} as ${cast.character}`}
    >
      <div className="lateral-cast-image-wrap">
        <img
          src={cast.image}
          alt={cast.name}
          loading="lazy"
          className="lateral-cast-img"
        />
        <div className="lateral-cast-gradient"></div>
        
        {/* Top-left status badge */}
        <div className="lateral-cast-badge-wrap">
          <span className="lateral-cast-badge">
            {cast.statusBadge || 'CONFIRMED'}
          </span>
        </div>

        {/* Bottom character & actor labels */}
        <div className="lateral-cast-info">
          <h3 className="lateral-cast-char-name">{cast.character}</h3>
          <p className="lateral-cast-actor-name">{cast.name}</p>
        </div>
      </div>
    </div>
  );
};
