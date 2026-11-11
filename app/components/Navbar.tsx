"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showToast } from "./Toast";
import { assetPath } from "../utils/basePath";

gsap.registerPlugin(ScrollTrigger);

const LINKS: { label: string; target: string }[] = [
  { label: "Incursion", target: "story" },
  { label: "Factions",  target: "cast" },
  { label: "Dominion",  target: "dominion" },
  { label: "Gallery",   target: "gallery" },
  { label: "Threats",   target: "threats" },
  { label: "Trailers",  target: "trailers" },
  { label: "Tickets",   target: "tickets" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      start: "top -60",
      onUpdate: (self) => {
        if (!navRef.current) return;
        if (self.scroll() > 60) {
          navRef.current.style.background = "rgba(2, 6, 4, 0.95)";
          navRef.current.style.borderBottomColor = "rgba(16, 185, 129, 0.25)";
          navRef.current.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(16, 185, 129, 0.1)";
        } else {
          navRef.current.style.background = "transparent";
          navRef.current.style.borderBottomColor = "transparent";
          navRef.current.style.boxShadow = "none";
        }
      },
    });
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 border-b transition-all duration-500 backdrop-blur-md"
      style={{ borderBottomColor: "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
        >
          <div className="w-10 h-10 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath("/logos/doom-mask-emblem.png")}
              alt="Doctor Doom Mask"
              style={{ width: 38, height: 38, objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.85))" }}
            />
          </div>
          <div className="text-left">
            <div className="text-[10px] tracking-[0.6em] uppercase font-semibold text-white/50">
              MARVEL STUDIOS
            </div>
            <div className="text-[12px] tracking-[0.35em] uppercase font-black" style={{ color: "var(--emerald-bright)" }}>
              AVENGERS: DOOMSDAY
            </div>
          </div>
        </button>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map(({ label, target }) => (
            <button
              key={label}
              onClick={() => scrollTo(target)}
              className="text-xs tracking-[0.25em] uppercase transition-all duration-300 relative group py-2"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(241, 245, 249, 0.55)", fontFamily: "sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--emerald-bright)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(241, 245, 249, 0.55)")}
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.55)" }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            scrollTo("tickets");
            showToast("Latverian Protocol Active", "Imperial passes reserved for December 18, 2026");
          }}
          className="text-xs font-bold tracking-[0.25em] uppercase px-6 py-2.5 transition-all duration-300 rounded-sm relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
            color: "#020604",
            border: "1px solid rgba(212, 175, 55, 0.5)",
            cursor: "pointer",
            fontFamily: "sans-serif",
            textShadow: "0 1px 2px rgba(255,255,255,0.2)",
          }}
        >
          <span className="relative z-10">Get Tickets</span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>
    </motion.nav>
  );
}
