import Image from "next/image";
import { about, pillars, sections, site } from "@/content";
import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-b border-line">
      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 md:py-20">
        <SectionLabel {...sections.about} />
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
          <div>
            <h2 id="about-title" className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              {about.heading}
            </h2>
            <p className="mt-6 max-w-[42rem] text-pretty">{about.body}</p>

            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {pillars.map((p, i) => (
                <li key={p.title} className="border-t-2 border-ink pt-4">
                  <p className="label text-accent">0{i + 1}</p>
                  <h3 className="mt-1 font-display text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside aria-label="Quick facts" className="order-first lg:order-none">
            <figure className="overflow-hidden rounded-lg border border-line bg-surface">
              <Image
                src={site.photo}
                alt={`${site.name}, ${site.role}, in a navy suit`}
                width={640}
                height={799}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/5] h-auto w-full object-cover object-top max-lg:max-h-[360px] max-lg:object-[50%_20%]"
              />
              <figcaption className="label border-t border-dashed border-line px-4 py-3 text-muted">
                {site.name} · {site.location}
              </figcaption>
            </figure>
            <dl className="mt-4 divide-y divide-dashed divide-line rounded-lg border border-line bg-surface text-[0.95rem]">
              {about.facts.map((f) => (
                <div key={f.k} className="px-4 py-3">
                  <dt className="label text-muted">{f.k}</dt>
                  <dd className="mt-0.5">{f.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
