import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img
            src="./assets/marvel-studios-logo.png"
            alt="Marvel Studios"
            className="footer-marvel-logo"
          />
          <span className="footer-separator">|</span>
          <span className="footer-title">AVENGERS: DOOMSDAY</span>
        </div>

        <p className="footer-tagline">
          THE IMPERIAL SOVEREIGN REALM OF BATTLEWORLD &bull; ALL TIMELINES BOW TO DOOM
        </p>

        <p className="footer-disclaimer">
          &copy; 2026 MARVEL. Directed by Anthony and Joe Russo. Exclusively in Theaters and IMAX May 2026.
        </p>
      </div>
    </footer>
  );
};
