"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FlowchartRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center text-zinc-400">
      <p>Redirecting to Home...</p>
    </div>
  );
}
