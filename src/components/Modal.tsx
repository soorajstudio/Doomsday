import React, { useEffect } from 'react';
import { DomainItem, ThreatItem } from '../data/doomsdayData';

interface ModalProps {
  item: DomainItem | ThreatItem | null;
  type: 'domain' | 'threat' | null;
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

  const isDomain = type === 'domain';
  const domain = isDomain ? (item as DomainItem) : null;
  const threat = !isDomain ? (item as ThreatItem) : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="modal-content">
          <div className="modal-poster-wrap">
            <img src={item.image} alt={isDomain ? domain!.title : threat!.name} className="modal-poster" />
          </div>

          <div className="modal-info">
            <div className="modal-header">
              <span className={`modal-tag ${isDomain ? 'tag-domain' : 'tag-threat'}`}>
                {isDomain ? `DOMAIN SECTOR &bull; ${domain!.dangerLevel.toUpperCase()}` : `THREAT STATUS &bull; ${threat!.status.toUpperCase()}`}
              </span>
              <h2 className="modal-title">{isDomain ? domain!.title : threat!.name}</h2>
              <h4 className="modal-subtitle">{isDomain ? domain!.subtitle : threat!.alias}</h4>
            </div>

            <p className="modal-body-text">
              {isDomain ? domain!.description : threat!.fate}
            </p>

            {isDomain && (
              <div className="modal-field">
                <span className="field-label">Appointed Sovereign:</span>
                <span className="field-value">{domain!.ruler}</span>
              </div>
            )}

            <div className="modal-decree-box">
              <span className="decree-stamp">IMPERIAL ARCHIVE OF LATVERIA</span>
              <p className="decree-text">
                "All reality is subject to God Emperor Doom. Those who resist the divine order shall be cast into the Deadlands."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
