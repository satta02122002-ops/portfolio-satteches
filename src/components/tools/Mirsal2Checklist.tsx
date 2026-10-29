"use client";

import { useState } from "react";
import { ToolNote } from "./ui";

const lists = {
  import: [
    { id: "ci", doc: "Commercial invoice", note: "Values, HS codes and Incoterm match the order" },
    { id: "pl", doc: "Packing list", note: "Pieces, weights and marks match the invoice" },
    { id: "bl", doc: "Bill of Lading / Air Waybill", note: "Consignee and notify party correct" },
    { id: "do", doc: "Delivery Order", note: "Released by the shipping line or agent" },
    { id: "coo", doc: "Certificate of Origin", note: "Where required, for duty or preferential origin" },
    { id: "boe", doc: "Import Bill of Entry", note: "Declared on Mirsal 2, duties paid" },
    { id: "permits", doc: "Permits for controlled goods", note: "Only if the goods are restricted" },
    { id: "asn", doc: "ASN / GRN", note: "Warehouse expects and confirms receipt" },
  ],
  export: [
    { id: "ci", doc: "Commercial invoice", note: "Values, HS codes and Incoterm match the order" },
    { id: "pl", doc: "Packing list", note: "Pieces, weights and marks match the invoice" },
    { id: "boe", doc: "Export Bill of Entry", note: "Declared on Mirsal 2 before loading" },
    { id: "coo", doc: "Certificate of Origin", note: "If the consignee or destination requires one" },
    { id: "permits", doc: "Permits for controlled goods", note: "Only if the goods are restricted" },
    { id: "bl", doc: "Bill of Lading / Air Waybill", note: "Issued once cargo is loaded" },
  ],
};

/** Interactive Mirsal 2 document checklist for imports and exports. */
export function Mirsal2Checklist() {
  const [flow, setFlow] = useState<"import" | "export">("import");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const items = lists[flow];
  const count = items.filter((i) => done[`${flow}-${i.id}`]).length;
  const complete = count === items.length;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.3fr]">
      <div>
        <fieldset>
          <legend className="label text-muted">Shipment</legend>
          <div className="mt-2 flex gap-2">
            {(["import", "export"] as const).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={flow === f}
                onClick={() => setFlow(f)}
                className={`min-h-11 flex-1 rounded-md border font-semibold capitalize ${flow === f ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="mt-5 rounded-lg border border-line bg-paper p-4" aria-live="polite">
          <p className="label text-muted">Status</p>
          <p className="mt-1 font-display text-3xl font-extrabold tabular-nums">
            {count} / {items.length}
          </p>
          <div className="mt-3">
            {complete ? (
              <span className="stamp">✓ READY TO FILE</span>
            ) : (
              <span className="stamp !text-accent">PENDING DOCS</span>
            )}
          </div>
        </div>
        <button type="button" onClick={() => setDone({})} className="link mt-3 min-h-11 text-[0.95rem]">
          Reset checklist
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((i) => {
          const key = `${flow}-${i.id}`;
          return (
            <li key={key}>
              <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-md border border-line bg-paper px-3 py-2.5 has-[:checked]:border-ok">
                <input
                  type="checkbox"
                  checked={!!done[key]}
                  onChange={(e) => setDone((d) => ({ ...d, [key]: e.target.checked }))}
                  className="mt-1 h-5 w-5 shrink-0 accent-[var(--ok)]"
                />
                <span>
                  <span className="block font-semibold">{i.doc}</span>
                  <span className="block text-[0.9rem] text-muted">{i.note}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <ToolNote>
        General checklist only. Requirements vary by goods, free zone, mainland destination and consignee, so always
        confirm with Dubai Customs and the relevant authority.
      </ToolNote>
    </div>
  );
}
