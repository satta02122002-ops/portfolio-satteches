import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { contact, site } from "@/content";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_AE",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}${site.photo}`,
  jobTitle: site.role,
  email: `mailto:${contact.email}`,
  worksFor: { "@type": "Organization", name: site.employer },
  workLocation: { "@type": "Place", name: "Jebel Ali Free Zone (JAFZA), Dubai, United Arab Emirates" },
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  alumniOf: { "@type": "EducationalOrganization", name: "Government Polytechnic College, Tuticorin" },
  knowsLanguage: ["English", "Tamil", "Malayalam", "Hindi"],
  knowsAbout: [
    "Freight forwarding",
    "UAE customs clearance",
    "Mirsal 2",
    "SAP S/4HANA MM",
    "SAP S/4HANA WM",
    "3PL warehouse operations",
    "Inventory control",
    "Incoterms 2020",
    "Excel VBA",
    "Power BI",
    "Lean Six Sigma",
  ],
  sameAs: [contact.linkedin, contact.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
