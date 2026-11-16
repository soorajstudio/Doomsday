import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroScrollCanvas } from './components/HeroScrollCanvas';
import { MovieCarousel } from './components/MovieCarousel';
import { SeriesCarousel } from './components/SeriesCarousel';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { MovieRecommendation, SeriesRecommendation } from './data/doomsdayData';
import './App.css';

export const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<MovieRecommendation | SeriesRecommendation | null>(null);
  const [activeType, setActiveType] = useState<'movie' | 'series' | null>(null);

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
      <Header />
      <main className="main-content">
        <HeroScrollCanvas />
        <div className="carousels-container">
          <MovieCarousel onSelectMovie={handleSelectMovie} />
          <SeriesCarousel onSelectSeries={handleSelectSeries} />
        </div>
      </main>
      <Footer />
      <Modal item={activeItem} type={activeType} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
