import { proof, sections, type Proof } from "@/content";
import { Counter } from "./Counter";
import { PressStamp } from "./PressStamp";
import { SectionLabel } from "./SectionLabel";

export function ProofCard({ p, i }: { p: Proof; i: number }) {
  return (
    <li className="relative flex flex-col justify-between gap-4 rounded-lg border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-[2rem] font-extrabold leading-none tracking-tight text-accent lg:text-[2.1rem]">
          {p.to === null ? p.display : <Counter to={p.to} decimals={p.decimals} prefix={p.prefix} suffix={p.suffix} />}
        </p>
        <PressStamp delay={0.1 + i * 0.05}>{p.stamp}</PressStamp>
      </div>
      <p className="text-[0.95rem] leading-snug text-muted">{p.label}</p>
    </li>
  );
}

export function ProofStrip({ items = proof }: { items?: Proof[] }) {
  return (
    <section id="proof" aria-labelledby="proof-title" className="bg-grid border-b border-line">
      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 md:py-20">
        <SectionLabel {...sections.proof} />
        <h2 id="proof-title" className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Evidence before opinion.
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProofCard key={p.label} p={p} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
