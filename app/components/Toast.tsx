"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastMsg = { id: number; text: string; sub?: string };

let _id = 0;
export function showToast(text: string, sub?: string) {
  window.dispatchEvent(new CustomEvent("doom-toast", { detail: { text, sub } }));
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    const h = (e: Event) => {
      const { text, sub } = (e as CustomEvent).detail;
      const id = ++_id;
      setToasts(prev => [...prev, { id, text, sub }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3400);
    };
    window.addEventListener("doom-toast", h);
    return () => window.removeEventListener("doom-toast", h);
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 28, right: 24, zIndex: 99999, display: "flex", flexDirection: "column", gap: 10, pointerEvents: "none" }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#030a06",
              border: "1px solid rgba(16,185,129,0.35)",
              borderLeft: "3px solid #10b981",
              padding: "12px 18px",
              minWidth: 260,
              maxWidth: 340,
              borderRadius: "4px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.8), 0 0 25px rgba(16,185,129,0.25)",
              pointerEvents: "auto",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/doom-mask-emblem.png" alt="" style={{ width: 22, height: 22, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(16,185,129,0.9))", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "sans-serif", letterSpacing: "0.01em" }}>{t.text}</p>
                {t.sub && <p style={{ fontSize: 11, color: "rgba(241,245,249,0.6)", fontFamily: "sans-serif", marginTop: 2, letterSpacing: "0.02em" }}>{t.sub}</p>}
              </div>
            </div>
            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
              transition={{ duration: 3.2, ease: "linear" }}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #10b981, #d4af37)", transformOrigin: "left" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
