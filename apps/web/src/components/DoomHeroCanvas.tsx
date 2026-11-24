"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import "./DoomHeroCanvas.css";

const TOTAL_FRAMES = 166;

const SUBTITLES_LIST = [
  "ALL HOPE LIES IN DOOM.",
  "When gods and kings fell, only one intellect ascended to salvage reality.",
  "The multiverse collides. Battleworld rises from the ashes of incursions.",
  "Kneel before Victor von Doom — Supreme Sovereign of existence.",
];

export function DoomHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const billboardScreenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const hasDrawnInitialRef = useRef<boolean>(false);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [showSubtitles] = useState(true);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"trailers" | "flowchart" | "sagas" | "more">("trailers");

  const getCandidateFrameUrls = (index: number) => {
    const frameNum = String(index).padStart(3, "0");
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    return [
      `${basePath}/sequence/frame_${frameNum}.jpg`,
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

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const wallpaper = new Image();
    wallpaper.src = `${basePath}/assets/hero-wallpaper-desktop.webp`;
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
          <Link
            href="/flowchart"
            className="pill-tab"
            style={{ textDecoration: "none" }}
          >
            Flowchart
          </Link>
          <Link
            href="/all-media"
            className="pill-tab"
            style={{ textDecoration: "none" }}
          >
            All Sagas
          </Link>
          <Link
            href="/watching-order"
            className="pill-tab"
            style={{ textDecoration: "none" }}
          >
            Watching Order
          </Link>
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
    </div>
  );
}
