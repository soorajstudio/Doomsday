"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "../utils/basePath";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_HERO_FRAMES = 134;
const PAD = (n: number) => String(n).padStart(3, "0");
const FRAME_URL = (i: number) => assetPath(`/hero-frames/frame-${PAD(i + 1)}.jpg`);

const CAPTIONS = [
  { at: 0.05, text: "The Multiverse is dying.", sub: "Incursions are colliding every timeline. None can escape." },
  { at: 0.28, text: "All hope seemed lost.", sub: "Until one man seized the power of gods." },
  { at: 0.52, text: "New Mask. Same Task.", sub: "The savior of reality has claimed his rightful throne." },
  { at: 0.76, text: "There is only DOOM.", sub: "Bow before the sovereign of Battleworld." },
];

const RELEASE = new Date("2026-12-18T00:00:00");

function useHeroCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = RELEASE.getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function FrameHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<HTMLDivElement>(null);
  const captionRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const frameObj     = useRef({ idx: 0 });
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const { d, h, m, s } = useHeroCountdown();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    function resize() {
      if (!canvas || !ctxRef.current) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(frameObj.current.idx);
    }

    function draw(raw: number) {
      const idx = Math.min(TOTAL_HERO_FRAMES - 1, Math.max(0, Math.round(raw)));
      const img = framesRef.current[idx];
      if (!img?.complete || img.naturalWidth === 0 || !canvas || !ctxRef.current) return;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctxRef.current.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    }

    // Preload frames
    for (let i = 0; i < TOTAL_HERO_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_URL(i);
      img.onload = () => {
        if (i === 0) {
          setFirstLoaded(true);
          resize();
          draw(0);
        }
      };
      framesRef.current.push(img);
    }

    window.addEventListener("resize", resize);
    resize();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    // Frame scrub
    tl.to(frameObj.current, {
      idx: TOTAL_HERO_FRAMES - 1,
      ease: "none",
      duration: 1,
      onUpdate: () => draw(frameObj.current.idx),
    }, 0);

    // Title fades out as scroll begins
    tl.to(titleRef.current, { opacity: 0, y: -50, duration: 0.08 }, 0.06);

    // Captions
    captionRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = CAPTIONS[i].at;
      tl.fromTo(el, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.07 }, start);
      tl.to(el, { opacity: 0, y: -25, duration: 0.06 }, start + 0.16);
    });

    // Timer fades in after ~half the scroll
    if (timerRef.current) {
      tl.fromTo(timerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.5
      );
    }

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "600vh", position: "relative" }}>
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>

        {/* Immediate Background Poster (Prevents ANY black screen while JS/frames initialize) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/hero-frames/frame-001.jpg")}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: firstLoaded ? 0.3 : 1 }}
        />

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

        {/* Dark cinematic vignette with emerald fringe */}
        <div className="absolute inset-0 pointer-events-none z-20"
          style={{ background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, rgba(2,6,4,0.75) 75%, rgba(2,6,4,0.95) 100%)" }} />

        {/* Top bar shadow */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/85 to-transparent pointer-events-none z-20" />

        {/* Bottom bar shadow */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#020604] to-transparent pointer-events-none z-20" />

        {/* Cinematic letterbox — top bar */}
        <div className="absolute inset-x-0 top-0 h-14 pointer-events-none z-20" style={{ background: "rgba(0,0,0,0.6)" }} />

        {/* Cinematic letterbox — bottom ticker bar */}
        <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none overflow-hidden z-20"
          style={{ background: "#010403", borderTop: "1px solid rgba(16,185,129,0.3)" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            whiteSpace: "nowrap",
            animation: "tickerScroll 22s linear infinite",
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(20px, 4vw, 60px)",
                paddingRight: "clamp(20px, 4vw, 60px)",
                fontSize: "clamp(10px, 1vw, 13px)",
                fontFamily: "sans-serif",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(241,245,249,0.9)",
                fontWeight: 700,
              }}>
                <span style={{ color: "var(--emerald-bright)", fontSize: "10px" }}>◆</span>
                <span>AVENGERS: DOOMSDAY</span>
                <span style={{ color: "rgba(16,185,129,0.5)" }}>—</span>
                <span style={{ color: "var(--gold-bright)" }}>DECEMBER 18, 2026</span>
                <span style={{ color: "rgba(16,185,129,0.5)" }}>—</span>
                <span style={{ color: "rgba(241,245,249,0.5)", fontWeight: 400 }}>FILMED FOR IMAX</span>
                <span style={{ color: "var(--emerald-bright)", fontSize: "10px" }}>◆</span>
                <span style={{ color: "var(--emerald)" }}>THERE IS ONLY DOOM</span>
              </span>
            ))}
          </div>
        </div>

        {/* Release countdown — top right */}
        <div ref={timerRef} className="absolute pointer-events-none z-20"
          style={{ top: "clamp(72px, 10vh, 110px)", right: "clamp(24px, 5vw, 72px)", opacity: 0 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.6em", textTransform: "uppercase", color: "var(--emerald-bright)", fontFamily: "sans-serif", textAlign: "right", marginBottom: 10, fontWeight: 700 }}>
            Incursion Zero Countdown
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
            {[{ v: d, l: "DAYS" }, { v: h, l: "HOURS" }, { v: m, l: "MINS" }, { v: s, l: "SECS" }].map(({ v, l }, i, arr) => (
              <div key={l} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "clamp(22px, 3.5vw, 38px)",
                    fontWeight: 900,
                    fontFamily: "sans-serif",
                    color: "#fff",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    textShadow: "0 0 30px rgba(16,185,129,0.45)",
                    fontVariantNumeric: "tabular-nums",
                    padding: "8px 10px 6px",
                    background: "rgba(2,6,4,0.75)",
                    backdropFilter: "blur(12px)",
                    borderTop: "2px solid var(--emerald)",
                    borderBottom: "1px solid rgba(212,175,55,0.4)",
                    minWidth: "clamp(46px, 5.5vw, 64px)",
                  }}>
                    {String(v).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: 7, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(16,185,129,0.6)", fontFamily: "sans-serif", marginTop: 5, fontWeight: 700 }}>
                    {l}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <span style={{ fontSize: "clamp(14px, 2.5vw, 22px)", color: "rgba(16,185,129,0.4)", fontWeight: 300, paddingTop: 6, fontFamily: "sans-serif" }}>:</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emerald scan line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035] z-20">
          <div className="w-full h-32 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
            style={{ animation: "scanline 6s linear infinite" }} />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 web-bg pointer-events-none opacity-30 z-20" />

        {/* ── INITIAL TITLE (fades out on scroll) ── */}
        <div ref={titleRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-30">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <p className="text-[11px] tracking-[0.8em] uppercase font-bold text-emerald-400"
              style={{ fontFamily: "sans-serif" }}>
              Marvel Studios Presents
            </p>
          </div>

          <h1 className="font-black uppercase leading-none" style={{ fontFamily: "sans-serif" }}>
            <span className="block text-5xl sm:text-7xl md:text-9xl tracking-tight"
              style={{
                color: "#ffffff",
                textShadow: "0 0 90px rgba(16,185,129,0.6), 0 4px 50px rgba(0,0,0,0.9)",
              }}>
              AVENGERS
            </span>
            <span className="block text-4xl sm:text-6xl md:text-8xl mt-3 tracking-widest text-emerald-400"
              style={{
                textShadow: "0 0 60px rgba(16,185,129,0.8), 0 0 100px rgba(212,175,55,0.4)",
              }}>
              DOOMSDAY
            </span>
          </h1>

          <p className="mt-8 text-sm md:text-lg tracking-[0.45em] uppercase font-light text-slate-300/80 max-w-xl">
            There is no salvation. There is only <span className="font-bold text-emerald-400">DOOM</span>.
          </p>

          <div className="mt-12 flex items-center gap-2 text-white/40 text-[10px] tracking-[0.4em] uppercase">
            <span className="w-8 h-[1px] bg-emerald-500/40" />
            <span>Scroll To Enter Battleworld</span>
            <span className="w-8 h-[1px] bg-emerald-500/40" />
          </div>
        </div>

        {/* ── CAPTIONS (fade in/out on scroll) ── */}
        {CAPTIONS.map((cap, i) => (
          <div
            key={i}
            ref={(el) => { captionRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-30"
            style={{ opacity: 0 }}
          >
            <div className="p-8 max-w-3xl rounded-lg border border-emerald-500/20 bg-black/60 backdrop-blur-xl shadow-2xl">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4"
                style={{ fontFamily: "sans-serif", textShadow: "0 0 40px rgba(16,185,129,0.5)" }}>
                {cap.text}
              </h2>
              <p className="text-sm sm:text-lg md:text-xl font-light text-emerald-300/80 tracking-widest uppercase">
                {cap.sub}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
