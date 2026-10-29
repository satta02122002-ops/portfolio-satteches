"use client";

import { m } from "framer-motion";

/** Stamp chip that "presses" onto the page the first time it scrolls into view. */
export function PressStamp({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <m.span
      className="stamp"
      initial={{ opacity: 0, scale: 1.6, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 520, damping: 22, delay }}
    >
      <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10">
        <path d="M1.5 5.2 4 7.5 8.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      {children}
    </m.span>
  );
}
