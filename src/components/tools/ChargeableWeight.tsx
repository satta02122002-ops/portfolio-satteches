"use client";

import { useState } from "react";
import { NumberField, Result, ToolNote, fmt } from "./ui";

/** Air freight chargeable weight: the greater of actual and volumetric weight. */
export function ChargeableWeight() {
  const [pcs, setPcs] = useState(4);
  const [l, setL] = useState(120);
  const [w, setW] = useState(80);
  const [h, setH] = useState(100);
  const [kg, setKg] = useState(85);
  const [divisor, setDivisor] = useState(6000);

  const actual = pcs * kg;
  const volumetric = divisor > 0 ? (pcs * l * w * h) / divisor : 0;
  const chargeable = Math.max(actual, volumetric);
  const cbm = (pcs * l * w * h) / 1_000_000;

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <NumberField label="Pieces" value={pcs} onChange={setPcs} step="1" min={1} />
        <NumberField label="Length" suffix="cm" value={l} onChange={setL} />
        <NumberField label="Width" suffix="cm" value={w} onChange={setW} />
        <NumberField label="Height" suffix="cm" value={h} onChange={setH} />
        <NumberField label="Gross weight / pc" suffix="kg" value={kg} onChange={setKg} />
        <NumberField label="Volumetric divisor" value={divisor} onChange={setDivisor} step="1" min={1} />
      </div>
      <div>
        <dl className="divide-y divide-dashed divide-line rounded-lg border border-line bg-surface-2 px-4">
          <Result label="Total volume" value={`${fmt(cbm, 3)} CBM`} />
          <Result label="Actual weight" value={`${fmt(actual)} kg`} />
          <Result label="Volumetric weight" value={`${fmt(volumetric)} kg`} />
          <Result label="Chargeable weight" value={`${fmt(Math.ceil(chargeable * 2) / 2)} kg`} strong />
        </dl>
        <p className="label mt-2 text-muted">
          Billed on {volumetric > actual ? "volume" : "actual weight"} · rounded up to the next 0.5 kg
        </p>
      </div>
      <ToolNote>
        Formula: L × W × H (cm) ÷ {fmt(divisor, 0)} per piece. 6,000 is the common IATA divisor; couriers often use 5,000.
        Illustrative estimate, not a quote. How I&apos;d use it: a quick check before confirming an air booking, so
        bulky, light cargo doesn&apos;t surprise the client on the invoice.
      </ToolNote>
    </div>
  );
}
