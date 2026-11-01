"use client";

import { useState } from "react";
import { NumberField, Result, ToolNote, fmt } from "./ui";

// Approximate internal volume and usable payload for standard dry containers.
const containers = [
  { name: "20′ GP", cbm: 33, usable: 28, payload: 28000 },
  { name: "40′ GP", cbm: 67, usable: 58, payload: 26500 },
  { name: "40′ HC", cbm: 76, usable: 68, payload: 26500 },
];

/** CBM and container-fit estimator. */
export function ContainerFit() {
  const [cartons, setCartons] = useState(450);
  const [l, setL] = useState(60);
  const [w, setW] = useState(40);
  const [h, setH] = useState(40);
  const [kg, setKg] = useState(14);

  const cbm = (cartons * l * w * h) / 1_000_000;
  const weight = cartons * kg;

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <NumberField label="Cartons" value={cartons} onChange={setCartons} step="1" min={1} />
        <NumberField label="Length" suffix="cm" value={l} onChange={setL} />
        <NumberField label="Width" suffix="cm" value={w} onChange={setW} />
        <NumberField label="Height" suffix="cm" value={h} onChange={setH} />
        <NumberField label="Weight / carton" suffix="kg" value={kg} onChange={setKg} />
      </div>
      <div>
        <dl className="divide-y divide-dashed divide-line rounded-lg border border-line bg-surface-2 px-4">
          <Result label="Total volume" value={`${fmt(cbm, 2)} CBM`} strong />
          <Result label="Total weight" value={`${fmt(weight, 0)} kg`} />
        </dl>
        <ul className="mt-3 space-y-2">
          {containers.map((c) => {
            const byVol = cbm / c.usable;
            const byWt = weight / c.payload;
            const fill = Math.max(byVol, byWt);
            const count = Math.max(1, Math.ceil(fill));
            const pct = Math.min(100, (fill / count) * 100);
            return (
              <li key={c.name} className="rounded-lg border border-line bg-surface-2 px-3 py-2">
                <div className="flex items-baseline justify-between gap-3 text-[0.95rem]">
                  <span className="font-semibold">{c.name}</span>
                  <span className="tabular-nums">
                    {count} × · {fmt(pct, 0)}% full{byWt > byVol ? " (weight-limited)" : ""}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded bg-line" aria-hidden="true">
                  <div className="h-full bg-ok" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <ToolNote>
        Capacities are approximate: usable volume ≈ 28 / 58 / 68 CBM and payload ≈ 28,000 / 26,500 / 26,500 kg for 20′ GP,
        40′ GP and 40′ HC. Real loads depend on carton strength, stacking and pallets. Illustrative estimate, not a load
        plan. Useful for a first FCL vs LCL call before asking the carrier.
      </ToolNote>
    </div>
  );
}
