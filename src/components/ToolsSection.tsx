"use client";

import { useId, useRef, useState } from "react";
import { sections } from "@/content";
import { track } from "@/lib/analytics";
import { Icon, type IconName } from "./Icon";
import { Section } from "./Section";
import dynamic from "next/dynamic";
import { ChargeableWeight } from "./tools/ChargeableWeight";

// Only the first tool ships with the page; the rest load when their tab opens.
const loading = () => <p className="text-muted">Loading tool…</p>;
const ContainerFit = dynamic(() => import("./tools/ContainerFit").then((m) => m.ContainerFit), { loading });
const Demurrage = dynamic(() => import("./tools/Demurrage").then((m) => m.Demurrage), { loading });
const Incoterms = dynamic(() => import("./tools/Incoterms").then((m) => m.Incoterms), { loading });
const Mirsal2Checklist = dynamic(() => import("./tools/Mirsal2Checklist").then((m) => m.Mirsal2Checklist), { loading });

const tools: { id: string; label: string; icon: IconName; Comp: React.ComponentType }[] = [
  { id: "chargeable", label: "Chargeable weight", icon: "plane", Comp: ChargeableWeight },
  { id: "cbm", label: "CBM & container fit", icon: "boxes", Comp: ContainerFit },
  { id: "demurrage", label: "Demurrage cost", icon: "calc", Comp: Demurrage },
  { id: "incoterms", label: "Incoterms 2020", icon: "globe", Comp: Incoterms },
  { id: "mirsal", label: "Mirsal 2 checklist", icon: "shield", Comp: Mirsal2Checklist },
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
    <Section
      module={sections.tools}
      title="Ops toolkit"
      intro="Small, practical freight tools, the same kind of thing I build to remove manual work. All results are illustrative estimates, not quotes."
    >
      <div className="panel overflow-hidden">
        <div role="tablist" aria-label="Freight tools" className="scroll-x flex gap-1 overflow-x-auto border-b border-line bg-surface-2 p-2">
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
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3.5 text-[0.92rem] font-semibold ${
                i === active ? "bg-surface text-primary shadow-[var(--shadow)]" : "text-muted hover:text-ink"
              }`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${base}-panel`}
          aria-labelledby={`${base}-tab-${tools[active].id}`}
          tabIndex={0}
          className="p-4 sm:p-6"
        >
          <Active />
        </div>
      </div>
    </Section>
  );
}
