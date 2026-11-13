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

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-brand">
          <img
            src="./assets/doom-mask-emblem.png"
            alt="Doctor Doom Emblem"
            className="header-emblem"
          />
          <div className="header-title-group">
            <span className="header-badge">IMPERIAL BROADCAST</span>
            <span className="header-title">
              <span className="emerald-text">LATVERIA</span> STATE
            </span>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="kneel-button"
            onClick={() => {
              const el = document.getElementById('domains-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>KNEEL BEFORE DOOM</span>
          </button>
        </div>
      </div>
    </header>
  );
};
