import React from 'react';
import { MOVIE_METADATA } from '../data/doomsdayData';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-backdrop-container">
        <picture>
          <source media="(min-width: 768px)" srcSet="./assets/hero-wallpaper-desktop.webp" />
          <img
            src="./assets/hero-wallpaper-mobile.webp"
            alt="God Emperor Doom - Avengers Doomsday"
            className="hero-backdrop"
          />
        </picture>
        <div className="hero-vignette"></div>
        <div className="hero-radial-glow"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge-wrap">
          <img
            src="./assets/marvel-studios-badge.webp"
            alt="Marvel Studios"
            className="marvel-badge"
          />
        </div>

        <div className="hero-logo-wrap">
          <img
            src="./assets/avengers-doomsday-title-logo.webp"
            alt="Avengers: Doomsday"
            className="doomsday-logo"
          />
        </div>

        <div className="hero-pills">
          <span className="pill pill-year">{MOVIE_METADATA.year}</span>
          <span className="pill pill-epoch">{MOVIE_METADATA.epoch}</span>
          <span className="pill pill-runtime">{MOVIE_METADATA.runtime}</span>
          <span className="pill pill-rating">{MOVIE_METADATA.rating}</span>
          <span className="pill pill-format">{MOVIE_METADATA.format}</span>
        </div>

        <p className="hero-synopsis">{MOVIE_METADATA.synopsis}</p>

        <div className="hero-meta-credits">
          <div className="credit-line">
            <span className="credit-label">Supreme Sovereign &amp; Subjects:</span>
            <span className="credit-value">
              {MOVIE_METADATA.cast.map((actor, idx) => (
                <span key={actor.name}>
                  <strong>{actor.name}</strong> ({actor.role})
                  {idx < MOVIE_METADATA.cast.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          </div>

          <div className="credit-line">
            <span className="credit-label">Architects of Doom:</span>
            <span className="credit-value">
              {MOVIE_METADATA.directors} &bull; Screenplay by {MOVIE_METADATA.screenplay}
            </span>
          </div>

          <div className="credit-line">
            <span className="credit-label">Theatrical Decrees:</span>
            <span className="credit-value emerald-highlight">
              Exclusively in Theaters and IMAX &bull; {MOVIE_METADATA.theaters}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
