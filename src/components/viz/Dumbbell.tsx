type Row = { label: string; unit: string; before: number; after: number; beforeLabel: string; afterLabel: string; change: string };

/**
 * Before → after as dumbbells. Each row has its own 0-based scale (small multiples),
 * "before" is the grey context mark and "after" the accent mark, both direct-labelled.
 */
export function Dumbbells({ rows }: { rows: Row[] }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.85rem] text-muted" aria-hidden="true">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--viz-ctx)]" /> Before
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--viz-1)]" /> After
        </span>
      </div>
      <ul className="space-y-6">
        {rows.map((r) => {
          const max = Math.max(r.before, r.after);
          const a = (r.after / max) * 100;
          const b = (r.before / max) * 100;
          const lo = Math.min(a, b);
          const summary = `${r.label}: ${r.beforeLabel} before, ${r.afterLabel} after (${r.change}). Scale: ${r.unit}.`;
          return (
            <li key={r.label}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[0.92rem]">
                  {r.label} <span className="text-muted">· {r.unit}</span>
                </p>
                <span className="chip chip-ok">
                  <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10"><path d="M5 1.5v7M2 5.5 5 8.5 8 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                  {r.change}
                </span>
              </div>
              <div role="img" aria-label={summary} title={summary} className="relative mt-3 h-8">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
                <div
                  className="grow absolute top-1/2 h-0.5 -translate-y-1/2 rounded bg-[var(--viz-ctx)]"
                  style={{ left: `${lo}%`, width: `${Math.abs(b - a)}%` }}
                />
                <span
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--viz-ctx)] ring-2 ring-surface"
                  style={{ left: `${b}%` }}
                />
                <span
                  className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--viz-1)] ring-2 ring-surface"
                  style={{ left: `${a}%` }}
                />
              </div>
              <div className="relative h-5 text-[0.8rem] tabular-nums text-muted" aria-hidden="true">
                <span className="absolute -translate-x-1/2 whitespace-nowrap font-semibold text-ink" style={{ left: `max(2rem, ${a}%)` }}>
                  {r.afterLabel}
                </span>
                <span className="absolute -translate-x-full whitespace-nowrap" style={{ left: `${b}%` }}>
                  {r.beforeLabel}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <details className="mt-4 text-[0.88rem]">
        <summary className="link inline-flex min-h-11 cursor-pointer items-center">View as table</summary>
        <table className="mt-2 w-full text-left">
          <thead className="label text-muted">
            <tr>
              <th className="py-1 font-normal">Metric</th>
              <th className="py-1 font-normal">Before</th>
              <th className="py-1 font-normal">After</th>
              <th className="py-1 font-normal">Change</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-line">
                <td className="py-1.5 pr-2">{r.label}</td>
                <td className="py-1.5">{r.beforeLabel}</td>
                <td className="py-1.5">{r.afterLabel}</td>
                <td className="py-1.5">{r.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
