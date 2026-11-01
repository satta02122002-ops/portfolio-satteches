"use client";

import { useEffect, useRef } from "react";
import { sections } from "@/content";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { Icon, type IconName } from "./Icon";

const modules = Object.values(sections);
const ids = modules.map((m) => m.id);

/** Module navigation: vertical list in the desktop sidebar, scrolling tab strip on mobile. */
export function ModuleNav({ variant }: { variant: "sidebar" | "strip" }) {
  const active = useScrollSpy(ids);
  const strip = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (variant !== "strip") return;
    const el = strip.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active, variant]);

  if (variant === "sidebar") {
    return (
      <nav aria-label="Modules">
        <ul className="space-y-0.5">
          {modules.map((m) => {
            const on = m.id === active;
            return (
              <li key={m.id}>
                <a
                  href={`/#${m.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`group flex min-h-11 items-center gap-3 rounded-lg px-3 text-[0.92rem] transition-colors ${
                    on ? "bg-primary-soft font-semibold text-primary" : "text-muted hover:bg-surface-2 hover:text-ink"
                  }`}
                >
                  <Icon name={m.icon as IconName} size={17} />
                  <span className="flex-1">{m.label}</span>
                  <span className="font-mono text-[0.68rem] opacity-70">{m.n}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Modules" className="border-t border-line">
      <ul ref={strip} className="scroll-x flex gap-1.5 overflow-x-auto px-3 py-1.5">
        {modules.map((m) => {
          const on = m.id === active;
          return (
            <li key={m.id} data-id={m.id} className="shrink-0">
              <a
                href={`/#${m.id}`}
                aria-current={on ? "location" : undefined}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-[0.88rem] ${
                  on ? "bg-primary text-primary-ink font-semibold" : "bg-surface-2 text-muted"
                }`}
              >
                <Icon name={m.icon as IconName} size={14} />
                {m.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
