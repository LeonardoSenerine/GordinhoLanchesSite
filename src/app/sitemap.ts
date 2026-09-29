import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Gerado em /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const legalUpdated = new Date(`${siteConfig.legal.lastUpdated}T12:00:00-03:00`);

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...siteConfig.legalPages.map((page) => ({
      url: `${base}${page.href}`,
      lastModified: legalUpdated,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
