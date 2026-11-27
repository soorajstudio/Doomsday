"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppNavbar } from "./AppNavbar";
import { apiV1Path, resolvePosterUrl } from "../lib/api";

interface Media {
  id: string;
  title: string;
  release_date: string;
  end_date?: string | null;
  saga?: string | null;
  universe: string;
  mediatype: string;
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
  poster: string;
}

function formatMediaTypeLabel(mediatype: string) {
  return mediatype.charAt(0).toUpperCase() + mediatype.slice(1);
}

function formatBadgeLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDateLabel(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace("#", "");
  const value = parseInt(normalizedHex, 16);

  if (Number.isNaN(value) || normalizedHex.length !== 6) {
    return `rgba(39, 39, 42, ${alpha})`;
  }

  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function getMediaTypeStyles(mediatype: string) {
  if (mediatype === "show") {
    return {
      labelClass: "text-blue-400",
      badgeClass: "bg-blue-500/50 text-blue-100",
      hoverBorderClass: "group-hover:border-blue-500/60",
      hoverDividerClass: "group-hover:border-blue-400/90",
    };
  }

  if (mediatype === "special") {
    return {
      labelClass: "text-green-400",
      badgeClass: "bg-green-500/50 text-green-100",
      hoverBorderClass: "group-hover:border-green-500/60",
      hoverDividerClass: "group-hover:border-green-400/90",
    };
  }

  return {
    labelClass: "text-red-400",
    badgeClass: "bg-red-500/50 text-red-100",
    hoverBorderClass: "group-hover:border-red-500/60",
    hoverDividerClass: "group-hover:border-red-400/90",
  };
}

export function MediaDetails({ mediaId }: { mediaId: string }) {
  const [media, setMedia] = useState<Media | null>(null);
  const [universeMetadata, setUniverseMetadata] = useState<Record<string, UniverseMetadata>>({});
  const [sagaMetadata, setSagaMetadata] = useState<Record<string, SagaMetadata>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mediaResponse, universesResponse, sagasResponse] = await Promise.all([
          fetch(apiV1Path(`/media/${mediaId}`)),
          fetch(apiV1Path("/universes")),
          fetch(apiV1Path("/sagas")),
        ]);

        if (!mediaResponse.ok) {
          throw new Error("Media not found");
        }

        if (!universesResponse.ok) {
          throw new Error(`API error: ${universesResponse.status}`);
        }

        if (!sagasResponse.ok) {
          throw new Error(`API error: ${sagasResponse.status}`);
        }

        const [mediaData, universesData, sagasData] = (await Promise.all([
          mediaResponse.json(),
          universesResponse.json(),
          sagasResponse.json(),
        ])) as [Media, UniverseMetadata[], SagaMetadata[]];

        setMedia(mediaData);
        setUniverseMetadata(
          Object.fromEntries(universesData.map((universe) => [universe.id, universe])) as Record<string, UniverseMetadata>,
        );
        setSagaMetadata(
          Object.fromEntries(sagasData.map((saga) => [saga.id, saga])) as Record<string, SagaMetadata>,
        );
      } catch (err) {
        const message =
          err instanceof TypeError
            ? "Unable to reach the API proxy. Start the backend and check the Docker/rewrites setup."
            : err instanceof Error
              ? err.message
              : "Unexpected error while loading media.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mediaId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-zinc-900 to-black flex items-center justify-center">
        <p className="text-zinc-300">Loading media details...</p>
      </div>
    );
  }

  if (error || !media) {
    return (
      <div className="min-h-screen bg-linear-to-b from-zinc-900 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-4 text-red-300">Error: {error || "Media not found"}</p>
          <Link href="/" className="text-blue-300 hover:text-blue-200 underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-900 to-black text-zinc-100">
      <AppNavbar />

      <main className="mx-auto max-w-7xl px-4 pt-20 pb-6 sm:pt-24 sm:pb-10">
        <div className="space-y-8">
          <section className="min-w-0 flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-6">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <div className="shrink-0 lg:w-50">
                <div className="relative mx-auto aspect-2/3 w-full max-w-50 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 lg:mx-0">
                  <Image
                    src={resolvePosterUrl(media.poster)}
                    alt={media.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 180px, 200px"
                    unoptimized
                    priority
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
                <p className={`text-md font-semibold uppercase tracking-[0.2em] ${getMediaTypeStyles(media.mediatype).labelClass}`}>
                  {formatMediaTypeLabel(media.mediatype)}
                </p>
                <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">{media.title}</h1>

                <div className="flex flex-wrap justify-center gap-3 text-sm sm:justify-start">
                  <span className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-zinc-200">
                    {media.end_date && media.end_date !== media.release_date
                      ? `${formatDateLabel(media.release_date)} - ${formatDateLabel(media.end_date)}`
                      : formatDateLabel(media.release_date)}
                  </span>
                  <Link
                    href={media.saga ? `/all-media#${media.universe}__${media.saga}` : `/all-media#${media.universe}`}
                    className="rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:brightness-110"
                    style={{
                      borderColor: universeMetadata[media.universe]?.color ?? "#52525b",
                      backgroundColor: hexToRgba(universeMetadata[media.universe]?.color ?? "#27272a", 0.2),
                      color: "#ffffff",
                    }}
                  >
                    {media.saga
                      ? sagaMetadata[media.saga]?.name ?? formatBadgeLabel(media.saga)
                      : universeMetadata[media.universe]?.name ?? formatBadgeLabel(media.universe)}
                  </Link>
                </div>

                <p className="mx-auto max-w-3xl leading-relaxed whitespace-pre-line text-zinc-300 sm:mx-0">{media.summary}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
