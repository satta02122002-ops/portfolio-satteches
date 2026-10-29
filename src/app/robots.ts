import type { MetadataRoute } from "next";
import { site } from "@/content";

export default function robots(): MetadataRoute.Robots {
  return {
    // Personalised /for/... pages are for one recruiter each, not for search.
    rules: { userAgent: "*", allow: "/", disallow: "/for/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
