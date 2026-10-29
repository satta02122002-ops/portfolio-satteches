"use client";

import { useReveal } from "@/lib/useReveal";

/** Stamp chip that "presses" onto the page the first time it scrolls into view. */
export function PressStamp({ children, delay = 0 }: { children: string; delay?: number }) {
  const [ref, state] = useReveal<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className={`stamp ${state === "armed" ? "opacity-0" : ""} ${state === "shown" ? "animate-stamp" : ""}`}
      style={state === "shown" ? { animationDelay: `${delay}s` } : undefined}
    >
      <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10">
        <path d="M1.5 5.2 4 7.5 8.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      {children}
    </span>
  );
}
