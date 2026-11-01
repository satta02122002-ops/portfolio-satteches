import { contact, contactCopy, sections, site, whatsappLink } from "@/content";
import { Icon, type IconName } from "./Icon";
import { LocalTime } from "./LocalTime";
import { Section } from "./Section";

/** Module 09 · Dispatch desk: every way to reach me, plus the form. */
export function Contact({ form }: { form?: React.ReactNode }) {
  const wa = whatsappLink();
  const channels: { label: string; value: string; href: string; track: string; icon: IconName; download?: boolean }[] = [
    { label: "Mobile", value: contact.phone, href: contact.phoneHref, track: "phone_click", icon: "phone" },
    ...(wa ? [{ label: "WhatsApp", value: `${contact.phone} (chat)`, href: wa, track: "whatsapp_click", icon: "whatsapp" as const }] : []),
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, track: "contact_click", icon: "mail" },
    { label: "LinkedIn", value: contact.linkedinLabel, href: contact.linkedin, track: "linkedin_click", icon: "linkedin" },
    { label: "CV", value: "Download CV (PDF)", href: site.cvPdf, track: "cv_download", icon: "download", download: true },
  ];

  return (
    <Section module={sections.contact} title={contactCopy.heading} intro={contactCopy.body}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <div className="panel overflow-hidden">
          <div className="panel-head">
            <p className="font-semibold">Direct lines</p>
            <p className="text-[0.85rem]">
              <LocalTime />
            </p>
          </div>
          <ul className="divide-y divide-line">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  data-track={c.track}
                  {...(c.download ? { download: true } : {})}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex min-h-16 items-center gap-4 px-5 py-3 hover:bg-surface-2"
                >
                  <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon name={c.icon} size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="label block text-muted">{c.label}</span>
                    <span className="block break-words font-semibold group-hover:text-primary">{c.value}</span>
                  </span>
                  <span aria-hidden="true" className="text-muted group-hover:text-primary">
                    <Icon name="arrow" size={16} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {form}
      </div>
    </Section>
  );
}
