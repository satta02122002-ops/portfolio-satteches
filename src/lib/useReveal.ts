"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Plays an entrance animation once, the first time an element scrolls into view.
 * Server HTML always shows the final state; the effect only "arms" elements that
 * start below the fold, so nothing flashes and reduced-motion visitors see no motion.
 * Returns: "static" (never animate), "armed" (hidden, waiting) or "shown" (play).
 */
export function useReveal<T extends Element>(margin = "-40px") {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"static" | "armed" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: `0px 0px ${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return [ref, state] as const;
}
