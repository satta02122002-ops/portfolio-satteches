"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Marks its subtree for a one-time entrance animation. Children opt in with the
 * `grow` (bars and meters scale in from the left) or `fade` classes.
 */
export function Reveal({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "section" | "ol" | "ul" }) {
  const [ref, state] = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref as React.Ref<never>} data-reveal={state} className={className}>
      {children}
    </Tag>
  );
}
