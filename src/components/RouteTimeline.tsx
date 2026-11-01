import { experience, nextStop, sections } from "@/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const year = (dates: string) => dates.split("–")[0].trim();

/** Module 04 · Career as a shipment tracker: milestones from origin to next stop. */
export function RouteTimeline() {
  const chrono = [...experience].reverse();
  const steps = [
    ...chrono.map((r) => ({ key: r.id, title: r.title, sub: r.company, when: year(r.dates), state: r.current ? "current" : "done" })),
    { key: "next", title: nextStop.title, sub: "UAE", when: "Next", state: "next" },
  ] as const;
  const currentIndex = steps.findIndex((s) => s.state === "current");
  const progress = (currentIndex / (steps.length - 1)) * 100;

  return (
    <Section
      module={sections.experience}
      title="Career tracking"
      intro="From the warehouse floor of a rail manufacturer to freight and customs in JAFZA."
    >
      <div className="panel overflow-hidden">
        <div className="panel-head">
          <p className="flex items-center gap-2 font-semibold">
            <Icon name="route" size={17} />
            Tracking · {steps.length} milestones
          </p>
          <span className="chip chip-accent">
            <Icon name="truck" size={12} />
            In transit
          </span>
        </div>

        {/* Stepper: horizontal from md, vertical on phones */}
        <Reveal as="ol" className="relative grid gap-5 p-5 md:grid-cols-4 md:gap-3 md:p-6">
          <span aria-hidden="true" className="absolute left-[2.05rem] top-8 bottom-8 w-0.5 bg-line md:hidden" />
          <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[2.3rem] hidden h-0.5 bg-line md:block" />
          <span
            aria-hidden="true"
            className="grow absolute left-[12.5%] top-[2.3rem] hidden h-0.5 bg-[var(--viz-1)] md:block"
            style={{ width: `${progress * 0.75}%` }}
          />
          {steps.map((s) => (
            <li key={s.key} className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
              <span
                className={`relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                  s.state === "done"
                    ? "border-[var(--viz-1)] bg-[var(--viz-1)] text-white"
                    : s.state === "current"
                      ? "border-accent bg-surface text-accent ring-4 ring-accent/20"
                      : "border-dashed border-muted bg-surface text-muted"
                }`}
              >
                {s.state === "done" ? <Icon name="check" size={14} /> : s.state === "current" ? <Icon name="truck" size={14} /> : <Icon name="pin" size={14} />}
              </span>
              <div>
                <p className="label text-muted">{s.when}</p>
                <p className="mt-0.5 font-semibold leading-snug">{s.title}</p>
                <p className="text-[0.85rem] text-muted">{s.sub}</p>
                <span className={`chip mt-1.5 ${s.state === "done" ? "chip-ok" : s.state === "current" ? "chip-accent" : "chip-neutral"}`}>
                  {s.state === "done" ? "Delivered" : s.state === "current" ? "Current" : "Awaiting booking"}
                </span>
              </div>
            </li>
          ))}
        </Reveal>
      </div>

      <ol className="mt-4 space-y-4">
        {experience.map((r) => (
          <li key={r.id} className="panel">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line p-5">
              <div>
                <p className="label text-muted">{r.code}</p>
                <h3 className="mt-1 font-display text-xl font-bold leading-snug">{r.title}</h3>
                <p className="text-[0.95rem]">
                  {r.company} <span className="text-muted">· {r.place}</span>
                </p>
              </div>
              <div className="flex flex-col items-start gap-1.5 sm:items-end">
                <span className={`chip ${r.current ? "chip-accent" : "chip-ok"}`}>
                  <Icon name={r.current ? "truck" : "check"} size={12} />
                  {r.current ? "Current role" : "Completed"}
                </span>
                <p className="label text-muted">{r.dates}</p>
              </div>
            </div>
            <div className="p-5">
              {r.summary && <p className="mb-3 text-[0.92rem] text-muted">{r.summary}</p>}
              <ul className="grid gap-2.5 md:grid-cols-2 md:gap-x-6">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.95rem]">
                    <span aria-hidden="true" className="mt-1 text-primary">
                      <Icon name="check" size={15} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
