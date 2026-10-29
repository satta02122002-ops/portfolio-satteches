import { awards, certifications, education, sections } from "@/content";
import { SectionLabel } from "./SectionLabel";

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certs-title" className="border-b border-line">
      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 md:py-20">
        <SectionLabel {...sections.certs} />
        <h2 id="certs-title" className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Certifications, awards and education
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ul className="divide-y divide-dashed divide-line rounded-lg border border-line bg-surface">
            {certifications.map((c) => (
              <li key={c.name} className="flex flex-col gap-0.5 px-5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-semibold">{c.name}</span>
                <span className="label shrink-0 text-muted">{c.issuer}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-6">
            <div>
              <h3 className="label text-muted">Education</h3>
              <p className="mt-2 font-display text-xl font-bold">{education.name}</p>
              <p>{education.school}</p>
              <p className="text-muted">
                {education.date} · <span className="font-semibold text-ok">{education.grade}</span>
              </p>
            </div>
            <div>
              <h3 className="label text-muted">Awards</h3>
              <ul className="mt-2 space-y-2">
                {awards.map((a) => (
                  <li key={a.name}>
                    <p className="font-display text-lg font-bold">{a.name}</p>
                    <p className="text-[0.95rem] text-muted">{a.context}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
