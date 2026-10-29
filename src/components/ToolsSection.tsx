"use client";

import { useId, useRef, useState } from "react";
import { sections } from "@/content";
import { track } from "@/lib/analytics";
import { SectionLabel } from "./SectionLabel";
import dynamic from "next/dynamic";
import { ChargeableWeight } from "./tools/ChargeableWeight";

// Only the first tool ships with the page; the rest load when their tab opens.
const loading = () => <p className="text-muted">Loading tool…</p>;
const ContainerFit = dynamic(() => import("./tools/ContainerFit").then((m) => m.ContainerFit), { loading });
const Demurrage = dynamic(() => import("./tools/Demurrage").then((m) => m.Demurrage), { loading });
const Incoterms = dynamic(() => import("./tools/Incoterms").then((m) => m.Incoterms), { loading });
const Mirsal2Checklist = dynamic(() => import("./tools/Mirsal2Checklist").then((m) => m.Mirsal2Checklist), { loading });

const tools = [
  { id: "chargeable", label: "Chargeable weight", Comp: ChargeableWeight },
  { id: "cbm", label: "CBM & container fit", Comp: ContainerFit },
  { id: "demurrage", label: "Demurrage cost", Comp: Demurrage },
  { id: "incoterms", label: "Incoterms 2020", Comp: Incoterms },
  { id: "mirsal", label: "Mirsal 2 checklist", Comp: Mirsal2Checklist },
];

export function ToolsSection() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const Active = tools[active].Comp;

  function select(i: number, focus = false) {
    setActive(i);
    track("tool_open", { tool: tools[i].id });
    if (focus) tabs.current[i]?.focus();
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    const last = tools.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  }

  return (
    <section id="tools" aria-labelledby="tools-title" className="border-b border-line bg-surface/40">
      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 md:py-20">
        <SectionLabel {...sections.tools} />
        <h2 id="tools-title" className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tools I built
        </h2>
        <p className="mt-3 max-w-[42rem] text-muted">
          Small, practical freight tools, the same kind of thing I build to remove manual work. All results are
          illustrative estimates, not quotes.
        </p>

        <div role="tablist" aria-label="Freight tools" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {tools.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${base}-tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`${base}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-[0.95rem] font-semibold ${
                i === active ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${base}-panel`}
          aria-labelledby={`${base}-tab-${tools[active].id}`}
          tabIndex={0}
          className="mt-4 rounded-lg border border-line bg-surface p-4 sm:p-6"
        >
          <Active />
        </div>
      </div>
    </section>
  );
}
