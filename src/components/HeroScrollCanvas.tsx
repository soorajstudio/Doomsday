import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MOVIE_METADATA } from '../data/doomsdayData';
import { ChevronDown, Info, X } from 'lucide-react';

const TOTAL_FRAMES = 166;

export const HeroScrollCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDossier, setShowDossier] = useState(false);

  // Scroll phase states for dynamic cinematic overlays
  const [scrollProgress, setScrollProgress] = useState(0);

  const getFrameUrl = (index: number) => {
    const frameNum = String(index).padStart(3, '0');
    return `./sequence/frame_${frameNum}.jpg`;
  };

  // Draw a specific frame to the canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use loaded image or fallback to frame 1 or nearest
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete) {
      // Find nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset];
        if (prev && prev.complete) {
          img = prev;
          break;
        }
        const next = imagesRef.current[frameIndex + offset];
        if (next && next.complete) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete) return;

    const width = canvas.width;
    const height = canvas.height;

    // Cover logic
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Load first frame immediately and render it
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      images[0] = firstImg;
      drawFrame(0);
    };

    // Preload all frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount >= Math.min(25, TOTAL_FRAMES)) {
          setIsLoaded(true);
        }
      };
      images[i - 1] = img;
    }

    imagesRef.current = images;

    // Handle canvas resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      // Re-draw current frame
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const totalScrollable = container.offsetHeight - window.innerHeight;
        const currentScrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScrolled / totalScrollable));
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
        drawFrame(frameIdx);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame]);

  // Scroll handler with requestAnimationFrame
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const totalScrollable = container.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) return;

        const currentScrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScrolled / totalScrollable));
        setScrollProgress(progress);

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
        );

        drawFrame(targetFrame);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [drawFrame]);

  // Calculate opacities for cinematic text transitions based on scroll progress
  // Phase 1 (0 to 0.28): Title & Marvel Logo
  const phase1Opacity = Math.max(0, Math.min(1, (0.22 - scrollProgress) / 0.15));
  // Phase 2 (0.30 to 0.60): "All Hope Lies In Doom"
  const phase2Opacity =
    scrollProgress >= 0.25 && scrollProgress <= 0.62
      ? Math.sin(((scrollProgress - 0.25) / 0.37) * Math.PI)
      : 0;
  // Phase 3 (0.65 to 0.95): "Battleworld Rises"
  const phase3Opacity =
    scrollProgress >= 0.63 && scrollProgress <= 0.98
      ? Math.sin(((scrollProgress - 0.63) / 0.35) * Math.PI)
      : 0;

  return (
    <section className="scroll-canvas-section" ref={containerRef}>
      <div className="sticky-canvas-container">
        {/* Canvas displaying scroll-driven video frames */}
        <canvas ref={canvasRef} className="hero-scroll-canvas" />

        {/* Cinematic Vignettes */}
        <div className="canvas-vignette"></div>
        <div className="canvas-bottom-fade"></div>

        {/* Loading Indicator (initial background load) */}
        {!isLoaded && (
          <div className="sequence-loading-indicator">
            <div className="loading-spinner"></div>
            <span>INITIALIZING LATVERIAN BROADCAST... {loadProgress}%</span>
          </div>
        )}

        {/* Overlay 1: Initial Cinematic Title & Release Pill (0% - 25% scroll) */}
        <div
          className="canvas-overlay overlay-title"
          style={{
            opacity: phase1Opacity,
            pointerEvents: phase1Opacity > 0.1 ? 'auto' : 'none',
            transform: `translateY(${-scrollProgress * 80}px)`
          }}
        >
          <div className="overlay-badge-wrap">
            <img
              src="./assets/marvel-studios-badge.webp"
              alt="Marvel Studios"
              className="marvel-badge"
            />
          </div>

          <div className="overlay-logo-wrap">
            <img
              src="./assets/avengers-doomsday-title-logo.webp"
              alt="Avengers: Doomsday"
              className="doomsday-logo"
            />
          </div>

          <div className="overlay-compact-pills">
            <span className="pill pill-year">MAY 2026</span>
            <span className="pill pill-format">IMAX 70mm &bull; 3D</span>
            <span className="pill pill-rating">{MOVIE_METADATA.rating}</span>
          </div>

          {/* Clean "Cast & Intel" button to replace clutter */}
          <div className="overlay-cta-row">
            <button
              className="dossier-toggle-btn"
              onClick={() => setShowDossier(true)}
              aria-label="View movie dossier & cast"
            >
              <Info size={16} />
              <span>Dossier &amp; Cast</span>
            </button>

            <div className="scroll-prompt">
              <span>Scroll to Play Video</span>
              <ChevronDown className="scroll-arrow" size={18} />
            </div>
          </div>
        </div>

        {/* Overlay 2: Middle Decree (30% - 60% scroll) */}
        <div
          className="canvas-overlay overlay-decree"
          style={{
            opacity: phase2Opacity,
            pointerEvents: 'none',
            transform: `scale(${0.9 + phase2Opacity * 0.1})`
          }}
        >
          <span className="decree-tag">IMPERIAL DECREE</span>
          <h2 className="decree-headline">ALL HOPE LIES IN DOOM</h2>
          <p className="decree-sub">
            When gods and kings failed, only one intellect was supreme enough to salvage existence.
          </p>
        </div>

        {/* Overlay 3: Climax Decree (65% - 95% scroll) */}
        <div
          className="canvas-overlay overlay-decree"
          style={{
            opacity: phase3Opacity,
            pointerEvents: 'none',
            transform: `scale(${0.9 + phase3Opacity * 0.1})`
          }}
        >
          <span className="decree-tag">WITNESS THE NEW CREATION</span>
          <h2 className="decree-headline">BATTLEWORLD RISES</h2>
          <p className="decree-sub">
            The multiverse collides. Alternate Earths kneel before God Emperor Doom.
          </p>
        </div>

        {/* Floating Quick Cast & Intel Button (always available in corner) */}
        <div className="floating-dossier-corner">
          <button
            className="corner-intel-btn"
            onClick={() => setShowDossier(true)}
            title="Open Cast & Synopsis Intel"
          >
            <Info size={16} />
            <span className="intel-btn-text">Cast &amp; Synopsis</span>
          </button>
        </div>
      </div>

      {/* Slide-out / Pop-up Dossier Modal for Full Cast & Synopsis (Uncluttered) */}
      {showDossier && (
        <div className="modal-backdrop" onClick={() => setShowDossier(false)}>
          <div className="dossier-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowDossier(false)}
              aria-label="Close dossier"
            >
              <X size={20} />
            </button>

            <div className="dossier-header">
              <span className="modal-tag tag-domain">CLASSIFIED LATVERIAN DOSSIER</span>
              <h2 className="dossier-title">Marvel Studios' Avengers: Doomsday</h2>
              <div className="dossier-meta-pills">
                <span className="pill pill-year">{MOVIE_METADATA.year}</span>
                <span className="pill pill-epoch">{MOVIE_METADATA.epoch}</span>
                <span className="pill pill-runtime">{MOVIE_METADATA.runtime}</span>
                <span className="pill pill-rating">{MOVIE_METADATA.rating}</span>
              </div>
            </div>

            <div className="dossier-body">
              <div className="dossier-section">
                <h4 className="dossier-section-heading">Executive Synopsis</h4>
                <p className="dossier-synopsis-text">{MOVIE_METADATA.synopsis}</p>
              </div>

              <div className="dossier-section">
                <h4 className="dossier-section-heading">Supreme Sovereign &amp; Subjects (Cast)</h4>
                <div className="cast-grid">
                  {MOVIE_METADATA.cast.map((c) => (
                    <div key={c.name} className="cast-card">
                      <span className="cast-actor-name">{c.name}</span>
                      <span className="cast-character-role">{c.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dossier-section">
                <h4 className="dossier-section-heading">Creative Architects</h4>
                <p className="dossier-credit-text">
                  <strong>Directors:</strong> {MOVIE_METADATA.directors}
                </p>
                <p className="dossier-credit-text">
                  <strong>Screenplay:</strong> {MOVIE_METADATA.screenplay}
                </p>
                <p className="dossier-credit-text">
                  <strong>Theatrical Release:</strong> Exclusively in Theaters &bull; {MOVIE_METADATA.theaters}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
