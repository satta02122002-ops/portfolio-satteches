import { beforeAfter, customsDocs, meters, scope, sections, site } from "@/content";
import { HiringForSelector } from "./HiringFocus";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { Dumbbells } from "./viz/Dumbbell";
import { Meter } from "./viz/Meter";

function Panel({ title, icon, meta, children, className = "" }: { title: string; icon: Parameters<typeof Icon>[0]["name"]; meta?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`panel flex flex-col ${className}`}>
      <div className="panel-head">
        <h3 className="flex items-center gap-2 font-semibold">
          <span aria-hidden="true" className="text-muted">
            <Icon name={icon} size={17} />
          </span>
          {title}
        </h3>
        {meta}
      </div>
      <div className="flex-1 p-4 sm:p-5">{children}</div>
    </div>
  );
}

/** Module 02 · KPI dashboard: every figure comes from the CV. */
export function Dashboard() {
  return (
    <Section
      module={sections.proof}
      title="Operations KPIs, measured on the floor"
      intro="Accuracy, speed and compliance results from warehouse, SAP and freight roles. Every figure is from my CV and can be discussed in interview."
    >
      <HiringForSelector />
      <Reveal className="mt-4 grid gap-4 lg:grid-cols-12">
        <Panel title="Accuracy" icon="gauge" meta={<span className="label text-muted max-sm:hidden">Scale 0–100%</span>} className="lg:col-span-5">
          <div className="space-y-5">
            {meters.map((m) => (
              <Meter key={m.label} {...m} />
            ))}
          </div>
        </Panel>

        <Panel title="Before → after" icon="kpi" meta={<span className="label text-muted max-sm:hidden">Each row on its own scale</span>} className="lg:col-span-7">
          <Dumbbells rows={beforeAfter} />
        </Panel>

        <Panel
          title="Customs clearance"
          icon="shield"
          meta={
            <span className="chip chip-ok">
              <Icon name="check" size={12} />
              Cleared
            </span>
          }
          className="lg:col-span-5"
        >
          <div className="flex items-end gap-3">
            <p className="font-display text-5xl font-bold leading-none tracking-tight">0</p>
            <p className="pb-1 text-[0.92rem] text-muted">
              customs-hold incidents on Mirsal 2 clearances, as of {site.asOf}
            </p>
          </div>
          <p className="label mt-5 text-muted">Documents prepared per clearance</p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {customsDocs.map((d) => (
              <li key={d} className="flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-2 text-[0.9rem]">
                <span className="text-ok">
                  <Icon name="check" size={15} />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Scale of operations" icon="warehouse" className="lg:col-span-7">
          <ul className="grid gap-3 sm:grid-cols-2">
            {scope.map((s) => (
              <li key={s.label} className="fade flex items-start gap-3 rounded-xl border border-line p-4">
                <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon name={s.icon} size={19} />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold leading-none tracking-tight">{s.value}</p>
                  <p className="mt-1.5 text-[0.88rem] text-muted">{s.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </Reveal>
    </Section>
  );
}
