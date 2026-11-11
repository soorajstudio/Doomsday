"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [phase, setPhase] = useState<"hold" | "split" | "done">("hold");

  useEffect(() => {
    // Smooth, rapid split transition so user enters the experience without delay
    const t1 = setTimeout(() => setPhase("split"), 1000);
    const t2 = setTimeout(() => setPhase("done"), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  const splitting = phase === "split";

  return (
    <AnimatePresence>
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>

        {/* ── LEFT PANEL ── */}
        <motion.div
          animate={{ x: splitting ? "-100%" : "0%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "absolute",
            top: 0, bottom: 0, left: 0, right: "50%",
            background: "#020604",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            borderRight: "1px solid rgba(16, 185, 129, 0.4)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/logos/doom-loader-left.png"
            alt="Doom Mask Left"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: "clamp(120px, 20vw, 260px)",
              width: "auto",
              maxWidth: "48vw",
              objectFit: "contain",
              filter: "drop-shadow(0 0 45px rgba(16, 185, 129, 0.8))",
              flexShrink: 0,
            }}
          />
        </motion.div>

        {/* ── RIGHT PANEL ── */}
        <motion.div
          animate={{ x: splitting ? "100%" : "0%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "absolute",
            top: 0, bottom: 0, left: "50%", right: 0,
            background: "#020604",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "flex-start",
            borderLeft: "1px solid rgba(16, 185, 129, 0.4)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/logos/doom-loader-right.png"
            alt="Doom Mask Right"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: "clamp(120px, 20vw, 260px)",
              width: "auto",
              maxWidth: "48vw",
              objectFit: "contain",
              filter: "drop-shadow(0 0 45px rgba(16, 185, 129, 0.8))",
              flexShrink: 0,
            }}
          />
        </motion.div>

        {/* Central Seam */}
        <motion.div
          animate={{ opacity: splitting ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: 0, bottom: 0, left: "50%",
            width: 2,
            transform: "translateX(-50%)",
            background: "linear-gradient(180deg, transparent, rgba(52, 211, 153, 0.9) 30%, rgba(212, 175, 55, 0.9) 70%, transparent)",
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.9)",
          }}
        />

        {/* Intro Subtitle */}
        <motion.div
          animate={{ opacity: splitting ? 0 : 1, y: splitting ? -20 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 bottom-16 text-center pointer-events-none"
        >
          <p className="text-[11px] uppercase tracking-[0.8em] font-bold text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
            ALL HOPE LIES IN DOOM
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
