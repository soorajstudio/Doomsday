"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assetPath } from "../utils/basePath";

const CHARACTERS = [
  {
    id: "doctor-doom",
    name: "Doctor Doom",
    realName: "Victor von Doom",
    actor: "Robert Downey Jr.",
    role: "Victor von Doom / God Emperor",
    category: "SOVEREIGN",
    img: "/characters/doctor-doom.png",
    desc: "Master of science and sorcery, Victor von Doom breached the dying cosmos when every hero failed. Behind the cold titanium mask lies the architect and absolute sovereign of Battleworld. To defy him is to invite oblivion.",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.45)",
    imgScale: 0.85,
  },
  {
    id: "mister-fantastic",
    name: "Mister Fantastic",
    realName: "Reed Richards",
    actor: "Pedro Pascal",
    role: "Dr. Reed Richards / Illuminati",
    category: "ILLUMINATI",
    img: "/characters/mister-fantastic.png",
    desc: "The smartest man alive across infinite universes. Having watched entire timelines shatter under the weight of catastrophic incursions, Reed leads the surviving resistance against the terrifying omnipotence of his greatest rival.",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.45)",
    imgScale: 0.85,
  },
  {
    id: "thor-odinson",
    name: "Thor",
    realName: "Thor Odinson",
    actor: "Chris Hemsworth",
    role: "Thor Odinson / God of Thunder",
    category: "AVENGER",
    img: "/characters/thor-odinson.png",
    desc: "Armed with Stormbreaker and channeling the ancient cosmic fury of Asgard, Thor refuses to kneel to any mortal or self-proclaimed god. When celestial thunder strikes the wastes of Battleworld, the throne of Doom itself will tremble.",
    color: "#eab308",
    glow: "rgba(234, 179, 8, 0.45)",
    imgScale: 0.82,
  },
  {
    id: "doctor-strange",
    name: "Doctor Strange",
    realName: "Stephen Strange",
    actor: "Benedict Cumberbatch",
    role: "Stephen Strange / Master of Mystic Arts",
    category: "SORCERER",
    img: "/characters/doctor-strange.png",
    desc: "Guardian of the mystic arts and traveler of the multiverse. Having walked the shattered boundaries of reality, Strange understands the terrifying occult cost of Doom's salvation — and the coming storm that will end it all.",
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.45)",
    imgScale: 0.85,
  },
];

const imgVariants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -25 : 25 }),
};

const textVariants = {
  enter:  (dir: number) => ({ opacity: 0, y: dir > 0 ? 18 : -18 }),
  center: { opacity: 1, y: 0 },
  exit:   (dir: number) => ({ opacity: 0, y: dir > 0 ? -14 : 14 }),
};

