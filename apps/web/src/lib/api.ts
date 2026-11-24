const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const API_PREFIX = `${basePath}/api/v1`;

export function apiV1Path(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (isStatic && !normalized.endsWith(".json")) {
    return `${API_PREFIX}${normalized}.json`;
  }

  return `${API_PREFIX}${normalized}`;
}

export function resolvePosterUrl(poster: string): string {
  if (!poster) return "";
  if (poster.startsWith("http://") || poster.startsWith("https://")) {
    return poster;
  }

  const normalized = poster.startsWith("/") ? poster : `/${poster}`;

  if (normalized.startsWith("/api/v1/posters/") || normalized.startsWith("/api/v1/")) {
    return `${basePath}${normalized}`;
  }

  if (normalized.startsWith("/posters/")) {
    return `${basePath}/api/v1${normalized}`;
  }

  return `${API_PREFIX}${normalized}`;
}
