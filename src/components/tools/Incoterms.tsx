"use client";

import { useState } from "react";
import { ToolNote } from "./ui";

type Party = "Seller" | "Buyer";
type Term = {
  code: string;
  name: string;
  mode: "Any mode" | "Sea / inland waterway";
  exportClearance: Party;
  mainCarriage: Party;
  insurance: string;
  importClearance: Party;
  risk: string;
};

// Incoterms® 2020 (ICC). Simplified summary of who arranges what.
const terms: Term[] = [
  { code: "EXW", name: "Ex Works", mode: "Any mode", exportClearance: "Buyer", mainCarriage: "Buyer", insurance: "Not required", importClearance: "Buyer", risk: "At seller's premises, goods made available" },
  { code: "FCA", name: "Free Carrier", mode: "Any mode", exportClearance: "Seller", mainCarriage: "Buyer", insurance: "Not required", importClearance: "Buyer", risk: "When handed to the buyer's carrier at the named place" },
  { code: "CPT", name: "Carriage Paid To", mode: "Any mode", exportClearance: "Seller", mainCarriage: "Seller", insurance: "Not required", importClearance: "Buyer", risk: "When handed to the first carrier" },
  { code: "CIP", name: "Carriage and Insurance Paid To", mode: "Any mode", exportClearance: "Seller", mainCarriage: "Seller", insurance: "Seller (all risks, ICC A)", importClearance: "Buyer", risk: "When handed to the first carrier" },
  { code: "DAP", name: "Delivered at Place", mode: "Any mode", exportClearance: "Seller", mainCarriage: "Seller", insurance: "Not required", importClearance: "Buyer", risk: "At destination, ready for unloading" },
  { code: "DPU", name: "Delivered at Place Unloaded", mode: "Any mode", exportClearance: "Seller", mainCarriage: "Seller", insurance: "Not required", importClearance: "Buyer", risk: "At destination, once unloaded" },
  { code: "DDP", name: "Delivered Duty Paid", mode: "Any mode", exportClearance: "Seller", mainCarriage: "Seller", insurance: "Not required", importClearance: "Seller", risk: "At destination, ready for unloading, duties paid" },
  { code: "FAS", name: "Free Alongside Ship", mode: "Sea / inland waterway", exportClearance: "Seller", mainCarriage: "Buyer", insurance: "Not required", importClearance: "Buyer", risk: "Alongside the vessel at the port of shipment" },
  { code: "FOB", name: "Free on Board", mode: "Sea / inland waterway", exportClearance: "Seller", mainCarriage: "Buyer", insurance: "Not required", importClearance: "Buyer", risk: "On board the vessel at the port of shipment" },
  { code: "CFR", name: "Cost and Freight", mode: "Sea / inland waterway", exportClearance: "Seller", mainCarriage: "Seller", insurance: "Not required", importClearance: "Buyer", risk: "On board the vessel at the port of shipment" },
  { code: "CIF", name: "Cost, Insurance and Freight", mode: "Sea / inland waterway", exportClearance: "Seller", mainCarriage: "Seller", insurance: "Seller (minimum cover, ICC C)", importClearance: "Buyer", risk: "On board the vessel at the port of shipment" },
];

function Who({ p }: { p: Party }) {
  return <span className={`label rounded px-1.5 py-0.5 ${p === "Seller" ? "bg-accent text-accent-ink" : "border border-line text-ink"}`}>{p}</span>;
}

/** Incoterms 2020 responsibility chart. */
export function Incoterms() {
  const [code, setCode] = useState("FOB");
  const t = terms.find((x) => x.code === code)!;
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.3fr]">
      <fieldset>
        <legend className="label text-muted">Pick a term</legend>
        <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-4">
          {terms.map((x) => (
            <button
              key={x.code}
              type="button"
              aria-pressed={x.code === code}
              onClick={() => setCode(x.code)}
              className={`min-h-11 rounded-md border font-mono text-sm font-semibold ${x.code === code ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
            >
              {x.code}
            </button>
          ))}
        </div>
      </fieldset>
      <div aria-live="polite" className="rounded-lg border border-line bg-paper p-4">
        <p className="font-display text-xl font-bold">
          {t.code} · {t.name}
        </p>
        <p className="label mt-1 text-muted">{t.mode}</p>
        <dl className="mt-3 divide-y divide-dashed divide-line text-[0.95rem]">
          <div className="flex items-center justify-between gap-3 py-2"><dt className="text-muted">Export clearance</dt><dd><Who p={t.exportClearance} /></dd></div>
          <div className="flex items-center justify-between gap-3 py-2"><dt className="text-muted">Main carriage paid by</dt><dd><Who p={t.mainCarriage} /></dd></div>
          <div className="flex items-center justify-between gap-3 py-2"><dt className="text-muted">Insurance</dt><dd className="text-right">{t.insurance}</dd></div>
          <div className="flex items-center justify-between gap-3 py-2"><dt className="text-muted">Import clearance and duties</dt><dd><Who p={t.importClearance} /></dd></div>
          <div className="py-2"><dt className="text-muted">Risk passes to buyer</dt><dd className="mt-0.5 font-semibold">{t.risk}</dd></div>
        </dl>
      </div>
      <ToolNote>
        Simplified summary of Incoterms® 2020 by the ICC; always read the contract and the official rules. How I&apos;d use
        it: a quick shared reference when a client asks who pays for what on a new lane.
      </ToolNote>
    </div>
  );
}
