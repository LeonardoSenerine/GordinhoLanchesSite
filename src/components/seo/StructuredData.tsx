import { mapsLink, siteConfig } from "@/config/site";

const SCHEMA_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** JSON-LD de restaurante local (Google: endereço, telefone, fundação, horários, redes). */
export function StructuredData() {
  const { address, contact, social } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+${contact.whatsapp}`,
    servesCuisine: ["Lanches", "Hambúrguer", "Cachorro-quente", "Pizza"],
    ...(siteConfig.foundedYear && { foundingDate: String(siteConfig.foundedYear) }),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: "BR",
    },
    hasMap: mapsLink(),
    // Horários que passam da meia-noite: "closes" menor que "opens" = madrugada do dia seguinte
    openingHoursSpecification: siteConfig.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${SCHEMA_DAYS[d]}`),
      opens: h.opens,
      closes: h.closes,
    })),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Espaço kids / playground", value: true },
      { "@type": "LocationFeatureSpecification", name: "Estacionamento", value: true },
    ],
    sameAs: [social.instagram, social.facebook].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      // JSON gerado a partir de dados estáticos do próprio site
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
