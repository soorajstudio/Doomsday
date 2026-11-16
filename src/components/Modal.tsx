import React, { useEffect } from 'react';
import { MovieRecommendation, SeriesRecommendation, CastMember } from '../data/doomsdayData';

interface ModalProps {
  item: MovieRecommendation | SeriesRecommendation | CastMember | null;
  type: 'movie' | 'series' | 'cast' | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ item, type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  if (type === 'cast') {
    const cast = item as CastMember;
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            &times;
          </button>

          <div className="modal-content">
            <div className="modal-poster-wrap">
              <img src={cast.image} alt={cast.name} className="modal-poster" />
            </div>

            <div className="modal-info">
              <div className="modal-header">
                <span className="modal-tag tag-cast">
                  AVENGERS: DOOMSDAY • CAST DOSSIER
                </span>
                <h2 className="modal-title">{cast.character}</h2>
                <h4 className="modal-subtitle emerald-text">
                  Portrayed by {cast.name}
                </h4>
              </div>

              <div className="modal-field">
                <span className="field-label">Imperial Designation:</span>
                <span className="field-value">{cast.role}</span>
              </div>

              <div className="modal-decree-box">
                <span className="decree-stamp">MULTIVERSE DOSSIER &amp; PROFILE</span>
                <p className="decree-text">
                  "{cast.bio}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isMovie = type === 'movie';
  const movie = isMovie ? (item as MovieRecommendation) : null;
  const series = !isMovie ? (item as SeriesRecommendation) : null;
  const mediaItem = item as MovieRecommendation | SeriesRecommendation;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="modal-content">
          <div className="modal-poster-wrap">
            <img src={mediaItem.image} alt={mediaItem.title} className="modal-poster" />
          </div>

          <div className="modal-info">
            <div className="modal-header">
              <span className={`modal-tag ${isMovie ? 'tag-domain' : 'tag-threat'}`}>
                {isMovie ? `MCU FILM • ${movie!.phase.toUpperCase()}` : `MARVEL SERIES • ${series!.phase.toUpperCase()}`}
              </span>
              <h2 className="modal-title">{mediaItem.title}</h2>
              <h4 className="modal-subtitle">
                {isMovie ? `${movie!.year} • ${movie!.runtime}` : `${series!.year} • ${series!.seasons} (${series!.episodes})`}
              </h4>
            </div>

            <p className="modal-body-text">{mediaItem.description}</p>

            <div className="modal-field">
              <span className="field-label">Key Characters:</span>
              <span className="field-value">{mediaItem.characters.join(', ')}</span>
            </div>

            <div className="modal-decree-box">
              <span className="decree-stamp">ROAD TO AVENGERS: DOOMSDAY INTEL</span>
              <p className="decree-text">
                "{mediaItem.connection}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
