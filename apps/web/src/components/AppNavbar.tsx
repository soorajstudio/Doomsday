"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppNavbar() {
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "";
  const isAllMedia = pathname === "/all-media" || pathname?.startsWith("/all-media");

  const handleTrailersClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleExploreClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById("explore-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: window.innerHeight * 1.5, behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex w-full justify-center px-4 pointer-events-none">
      <nav className="netflix-curved-nav-pill pointer-events-auto" aria-label="Main Navigation">
        <Link
          href="/"
          onClick={handleTrailersClick}
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
          onClick={handleExploreClick}
          className="pill-tab"
        >
          Explore Movies &gt;
        </Link>
      </nav>
    </header>
  );
}
