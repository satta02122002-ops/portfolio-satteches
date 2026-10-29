"use client";

import { useReveal } from "@/lib/useReveal";

/** Dashed route that draws itself down the timeline on first view. */
export function RouteLine() {
  const [ref, state] = useReveal<HTMLSpanElement>("-80px");
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`absolute bottom-6 left-[11px] top-3 w-0 origin-top border-l-2 border-dashed border-muted/60 ${
        state === "armed" ? "scale-y-0" : ""
      } ${state === "shown" ? "animate-route" : ""}`}
    />
  );
}
