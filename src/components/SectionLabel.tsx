export function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <p className="label mb-4 flex items-center gap-3 text-muted" aria-hidden="true">
      <span className="text-accent">{n}</span>
      <span className="h-px w-8 bg-line" />
      <span>{label}</span>
    </p>
  );
}
