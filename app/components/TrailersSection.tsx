"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TRAILERS = [
  {
    id: "hA6hldpSTF8",
    label: "Official Reveal",
    title: "AVENGERS: DOOMSDAY",
    sub: "Robert Downey Jr. Comic-Con Hall H Reveal",
  },
  {
    id: "tc3n23Zq9_0",
    label: "Teaser Transmission",
    title: "AVENGERS: DOOMSDAY",
    sub: "The Multiverse Incursion Prelude",
  },
];

export default function TrailersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="trailers" ref={ref} className="relative overflow-hidden" style={{ background: "#020604" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(16,185,129,0.012) 81px)" }} />
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.35), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto" style={{ padding: "clamp(40px, 7vw, 112px) clamp(16px, 4vw, 48px)" }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(24px, 5vw, 64px)" }}>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
            style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--emerald-bright)", fontFamily: "sans-serif", marginBottom: 10, fontWeight: 700 }}>
            Marvel Studios Transmissions
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay: 0.08 }}
            style={{ fontSize: "clamp(32px, 6vw, 80px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
            Witness the<br /><span className="emerald-gradient">Transmissions.</span>
          </motion.h2>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(20px, 4vw, 28px)" }}>
          {TRAILERS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i }}
              className="group"
              style={{ position: "relative" }}
            >
              {/* Video container — 16:9 */}
              <div style={{
                position: "relative",
                paddingBottom: "56.25%",
                overflow: "hidden",
                border: "1px solid rgba(16,185,129,0.2)",
                borderLeft: "3px solid var(--emerald)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(16,185,129,0.1)",
              }}>
                {/* Emerald top accent */}
                <div style={{
                  position: "absolute", inset: "0 0 auto 0", height: 2, zIndex: 2,
                  background: "linear-gradient(90deg, var(--emerald-bright), var(--gold))", opacity: 0.9,
                }} />

                <iframe
                  src={`https://www.youtube.com/embed/${t.id}?rel=0&modestbranding=1`}
                  title={t.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              </div>

              {/* Caption below */}
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 24, height: 2, background: "var(--emerald)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--emerald-bright)", fontFamily: "sans-serif", marginBottom: 2, fontWeight: 700 }}>
                    {t.label}
                  </p>
                  <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(241,245,249,0.6)", fontFamily: "sans-serif" }}>
                    {t.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent)" }} />
    </section>
  );
}
