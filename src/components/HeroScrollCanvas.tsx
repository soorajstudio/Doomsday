import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MOVIE_METADATA } from '../data/doomsdayData';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Subtitles,
  Info,
  X,
  ChevronDown
} from 'lucide-react';

const TOTAL_FRAMES = 166;

const SUBTITLES_LIST = [
  'ALL HOPE LIES IN DOOM.',
  'When gods and kings fell, only one intellect ascended to salvage reality.',
  'The multiverse collides. Battleworld rises from the ashes of incursions.',
  'Kneel before Victor von Doom — Supreme Sovereign of existence.'
];

export const HeroScrollCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const billboardScreenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  // Loading & Playback states
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [showDossier, setShowDossier] = useState(false);
  const [activeTab, setActiveTab] = useState<'trailers' | 'episodes' | 'more' | 'plans'>('trailers');
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Preload all 166 frames
  const getFrameUrl = (index: number) => {
    const frameNum = String(index).padStart(3, '0');
    return `./sequence/frame_${frameNum}.jpg`;
  };

  // Draw frame to canvas with sharp cover fitting
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete) {
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

  // Preload images on mount
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const handleResize = () => {
      const canvas = canvasRef.current;
      const screenContainer = billboardScreenRef.current;
      if (!canvas || !screenContainer) return;
      const rect = screenContainer.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrame);
    };

    window.addEventListener('resize', handleResize);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);

        if (loadedCount === 1) {
          handleResize();
          drawFrame(0);
        }

        if (loadedCount >= Math.floor(TOTAL_FRAMES * 0.4) && !isLoaded) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame, isLoaded, currentFrame]);

  // Scroll scrubbing listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isPlaying) return; // Allow manual autoplay when playing
      if (!ticking) {
        requestAnimationFrame(() => {
          const container = containerRef.current;
          if (!container) {
            ticking = false;
            return;
          }

          const rect = container.getBoundingClientRect();
          const totalScrollDistance = container.offsetHeight - window.innerHeight;

          if (totalScrollDistance <= 0) {
            ticking = false;
            return;
          }

          const currentScrolled = -rect.top;
          let progress = currentScrolled / totalScrollDistance;
          progress = Math.max(0, Math.min(1, progress));

          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(progress * (TOTAL_FRAMES - 1))
          );

          setCurrentFrame(targetFrame);
          drawFrame(targetFrame);

          // Update subtitle based on scroll progress
          const subIdx = Math.min(
            SUBTITLES_LIST.length - 1,
            Math.floor(progress * SUBTITLES_LIST.length)
          );
          setSubtitleIndex(subIdx);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, drawFrame]);

  // Video autoplay loop (~28 fps)
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      return;
    }

    const frameDuration = 1000 / 28; // ~35.7ms per frame

    const playLoop = (timestamp: number) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      const elapsed = timestamp - lastFrameTimeRef.current;

      if (elapsed >= frameDuration) {
        lastFrameTimeRef.current = timestamp - (elapsed % frameDuration);
        setCurrentFrame((prev) => {
          const next = (prev + 1) % TOTAL_FRAMES;
          drawFrame(next);
          // Advance subtitle every 40 frames
          if (next % 40 === 0) {
            setSubtitleIndex((subPrev) => (subPrev + 1) % SUBTITLES_LIST.length);
          }
          return next;
        });
      }

      animFrameIdRef.current = requestAnimationFrame(playLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(playLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, [isPlaying, drawFrame]);

  // Media Controls Handlers
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleFullscreen = () => {
    const el = billboardScreenRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const toggleSubtitles = () => {
    setShowSubtitles((prev) => !prev);
  };

  const scrollTo = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => setEmailSubmitted(false), 4000);
      scrollTo('cast-section');
    }
  };

  return (
    <section id="billboard-hero" className="netflix-hero-wrapper" ref={containerRef}>
      {/* SVG Clip Path Definition for Cinema Curved Screen */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="netflix-curved-screen-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.02,0 L 0.98,0 Q 1,0 1,0.035 L 1,0.965 Q 1,0.995 0.98,0.985 Q 0.5,0.92 0.02,0.985 Q 0,0.995 0,0.965 L 0,0.035 Q 0,0 0.02,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="netflix-hero-sticky">
        {/* Top Floating Pill Navigation */}
        <div className="netflix-curved-nav-pill" role="tablist" aria-label="Billboard Navigation">
          <button
            className={`pill-tab ${activeTab === 'trailers' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('trailers');
              scrollTo('top');
            }}
          >
            Trailers
          </button>
          <button
            className={`pill-tab ${activeTab === 'episodes' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('episodes');
              scrollTo('cast-section');
            }}
          >
            Episodes
          </button>
          <button
            className={`pill-tab ${activeTab === 'more' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('more');
              scrollTo('movies-section');
            }}
          >
            More to Watch
          </button>
          <button
            className={`pill-tab ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('plans');
              scrollTo('series-section');
            }}
          >
            Plans &gt;
          </button>
        </div>

        {/* The Curved Cinema Screen Billboard Container */}
        <div className="netflix-curved-screen-frame" ref={billboardScreenRef}>
          <div className="netflix-curved-screen-clip-wrap">
            {/* The Scrubbing / Playing Canvas */}
            <canvas ref={canvasRef} className="netflix-curved-canvas" />

            {/* Cinematic Gradient Shadow Overlays for Crisp Text Legibility */}
            <div className="netflix-canvas-gradient-left" />
            <div className="netflix-canvas-gradient-bottom" />
            <div className="netflix-canvas-vignette" />

            {/* Subtitles Overlay Banner */}
            {showSubtitles && (
              <div className="netflix-subtitles-banner">
                <span className="subtitles-text">
                  "{SUBTITLES_LIST[subtitleIndex]}"
                </span>
              </div>
            )}

            {/* Bottom-Left Netflix Content & CTA Overlay */}
            <div className="netflix-billboard-content-left">
              <div className="netflix-badge-row">
                <span className="netflix-brand-red">NETFLIX</span>
                <span className="netflix-badge-sub">ORIGINAL PRODUCTION</span>
              </div>

              <div className="netflix-title-row">
                <img
                  src="./assets/avengers-doomsday-title-logo.webp"
                  alt="Avengers: Doomsday"
                  className="netflix-billboard-logo"
                />
              </div>

              {/* Email Form & Join Now Button */}
              <form className="netflix-cta-email-form" onSubmit={handleEmailSubmit}>
                <div className="netflix-email-input-wrap">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="netflix-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="netflix-join-btn">
                  Join now
                </button>
              </form>

              {emailSubmitted && (
                <p className="email-submitted-msg">
                  Allegiance recorded. Welcome to Battleworld.
                </p>
              )}

              <p className="netflix-pricing-tagline">
                Endless entertainment starting at ₹149 • Exclusive In Theaters May 2026
              </p>
            </div>

            {/* Bottom-Right Media Player Action Buttons */}
            <div className="netflix-media-controls-row">
              <button
                className={`media-icon-btn ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                title={isPlaying ? 'Pause sequence' : 'Play sequence'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>

              <button
                className="media-icon-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <button
                className="media-icon-btn"
                onClick={toggleFullscreen}
                aria-label="Fullscreen"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>

              <button
                className={`media-icon-btn ${showSubtitles ? 'active-subtitles' : ''}`}
                onClick={toggleSubtitles}
                aria-label="Subtitles"
                title="Toggle Subtitles"
              >
                <Subtitles size={20} />
              </button>
            </div>

            {/* Quick Dossier Button in top right of billboard */}
            <button
              className="billboard-dossier-pill-btn"
              onClick={() => setShowDossier(true)}
              title="Open Marvel Studios Dossier"
            >
              <Info size={15} />
              <span>Dossier &amp; Cast</span>
            </button>

            {/* Loading Indicator */}
            {!isLoaded && (
              <div className="netflix-billboard-loading">
                <div className="loading-spinner" />
                <span>LOADING NETFLIX CANVAS... {loadProgress}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom subtle prompt */}
        <div
          className="netflix-bottom-scroll-prompt"
          onClick={() => scrollTo('cast-section')}
          role="button"
          tabIndex={0}
        >
          <span>Scroll down to explore Cast &amp; Recommendations</span>
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Slide-out / Pop-up Dossier Modal for Full Cast & Synopsis */}
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
                  <strong>Theatrical Release:</strong> Exclusively in Theaters • {MOVIE_METADATA.theaters}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
