import Image from "next/image";
import Link from "next/link";
import { contact, site, whatsappLink } from "@/content";
import { FastLane } from "./FastLane";
import { Footer } from "./Footer";
import { Icon } from "./Icon";
import { LocalTime } from "./LocalTime";
import { ModuleNav } from "./ModuleNav";
import { ThemeToggle } from "./ThemeToggle";

function Brand() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2.5">
      <span aria-hidden="true" className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ink font-display text-sm font-bold text-paper">
        {site.initials}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-ok" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[0.98rem] font-bold tracking-tight">{site.name}</span>
        <span className="block text-[0.75rem] text-muted">Logistics control tower</span>
      </span>
    </Link>
  );
}

/** Operations-console layout: sidebar on desktop, sticky header with module tabs on mobile. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const wa = whatsappLink();
  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[60] rounded bg-ink px-4 py-3 text-paper">
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col border-r border-line bg-surface lg:flex print:hidden">
        <div className="border-b border-line px-5 py-4">
          <Brand />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-surface-2 p-3">
            <Image src={site.photo} alt="" width={44} height={55} className="h-11 w-11 rounded-full object-cover object-top" />
            <div className="min-w-0">
              <p className="truncate text-[0.88rem] font-semibold">{site.role}</p>
              <p className="truncate text-[0.78rem] text-muted">{site.location}</p>
              <span className="chip chip-ok mt-1 !px-2 !py-0.5 !text-[0.6rem]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
                Open to senior roles
              </span>
            </div>
          </div>
          <p className="label mb-2 px-3 text-muted">Modules</p>
          <ModuleNav variant="sidebar" />
        </div>
        <div className="space-y-3 border-t border-line p-4">
          <a href={site.cvPdf} download className="btn btn-primary w-full" data-track="cv_download">
            <Icon name="download" />
            Download CV
          </a>
          <div className="grid grid-cols-3 gap-2">
            <a href={contact.phoneHref} className="btn btn-ghost !px-0" aria-label={`Call ${contact.phone}`} data-track="phone_click">
              <Icon name="phone" />
            </a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-0" aria-label="Chat on WhatsApp" data-track="whatsapp_click">
                <Icon name="whatsapp" />
              </a>
            )}
            <a href={`mailto:${contact.email}`} className="btn btn-ghost !px-0" aria-label={`Email ${contact.email}`} data-track="contact_click">
              <Icon name="mail" />
            </a>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[264px]">
        {/* Mobile / tablet header */}
        <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur lg:hidden print:hidden">
          <div className="flex h-14 items-center justify-between gap-3 px-4">
            <Brand />
            <ThemeToggle />
          </div>
          <ModuleNav variant="strip" />
        </header>

        {/* Desktop status bar */}
        <div className="sticky top-0 z-30 hidden border-b border-line bg-paper/90 backdrop-blur lg:block print:hidden">
          <div className="mx-auto flex h-14 max-w-[1180px] items-center justify-between gap-4 px-8 text-[0.88rem]">
            <p className="flex items-center gap-2 text-muted">
              <Icon name="pin" size={16} />
              JAFZA, Dubai · UAE
              <span aria-hidden="true">·</span>
              <LocalTime />
            </p>
            <div className="flex items-center gap-3">
              <span className="chip chip-ok">
                <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" />
                Available · {site.target.replace("Open to ", "")}
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <main id="main" className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
      <FastLane />
    </>
  );
}
