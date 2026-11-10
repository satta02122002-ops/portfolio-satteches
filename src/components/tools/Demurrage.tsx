"use client";

import { useState } from "react";
import { NumberField, Result, ToolNote, fmt } from "./ui";

/** Two-tier demurrage / detention cost estimate. */
export function Demurrage() {
  const [containers, setContainers] = useState(2);
  const [free, setFree] = useState(7);
  const [days, setDays] = useState(15);
  const [rate1, setRate1] = useState(150);
  const [tier1Days, setTier1Days] = useState(7);
  const [rate2, setRate2] = useState(300);

  const over = Math.max(0, days - free);
  const d1 = Math.min(over, tier1Days);
  const d2 = Math.max(0, over - tier1Days);
  const perBox = d1 * rate1 + d2 * rate2;
  const total = perBox * containers;

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <NumberField label="Containers" value={containers} onChange={setContainers} step="1" min={1} />
        <NumberField label="Free days" value={free} onChange={setFree} step="1" />
        <NumberField label="Days at port" value={days} onChange={setDays} step="1" />
        <NumberField label="Tier 1 rate" suffix="AED/day" value={rate1} onChange={setRate1} />
        <NumberField label="Tier 1 length" suffix="days" value={tier1Days} onChange={setTier1Days} step="1" />
        <NumberField label="Tier 2 rate" suffix="AED/day" value={rate2} onChange={setRate2} />
      </div>
      <dl className="h-fit divide-y divide-dashed divide-line rounded-lg border border-line bg-paper px-4">
        <Result label="Chargeable days" value={`${over}`} />
        <Result label="Tier 1 / Tier 2 days" value={`${d1} / ${d2}`} />
        <Result label="Per container" value={`AED ${fmt(perBox, 0)}`} />
        <Result label="Estimated total" value={`AED ${fmt(total, 0)}`} strong />
      </dl>
      <ToolNote>
        Enter the free days and tariff from your carrier or terminal; the defaults are placeholders, not real tariffs.
        Illustrative estimate, not a quote. Seeing the cost of each extra day early is what makes the case for clearing,
        collecting or returning a box sooner.
      </ToolNote>
    </div>
  );
}
