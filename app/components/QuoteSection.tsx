"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountdown(target: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function update() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

const RELEASE = new Date("2026-12-18T00:00:00");

function TimeUnit({ val, label }: { val: number; label: string }) {
  const display = String(val).padStart(2, "0");
  const [prev, setPrev] = useState(display);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (display !== prev) {
      setFlip(true);
      const t = setTimeout(() => { setPrev(display); setFlip(false); }, 250);
      return () => clearTimeout(t);
    }
  }, [display, prev]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Card */}
      <div style={{
        position: "relative",
        width: "clamp(64px, 14vw, 180px)",
        overflow: "hidden",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(16,185,129,0.2)",
        borderRadius: "4px",
        backdropFilter: "blur(12px)",
      }}>
        {/* Emerald top bar */}
        <div style={{ position: "absolute", inset: "0 0 auto 0", height: 2, background: "var(--emerald)", zIndex: 2 }} />

        {/* Number */}
        <div style={{
          padding: "clamp(12px, 3vw, 42px) 0 clamp(8px, 2vw, 28px)",
          textAlign: "center",
          transform: flip ? "scaleY(0.88)" : "scaleY(1)",
          transition: "transform 0.15s ease",
        }}>
          <span style={{
            fontSize: "clamp(34px, 9vw, 110px)",
            fontWeight: 900,
            fontFamily: "sans-serif",
            color: "#fff",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            display: "block",
            textShadow: "0 0 60px rgba(16,185,129,0.4), 0 2px 20px rgba(0,0,0,0.8)",
            fontVariantNumeric: "tabular-nums",
          }}>
            {display}
          </span>
        </div>

        {/* Horizontal split line across middle */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0, right: 0,
          height: 1,
          background: "rgba(0,0,0,0.7)",
          zIndex: 3,
          boxShadow: "0 0 0 0.5px rgba(16,185,129,0.15)",
        }} />

        {/* Subtle inner glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Label */}
      <p style={{
        marginTop: 10,
        fontSize: 9,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "var(--gold)",
        fontFamily: "sans-serif",
        fontWeight: 700,
      }}>
        {label}
      </p>
    </div>
  );
}

function Colon() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 1vw, 10px)", paddingBottom: "clamp(20px, 4vw, 32px)", alignSelf: "center" }}>
      <div style={{ width: "clamp(3px, 0.5vw, 5px)", height: "clamp(3px, 0.5vw, 5px)", borderRadius: "50%", background: "var(--emerald-bright)", boxShadow: "0 0 8px var(--emerald)" }} />
      <div style={{ width: "clamp(3px, 0.5vw, 5px)", height: "clamp(3px, 0.5vw, 5px)", borderRadius: "50%", background: "var(--emerald-bright)", boxShadow: "0 0 8px var(--emerald)" }} />
    </div>
  );
}

export default function QuoteSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const time = useCountdown(RELEASE);

  const units = [
    { label: "Days",    val: time.days },
    { label: "Hours",   val: time.hours },
    { label: "Minutes", val: time.minutes },
    { label: "Seconds", val: time.seconds },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#020604" }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 65%)" }} />

      {/* Diagonal grid lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }} preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={`${i * 12}%`} y1="0" x2={`${30 + i * 12}%`} y2="100%"
            stroke="#10b981" strokeWidth="0.8" />
        ))}
      </svg>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.35), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto" style={{ padding: "clamp(40px, 8vw, 128px) clamp(16px, 4vw, 24px)", textAlign: "center" }}>

        {/* Label */}
        <motion.p initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ fontSize: 11, letterSpacing: "0.6em", textTransform: "uppercase", color: "var(--emerald-bright)", fontFamily: "sans-serif", marginBottom: "clamp(20px, 4vw, 52px)", fontWeight: 700 }}>
          Countdown to Incursion Zero
        </motion.p>

        {/* Timer */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "clamp(3px, 1.5vw, 16px)", marginBottom: "clamp(32px, 6vw, 80px)" }}>
          {units.map((u, i) => (
            <div key={u.label} style={{ display: "flex", alignItems: "flex-start", gap: "clamp(3px, 1.5vw, 16px)" }}>
              <TimeUnit val={u.val} label={u.label} />
              {i < units.length - 1 && <Colon />}
            </div>
          ))}
        </motion.div>

        {/* Quote block */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ maxWidth: 900, margin: "0 auto", textAlign: "left", position: "relative" }}>

          {/* Decorative quote mark */}
          <div aria-hidden style={{
            position: "absolute", top: -20, left: -10,
            fontSize: "clamp(80px, 20vw, 240px)",
            fontFamily: "Georgia, serif",
            color: "rgba(16,185,129,0.12)",
            lineHeight: 1, fontWeight: 900,
            userSelect: "none", pointerEvents: "none",
          }}>
            “
          </div>

          {/* Line 1 */}
          <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{
              fontSize: "clamp(22px, 4.5vw, 60px)",
              fontWeight: 700, fontFamily: "sans-serif",
              color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 8,
            }}>
            I was a god, Valeria.
          </motion.p>

          {/* Line 2 */}
          <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.58 }}
            style={{
              fontSize: "clamp(28px, 6vw, 84px)",
              fontWeight: 900, fontFamily: "sans-serif",
              color: "var(--emerald-bright)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8,
              textShadow: "0 0 60px rgba(16,185,129,0.6)",
            }}>
            I found it... beneath me.
          </motion.p>

          {/* Line 3 */}
          <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.71 }}
            style={{
              fontSize: "clamp(18px, 3.8vw, 50px)",
              fontWeight: 300, fontFamily: "sans-serif",
              color: "rgba(241,245,249,0.75)", letterSpacing: "-0.01em", lineHeight: 1.15,
            }}>
            There is only DOOM.”
          </motion.p>

          {/* Attribution */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "clamp(24px, 4vw, 44px)", flexWrap: "wrap" }}>
            <div style={{ width: 36, height: 2, background: "var(--emerald)", flexShrink: 0 }} />
            <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "sans-serif", lineHeight: 1.6, fontWeight: 700 }}>
              Victor von Doom · Avengers: Doomsday · December 18, 2026
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)" }} />
    </section>
  );
}
