import { contact, site, whatsappLink } from "@/content";
import { Icon } from "./Icon";

/** Recruiter fast lane on phones and tablets: CV, call/WhatsApp and email always one tap away. */
export function FastLane() {
  const wa = whatsappLink();
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden print:hidden"
    >
      <div className="mx-auto flex max-w-[640px] gap-2 p-2">
        <a href={site.cvPdf} download className="btn btn-primary flex-1 !px-2 text-[0.92rem]" data-track="cv_download">
          <Icon name="download" />
          CV
        </a>
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 !px-2 text-[0.92rem]" data-track="whatsapp_click">
            <Icon name="whatsapp" />
            WhatsApp
          </a>
        ) : (
          <a href={contact.phoneHref} className="btn btn-ghost flex-1 !px-2 text-[0.92rem]" data-track="phone_click">
            <Icon name="phone" />
            Call
          </a>
        )}
        <a href={`mailto:${contact.email}`} className="btn btn-ghost flex-1 !px-2 text-[0.92rem]" data-track="contact_click">
          <Icon name="mail" />
          Email
        </a>
      </div>
    </nav>
  );
}
