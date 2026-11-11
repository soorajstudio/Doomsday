"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { showToast } from "./Toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FOOTER_FRAMES = 277;
const PAD = (n: number) => String(n).padStart(3, "0");
const FRAME_URL = (i: number) => `/footer-frames/frame-${PAD(i + 1)}.jpg`;

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const frameObj     = useRef({ idx: 0 });
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const inView       = useInView(overlayRef, { once: true });

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
    <div id="tickets" ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

        {/* Immediate Background Poster */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-frames/frame-001.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: firstLoaded ? 0.25 : 1 }}
        />

        {/* Canvas — 277-frame Doomsday scroll animation */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none z-20"
          style={{ background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 20%, rgba(2,6,4,0.75) 75%, rgba(2,6,4,0.95) 100%)" }} />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020604] to-transparent pointer-events-none z-20" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020604] to-transparent pointer-events-none z-20" />

        {/* Cinematic bars */}
        <div className="absolute inset-x-0 top-0 h-12 pointer-events-none z-20" style={{ background: "rgba(0,0,0,0.6)" }} />
        <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none z-20" style={{ background: "rgba(0,0,0,0.6)" }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 web-bg opacity-15 pointer-events-none z-20" />

        {/* CTA overlay */}
        <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-30">

          {/* Marvel badge */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "clamp(14px, 3vw, 28px)", display: "inline-block", padding: "5px 20px", background: "linear-gradient(135deg, #059669 0%, #10b981 100%)", borderRadius: "2px", border: "1px solid rgba(212,175,55,0.4)" }}>
            <span style={{ fontSize: "clamp(9px, 1.2vw, 11px)", fontWeight: 900, letterSpacing: "0.45em", textTransform: "uppercase", color: "#020604", fontFamily: "sans-serif" }}>
              Marvel Studios Event
            </span>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}>
            <h2 style={{
              fontSize: "clamp(42px, 10vw, 120px)", fontWeight: 900, fontFamily: "sans-serif",
              color: "#fff", letterSpacing: "-0.02em", lineHeight: 0.95,
              textShadow: "0 0 100px rgba(16,185,129,0.5), 0 4px 60px rgba(0,0,0,0.9)",
            }}>
              AVENGERS
            </h2>
            <h3 style={{
              fontSize: "clamp(24px, 6vw, 68px)", fontWeight: 900, fontFamily: "sans-serif",
              color: "var(--emerald-bright)", letterSpacing: "0.15em", marginTop: 8,
              textShadow: "0 0 70px rgba(16,185,129,0.8), 0 0 30px rgba(212,175,55,0.5)",
            }}>
              DOOMSDAY
            </h3>
          </motion.div>

          {/* Date */}
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{ marginTop: "clamp(12px, 2.5vw, 22px)", fontSize: "clamp(9px, 1.5vw, 13px)", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "sans-serif", fontWeight: 700 }}>
            In Theaters & IMAX &nbsp;·&nbsp; December 18, 2026
          </motion.p>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pointer-events-auto"
            style={{ marginTop: "clamp(24px, 5vw, 44px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(12px, 2vw, 18px)", width: "100%" }}>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(16,185,129,0.7)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => showToast("Imperial Protocol Confirmed", "Your IMAX 70MM seat has been reserved for December 18, 2026")}
              style={{
                padding: "clamp(14px, 2.5vw, 20px) clamp(30px, 8vw, 56px)",
                background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
                color: "#020604",
                fontSize: "clamp(11px, 1.5vw, 13px)",
                fontWeight: 900,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
                border: "1px solid rgba(212,175,55,0.6)",
                borderRadius: "3px",
                cursor: "pointer",
                width: "clamp(220px, 60vw, 340px)",
                boxShadow: "0 0 30px rgba(16,185,129,0.35)",
              }}>
              Get Tickets Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, borderColor: "var(--emerald-bright)", color: "#fff" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("trailers")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "clamp(12px, 2vw, 18px) clamp(28px, 8vw, 52px)",
                background: "rgba(2,6,4,0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(16,185,129,0.35)",
                color: "rgba(241,245,249,0.8)",
                fontSize: "clamp(10px, 1.5vw, 12px)",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
                cursor: "pointer",
                width: "clamp(220px, 60vw, 340px)",
                borderRadius: "3px",
              }}>
              Watch Transmissions
            </motion.button>
          </motion.div>

          {/* Badges */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ marginTop: "clamp(20px, 3vw, 44px)", display: "flex", gap: "clamp(6px, 1.5vw, 12px)", flexWrap: "wrap", justifyContent: "center" }}>
            {["IMAX 70MM", "DOLBY CINEMA", "4DX", "REALD 3D", "PHASE 6 CLIMAX"].map(b => (
              <span key={b} style={{ fontSize: "clamp(7px, 1.2vw, 9px)", letterSpacing: "0.3em", textTransform: "uppercase", padding: "6px 12px", border: "1px solid rgba(16,185,129,0.25)", color: "rgba(241,245,249,0.6)", fontFamily: "sans-serif", background: "rgba(2,6,4,0.4)" }}>
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Footer bar */}
        <div className="absolute inset-x-0 bottom-0 z-30" style={{ padding: "0 clamp(16px, 5vw, 40px) 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/doom-mask-emblem.png" alt="Doctor Doom"
                style={{ width: 24, height: 24, objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(16,185,129,0.8))" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--emerald-bright)", fontFamily: "sans-serif", fontWeight: 700 }}>
                AVENGERS: DOOMSDAY
              </span>
            </div>
            <p style={{ fontSize: 9, color: "rgba(241,245,249,0.3)", fontFamily: "sans-serif" }}>
              © 2026 MARVEL STUDIOS. All Rights Reserved.
            </p>
            <div className="hidden sm:flex" style={{ gap: 24 }}>
              {[
                { label: "Imperial Decrees",  msg: "Latverian Sovereignty — All subjects of Battleworld are granted safe passage upon the Emperor's command." },
                { label: "Multiverse Protocol", msg: "Incursion Advisory — Realities colliding. Seek immediate shelter in designated Battleworld domains." },
                { label: "Marvel Dispatch",    msg: "Marvel Studios Press — press@marvel-doomsday2026.com" },
              ].map(({ label, msg }) => (
                <button key={label}
                  onClick={() => showToast(label, msg)}
                  style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(241,245,249,0.4)", fontFamily: "sans-serif", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--emerald-bright)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(241,245,249,0.4)")}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
