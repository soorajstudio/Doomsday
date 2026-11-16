import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <div className="header-brand" onClick={() => scrollToSection('top')} role="button" tabIndex={0}>
            <img
              src="./assets/doom-mask-emblem.png"
              alt="Doctor Doom Emblem"
              className="header-emblem"
            />
            <div className="header-title-group">
              <span className="header-badge">NETFLIX &bull; IMPERIAL BROADCAST</span>
              <span className="header-title">
                <span className="emerald-text">LATVERIA</span> CINEMA
              </span>
            </div>
          </div>

          <nav className="header-nav" aria-label="Main Navigation">
            <button className="nav-link-btn" onClick={() => scrollToSection('top')}>
              Home
            </button>
            <button className="nav-link-btn" onClick={() => scrollToSection('cast-section')}>
              Cast &amp; Characters
            </button>
            <button className="nav-link-btn" onClick={() => scrollToSection('movies-section')}>
              Movies to Watch
            </button>
            <button className="nav-link-btn" onClick={() => scrollToSection('series-section')}>
              Series to Watch
            </button>
          </nav>
        </div>

        <div className="header-actions">
          <button
            className="kneel-button"
            onClick={() => scrollToSection('cast-section')}
          >
            <span>EXPLORE CATALOG &darr;</span>
          </button>
        </div>
      </div>
    </header>
  );
};
