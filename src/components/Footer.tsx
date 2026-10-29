import { contact, footer } from "@/content";

export function Footer() {
  return (
    <footer className="border-t border-line pb-32 pt-10 md:pb-24 print:hidden">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{footer}</p>
        <p className="label">
          GitHub:{" "}
          <a href={contact.github} className="link normal-case" rel="noopener">
            {contact.githubLabel}
          </a>
        </p>
      </div>
    </footer>
  );
}
