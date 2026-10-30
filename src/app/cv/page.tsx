import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { awards, certifications, contact, education, experience, hero, site, skills, about } from "@/content";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "CV",
  description: `One-page CV of ${site.name}, ${site.role} in ${site.location}. ${site.description}`,
  alternates: { canonical: "/cv" },
};

/** ATS-friendly CV: plain headings, real text, single column, no graphics. */
export default function CvPage() {
  const languages = about.facts.find((f) => f.k === "Languages")?.v;
  return (
    <>
      <div className="print:hidden">
        <Header />
      </div>
      <main id="main" className="cv mx-auto max-w-[860px] px-4 py-10 sm:px-6 print:max-w-none print:p-0">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href="/" className="link">← Back to the portfolio</Link>
          <div className="flex gap-2">
            <PrintButton />
            <a href={site.cvPdf} download className="btn btn-primary" data-track="cv_download">
              Download PDF
            </a>
          </div>
        </div>

        <article className="rounded-lg border border-line bg-surface p-6 sm:p-10 print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black">
          <header className="border-b-2 border-ink pb-3 print:border-black">
            <h1 className="font-display text-3xl font-extrabold tracking-tight print:text-[20pt]">{site.name}</h1>
            <p className="mt-0.5 font-semibold">
              {site.role} · {site.location}, UAE · {site.target}
            </p>
            <p className="mt-1 text-[0.9rem] text-muted print:text-black">
              <a href={`mailto:${contact.email}`}>{contact.email}</a> · <a href={contact.phoneHref}>{contact.phone}</a> (mobile and WhatsApp) ·{" "}
              <a href={contact.linkedin}>{contact.linkedinLabel}</a> ·{" "}
              <a href={site.url}>satteches.com</a> · UAE resident visa (active) · Languages: {languages}
            </p>
          </header>

          <section aria-labelledby="cv-summary">
            <h2 id="cv-summary">Summary</h2>
            <p>
              {hero.sub} Key results: 99.8% inventory accuracy, a daily task cut from 3 hours to 20 minutes with Excel VBA, and
              zero customs-hold incidents on Mirsal 2 clearances (as of {site.asOf}).
            </p>
          </section>

          <section aria-labelledby="cv-experience">
            <h2 id="cv-experience">Experience</h2>
            {experience.map((r) => (
              <div key={r.id} className="cv-role">
                <h3>
                  {r.title}, {r.company}, {r.place}
                  <span className="cv-dates">{r.dates}</span>
                </h3>
                <ul>
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section aria-labelledby="cv-skills">
            <h2 id="cv-skills">Skills and systems</h2>
            <ul className="cv-skills">
              {skills.map((g) => (
                <li key={g.group}>
                  <strong>{g.group}:</strong> {g.items.join(", ")}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cv-education">
            <h2 id="cv-education">Education, certifications and awards</h2>
            <p>
              <strong>{education.name}</strong>, {education.school}, {education.date}. {education.grade}.
            </p>
            <p>
              <strong>Certifications:</strong> {certifications.map((c) => `${c.name} (${c.issuer})`).join("; ")}.
            </p>
            <p>
              <strong>Awards:</strong> {awards.map((a) => `${a.name} (${a.context.replace(" · ", ", ")})`).join("; ")}.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
