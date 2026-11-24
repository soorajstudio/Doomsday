"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppNavbar() {
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "";
  const isAllMedia = pathname === "/all-media" || pathname?.startsWith("/all-media");

  return (
    <header className="sticky top-4 z-50 flex w-full justify-center px-4 pointer-events-none mb-4 sm:mb-6">
      <nav className="netflix-curved-nav-pill pointer-events-auto" aria-label="Main Navigation">
        <Link
          href="/"
          className={`pill-tab ${isHome ? "active" : ""}`}
        >
          Trailers
        </Link>
        <Link
          href="/all-media"
          className={`pill-tab ${isAllMedia ? "active" : ""}`}
        >
          All Sagas
        </Link>
        <a
          href="https://soorajstudio.github.io/Marvel-Movies"
          className="pill-tab"
        >
          Watching Order
        </a>
        <Link
          href="/#explore-section"
          className="pill-tab"
        >
          Explore Movies &gt;
        </Link>
      </nav>
    </header>
  );
}
