"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const POWERS = [
  {
    n: "01",
    title: "Arcane Sorcery",
    stat: "CLASS 1",
    statLabel: "Mystic Potency",
    desc: "Mastery over ancient Latverian dark arts, Eldritch spells, and interdimensional rifts rivaling the Sorcerer Supreme and ancient elder gods.",
  },
  {
    n: "02",
    title: "Titanium Cyber-Armor",
    stat: "100GW",
    statLabel: "Nuclear Output",
    desc: "Indestructible vibranium-titanium exoskeleton infused with micro-conduits, repulsor generators, and impenetrable forcefield shielding.",
  },
  {
    n: "03",
    title: "Beyonder Omnipotence",
    stat: "INFINITY",
    statLabel: "Cosmic Authority",
    desc: "Reality-warping celestial energy stolen from the architects of the multiverse, capable of binding fractured Earths into Battleworld.",
  },
  {
    n: "04",
    title: "Doombot Legion",
    stat: "10,000+",
    statLabel: "Autonomous Units",
    desc: "Sentient cybernetic army replicating Doom's intellect, equipped with quantum particle blasters and neural telepathic links.",
  },
  {
    n: "05",
    title: "Diplomatic Sovereignty",
    stat: "ABSOLUTE",
    statLabel: "Imperial Authority",
    desc: "Monarch of Latveria and supreme God Emperor of Battleworld. By sovereign decree, Victor von Doom stands above all mortal laws.",
  },
  {
    n: "06",
    title: "Level-12 Intellect",
    stat: "PEAK",
    statLabel: "Cognitive Tier",
    desc: "Peerless polymath mastery spanning quantum temporal mechanics, robotic engineering, cosmic radiation, and forbidden occult lore.",
  },
];

export default function PowersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="dominion" ref={ref} className="relative overflow-hidden" style={{ background: "#020604" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 60px, rgba(16,185,129,0.015) 61px)",
      }} />
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.35), transparent)" }} />

      <div className="relative z-10 py-28">
        {/* Header */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16" style={{ paddingLeft: "clamp(24px, 5vw, 80px)" }}>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
                style={{ fontSize: 11, letterSpacing: "0.7em", textTransform: "uppercase", color: "var(--emerald-bright)", fontFamily: "sans-serif", marginBottom: 14, fontWeight: 700 }}>
                The Arsenal of God Emperor
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay: 0.08 }}
                style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
                Beyond<br /><span className="emerald-gradient">Mortal Men.</span>
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ maxWidth: 360, fontSize: 14, lineHeight: 1.85, color: "rgba(241,245,249,0.5)", fontFamily: "sans-serif" }}>
              Neither purely man nor machine, nor strictly god. Victor von Doom bends the fundamental laws of both science and magic to enforce absolute order across Battleworld.
            </motion.p>
          </div>
        </div>

        {/* Horizontal scroll cards */}
        <div
          className="flex gap-4 overflow-x-auto pb-6"
          style={{
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {POWERS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.07 * i }}
              className="group flex-shrink-0"
              style={{
                scrollSnapAlign: "start",
                width: "clamp(280px, 28vw, 360px)",
                border: "1px solid rgba(16,185,129,0.15)",
                background: "rgba(255,255,255,0.02)",
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: "linear-gradient(90deg, var(--emerald-bright), var(--gold), transparent)", opacity: 0.8 }} />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 70%)" }} />

              {/* Number */}
              <div style={{ fontSize: 11, fontWeight: 800, fontFamily: "sans-serif", letterSpacing: "0.25em", color: "var(--emerald)", marginBottom: 28 }}>
                {p.n}
              </div>

              {/* Title */}
              <h3 style={{ fontSize: "clamp(20px, 2.3vw, 26px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.15, marginBottom: 16 }}>
                {p.title}
              </h3>

              {/* Description */}
              <p style={{ fontSize: 13, color: "rgba(241,245,249,0.5)", fontFamily: "sans-serif", lineHeight: 1.85, marginBottom: 36, minHeight: 80 }}>
                {p.desc}
              </p>

              {/* Stat */}
              <div style={{ borderTop: "1px solid rgba(16,185,129,0.15)", paddingTop: 20 }}>
                <div className="emerald-gradient" style={{ fontSize: "clamp(30px, 3.8vw, 44px)", fontWeight: 900, fontFamily: "sans-serif", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {p.stat}
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "sans-serif", marginTop: 6, fontWeight: 700 }}>
                  {p.statLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-3 mt-6"
          style={{ paddingLeft: "clamp(24px, 5vw, 80px)" }}>
          <div style={{ height: 1, width: 40, background: "rgba(16,185,129,0.4)" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(241,245,249,0.4)", fontFamily: "sans-serif" }}>
            Scroll to explore arsenal
          </span>
        </motion.div>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent)" }} />
    </section>
  );
}
