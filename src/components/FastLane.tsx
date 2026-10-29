import { contact, site, whatsappLink } from "@/content";

const icons = {
  cv: "M12 3v12m0 0-5-5m5 5 5-5M4 21h16",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  wa: "M4 20l1.3-3.9A8 8 0 1 1 8 19zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z",
};

function Icon({ d }: { d: string }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/** Recruiter fast lane: always one tap from CV, email and WhatsApp. */
export function FastLane() {
  const wa = whatsappLink();
  return (
    <>
      {/* Desktop: floating pill */}
      <aside
        aria-label="Quick contact"
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-1 rounded-full border border-line bg-surface/95 p-1.5 pl-4 shadow-[0_12px_32px_-12px_rgb(15_27_45/0.35)] backdrop-blur md:flex print:hidden"
      >
        <span className="label mr-2 flex items-center gap-2 text-ok">
          <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-ok" />
          Open to senior logistics roles
        </span>
        <a href={`mailto:${contact.email}`} className="btn !min-h-10 rounded-full !px-3 text-sm hover:bg-paper" data-track="contact_click" aria-label={`Email ${contact.email}`}>
          <Icon d={icons.mail} />
          Email
        </a>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn !min-h-10 rounded-full !px-3 text-sm hover:bg-paper" data-track="whatsapp_click">
            <Icon d={icons.wa} />
            WhatsApp
          </a>
        )}
        <a href={site.cvPdf} download className="btn btn-primary !min-h-10 rounded-full !px-4 text-sm" data-track="cv_download">
          <Icon d={icons.cv} />
          CV
        </a>
      </aside>

      {/* Mobile: bottom bar */}
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden print:hidden"
      >
        <p className="label flex items-center justify-center gap-2 border-b border-dashed border-line py-1 text-[0.625rem] text-ok">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
          Open to senior logistics roles
        </p>
        <div className="flex gap-2 p-2">
          <a href={site.cvPdf} download className="btn btn-primary flex-1 !px-2 text-[0.95rem]" data-track="cv_download">
            <Icon d={icons.cv} />
            CV
          </a>
          <a href={`mailto:${contact.email}`} className="btn btn-ghost flex-1 !px-2 text-[0.95rem]" data-track="contact_click">
            <Icon d={icons.mail} />
            Email
          </a>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 !px-2 text-[0.95rem]" data-track="whatsapp_click">
              <Icon d={icons.wa} />
              WhatsApp
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
