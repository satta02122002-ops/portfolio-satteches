import { Icon, type IconName } from "./Icon";

/** Consistent module header used by every dashboard section. */
export function Section({
  module,
  title,
  intro,
  actions,
  children,
  className = "",
}: {
  module: { n: string; label: string; id: string; icon: string };
  title: string;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={module.id} aria-labelledby={`${module.id}-title`} className={`scroll-mt-28 py-10 md:py-14 ${className}`}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Icon name={module.icon as IconName} size={20} />
          </span>
          <div>
            <p className="label text-muted">
              Module {module.n} · {module.label}
            </p>
            <h2 id={`${module.id}-title`} className="mt-1 font-display text-2xl font-bold tracking-tight text-balance sm:text-[1.9rem]">
              {title}
            </h2>
            {intro && <p className="mt-2 max-w-[44rem] text-muted text-pretty">{intro}</p>}
          </div>
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
