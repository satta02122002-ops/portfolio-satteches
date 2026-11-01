import { contact, footer } from "@/content";

export function Footer() {
  return (
    <footer className="mt-6 border-t border-line pb-24 pt-8 lg:pb-8 print:hidden">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
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
