import { mapsLink, siteConfig } from "@/config/site";

/** JSON-LD de restaurante local (Google: endereço, telefone, fundação, redes). */
export function StructuredData() {
  const { address, contact, social } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+${contact.whatsapp}`,
    servesCuisine: ["Lanches", "Hambúrguer", "Hot dog", "Pizza"],
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
