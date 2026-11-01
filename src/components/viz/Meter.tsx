/** Single ratio against 100%: same-ramp track, accent fill (dataviz "meter"). */
export function Meter({ label, value, display, note }: { label: string; value: number; display: string; note?: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[0.92rem] text-muted">{label}</p>
        <p className="font-display text-2xl font-bold tracking-tight">{display}</p>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={display}
        className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--viz-track)]"
      >
        <div className="grow h-full rounded-full bg-[var(--viz-1)]" style={{ width: `${value}%` }} />
      </div>
      {note && <p className="mt-1.5 text-[0.85rem] text-muted">{note}</p>}
    </div>
  );
}
