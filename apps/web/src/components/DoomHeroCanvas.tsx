"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import "./DoomHeroCanvas.css";

const TOTAL_FRAMES = 166;

const DOOM_WORDS = [
  { text: "Kneel", highlight: false },
  { text: "before", highlight: false },
  { text: "Victor", highlight: false },
  { text: "von", highlight: false },
  { text: "Doom", highlight: true },
];

// Scroll scrub thresholds (0.0 to 1.0) for word-by-word reveal during scrolling
const WORD_THRESHOLDS = [0.03, 0.18, 0.36, 0.54, 0.72];

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// Avengers: Doomsday Official Release Date
const DOOMSDAY_TARGET = new Date("2026-12-18T00:00:00");

function computeTimeRemaining(): TimeRemaining {
  const diff = DOOMSDAY_TARGET.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, isExpired: false };
}

function FlipClockCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const [currentVal, setCurrentVal] = useState(value);
  const [prevVal, setPrevVal] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== currentVal) {
      setPrevVal(currentVal);
      setCurrentVal(value);
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [value, currentVal]);

  return (
    <div className="doom-flip-segment">
      <div className="doom-flip-card">
        {/* Static Top Half */}
        <div className="doom-flip-half doom-flip-top">
          <span className="doom-flip-digit">{currentVal}</span>
        </div>

        {/* Static Bottom Half */}
        <div className="doom-flip-half doom-flip-bottom">
          <span className="doom-flip-digit">{isFlipping ? prevVal : currentVal}</span>
        </div>

        {/* 3D Animated Flaps */}
        {isFlipping && (
          <>
            <div className="doom-flip-half doom-flip-top doom-flip-anim-top">
              <span className="doom-flip-digit">{prevVal}</span>
              <div className="doom-flip-shadow top-shadow" />
            </div>
            <div className="doom-flip-half doom-flip-bottom doom-flip-anim-bottom">
              <span className="doom-flip-digit">{currentVal}</span>
              <div className="doom-flip-shadow bottom-shadow" />
            </div>
          </>
        )}

        {/* Physical Mechanical Center Split Groove & Side Hinges */}
        <div className="doom-flip-groove" />
        <div className="doom-flip-hinge doom-hinge-left" />
        <div className="doom-flip-hinge doom-hinge-right" />
      </div>
      <span className="doom-flip-label">{label}</span>
    </div>
  );
}

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
  const [countdown, setCountdown] = useState<TimeRemaining | null>(null);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const lastWordCountRef = useRef<number>(0);

  // Update Countdown Live
  useEffect(() => {
    setCountdown(computeTimeRemaining());
    const interval = setInterval(() => {
      setCountdown(computeTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

          // Words reveal word-by-word during scrolling
          const wordCount = WORD_THRESHOLDS.filter((t) => currentProgress >= t).length;
          if (wordCount !== lastWordCountRef.current) {
            lastWordCountRef.current = wordCount;
            setVisibleWordCount(wordCount);
          }
        }
      }

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    const initialWordCount = WORD_THRESHOLDS.filter((t) => targetProgress >= t).length;
    lastWordCountRef.current = initialWordCount;
    setVisibleWordCount(initialWordCount);
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
          const playProgress = next / TOTAL_FRAMES;
          const wordCount = WORD_THRESHOLDS.filter((t) => playProgress >= t).length;
          if (wordCount !== lastWordCountRef.current) {
            lastWordCountRef.current = wordCount;
            setVisibleWordCount(wordCount);
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
      <div className="netflix-hero-sticky">
        {/* The Curved Cinema Screen Billboard Container */}
        <div className="netflix-curved-screen-frame" ref={billboardScreenRef}>
          <div className="netflix-curved-screen-clip-wrap">
            {/* The Scrubbing / Playing Canvas */}
            <canvas ref={canvasRef} width={1280} height={720} className="netflix-curved-canvas" />

            {/* Subtle bottom shadow for cinematic depth */}
            <div className="netflix-canvas-subtle-bottom" />

            {/* Transparent Word-by-Word Dialogue */}
            <div className="doom-dialogue-transparent" aria-label="Kneel before Victor von Doom">
              <div className="doom-dialogue-phrase">
                {DOOM_WORDS.map((w, idx) => {
                  const isVisible = visibleWordCount > idx;
                  return (
                    <span
                      key={idx}
                      className={`doom-dialogue-word ${w.highlight ? "doom-word-highlight" : ""} ${
                        isVisible ? "is-visible" : "is-hidden"
                      }`}
                    >
                      {w.text}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Loading Indicator */}
            {loadProgress < 100 && (
              <div className="netflix-billboard-loading">
                <div className="loading-spinner" />
                <span>LOADING DOOM CANVAS... {loadProgress}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Cinematic Doomsday Release Chronometer HUD */}
        <div
          className="doom-countdown-container"
          onClick={() => scrollTo("explore-section")}
          role="button"
          tabIndex={0}
          aria-label="Avengers: Doomsday Release Countdown"
        >
          {!countdown || !countdown.isExpired ? (
            <div className="doom-countdown-grid">
              <FlipClockCard
                value={countdown ? String(countdown.days).padStart(2, "0") : "00"}
                label="DAYS"
              />
              <FlipClockCard
                value={countdown ? String(countdown.hours).padStart(2, "0") : "00"}
                label="HOURS"
              />
              <FlipClockCard
                value={countdown ? String(countdown.minutes).padStart(2, "0") : "00"}
                label="MINUTES"
              />
              <FlipClockCard
                value={countdown ? String(countdown.seconds).padStart(2, "0") : "00"}
                label="SECONDS"
              />
            </div>
          ) : (
            <div className="doom-countdown-now-playing">
              <span>NOW IN THEATERS WORLDWIDE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
