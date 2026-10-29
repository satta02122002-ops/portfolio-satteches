import { contact, contactCopy, sections, site, whatsappLink } from "@/content";
import { SectionLabel } from "./SectionLabel";

export function Contact({ form }: { form?: React.ReactNode }) {
  const wa = whatsappLink();
  const channels = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, track: "contact_click" },
    { label: "LinkedIn", value: contact.linkedinLabel, href: contact.linkedin, track: "linkedin_click" },
    ...(wa ? [{ label: "WhatsApp", value: "Chat on WhatsApp", href: wa, track: "whatsapp_click" }] : []),
    { label: "CV", value: "Download CV (PDF)", href: site.cvPdf, track: "cv_download", download: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-grid">
      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 md:py-20">
        <SectionLabel {...sections.contact} />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <h2 id="contact-title" className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              {contactCopy.heading}
            </h2>
            <p className="mt-4 max-w-[34rem] text-muted">{contactCopy.body}</p>
            <ul className="mt-8 divide-y divide-dashed divide-line rounded-lg border border-line bg-surface">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    data-track={c.track}
                    {...("download" in c ? { download: true } : {})}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-14 items-center justify-between gap-4 px-5 py-3 hover:bg-paper"
                  >
                    <span className="label w-20 shrink-0 text-muted">{c.label}</span>
                    <span className="flex-1 break-all font-semibold group-hover:text-accent">{c.value}</span>
                    <span aria-hidden="true" className="text-accent">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {form}
        </div>
      </div>
    </section>
  );
}
