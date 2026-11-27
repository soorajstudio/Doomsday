"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppNavbar } from "./AppNavbar";
import { DoomHeroCanvas } from "./DoomHeroCanvas";
import { apiV1Path, resolvePosterUrl } from "../lib/api";

interface Media {
  id: string;
  title: string;
  release_date: string;
  end_date?: string | null;
  saga?: string | null;
  universe: string;
  mediatype: "movie" | "show" | "special";
  poster: string;
  summary: string;
}

interface UniverseMetadata {
  id: string;
  name: string;
  short_name: string;
  color: string;
}

interface SagaMetadata {
  id: string;
  name: string;
  short_name: string;
}

function formatMediaTypeLabel(mediatype: Media["mediatype"]) {
  return mediatype.charAt(0).toUpperCase() + mediatype.slice(1);
}

function getMediaTypeStyles(mediatype: Media["mediatype"]) {
  if (mediatype === "show") {
    return {
      badgeClass: "media-type-badge bg-blue-500/50 text-blue-100",
      hoverBorderClass: "group-hover:border-blue-500/60",
      hoverDividerClass: "group-hover:border-blue-400/90",
    };
  }

  if (mediatype === "special") {
    return {
      badgeClass: "media-type-badge bg-green-500/50 text-green-100",
      hoverBorderClass: "group-hover:border-green-500/60",
      hoverDividerClass: "group-hover:border-green-400/90",
    };
  }

  return {
    badgeClass: "media-type-badge bg-red-500/50 text-red-100",
    hoverBorderClass: "group-hover:border-red-500/60",
    hoverDividerClass: "group-hover:border-red-400/90",
  };
}

function CarouselArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

function MediaCarousel({
  id,
  title,
  items,
  universeMetadata,
  sagaMetadata,
}: {
  id: string;
  title: string;
  items: Media[];
  universeMetadata: Record<string, UniverseMetadata>;
  sagaMetadata: Record<string, SagaMetadata>;
}) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) {
      return;
    }

    const distance = direction === "left" ? -420 : 420;
    container.scrollBy({ left: distance, behavior: "smooth" });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section id={id} className="space-y-4 scroll-mt-24 md:scroll-mt-28">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-600 bg-zinc-900/90 text-zinc-200 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-800 hover:brightness-110 hover:text-white"
            aria-label={`Scroll ${title} left`}
          >
            <CarouselArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-600 bg-zinc-900/90 text-zinc-200 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-800 hover:brightness-110 hover:text-white"
            aria-label={`Scroll ${title} right`}
          >
            <CarouselArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto pb-2 pt-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const mediaTypeStyles = getMediaTypeStyles(item.mediatype);

          return (
            <Link
              key={item.id}
              href={`/media/${item.id}`}
              className="group min-w-36 max-w-36 snap-start sm:min-w-45 sm:max-w-45"
            >
              <article className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl ${mediaTypeStyles.hoverBorderClass}`}>
                <div className="relative aspect-2/3 bg-zinc-800">
                  <Image
                    src={resolvePosterUrl(item.poster)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="180px"
                    unoptimized
                  />
                  <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide shadow-md ${mediaTypeStyles.badgeClass}`}>
                    {formatMediaTypeLabel(item.mediatype)}
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function HomeLanding() {
  const [media, setMedia] = useState<Media[]>([]);
  const [universeMetadata, setUniverseMetadata] = useState<Record<string, UniverseMetadata>>({});
  const [sagaMetadata, setSagaMetadata] = useState<Record<string, SagaMetadata>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const [mediaResponse, universesResponse, sagasResponse] = await Promise.all([
          fetch(apiV1Path("/media")),
          fetch(apiV1Path("/universes")),
          fetch(apiV1Path("/sagas")),
        ]);

        if (!mediaResponse.ok) {
          throw new Error(`Media API error: ${mediaResponse.status}`);
        }

        if (!universesResponse.ok) {
          throw new Error(`Universes API error: ${universesResponse.status}`);
        }

        if (!sagasResponse.ok) {
          throw new Error(`Sagas API error: ${sagasResponse.status}`);
        }

        const mediaData = (await mediaResponse.json()) as Media[];
        const universesData = (await universesResponse.json()) as UniverseMetadata[];
        const sagasData = (await sagasResponse.json()) as SagaMetadata[];

        const sorted = [...mediaData].sort(
          (left, right) =>
            new Date(left.release_date).getTime() - new Date(right.release_date).getTime(),
        );

        setUniverseMetadata(
          Object.fromEntries(universesData.map((universe) => [universe.id, universe])) as Record<string, UniverseMetadata>,
        );
        setSagaMetadata(
          Object.fromEntries(sagasData.map((saga) => [saga.id, saga])) as Record<string, SagaMetadata>,
        );
        setMedia(sorted);
      } catch (err) {
        const message =
          err instanceof TypeError
            ? "Unable to reach the API proxy. Start the backend and check the Docker/rewrites setup."
            : err instanceof Error
              ? err.message
              : "Unexpected error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const latestMovies = useMemo(() => {
    return media
      .filter((item) => item.mediatype === "movie" && new Date(item.release_date) <= new Date())
      .sort((left, right) => new Date(right.release_date).getTime() - new Date(left.release_date).getTime())
      .slice(0, 12);
  }, [media]);

  const latestSeries = useMemo(() => {
    return media
      .filter((item) => item.mediatype === "show" && new Date(item.release_date) <= new Date())
      .sort((left, right) => new Date(right.release_date).getTime() - new Date(left.release_date).getTime())
      .slice(0, 12);
  }, [media]);

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <AppNavbar />

      {/* Full-viewport Netflix Curved Screen Billboard with 200vh ScrollTrigger scrubbing */}
      <DoomHeroCanvas />

      <main id="explore-section" className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:gap-10 sm:py-10">
        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-300">
            Loading media...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-900/60 bg-red-950/40 p-6 text-red-200">
            API error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-10">
            <MediaCarousel
              id="latest-movies"
              title="Latest movies"
              items={latestMovies}
              universeMetadata={universeMetadata}
              sagaMetadata={sagaMetadata}
            />

            <MediaCarousel
              id="latest-series"
              title="Latest shows"
              items={latestSeries}
              universeMetadata={universeMetadata}
              sagaMetadata={sagaMetadata}
            />
          </div>
        )}
      </main>
    </div>
  );
}
