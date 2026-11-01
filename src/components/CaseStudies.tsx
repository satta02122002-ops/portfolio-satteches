import { caseStudies, hiringFor, sections, type CaseStudy } from "@/content";
import { FocusOrder } from "./HiringFocus";
import { Icon } from "./Icon";
import { Section } from "./Section";

const pillarLabel = (p: string) => hiringFor.find((h) => h.id === p)?.label ?? p;

function CaseCard({ c, i }: { c: CaseStudy; i: number }) {
  return (
    <article className="panel flex flex-col">
      <div className="panel-head">
        <span className="font-mono text-[0.8rem] font-semibold text-muted">CASE-{String(i + 1).padStart(2, "0")}</span>
        <span className="chip chip-ok">
          <Icon name="check" size={12} />
          Resolved
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <ul aria-label="Area" className="mb-2 flex flex-wrap gap-1.5">
          {c.pillars.map((p) => (
            <li key={p} className="chip chip-info">
              {pillarLabel(p)}
            </li>
          ))}
        </ul>
        <h3 className="font-display text-lg font-bold leading-snug text-balance">{c.title}</h3>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-2 p-3">
          <p className="flex-1 text-[0.85rem] text-muted">{c.kpi.label}</p>
          {c.kpi.before && (
            <>
              <span className="font-semibold tabular-nums text-muted line-through decoration-1">{c.kpi.before}</span>
              <span aria-hidden="true" className="text-muted">
                <Icon name="arrow" size={15} />
              </span>
              <span className="sr-only">to</span>
            </>
          )}
          <span className="font-display text-xl font-bold tabular-nums text-primary">{c.kpi.after}</span>
        </div>

        <dl className="mt-4 space-y-3 text-[0.93rem]">
          <div>
            <dt className="label text-muted">Problem</dt>
            <dd className="mt-0.5">{c.problem}</dd>
          </div>
          <div>
            <dt className="label text-muted">Action</dt>
            <dd className="mt-0.5">{c.action}</dd>
          </div>
          <div>
            <dt className="label text-ok">Result</dt>
            <dd className="mt-0.5 font-semibold">{c.result}</dd>
          </div>
        </dl>
        <ul aria-label="Tools used" className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {c.tools.map((t) => (
            <li key={t} className="chip chip-neutral">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Module 05 · Case files. */
export function CaseStudies({ items = caseStudies }: { items?: CaseStudy[] }) {
  return (
    <Section module={sections.cases} title="Problems solved, with the receipts" intro="Each case: the problem, what I did, and the measured result.">
      <FocusOrder
        className="grid gap-4 md:grid-cols-2"
        items={items.map((c, i) => ({ key: c.id, pillars: c.pillars, node: <CaseCard c={c} i={i} /> }))}
      />
    </Section>
  );
}
