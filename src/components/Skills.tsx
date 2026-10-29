import { sections, skills } from "@/content";
import { SectionLabel } from "./SectionLabel";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-b border-line">
      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 md:py-20">
        <SectionLabel {...sections.skills} />
        <h2 id="skills-title" className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Skills and systems
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <div key={g.group} className="border-t-2 border-ink pt-4">
              <h3 className="font-display text-lg font-bold">{g.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded border border-line bg-surface px-2.5 py-1 text-[0.9rem]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
