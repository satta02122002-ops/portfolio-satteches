"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/lib/useReveal";

type Props = { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number };

/**
 * Counts up once when scrolled into view. Server render and reduced-motion
 * visitors get the final value, so the real number is always in the HTML.
 */
export function Counter({ to, decimals = 0, prefix = "", suffix = "", duration = 800 }: Props) {
  const [ref, state] = useReveal<HTMLSpanElement>();
  // Start near the target so "99.8%" reads as a count-up, not a 0 → 99 race.
  const from = to > 50 ? Math.floor(to * 0.8) : 0;
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (state === "armed") setValue(from);
    if (state !== "shown") return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(from + (to - from) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [state, from, to, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">{`${prefix}${to.toFixed(decimals)}${suffix}`}</span>
    </span>
  );
}
