"use client";

import { createContext, useContext, useState } from "react";
import { hiringFor, type Pillar } from "@/content";
import { track } from "@/lib/analytics";

const FocusContext = createContext<{ focus: Pillar | null; setFocus: (p: Pillar | null) => void }>({
  focus: null,
  setFocus: () => {},
});

export function FocusProvider({ initial = null, children }: { initial?: Pillar | null; children: React.ReactNode }) {
  const [focus, setFocus] = useState<Pillar | null>(initial);
  return <FocusContext.Provider value={{ focus, setFocus }}>{children}</FocusContext.Provider>;
}

/** "I'm hiring for..." toggle. Picking a need moves the matching evidence to the front. */
export function HiringForSelector() {
  const { focus, setFocus } = useContext(FocusContext);
  const active = hiringFor.find((h) => h.id === focus);
  return (
    <div className="mt-6 rounded-lg border border-line bg-surface p-4 sm:p-5">
      <fieldset>
        <legend className="label text-muted">I&apos;m hiring for…</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {hiringFor.map((h) => {
            const on = h.id === focus;
            return (
              <button
                key={h.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setFocus(on ? null : h.id);
                  if (!on) track("hiring_for", { focus: h.id });
                }}
                className={`min-h-11 rounded-full border px-4 text-[0.95rem] font-semibold transition-colors ${
                  on ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
                }`}
              >
                {h.label}
              </button>
            );
          })}
        </div>
      </fieldset>
      <p aria-live="polite" className="mt-3 min-h-[1.6em] text-[0.95rem] text-muted">
        {active ? (
          <>
            <span className="font-semibold text-ink">{active.label}:</span> {active.pitch} Matching results are shown first.
          </>
        ) : (
          "Pick what you're hiring for and the most relevant results move to the front."
        )}
      </p>
    </div>
  );
}

/** Reorders server-rendered items so the ones tagged with the current focus come first. */
export function FocusOrder({ items, as: Tag = "ul", className }: { items: { key: string; pillars: Pillar[]; node: React.ReactNode }[]; as?: "ul" | "ol"; className?: string }) {
  const { focus } = useContext(FocusContext);
  const sorted = focus
    ? [...items].sort((a, b) => Number(b.pillars[0] === focus) * 2 + Number(b.pillars.includes(focus)) - (Number(a.pillars[0] === focus) * 2 + Number(a.pillars.includes(focus))))
    : items;
  return (
    <Tag className={className}>
      {sorted.map((i) => (
        <li key={i.key} className={`flex [&>*]:w-full ${focus && i.pillars.includes(focus) ? "[&>*]:outline-2 [&>*]:outline-offset-2 [&>*]:outline-accent [&>*]:outline-solid" : ""}`}>
          {i.node}
        </li>
      ))}
    </Tag>
  );
}
