"use client";

import { m } from "framer-motion";

/** Dashed route that draws itself down the timeline on first view. */
export function RouteLine() {
  return (
    <m.span
      aria-hidden="true"
      className="absolute bottom-6 left-[11px] top-3 w-0 origin-top border-l-2 border-dashed border-muted/60"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}
