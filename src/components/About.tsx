import { about, awards, education, pillars, sections } from "@/content";
import { Icon, type IconName } from "./Icon";
import { Section } from "./Section";

const pillarIcons: IconName[][] = [["ship", "plane", "truck"], ["warehouse", "barcode"], ["cpu", "kpi"]];

/** Module 03 · Operator profile. */
export function About() {
  return (
    <Section module={sections.about} title={about.heading}>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="panel p-5 sm:p-6">
          <p className="text-pretty">{about.body}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-surface-2 p-4">
              <p className="label flex items-center gap-2 text-muted">
                <Icon name="grad" size={15} /> Education
              </p>
              <p className="mt-1.5 font-semibold">{education.name}</p>
              <p className="text-[0.88rem] text-muted">
                {education.school}, {education.date}
              </p>
              <p className="mt-1 text-[0.88rem] font-semibold text-ok">{education.grade}</p>
            </div>
            <div className="rounded-xl bg-surface-2 p-4">
              <p className="label flex items-center gap-2 text-muted">
                <Icon name="award" size={15} /> Awards
              </p>
              <ul className="mt-1.5 space-y-1.5">
                {awards.map((a) => (
                  <li key={a.name}>
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-[0.85rem] text-muted">{a.context}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ol className="grid gap-4">
          {pillars.map((p, i) => (
            <li key={p.title} className="panel flex gap-4 p-5">
              <div aria-hidden="true" className="flex shrink-0 -space-x-1.5">
                {pillarIcons[i].map((ic) => (
                  <span key={ic} className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface bg-primary-soft text-primary">
                    <Icon name={ic} size={18} />
                  </span>
                ))}
              </div>
              <div>
                <p className="label text-muted">Capability 0{i + 1}</p>
                <h3 className="mt-0.5 font-display text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-1 text-[0.92rem] text-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
