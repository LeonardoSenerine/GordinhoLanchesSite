/**
 * Configuração central do site.
 * Todos os dados do negócio ficam aqui — componentes nunca devem ter
 * telefone, endereço ou horários "chumbados" no JSX.
 *
 * Fonte dos dados: perfil do Google e Instagram (@gordinho.hamburgueria).
 * Itens marcados com [CONFIRMAR] foram deduzidos e precisam de validação.
 */
export const siteConfig = {
  name: "Gordinho Lanches",
  shortName: "Gordinho",
  category: "Hamburgueria",
  city: "Itatiba",
  state: "SP",
  description:
    "Gordinho Lanches — desde 1992 fazendo parte de Itatiba/SP. Lanche caprichado, família reunida, espaço kids e estacionamento na porta no Itacenter Mall.",
  // Lema da bio do Instagram — usado como assinatura institucional
  motto: ["Perseverança", "Tribulação", "Paciência"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // [CONFIRMAR] deduzido do post de "34 anos de história" (ago/2026)
  foundedYear: 1992 as number | null,

  contact: {
    phone: "(11) 4524-8391",
    // Bio do Instagram: "Telefone e WhatsApp (11) 4524-8391"
    whatsapp: "551145248391",
    whatsappMessage: "Olá, Gordinho! Vim pelo site.",
  },

  address: {
    street: "R. Luíz Scavone, 820",
    complement: "Itacenter Mall",
    neighborhood: "Jardim de Lucca",
    city: "Itatiba",
    state: "SP",
    zip: "13255-350",
    mapsQuery: "Gordinho Lanches, R. Luíz Scavone, 820 - Jardim de Lucca, Itatiba - SP",
  },

  hours: [
    // [CONFIRMAR] Google informa apenas "abre às 18:00" — falta dias e horário de fechamento
    { days: "Todos os dias", time: "A partir das 18h" },
  ],

  social: {
    instagram: "https://www.instagram.com/gordinho.hamburgueria/",
    instagramHandle: "@gordinho.hamburgueria",
    instagramFollowers: 3800,
    facebook: "", // [PREENCHER] URL da página "Gordinho Lanches e Restaurante"
  },

  nav: [
    { label: "Nossa história", href: "#historia" },
    { label: "Do jeito Gordinho", href: "#jeito-gordinho" },
    { label: "O espaço", href: "#espaco" },
    { label: "De perto", href: "#de-perto" },
    { label: "Visite", href: "#visite" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export function whatsappLink(message: string = siteConfig.contact.whatsappMessage) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.mapsQuery)}`;
}

export function mapsEmbedLink() {
  return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.mapsQuery)}&output=embed`;
}

export function yearsOfHistory() {
  return siteConfig.foundedYear ? new Date().getFullYear() - siteConfig.foundedYear : null;
}
