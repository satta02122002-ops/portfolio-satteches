import { contact, hero, site } from "@/content";
import { StampChip } from "./StampChip";

const stamps = ["ACCURATE", "ON TIME", "CLEARED"];

export function Hero({ preparedFor }: { preparedFor?: string }) {
  return (
    <section aria-labelledby="hero-title" className="bg-grid border-b border-line">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-4 pb-12 pt-7 sm:px-6 md:pt-16 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14 lg:pb-20">
        <div>
          {preparedFor && (
            <p className="label mb-5 inline-flex items-center gap-2 rounded border border-accent px-3 py-1.5 text-accent">
              Prepared for {preparedFor}
            </p>
          )}
          <p className="label text-muted">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[2rem] font-extrabold leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]"
          >
            {hero.h1}
          </h1>
          <dl aria-label="Headline results" className="mt-5 grid grid-cols-3 divide-x divide-dashed divide-line rounded-lg border border-line bg-surface sm:hidden">
            {hero.headline.map((h) => (
              <div key={h.label} className="flex flex-col-reverse justify-end px-2.5 py-2.5">
                <dt className="text-[0.75rem] leading-tight text-muted">{h.label}</dt>
                <dd className="font-display text-lg font-extrabold leading-tight tracking-tight text-accent">{h.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 max-w-[38rem] text-muted text-pretty sm:mt-5">{hero.sub}</p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
            <a href={site.cvPdf} download className="btn btn-primary" data-track="cv_download">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16" />
              </svg>
              Download CV
            </a>
            <a href="#contact" className="btn btn-ghost" data-track="contact_click">
              Contact me
            </a>
          </div>
          <ul aria-label="Key systems and sectors" className="label mt-6 flex flex-wrap gap-x-3 gap-y-1 text-muted">
            {hero.trust.map((t, i) => (
              <li key={t}>
                {t}
                {i < hero.trust.length - 1 && <span aria-hidden="true" className="ml-3">·</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-lg border max-sm:hidden border-line bg-surface shadow-[0_1px_0_var(--line),0_12px_32px_-16px_rgb(15_27_45/0.25)]">
          <div className="label flex items-center justify-between border-b border-dashed border-line px-5 py-3 text-muted">
            <span>Consignment · Results</span>
            <span>{site.location}</span>
          </div>
          <dl className="divide-y divide-dashed divide-line">
            {hero.headline.map((h, i) => (
              <div key={h.label} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm text-muted">{h.label}</dt>
                  <dd className="font-display text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">{h.value}</dd>
                </div>
                <StampChip>{stamps[i]}</StampChip>
              </div>
            ))}
          </dl>
          <div className="label flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-line px-5 py-3 text-muted">
            <span>JAFZA → Open to work</span>
            <a href={`mailto:${contact.email}`} className="link normal-case tracking-normal" data-track="contact_click">
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
