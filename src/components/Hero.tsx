import Image from "next/image";
import { about, contact, experience, headlineKpis, hero, sections, site, whatsappLink } from "@/content";
import { Icon } from "./Icon";
import { StatTile } from "./viz/StatTile";

/** Module 01 · Overview: who, what, proof and the two actions a recruiter needs. */
export function Hero({ preparedFor }: { preparedFor?: string }) {
  const wa = whatsappLink();
  const current = experience.find((r) => r.current);
  const facts = about.facts.filter((f) => f.k !== "Education");
  return (
    <section id={sections.hero.id} aria-labelledby="hero-title" className="scroll-mt-28 pt-6 md:pt-10">
      <div className="grid items-start gap-5 lg:grid-cols-[1.55fr_1fr]">
        <div className="panel bg-grid relative overflow-hidden p-5 sm:p-8">
          {preparedFor && (
            <p className="chip chip-accent mb-4">
              <Icon name="doc" size={12} />
              Prepared for {preparedFor}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-info">
              <Icon name="pin" size={12} />
              {hero.eyebrow}
            </span>
          </div>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[1.8rem] font-bold leading-[1.1] tracking-tight text-balance sm:text-[2.6rem] xl:text-[2.9rem]"
          >
            {hero.h1}
          </h1>

          {/* Phones: KPIs come straight after the headline so they are in the first screen. */}
          <ul aria-label="Headline results" className="mt-5 grid grid-cols-2 gap-2 sm:hidden">
            {headlineKpis.map((k) => (
              <li key={k.label}>
                <StatTile compact label={k.label} value={k.value} status={k.status} />
              </li>
            ))}
          </ul>

          <p className="mt-5 max-w-[40rem] text-muted text-pretty">{hero.sub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.cvPdf} download className="btn btn-primary" data-track="cv_download">
              <Icon name="download" />
              Download CV
            </a>
            <a href="#contact" className="btn btn-ghost" data-track="contact_click">
              <Icon name="contact" />
              Contact me
            </a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost max-sm:hidden" data-track="whatsapp_click">
                <Icon name="whatsapp" />
                WhatsApp
              </a>
            )}
          </div>
          <ul aria-label="Key systems and sectors" className="mt-6 flex flex-wrap gap-2">
            {hero.trust.map((t) => (
              <li key={t} className="chip chip-neutral">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <aside aria-label="Profile card" className="panel flex flex-col overflow-hidden">
          <div className="flex items-center gap-4 border-b border-line p-5">
            <Image
              src={site.photo}
              alt={`${site.name}, ${site.role}`}
              width={640}
              height={799}
              priority
              sizes="88px"
              className="h-[88px] w-[88px] shrink-0 rounded-2xl object-cover object-top"
            />
            <div className="min-w-0">
              <p className="font-display text-lg font-bold leading-tight">{site.name}</p>
              <p className="text-[0.92rem]">{site.role}</p>
              <p className="text-[0.85rem] text-muted">{current?.company}</p>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px bg-line text-[0.88rem]">
            {facts.map((f) => (
              <div key={f.k} className="bg-surface p-4">
                <dt className="label text-muted">{f.k}</dt>
                <dd className="mt-1 font-semibold">{f.v}</dd>
              </div>
            ))}
            <div className="bg-surface p-4">
              <dt className="label text-muted">Mobile / WhatsApp</dt>
              <dd className="mt-1 font-semibold">
                <a href={contact.phoneHref} className="hover:text-primary" data-track="phone_click">
                  {contact.phone}
                </a>
              </dd>
            </div>
          </dl>
          <div className="border-t border-line p-4">
            <p className="label text-muted">Experience</p>
            <ol className="mt-2 space-y-1.5 text-[0.88rem]">
              {experience.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${r.current ? "bg-accent" : "bg-[var(--viz-1)]"}`} />
                    <span className="font-semibold">{r.title.split(" / ")[0]}</span>
                  </span>
                  <span className="shrink-0 text-muted tabular-nums">{r.dates.replace(" – ", "–")}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      {/* Tablet and up: KPI row */}
      <ul aria-label="Headline results" className="mt-5 hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4">
        {headlineKpis.map((k) => (
          <li key={k.label}>
            <StatTile label={k.label} value={k.value} delta={k.delta} status={k.status} icon={k.icon} />
          </li>
        ))}
      </ul>
    </section>
  );
}
