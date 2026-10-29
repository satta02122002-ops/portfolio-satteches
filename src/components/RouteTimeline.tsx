import { experience, nextStop, sections } from "@/content";
import { RouteLine } from "./RouteLine";
import { SectionLabel } from "./SectionLabel";

/** Career as shipment-tracking milestones, origin to next stop. */
export function RouteTimeline() {
  const milestones = [...experience].reverse();
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-b border-line">
      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 md:py-20">
        <SectionLabel {...sections.experience} />
        <h2 id="experience-title" className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tracking history
        </h2>
        <p className="mt-3 max-w-[40rem] text-muted">
          From the warehouse floor of a rail manufacturer to freight and customs in JAFZA. Oldest milestone first.
        </p>

        <ol className="relative mt-10 space-y-10">
          <RouteLine />
          {milestones.map((r) => (
            <li key={r.id} className="relative pl-10 sm:pl-12">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  r.current ? "border-accent bg-accent" : "border-ink bg-paper"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${r.current ? "bg-accent-ink" : "bg-ink"}`} />
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="label text-muted">{r.code}</span>
                <span className={`label rounded px-2 py-0.5 ${r.current ? "bg-accent text-accent-ink" : "border border-line text-ok"}`}>
                  {r.current ? "In transit · current" : "Delivered"}
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold leading-snug sm:text-2xl">{r.title}</h3>
              <p className="mt-1 font-medium">
                {r.company} <span className="text-muted">· {r.place}</span>
              </p>
              <p className="label mt-1 text-muted">{r.dates}</p>
              {r.summary && <p className="mt-3 max-w-[46rem] text-[0.95rem] italic text-muted">{r.summary}</p>}
              <ul className="mt-4 max-w-[46rem] space-y-2.5">
                {r.bullets.map((b) => (
                  <li key={b} className="relative pl-5 text-[0.98rem] before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-sm before:bg-accent">
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="relative pl-10 sm:pl-12">
            <span aria-hidden="true" className="absolute left-0 top-1 h-6 w-6 rounded-full border-2 border-dashed border-accent bg-paper" />
            <span className="label text-accent">{nextStop.code} · Awaiting booking</span>
            <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{nextStop.title}</h3>
            <p className="mt-1 text-muted">
              {nextStop.body}{" "}
              <a href="#contact" className="link" data-track="contact_click">
                Talk to me about it
              </a>
              .
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
