"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showToast } from "./Toast";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FOOTER_FRAMES = 277;
const PAD = (n: number) => String(n).padStart(3, "0");
const FRAME_URL = (i: number) => `/footer-frames/frame-${PAD(i + 1)}.jpg`;

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const frameObj     = useRef({ idx: 0 });
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(frameObj.current.idx);
    }

    function draw(raw: number) {
      const idx = Math.min(TOTAL_FOOTER_FRAMES - 1, Math.max(0, Math.round(raw)));
      const img = framesRef.current[idx];
      if (!img?.complete || img.naturalWidth === 0 || !canvas || !ctxRef.current) return;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctxRef.current.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    }

    for (let i = 0; i < TOTAL_FOOTER_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_URL(i);
      img.onload = () => { if (i === 0) { resize(); draw(0); } };
      framesRef.current.push(img);
    }

    window.addEventListener("resize", resize);
    resize();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.to(frameObj.current, {
      idx: TOTAL_FOOTER_FRAMES - 1,
      ease: "none",
      duration: 1,
      onUpdate: () => draw(frameObj.current.idx),
    });

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

          {/* Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Dark vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 25%, rgba(2,6,4,0.75) 75%, rgba(2,6,4,0.95) 100%)" }} />

          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020604] to-transparent pointer-events-none" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020604] to-transparent pointer-events-none" />

          {/* Cinematic bars */}
          <div className="absolute inset-x-0 top-0 h-12 pointer-events-none" style={{ background: "rgba(0,0,0,0.6)" }} />
          <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none" style={{ background: "rgba(0,0,0,0.6)" }} />

          {/* Subtle grid */}
          <div className="absolute inset-0 web-bg opacity-15 pointer-events-none" />

          {/* Centre text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
            <p className="text-[10px] tracking-[0.8em] uppercase mb-4 text-emerald-400 font-bold" style={{ fontFamily: "sans-serif" }}>
              Marvel Studios
            </p>
            <h2 className="font-black uppercase leading-none" style={{ fontFamily: "sans-serif" }}>
              <span className="block" style={{ fontSize: "clamp(42px, 8vw, 100px)", color: "#fff", letterSpacing: "-0.02em", textShadow: "0 0 80px rgba(16,185,129,0.5)" }}>
                AVENGERS
              </span>
              <span className="block mt-2 text-emerald-400" style={{ fontSize: "clamp(24px, 4.5vw, 56px)", letterSpacing: "0.15em", textShadow: "0 0 60px rgba(16,185,129,0.8)" }}>
                DOOMSDAY
              </span>
            </h2>
            <p className="mt-6 text-xs tracking-[0.45em] uppercase text-amber-400 font-semibold" style={{ fontFamily: "sans-serif" }}>
              Only In Theaters & IMAX · December 18, 2026
            </p>
          </div>

          {/* Bottom footer bar */}
          <div className="absolute inset-x-0 bottom-0 z-10" style={{ padding: "0 40px 20px" }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/doom-mask-emblem.png" alt="Doctor Doom"
                  style={{ width: 28, height: 28, objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(16,185,129,0.8))" }} />
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-emerald-400" style={{ fontFamily: "sans-serif" }}>
                  AVENGERS: DOOMSDAY
                </span>
              </div>

              <p className="text-[10px] text-white/30" style={{ fontFamily: "sans-serif" }}>
                © 2026 MARVEL STUDIOS. All Rights Reserved.
              </p>

              <div className="flex gap-6">
                {[
                  { l: "Imperial Decrees", msg: "All territories of Battleworld fall under sovereign jurisdiction of Victor von Doom." },
                  { l: "Multiverse Protocol", msg: "Incursions imminent across all local quadrants." },
                  { l: "Marvel Dispatch", msg: "Marvel Studios Press — press@marvel-doomsday2026.com" },
                ].map(({ l, msg }) => (
                  <button key={l}
                    onClick={() => showToast(l, msg)}
                    className="text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 text-white/40 hover:text-emerald-400 bg-transparent border-none cursor-pointer"
                    style={{ fontFamily: "sans-serif" }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
