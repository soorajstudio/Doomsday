"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VILLAINS = [
  {
    n: "01",
    name: "The Beyonders",
    threat: "OMNIPOTENT",
    level: 100,
    color: "#a855f7",
    desc: "Cosmic entities from beyond linear time whose omniversal experiments triggered the incursion cascade. They seek to reclaim the divine energy Doom wrested from them.",
  },
  {
    n: "02",
    name: "Galactus",
    threat: "CATASTROPHIC",
    level: 98,
    color: "#ec4899",
    desc: "The Devourer of Worlds. Magnetically drawn to the celestial nexus of Battleworld, hungering to consume the concentrated core of infinite dead realities.",
  },
  {
    n: "03",
    name: "Kang Remnants",
    threat: "TEMPORAL",
    level: 92,
    color: "#06b6d4",
    desc: "Exiled variants of the Kang Dynasty trapped within localized temporal loops, desperately attempting to collapse Battleworld and rebuild the Kang Dynasty.",
  },
  {
    n: "04",
    name: "Maestro",
    threat: "EXTREME",
    level: 86,
    color: "#22c55e",
    desc: "The tyrannical dystopian Hulk variant who subjugated the radioactive southern wasteland, possessing both Banner's genius and unmatched gamma brutality.",
  },
  {
    n: "05",
    name: "The Void",
    threat: "SINGULARITY",
    level: 95,
    color: "#eab308",
    desc: "The primordial entropic darkness lingering at the perimeter shield of Battleworld, consuming any sector that dares waver in its loyalty to Doom.",
  },
  {
    n: "06",
    name: "Ultron Prime",
    threat: "CRITICAL",
    level: 82,
    color: "#ef4444",
    desc: "A sentient nanite hive virus infiltrating the computational spine of Latverian defense satellites, seeking universal cybernetic assimilation.",
  },
];

export default function VillainsSection() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="threats" ref={ref} className="relative overflow-hidden" style={{ background: "#020604" }}>
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent)" }} />

      <div className="relative z-10 py-28">
        {/* Header */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
                style={{ fontSize: 11, letterSpacing: "0.7em", textTransform: "uppercase", color: "var(--emerald-bright)", fontFamily: "sans-serif", marginBottom: 14, fontWeight: 700 }}>
                Battleworld Warlords
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay: 0.08 }}
                style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
                Threats to the<br /><span className="emerald-gradient">Iron Throne.</span>
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ maxWidth: 320, fontSize: 13, lineHeight: 1.9, color: "rgba(241,245,249,0.45)", fontFamily: "sans-serif" }}>
              Even in a universe forged by God Emperor Doom, rebellion brews across the fractured realms. Six existential threats circling the edge of the abyss.
            </motion.p>
          </div>
        </div>

        {/* Horizontal scroll cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-6"
          style={{
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {VILLAINS.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.07 * i }}
              className="group flex-shrink-0"
              style={{
                scrollSnapAlign: "start",
                width: "clamp(280px, 30vw, 380px)",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Top accent line — villain color */}
              <div className="absolute inset-x-0 top-0 h-0.5 transition-opacity duration-500"
                style={{ background: v.color, opacity: 0.7 }}
              />
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${v.color}15 0%, transparent 70%)` }} />

              {/* Number */}
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "sans-serif", letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)", marginBottom: 28 }}>
                {v.n}
              </div>

              {/* Name */}
              <h3 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
                {v.name}
              </h3>

              {/* Description */}
              <p style={{ fontSize: 13, color: "rgba(241,245,249,0.5)", fontFamily: "sans-serif", lineHeight: 1.85, marginBottom: 36, minHeight: 80 }}>
                {v.desc}
              </p>

              {/* Threat + bar */}
              <div style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.4em", textTransform: "uppercase", color: v.color, fontFamily: "sans-serif" }}>
                    {v.threat}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
                    {v.level}<span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>/100</span>
                  </span>
                </div>
                <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }} animate={inView ? { width: `${v.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.2 + 0.07 * i, ease: "easeOut" }}
                    style={{ height: "100%", background: v.color, boxShadow: `0 0 10px ${v.color}80` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-3 px-6 md:px-12 mt-6"
          style={{ paddingLeft: "clamp(24px, 5vw, 80px)" }}>
          <div style={{ height: 1, width: 40, background: "rgba(16,185,129,0.35)" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(241,245,249,0.3)", fontFamily: "sans-serif" }}>
            Scroll to scan threats
          </span>
        </motion.div>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.2), transparent)" }} />
    </section>
  );
}
