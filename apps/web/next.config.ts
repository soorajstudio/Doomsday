import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const apiInternalUrl = process.env.API_INTERNAL_URL || "http://127.0.0.1:8001";
const allowedDevOrigins = (process.env.NEXT_ALLOWED_DEV_ORIGINS || "localhost,127.0.0.1")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export",
        basePath: basePath,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {
        output: "standalone",
        allowedDevOrigins,
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: `${apiInternalUrl}/api/:path*`,
            },
          ];
        },
        images: {
          formats: ["image/avif", "image/webp"],
          remotePatterns: [
            {
              protocol: "http",
              hostname: "localhost",
              port: "8001",
            },
            {
              protocol: "http",
              hostname: "127.0.0.1",
              port: "8001",
            },
          ],
        },
      }),
};

export default nextConfig;
