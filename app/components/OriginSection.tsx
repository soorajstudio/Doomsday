"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ACTS = [
  {
    label: "ACT I",
    title: "The Incursions",
    desc: "Infinite universes on collision course. As parallel Earths smash together in cataclysmic extinction events, the Avengers and Illuminati exhaust every weapon, only to watch the multiverse burn.",
  },
  {
    label: "ACT II",
    title: "The Beyonder Breach",
    desc: "When science and heroes fail, Victor von Doom steps into the celestial rift. Combining ancient dark sorcery with quantum temporal mechanics, he seizes omnipotent power from the cosmic architects.",
  },
  {
    label: "ACT III",
    title: "Rise of Battleworld",
    desc: "From the fragments of dying realities, God Emperor Doom constructs a single sovereign patchwork realm: Battleworld. To question his rule is heresy. All hope lies in Doom.",
  },
];

const STATS = [
  { val: "2026", label: "DECEMBER 18" },
  { val: "IMAX", label: "70MM DUAL 4K" },
  { val: "PHASE 6", label: "MCU CLIMAX" },
  { val: "VICTOR", label: "VON DOOM" },
];

export default function OriginSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden" style={{ background: "#020604", minHeight: "100vh" }}>

      {/* Parallax emerald incursion orb */}
      <motion.div style={{ y: bgY }} className="absolute pointer-events-none" aria-hidden initial={false}>
        <div style={{
          position: "absolute",
          top: "10vh", left: "-20vw",
          width: "70vw", height: "70vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, rgba(5,150,105,0.05) 45%, transparent 70%)",
          filter: "blur(90px)",
        }} />
      </motion.div>

      {/* Diagonal slash accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute",
          top: 0, right: "38%",
          width: 1, height: "100%",
          background: "linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.2) 30%, rgba(212,175,55,0.2) 70%, transparent 100%)",
        }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05 }} preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i}
              x1={`${-20 + i * 18}%`} y1="0"
              x2={`${20 + i * 18}%`} y2="100%"
              stroke="#10b981" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 items-start">

          {/* ── LEFT ── */}
          <div className="relative">

            {/* Label */}
            <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
              style={{ fontSize: 11, letterSpacing: "0.7em", textTransform: "uppercase", color: "var(--emerald-bright)", fontFamily: "sans-serif", marginBottom: 28, fontWeight: 700 }}>
              The Multiverse Incursion
            </motion.p>

            {/* Giant title — each word staggered */}
            <div style={{ overflow: "hidden", marginBottom: 44 }}>
              {["COLLAPSE.", "REBIRTH.", "DOOM."].map((word, i) => (
                <motion.div key={word}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}>
                  <span style={{
                    display: "block",
                    fontSize: "clamp(56px, 9vw, 120px)",
                    fontWeight: 900,
                    fontFamily: "sans-serif",
                    letterSpacing: "-0.03em",
                    lineHeight: 0.9,
                    color: word === "DOOM." ? "var(--emerald-bright)" : "#fff",
                    textShadow: word === "DOOM."
                      ? "0 0 80px rgba(16,185,129,0.7), 0 0 30px rgba(212,175,55,0.4)"
                      : "0 4px 40px rgba(0,0,0,0.8)",
                  }}>
                    {word}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Body copy */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.4 }}
              style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(241,245,249,0.7)", maxWidth: 460, marginBottom: 20 }}>
              The Sacred Timeline has disintegrated into infinite warring incursions.
              Every realm, every variant, every hero who ever stood against destiny
              finds themselves cast into the forge of Battleworld.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.5 }}
              style={{ fontSize: 14, lineHeight: 1.9, color: "rgba(241,245,249,0.4)", maxWidth: 460, marginBottom: 52 }}>
              Starring Robert Downey Jr. in his historic return to the Marvel Cinematic Universe
              as Victor von Doom, <span className="text-emerald-400 font-semibold">Avengers: Doomsday</span> redefines the fate of all existence.
            </motion.p>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(16,185,129,0.2)" }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  flex: 1, padding: "24px 0",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(16,185,129,0.15)" : "none",
                  paddingLeft: i > 0 ? 24 : 0,
                }}>
                  <div className="emerald-gradient" style={{ fontSize: "clamp(24px, 3.2vw, 38px)", fontWeight: 900, fontFamily: "sans-serif", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(212,175,55,0.7)", fontFamily: "sans-serif", marginTop: 8, fontWeight: 700 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Act timeline ── */}
          <div className="relative mt-16 lg:mt-24">
            {/* Vertical emerald line */}
            <motion.div
              initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                width: 2,
                background: "linear-gradient(180deg, transparent, rgba(16,185,129,0.8) 20%, rgba(212,175,55,0.6) 80%, transparent)",
                transformOrigin: "top",
              }} />

            <div className="pl-10 flex flex-col gap-0">
              {ACTS.map((act, i) => (
                <motion.div key={act.label}
                  initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + 0.15 * i }}
                  className="group relative"
                  style={{ paddingBottom: i < ACTS.length - 1 ? 48 : 0 }}>

                  {/* Dot on the line */}
                  <div style={{
                    position: "absolute", left: -41, top: 6,
                    width: 16, height: 16,
                    borderRadius: "50%",
                    border: "2px solid var(--emerald-bright)",
                    background: "#020604",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s",
                  }}
                    className="group-hover:shadow-[0_0_16px_rgba(16,185,129,0.8)] group-hover:scale-110">
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
                  </div>

                  {/* Act label */}
                  <p style={{ fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "sans-serif", marginBottom: 10, fontWeight: 700 }}>
                    {act.label}
                  </p>

                  {/* Act title */}
                  <h4 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.01em", marginBottom: 12, lineHeight: 1.1 }}
                    className="group-hover:text-emerald-400 transition-colors duration-300">
                    {act.title}
                  </h4>

                  {/* Desc */}
                  <p style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(241,245,249,0.6)", maxWidth: 420 }}>
                    {act.desc}
                  </p>

                  {/* Connector line between acts */}
                  {i < ACTS.length - 1 && (
                    <div style={{
                      position: "absolute", left: -34, top: 22,
                      width: 1, height: "calc(100% - 22px)",
                      background: "rgba(16,185,129,0.2)",
                    }} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)" }} />
    </section>
  );
}
