"use client";

export const fieldClass =
  "mt-1 block w-full min-h-11 rounded-md border border-line bg-paper px-3 py-2 text-ink tabular-nums focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

export function NumberField({
  label,
  value,
  onChange,
  step = "any",
  min = 0,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: string;
  min?: number;
  suffix?: string;
}) {
  return (
    <label className="block text-[0.9rem] font-semibold">
      {label}
      {suffix && <span className="font-normal text-muted"> ({suffix})</span>}
      <input
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Math.max(min, Number(e.target.value)))}
        className={fieldClass}
      />
    </label>
  );
}

export function Result({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="text-[0.95rem] text-muted">{label}</dt>
      <dd className={`tabular-nums ${strong ? "font-display text-2xl font-extrabold text-accent" : "font-semibold"}`}>{value}</dd>
    </div>
  );
}

export function ToolNote({ children }: { children: React.ReactNode }) {
  return <p className="border-t border-dashed md:col-span-2 border-line pt-3 text-[0.9rem] text-muted">{children}</p>;
}

export const fmt = (n: number, d = 2) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: d });
