import Link from "next/link";
import { site } from "@/content";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/#experience", label: "Experience" },
  { href: "/#cases", label: "Case studies" },
  { href: "/#tools", label: "Tools" },
  { href: "/cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75 print:hidden">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-display text-lg font-extrabold tracking-tight">
          <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded bg-ink text-sm text-paper">
            {site.initials}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
          <span className="sr-only sm:hidden">{site.name}, home</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-11 items-center rounded px-3 text-[0.95rem] font-medium text-muted hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.cvPdf} download className="btn btn-primary ml-2 hidden !min-h-10 text-sm lg:inline-flex" data-track="cv_download">
            Download CV
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
