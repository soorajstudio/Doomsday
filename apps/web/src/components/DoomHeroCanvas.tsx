"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
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
  ChevronDown,
} from "lucide-react";
import "./DoomHeroCanvas.css";

const TOTAL_FRAMES = 166;

const SUBTITLES_LIST = [
  "ALL HOPE LIES IN DOOM.",
  "When gods and kings fell, only one intellect ascended to salvage reality.",
  "The multiverse collides. Battleworld rises from the ashes of incursions.",
  "Kneel before Victor von Doom — Supreme Sovereign of existence.",
];

const MOVIE_METADATA = {
  title: "Avengers: Doomsday",
  subtitle: "The Sovereign Era",
  studio: "Marvel Studios",
  year: "2026",
  epoch: "Phase 6 • Multiverse Saga Finale Part I",
  runtime: "2h 55m",
  format: "IMAX 70mm • Dolby Cinema",
  rating: "U/A 16+",
  genres: ["Cosmic Epic", "Dark Fantasy", "Superhero Action", "Multiverse War"],
  synopsis:
    "As cosmic incursions pulverize reality, Earth's Mightiest Heroes and the Fantastic Four face an inescapable truth: gods, kings, and heroes have failed. Into the celestial void steps Victor von Doom. Armed with Beyonder omnipotence, ancient arcane sorcery, and supreme intellect, the Lord of Latveria re-engineers existence into Battleworld. Submit, or be erased.",
  cast: [
    { name: "Robert Downey Jr.", role: "Victor von Doom / God Emperor Doom" },
    { name: "Pedro Pascal", role: "Reed Richards / Mister Fantastic" },
    { name: "Benedict Cumberbatch", role: "Stephen Strange / Sheriff of Agamotto" },
    { name: "Vanessa Kirby", role: "Sue Storm / Invisible Woman" },
    { name: "Anthony Mackie", role: "Sam Wilson / Captain America" },
    { name: "Chris Hemsworth", role: "Thor Odinson" },
    { name: "Florence Pugh", role: "Yelena Belova" },
    { name: "Sebastian Stan", role: "Bucky Barnes" },
    { name: "Tom Holland", role: "Peter Parker / Spider-Man" },
    { name: "Joseph Quinn", role: "Johnny Storm / Human Torch" },
    { name: "Ebon Moss-Bachrach", role: "Ben Grimm / The Thing" },
    { name: "Tom Hiddleston", role: "Loki / God of Stories" },
  ],
  directors: "Anthony & Joe Russo (The Russo Brothers)",
  screenplay: "Stephen McFeely",
  theaters: "May 2026",
};

