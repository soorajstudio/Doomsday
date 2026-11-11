"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const IMAGES = [
  { src: "/gallery/incursion-collision.jpg",   alt: "The Great Incursion: Collision of Realities", span: "hero" },
  { src: "/gallery/latveria-citadel.jpg",      alt: "Castle Doom: The Latverian Citadel",         span: "tall" },
  { src: "/gallery/battleworld-wasteland.jpg", alt: "Battleworld: The Fractured Earths",          span: "small" },
  { src: "/gallery/god-emperor-ascendant.jpg", alt: "The Ascendance of God Emperor Doom",         span: "small" },
  { src: "/gallery/multiversal-war.jpg",       alt: "The Multiverse War: Twilight of Existence",  span: "small" },
];

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <section id="gallery" ref={ref} className="relative overflow-hidden" style={{ background: "#020604" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(16,185,129,0.012) 81px)" }} />
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.35), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
              style={{ fontSize: 11, letterSpacing: "0.7em", textTransform: "uppercase", color: "var(--emerald-bright)", fontFamily: "sans-serif", marginBottom: 14, fontWeight: 700 }}>
              Battleworld Archives
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay: 0.08 }}
              style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, fontFamily: "sans-serif", color: "#fff", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
              The Incursion<br /><span className="emerald-gradient">Chronicles.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: 13, color: "rgba(241,245,249,0.45)", fontFamily: "sans-serif", lineHeight: 1.8, maxWidth: 320 }}>
            Official archival imagery from Avengers: Doomsday. Witness the shattering of realities and the architecture of Battleworld. Click any frame to inspect.
          </motion.p>
        </div>

        {isMobile ? (
          /* ── MOBILE: stacked layout ── */
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <GalleryCell img={IMAGES[0]} delay={0} inView={inView}
              style={{ height: "50vw" }} onClick={() => setLightbox(IMAGES[0].src)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <GalleryCell img={IMAGES[2]} delay={0.08} inView={inView}
                style={{ height: "42vw" }} onClick={() => setLightbox(IMAGES[2].src)} />
              <GalleryCell img={IMAGES[3]} delay={0.12} inView={inView}
                style={{ height: "42vw" }} onClick={() => setLightbox(IMAGES[3].src)} />
            </div>
            <GalleryCell img={IMAGES[1]} delay={0.16} inView={inView}
              style={{ height: "60vw" }} onClick={() => setLightbox(IMAGES[1].src)} />
            <GalleryCell img={IMAGES[4]} delay={0.2} inView={inView}
              style={{ height: "38vw" }} onClick={() => setLightbox(IMAGES[4].src)}
              objectPosition="center 35%" />
          </div>
        ) : (
          <>
            {/* ── DESKTOP: bento grid ── */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "44vh 34vh",
              gap: 12,
            }}>
              <GalleryCell img={IMAGES[0]} delay={0} inView={inView}
                style={{ gridColumn: "1 / 8", gridRow: "1 / 2" }}
                onClick={() => setLightbox(IMAGES[0].src)} />
              <GalleryCell img={IMAGES[1]} delay={0.08} inView={inView}
                style={{ gridColumn: "8 / 13", gridRow: "1 / 3" }}
                onClick={() => setLightbox(IMAGES[1].src)} />
              <GalleryCell img={IMAGES[2]} delay={0.16} inView={inView}
                style={{ gridColumn: "1 / 5", gridRow: "2 / 3" }}
                onClick={() => setLightbox(IMAGES[2].src)} />
              <GalleryCell img={IMAGES[3]} delay={0.22} inView={inView}
                style={{ gridColumn: "5 / 8", gridRow: "2 / 3" }}
                onClick={() => setLightbox(IMAGES[3].src)} />
            </div>
            {/* Banner */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="group relative overflow-hidden cursor-pointer rounded-sm"
              style={{ marginTop: 12, height: "30vh" }}
              onClick={() => setLightbox(IMAGES[4].src)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES[4].src} alt={IMAGES[4].alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block",
                  transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                className="group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "rgba(16,185,129,0.18)" }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ border: "1px solid rgba(16,185,129,0.2)" }} />
              <div className="absolute bottom-4 left-6 z-10">
                <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase drop-shadow-md">
                  {IMAGES[4].alt}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ width: 34, height: 34, border: "1px solid rgba(16,185,129,0.6)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,6,4,0.8)" }}>
                <span style={{ color: "var(--emerald-bright)", fontSize: 14 }}>⤢</span>
              </div>
            </motion.div>
          </>
        )}

        {/* Caption */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-3 mt-8">
          <div style={{ width: 32, height: 1, background: "rgba(16,185,129,0.5)" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(241,245,249,0.4)", fontFamily: "sans-serif" }}>
            5 DECLASSIFIED BATTLEWORLD ARCHIVES &nbsp;·&nbsp; AVENGERS: DOOMSDAY 2026
          </span>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer p-6"
            style={{ background: "rgba(2,6,4,0.96)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightbox(null)}>
            <motion.img
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightbox} alt="Enlarged Visual"
              style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain", border: "1px solid rgba(16,185,129,0.4)", boxShadow: "0 0 60px rgba(16,185,129,0.4)" }} />
            <button onClick={() => setLightbox(null)}
              className="absolute top-8 right-8 text-white/70 hover:text-emerald-400 text-3xl font-light">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent)" }} />
    </section>
  );
}

function GalleryCell({
  img, delay, inView, style, onClick, objectPosition = "center",
}: {
  img: { src: string; alt: string; span: string };
  delay: number;
  inView: boolean;
  style: React.CSSProperties;
  onClick: () => void;
  objectPosition?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="group relative overflow-hidden cursor-pointer rounded-sm"
      style={{ ...style, position: "relative" }}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src} alt={img.alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block",
          transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}
        className="group-hover:scale-105"
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "rgba(16,185,129,0.18)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ border: "1px solid rgba(16,185,129,0.2)" }} />

      <div className="absolute bottom-3 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-[11px] font-bold tracking-wider text-emerald-300 uppercase drop-shadow-md truncate">
          {img.alt}
        </p>
      </div>

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ width: 30, height: 30, border: "1px solid rgba(16,185,129,0.6)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,6,4,0.75)" }}>
        <span style={{ color: "var(--emerald-bright)", fontSize: 12 }}>⤢</span>
      </div>
    </motion.div>
  );
}
