"use client";

import Link from "next/link";
import { ArrowUp, ExternalLink, Film, Compass, Shield } from "lucide-react";

const GITHUB_REPO_URL = "https://github.com/soorajstudio/Doomsday";
const WATCHING_ORDER_URL = "https://soorajstudio.github.io/Marvel-Movies";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-emerald-950/40 bg-gradient-to-b from-[#0a0f0c] via-[#050806] to-[#020302] text-zinc-300 overflow-hidden">
      {/* Top Multi-Stop Glow Border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 via-amber-400/25 to-transparent" />

      {/* Top Ambient Glow Radial */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_60%_90px_at_50%_0%,rgba(16,185,129,0.14),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Grid (4 Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800/60 text-sm">
          {/* Column 1: Multiverse Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Navigation
            </p>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition flex items-center gap-1.5">
                  Trailers & Canvas
                </Link>
              </li>
              <li>
                <Link href="/all-media" className="hover:text-white transition flex items-center gap-1.5">
                  All Sagas & Movies
                </Link>
              </li>
              <li>
                <a
                  href={WATCHING_ORDER_URL}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  Watching Order Guide
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <Link href="/#explore-section" className="hover:text-white transition flex items-center gap-1.5">
                  Explore Multiverse Grid
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: MCU Sagas & Eras */}
          <div className="space-y-3">
            <p className="text-xs font-bold tracking-widest uppercase text-amber-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" />
              Cinematic Sagas
            </p>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li>
                <Link href="/all-media" className="hover:text-white transition">
                  The Infinity Saga (Phases 1–3)
                </Link>
              </li>
              <li>
                <Link href="/all-media" className="hover:text-white transition">
                  The Multiverse Saga (Phases 4–6)
                </Link>
              </li>
              <li>
                <Link href="/media/avengers-doomsday" className="hover:text-white transition">
                  Battleworld & Incursions
                </Link>
              </li>
              <li>
                <Link href="/all-media" className="hover:text-white transition">
                  Spider-Verse & Special Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Architecture & Tech */}
          <div className="space-y-3">
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              System Specs
            </p>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li className="text-zinc-400">
                Next.js 16 (Turbopack Engine)
              </li>
              <li className="text-zinc-400">
                134 Pre-Rendered SSG Media Records
              </li>
              <li className="text-zinc-400">
                GPU-Accelerated Canvas Scrubbing
              </li>
              <li className="text-zinc-400">
                Zero-Lag Static JSON Dataset
              </li>
            </ul>
          </div>

          {/* Column 4: Open Source & Community */}
          <div className="space-y-3">
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-400 flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5" />
              Open Source
            </p>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  GitHub Repository
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO_URL}/issues`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  Report an Issue or Feedback
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO_URL}#readme`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  Documentation & Roadmap
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO_URL}/fork`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  Fork & Contribute
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Disclaimer & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-zinc-400">
              © {currentYear} <span className="text-zinc-200 font-semibold">MCU Flowchart</span>. Built with passion by{" "}
              <a
                href="https://github.com/soorajstudio"
                target="_blank"
                rel="noreferrer noopener"
                className="text-emerald-400 hover:underline font-medium"
              >
                soorajstudio
              </a>{" "}
              and the Marvel fan community.
            </p>
            <p className="text-[0.7rem] text-zinc-600 max-w-2xl leading-normal">
              Non-commercial open-source fan initiative. Marvel Studios, Avengers, and all associated logos, characters, and storylines are trademarks and copyright of Marvel Characters, Inc. and The Walt Disney Company.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-emerald-500/40 hover:bg-zinc-800 hover:text-white"
              aria-label="View on GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-emerald-500/40 hover:bg-zinc-800 hover:text-white cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
