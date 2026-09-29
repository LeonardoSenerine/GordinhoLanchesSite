import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Gerado em /robots.txt
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    // Não bloquear /_next/: o Google precisa de CSS, JS e imagens para renderizar a página
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