export function DoomHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const billboardScreenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const hasDrawnInitialRef = useRef<boolean>(false);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [showDossier, setShowDossier] = useState(false);
  const [activeTab, setActiveTab] = useState<"trailers" | "flowchart" | "sagas" | "more">("trailers");

  const getCandidateFrameUrls = (index: number) => {
    const frameNum = String(index).padStart(3, "0");
    return [
      `/sequence/frame_${frameNum}.jpg`,
      `./sequence/frame_${frameNum}.jpg`,
      `sequence/frame_${frameNum}.jpg`,
    ];
  };

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const screenContainer = billboardScreenRef.current;
    if (screenContainer) {
      const rect = screenContainer.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (rect.width > 0 && rect.height > 0) {
        const targetW = Math.round(rect.width * dpr);
        const targetH = Math.round(rect.height * dpr);
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }
      }
    }

    if (canvas.width === 0 || canvas.height === 0) {
      canvas.width = 1280;
      canvas.height = 720;
    }

    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

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
    hasDrawnInitialRef.current = true;
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const handleResize = () => {
      const canvas = canvasRef.current;
      const screenContainer = billboardScreenRef.current;
      if (!canvas || !screenContainer) return;
      const rect = screenContainer.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        drawFrame(currentFrame);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const wallpaper = new Image();
    wallpaper.src = "/assets/hero-wallpaper-desktop.webp";
    wallpaper.onload = () => {
      if (!hasDrawnInitialRef.current) {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx && canvas.width > 0 && canvas.height > 0) {
            ctx.drawImage(wallpaper, 0, 0, canvas.width, canvas.height);
          }
        }
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const candidateUrls = getCandidateFrameUrls(i);

      const tryLoad = (urlIndex: number) => {
        if (urlIndex >= candidateUrls.length) {
          loadedCount++;
          const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
          setLoadProgress(pct);
          return;
        }

        img.src = candidateUrls[urlIndex];
        img.onload = () => {
          loadedCount++;
          const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
          setLoadProgress(pct);

          if (!hasDrawnInitialRef.current || loadedCount === 1) {
            handleResize();
            drawFrame(0);
          }
        };

        img.onerror = () => {
          tryLoad(urlIndex + 1);
        };
      };

      tryLoad(0);
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame, currentFrame]);

  // Scroll-Driven Animation (scrubs frames strictly as user scrolls)
  useEffect(() => {
    let animId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let isInitialized = false;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollDistance = container.offsetHeight - window.innerHeight;

      if (totalScrollDistance <= 0) return;

      const scrolled = -rect.top;
      targetProgress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));

      if (!isInitialized) {
        currentProgress = targetProgress;
        isInitialized = true;
      }
    };

    const updateLoop = () => {
      if (!isPlaying) {
        const diff = targetProgress - currentProgress;
        if (Math.abs(diff) > 0.0005) {
          currentProgress += diff * 0.22;
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
          );

          setCurrentFrame(targetFrame);
          drawFrame(targetFrame);

          const subIdx = Math.min(
            SUBTITLES_LIST.length - 1,
            Math.floor(currentProgress * SUBTITLES_LIST.length)
          );
          setSubtitleIndex(subIdx);
        }
      }

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [drawFrame, isPlaying]);

  // Optional manual playback when Play button is clicked
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      return;
    }

    const frameDuration = 1000 / 28;

    const playLoop = (timestamp: number) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      const elapsed = timestamp - lastFrameTimeRef.current;

      if (elapsed >= frameDuration) {
        lastFrameTimeRef.current = timestamp - (elapsed % frameDuration);
        setCurrentFrame((prev) => {
          const next = (prev + 1) % TOTAL_FRAMES;
          drawFrame(next);
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

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const toggleMute = () => setIsMuted((prev) => !prev);
  const toggleSubtitles = () => setShowSubtitles((prev) => !prev);

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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="netflix-hero-wrapper" ref={containerRef}>
      {/* SVG Clip Path for Cinema Screen Curved Bottom */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="netflix-curved-screen-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 L 1 0 L 1 0.94 Q 0.5 1.0 0 0.94 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="netflix-hero-sticky">
        {/* Floating Top Pill Nav */}
        <div className="netflix-curved-nav-pill">
          <button
            className={`pill-tab ${activeTab === "trailers" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("trailers");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Trailers
          </button>
          <button
            className={`pill-tab ${activeTab === "flowchart" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("flowchart");
              window.location.href = "/flowchart";
            }}
          >
            Flowchart
          </button>
          <button
            className={`pill-tab ${activeTab === "sagas" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("sagas");
              window.location.href = "/all-media";
            }}
          >
            All Sagas
          </button>
          <button
            className={`pill-tab ${activeTab === "more" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("more");
              scrollTo("explore-section");
            }}
          >
            Explore Movies &gt;
          </button>
        </div>

        {/* The Curved Cinema Screen Billboard Container */}
        <div className="netflix-curved-screen-frame" ref={billboardScreenRef}>
          <div className="netflix-curved-screen-clip-wrap">
            {/* The Scrubbing / Playing Canvas */}
            <canvas ref={canvasRef} width={1280} height={720} className="netflix-curved-canvas" />

            {/* Cinematic Gradient Shadow Overlays */}
            <div className="netflix-canvas-gradient-left" />
            <div className="netflix-canvas-gradient-bottom" />
            <div className="netflix-canvas-vignette" />

            {/* Subtitles Overlay Banner */}
            {showSubtitles && (
              <div className="netflix-subtitles-banner">
                <span className="subtitles-text">
                  &ldquo;{SUBTITLES_LIST[subtitleIndex]}&rdquo;
                </span>
              </div>
            )}

            {/* Bottom-Left Content & Navigation Overlay */}
            <div className="netflix-billboard-content-left">
              <div className="netflix-badge-row">
                <span className="netflix-brand-red">NETFLIX</span>
                <span className="netflix-badge-sub">ORIGINAL PRODUCTION</span>
              </div>

              <div className="netflix-title-row">
                <img
                  src="/assets/avengers-doomsday-title-logo.webp"
                  alt="Avengers: Doomsday"
                  className="netflix-billboard-logo"
                />
              </div>

              <div className="netflix-cta-email-form">
                <Link href="/flowchart" className="netflix-join-btn">
                  <span>Use the Flowchart</span>
                </Link>
                <Link
                  href="/all-media"
                  style={{
                    background: "rgba(18, 18, 18, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "9999px",
                    padding: "0.65rem 1.45rem",
                    color: "#ffffff",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    backdropFilter: "blur(12px)",
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>Explore every saga</span>
                </Link>
              </div>

              <p className="netflix-pricing-tagline">
                The easiest way to navigate the Marvel multiverse • In Theaters May 2026
              </p>
            </div>

            {/* Bottom-Right Media Controls */}
            <div className="netflix-media-controls-row">
              <button
                className={`media-icon-btn ${isPlaying ? "playing" : ""}`}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause Sequence" : "Play Sequence"}
                title={isPlaying ? "Pause Sequence" : "Play Sequence"}
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
              </button>

              <button
                className="media-icon-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>

              <button
                className={`media-icon-btn ${showSubtitles ? "active-subtitles" : ""}`}
                onClick={toggleSubtitles}
                aria-label="Toggle Subtitles"
                title="Toggle Subtitles"
              >
                <Subtitles size={17} />
              </button>

              <button
                className="media-icon-btn"
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
              </button>
            </div>

            {/* Top-Right Dossier Pill Button */}
            <button
              className="billboard-dossier-pill-btn"
              onClick={() => setShowDossier(true)}
              aria-label="Open Imperial Dossier"
            >
              <Info size={14} />
              <span>Dossier &amp; Cast</span>
            </button>

            {/* Loading Indicator */}
            {loadProgress < 100 && (
              <div className="netflix-billboard-loading">
                <div className="loading-spinner" />
                <span>LOADING DOOM CANVAS... {loadProgress}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom subtle scroll prompt */}
        <div
          className="netflix-bottom-scroll-prompt"
          onClick={() => scrollTo("explore-section")}
        >
          <span>Scroll down to explore Multiverse &amp; Movies</span>
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Dossier Modal */}
      {showDossier && (
        <div className="modal-backdrop" onClick={() => setShowDossier(false)}>
          <div
            className="dossier-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowDossier(false)}
              aria-label="Close dossier"
            >
              <X size={20} />
            </button>

            <div className="dossier-header">
              <span className="dossier-kicker">CLASSIFIED DOCUMENT • BATTLEWORLD PROTOCOL</span>
              <h2 className="dossier-title">{MOVIE_METADATA.title}</h2>
              <p className="dossier-tagline">{MOVIE_METADATA.subtitle}</p>
            </div>

            <div className="dossier-meta-row">
              <span className="pill pill-year">{MOVIE_METADATA.year}</span>
              <span className="pill pill-epoch">{MOVIE_METADATA.epoch}</span>
              <span className="pill pill-runtime">{MOVIE_METADATA.runtime}</span>
              <span className="pill pill-rating">{MOVIE_METADATA.rating}</span>
              <span className="pill pill-format">{MOVIE_METADATA.format}</span>
            </div>

            <div className="dossier-body">
              <div>
                <h3 className="dossier-section-heading">Imperial Synopsis</h3>
                <p className="dossier-synopsis-text">{MOVIE_METADATA.synopsis}</p>
              </div>

              <div>
                <h3 className="dossier-section-heading">Confirmed Main Cast</h3>
                <div className="cast-grid">
                  {MOVIE_METADATA.cast.map((member, index) => (
                    <div key={index} className="cast-card">
                      <span className="cast-actor-name">{member.name}</span>
                      <span className="cast-character-role">{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dossier-credits">
                <p className="dossier-credit-text">
                  <strong>Directing Duo:</strong> {MOVIE_METADATA.directors}
                </p>
                <p className="dossier-credit-text">
                  <strong>Screenplay:</strong> {MOVIE_METADATA.screenplay}
                </p>
                <p className="dossier-credit-text">
                  <strong>World Premiere:</strong> {MOVIE_METADATA.theaters}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
