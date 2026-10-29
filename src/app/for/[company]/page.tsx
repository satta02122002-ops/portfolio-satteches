import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { TrackVisit } from "@/components/TrackVisit";
import { hiringFor, site, type Pillar } from "@/content";

const SMALL = new Set(["and", "of", "the", "for", "&"]);

/** "dp-world" → "DP World", "al-futtaim-logistics" → "Al Futtaim Logistics". */
function companyName(slug: string): string | null {
  const clean = decodeURIComponent(slug).toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,59}$/.test(clean)) return null;
  return clean
    .split("-")
    .filter(Boolean)
    .map((w, i) => (i > 0 && SMALL.has(w) ? w : w.length <= 2 || /\d/.test(w) ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

type Props = { params: Promise<{ company: string }>; searchParams: Promise<{ focus?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = companyName((await params).company);
  return {
    title: name ? `Prepared for ${name}` : "Not found",
    robots: { index: false, follow: false },
    alternates: { canonical: "/" },
    openGraph: { title: name ? `${site.name}, prepared for ${name}` : site.title },
  };
}

export default async function ForCompany({ params, searchParams }: Props) {
  const { company } = await params;
  const name = companyName(company);
  if (!name) notFound();
  const { focus } = await searchParams;
  const pillar = hiringFor.some((h) => h.id === focus) ? (focus as Pillar) : null;
  return (
    <>
      <TrackVisit event="for_visit" props={{ company: name }} />
      <HomePage preparedFor={name} focus={pillar} />
    </>
  );
}
