"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number };

/**
 * Counts up once when scrolled into view. Server render and reduced-motion
 * visitors get the final value, so the real number is always in the HTML.
 */
export function Counter({ to, decimals = 0, prefix = "", suffix = "", duration = 800 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(to);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    setValue(0);
  }, []);

  useEffect(() => {
    if (!armed || !inView) return;
    // Start near the target so "99.8%" reads as a count-up, not a 0 → 99 race.
    const from = to > 50 ? Math.floor(to * 0.8) : 0;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, to, duration]);

  const final = `${prefix}${to.toFixed(decimals)}${suffix}`;
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
