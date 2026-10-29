"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function TrackVisit({ event, props }: { event: string; props?: Record<string, string> }) {
  useEffect(() => {
    // Plausible loads with defer, so give it a moment before sending.
    const t = setTimeout(() => track(event, props), 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