export default function CharactersSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imgReady, setImgReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const char = CHARACTERS[index];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setImgReady(false);
    setIndex(prev => (prev + dir + CHARACTERS.length) % CHARACTERS.length);
  }, []);

  useEffect(() => { setImgReady(false); }, [index]);

  useEffect(() => {
    CHARACTERS.forEach(c => {
      const img = new window.Image();
      img.src = c.img;
    });
  }, []);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), 4000);
  }, [go]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goManual = useCallback((dir: number) => {
    go(dir);
    startTimer();
  }, [go, startTimer]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goManual(1);
      if (e.key === "ArrowLeft")  goManual(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goManual]);

  const navDotsEl = (
    <div className="flex items-center gap-2 px-4">
      {CHARACTERS.map((c, i) => (
        <button
          key={c.id}
          onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); startTimer(); }}
          className="transition-all duration-300"
          style={{
            width: i === index ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: i === index ? char.color : "rgba(255,255,255,0.2)",
            border: "none",
            cursor: "pointer",
            boxShadow: i === index ? `0 0 10px ${char.color}` : "none",
          }}
          aria-label={c.name}
        />
      ))}
    </div>
  );

  return (
    <section
      id="cast"
      className="relative overflow-hidden"
      style={{ height: "100vh", background: "#020604" }}
    >
      {/* ── Background glow ── */}
      <AnimatePresence>
        <motion.div
          key={`bg-${index}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          style={{ background: `radial-gradient(ellipse 65% 85% at 70% 50%, ${char.glow} 0%, transparent 70%)` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 web-bg opacity-15 pointer-events-none" />

      {/* ── Far-right diagonal accent stripe ── */}
      <AnimatePresence>
        <motion.div
          key={`stripe-${index}`}
          className="absolute top-0 right-0 h-full pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "16%",
            clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
            background: `linear-gradient(160deg, ${char.color} 0%, ${char.color}88 100%)`,
          }}
        />
      </AnimatePresence>

      {/* ── Watermark ── */}
      <div
        className="absolute pointer-events-none select-none"
        aria-hidden
        style={{
          top: "50%", left: "-2%",
          transform: "translateY(-50%)",
          fontSize: "clamp(100px, 22vw, 260px)",
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        DOOMSDAY
      </div>

      {/* ── TOP BAR ── */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between z-20" style={{ padding: "clamp(20px, 4vw, 40px) clamp(16px, 5vw, 40px) 0" }}>
        <div className="flex items-center gap-3">
          <span className="font-black tracking-wider select-none text-xl sm:text-2xl"
            style={{ color: char.color, fontFamily: "sans-serif", transition: "color 0.4s", letterSpacing: "0.05em" }}>
            MARVEL STUDIOS
          </span>
          <span className="text-white/30 text-xs font-mono">| FACTIONS OF BATTLEWORLD</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {[28, 20, 14].map(w => (
            <div key={w} style={{ width: w, height: 2, background: "rgba(241,245,249,0.5)" }} />
          ))}
        </div>
      </div>

      {/* ── CHARACTER IMAGE ── */}
      <AnimatePresence>
        <motion.div
          key={`img-${index}`}
          custom={direction}
          variants={imgVariants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute pointer-events-none"
          style={{ top: 0, bottom: 0, left: isMobile ? "5%" : "30%", right: isMobile ? "5%" : "12%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath(char.img)}
            alt={char.realName}
            onLoad={() => setImgReady(true)}
            style={{
              height: `${(char.imgScale ?? 1) * 100}%`,
              width: "auto",
              maxWidth: "90%",
              objectFit: "contain",
              objectPosition: "bottom center",
              display: "block",
              filter: `drop-shadow(0 0 50px ${char.color}66)`,
              opacity: imgReady ? 1 : 0.8,
              transition: "opacity 0.25s ease-out, filter 0.4s",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── BOTTOM LEFT: character info ── */}
      <div className="absolute z-20"
        style={{ bottom: "clamp(24px, 5vw, 70px)", left: "clamp(20px, 4vw, 60px)", maxWidth: 460 }}>
        
        <div className="mb-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] px-2.5 py-1 rounded bg-white/5 border border-white/10"
            style={{ color: char.color }}>
            {char.category}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.h2 key={`name-${index}`} custom={direction} variants={textVariants}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, delay: 0.04 }}
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 900, fontFamily: "sans-serif", color: char.color, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: 8, textShadow: `0 0 40px ${char.glow}`, transition: "color 0.4s" }}>
            {char.name}
          </motion.h2>
        </AnimatePresence>

        <p className="text-sm font-semibold tracking-wider uppercase text-white/80 mb-3">
          Played by <span className="text-white font-bold">{char.actor}</span>
        </p>

        <AnimatePresence mode="wait">
          <motion.p key={`desc-${index}`} custom={direction} variants={textVariants}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, delay: 0.08 }}
            className="text-xs sm:text-sm leading-relaxed text-slate-300/80 mb-6 backdrop-blur-sm p-3 rounded bg-black/30 border border-white/5">
            {char.desc}
          </motion.p>
        </AnimatePresence>

        {/* Controls & Nav */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => goManual(-1)}
              className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={() => goManual(1)}
              className="w-10 h-10 rounded border flex items-center justify-center text-black font-bold transition-all cursor-pointer"
              style={{ background: char.color, borderColor: char.color, boxShadow: `0 0 15px ${char.color}` }}
            >
              →
            </button>
          </div>
          {navDotsEl}
        </div>
      </div>
    </section>
  );
}
