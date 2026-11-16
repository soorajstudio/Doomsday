import React, { useState, useEffect } from 'react';
import { List, Search, ArrowRight, User } from 'lucide-react';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery = '', onSearchChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'cast' | 'movies' | 'series'>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      
      const castSection = document.getElementById('cast-section');
      const moviesSection = document.getElementById('movies-section');
      const seriesSection = document.getElementById('series-section');
      
      const scrollPos = window.scrollY + 200;
      
      if (seriesSection && scrollPos >= seriesSection.offsetTop) {
        setActiveTab('series');
      } else if (moviesSection && scrollPos >= moviesSection.offsetTop) {
        setActiveTab('movies');
      } else if (castSection && scrollPos >= castSection.offsetTop) {
        setActiveTab('cast');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, tab: 'home' | 'cast' | 'movies' | 'series') => {
    setActiveTab(tab);
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
    <header className={`lateral-header ${scrolled ? 'lateral-header-scrolled' : ''}`}>
      <div className="lateral-header-inner">
        {/* Left Side: Menu + Brand + Nav Links */}
        <div className="lateral-nav-left">
          <button className="lateral-menu-icon-btn" aria-label="Toggle navigation menu">
            <List size={18} />
          </button>

          <div
            className="lateral-brand"
            onClick={() => scrollToSection('top', 'home')}
            role="button"
            tabIndex={0}
          >
            <svg
              className="lateral-brand-logo"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="6,4 20,12 6,20" fill="#00dfa2" />
            </svg>
            <span className="lateral-brand-text">LATERAL CINEMA</span>
          </div>

          <nav className="lateral-nav-links" aria-label="Main Navigation">
            <button
              className={`lateral-nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('top', 'home')}
            >
              Home
            </button>
            <button
              className={`lateral-nav-link ${activeTab === 'cast' ? 'active' : ''}`}
              onClick={() => scrollToSection('cast-section', 'cast')}
            >
              Cast &amp; Characters
            </button>
            <button
              className={`lateral-nav-link ${activeTab === 'movies' ? 'active' : ''}`}
              onClick={() => scrollToSection('movies-section', 'movies')}
            >
              Movies to Watch
            </button>
            <button
              className={`lateral-nav-link ${activeTab === 'series' ? 'active' : ''}`}
              onClick={() => scrollToSection('series-section', 'series')}
            >
              Series to Watch
            </button>
          </nav>
        </div>

        {/* Right Side: Search + CTA + Avatar */}
        <div className="lateral-nav-right">
          <div className="lateral-search-pill">
            <Search size={16} className="lateral-search-icon" />
            <input
              type="text"
              placeholder="Search movies, actors..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="lateral-search-input"
            />
          </div>

          <button
            className="lateral-explore-btn"
            onClick={() => scrollToSection('cast-section', 'cast')}
          >
            <span>EXPLORE CATALOG</span>
            <ArrowRight size={15} />
          </button>

          <button className="lateral-avatar-btn" aria-label="User Profile">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
