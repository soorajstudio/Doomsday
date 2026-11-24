"use client";

import { useEffect } from "react";

export default function WatchingOrderRoute() {
  useEffect(() => {
    window.location.replace("https://soorajstudio.github.io/Marvel-Movies");
  }, []);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-black text-center text-zinc-300">
      <p className="text-lg font-medium">Redirecting to Marvel Movies Watch Order...</p>
      <a
        href="https://soorajstudio.github.io/Marvel-Movies"
        className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Click here if you are not redirected
      </a>
    </div>
  );
}
