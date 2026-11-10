import { caseStudies, sections, type CaseStudy } from "@/content";
import { FocusOrder } from "./HiringFocus";
import { PressStamp } from "./PressStamp";
import { SectionLabel } from "./SectionLabel";

function CaseCard({ c, i }: { c: CaseStudy; i: number }) {
  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-dashed border-line px-5 py-3">
        <span className="label text-muted">Case {String(i + 1).padStart(2, "0")}</span>
        <PressStamp delay={0.05 * i}>{c.stamp}</PressStamp>
      </div>
      <div className="flex flex-1 flex-col px-5 py-5">
        <h3 className="font-display text-xl font-bold leading-snug text-balance">{c.title}</h3>
        <p className="mt-3 text-[0.98rem]">
          <span className="label mr-2 text-ok">Result</span>
          {c.result}
        </p>
        <details className="group mt-4 border-t border-line pt-3 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 font-semibold text-accent">
            <span>
              Problem, action and tools<span className="sr-only">: {c.title}</span>
            </span>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-open:rotate-45">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <dl className="mt-3 space-y-3 text-[0.95rem]">
            <div>
              <dt className="label text-muted">Problem</dt>
              <dd className="mt-0.5">{c.problem}</dd>
            </div>
            <div>
              <dt className="label text-muted">Action</dt>
              <dd className="mt-0.5">{c.action}</dd>
            </div>
            <div>
              <dt className="label text-muted">Result</dt>
              <dd className="mt-0.5">{c.result}</dd>
            </div>
          </dl>
        </details>
        <ul aria-label="Tools used" className="mt-auto flex flex-wrap gap-2 pt-5">
          {c.tools.map((t) => (
            <li key={t} className="label rounded border border-line px-2 py-1 text-muted">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function CaseStudies({ items = caseStudies }: { items?: CaseStudy[] }) {
  return (
    <section id="cases" aria-labelledby="cases-title" className="border-b border-line bg-surface/40">
      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 md:py-20">
        <SectionLabel {...sections.cases} />
        <h2 id="cases-title" className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Problems solved, with the receipts.
        </h2>
        <FocusOrder
          className="mt-8 grid gap-5 md:grid-cols-2"
          items={items.map((c, i) => ({ key: c.id, pillars: c.pillars, node: <CaseCard c={c} i={i} /> }))}
        />
      </div>
    </section>
  );
}
