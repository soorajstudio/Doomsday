import React, { useEffect } from 'react';
import { MovieRecommendation, SeriesRecommendation } from '../data/doomsdayData';

interface ModalProps {
  item: MovieRecommendation | SeriesRecommendation | null;
  type: 'movie' | 'series' | null;
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

  const isMovie = type === 'movie';
  const movie = isMovie ? (item as MovieRecommendation) : null;
  const series = !isMovie ? (item as SeriesRecommendation) : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="modal-content">
          <div className="modal-poster-wrap">
            <img src={item.image} alt={item.title} className="modal-poster" />
          </div>

          <div className="modal-info">
            <div className="modal-header">
              <span className={`modal-tag ${isMovie ? 'tag-domain' : 'tag-threat'}`}>
                {isMovie ? `MCU FILM &bull; ${movie!.phase.toUpperCase()}` : `MARVEL SERIES &bull; ${series!.phase.toUpperCase()}`}
              </span>
              <h2 className="modal-title">{item.title}</h2>
              <h4 className="modal-subtitle">
                {isMovie ? `${movie!.year} &bull; ${movie!.runtime}` : `${series!.year} &bull; ${series!.seasons} (${series!.episodes})`}
              </h4>
            </div>

            <p className="modal-body-text">{item.description}</p>

            <div className="modal-field">
              <span className="field-label">Key Characters:</span>
              <span className="field-value">{item.characters.join(', ')}</span>
            </div>

            <div className="modal-decree-box">
              <span className="decree-stamp">ROAD TO AVENGERS: DOOMSDAY INTEL</span>
              <p className="decree-text">
                "{item.connection}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
