import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroScrollCanvas } from './components/HeroScrollCanvas';
import { CastCarousel } from './components/CastCarousel';
import { MovieCarousel } from './components/MovieCarousel';
import { SeriesCarousel } from './components/SeriesCarousel';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { MovieRecommendation, SeriesRecommendation, CastMember } from './data/doomsdayData';
import './App.css';

export const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<MovieRecommendation | SeriesRecommendation | CastMember | null>(null);
  const [activeType, setActiveType] = useState<'movie' | 'series' | 'cast' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCast = (cast: CastMember) => {
    setActiveItem(cast);
    setActiveType('cast');
  };

  const handleSelectMovie = (movie: MovieRecommendation) => {
    setActiveItem(movie);
    setActiveType('movie');
  };

  const handleSelectSeries = (series: SeriesRecommendation) => {
    setActiveItem(series);
    setActiveType('series');
  };

  const handleCloseModal = () => {
    setActiveItem(null);
    setActiveType(null);
  };

  return (
    <div className="doomsday-app">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="main-content">
        <HeroScrollCanvas />
        <div className="lateral-carousels-container">
          <CastCarousel onSelectCast={handleSelectCast} searchQuery={searchQuery} />
          <MovieCarousel onSelectMovie={handleSelectMovie} searchQuery={searchQuery} />
          <SeriesCarousel onSelectSeries={handleSelectSeries} searchQuery={searchQuery} />
        </div>
      </main>
      <Footer />
      <Modal item={activeItem} type={activeType} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
