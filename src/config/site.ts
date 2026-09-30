/**
 * Configuração central do site.
 * Todos os dados do negócio ficam aqui — componentes nunca devem ter
 * telefone, endereço ou horários "chumbados" no JSX.
 *
 * Fonte dos dados: o cliente, o mural "Nossa História" da lanchonete, o perfil do Google
 * e o Instagram (@gordinho.hamburgueria). Itens marcados com [PREENCHER] ainda faltam.
 */
export const siteConfig = {
  name: "Gordinho Lanches",
  shortName: "Gordinho",
  category: "Hamburgueria",
  city: "Itatiba",
  state: "SP",
  description:
    "Gordinho Lanches — desde 1992 fazendo parte de Itatiba/SP. Lanches e cachorros-quentes caprichados, família reunida, espaço kids e estacionamento na porta no Itacenter Mall.",
  // URL absoluta usada no SEO e nas imagens de compartilhamento. Sem NEXT_PUBLIC_SITE_URL,
  // usa o domínio de produção que a Vercel injeta no build; em último caso, localhost.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  // Confirmado pelo mural da lanchonete: "Em 1992 começa nossa história…"
  foundedYear: 1992 as number | null,

  contact: {
    phone: "(11) 4524-8391",
    // Bio do Instagram: "Telefone e WhatsApp (11) 4524-8391"
    whatsapp: "551145248391",
    whatsappMessage: "Olá!! Gostaria de fazer um pedido!",
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

  /*
   * Horário do salão. `days` usa 0 = domingo … 6 = sábado (o dia em que ABRE).
   * `closes` depois da meia-noite significa madrugada do dia seguinte.
   */
  hours: [
    {
      label: "Domingo a quarta",
      short: "Dom–Qua",
      days: [0, 1, 2, 3],
      opens: "18:00",
      closes: "01:00",
      note: "Salão aberto até a 1h da manhã. Delivery pelo WhatsApp e iFood até a meia-noite.",
    },
    {
      label: "Quinta",
      short: "Qui",
      days: [4],
      opens: "18:00",
      closes: "02:00",
      note: "A noite vai mais longe: salão aberto até as 2h. Delivery até a meia-noite.",
    },
    {
      label: "Sexta e sábado",
      short: "Sex–Sáb",
      days: [5, 6],
      opens: "18:00",
      closes: "05:00",
      note: "Depois da meia-noite, o pedido é feito no balcão — o salão continua aberto.",
      // Depois da meia-noite o pedido é no balcão (selo "pedidos no balcão" no topo)
      counterAfterMidnight: true,
    },
  ],

  // Entregas: todos os dias
  delivery: {
    opens: "18:00",
    closes: "00:00",
    channels: ["WhatsApp", "iFood"],
    ifood: "", // [PREENCHER] link da loja no iFood; sem ele, o botão do iFood não aparece
  },

  social: {
    instagram: "https://www.instagram.com/gordinho.hamburgueria/",
    instagramHandle: "@gordinho.hamburgueria",
    instagramFollowers: 3800,
    facebook: "", // [PREENCHER] URL da página "Gordinho Lanches e Restaurante"
  },

  legal: {
    // Nome empresarial e CNPJ aparecem nas políticas quando preenchidos
    companyName: "", // [PREENCHER] razão social
    cnpj: "", // [PREENCHER] ex.: "00.000.000/0001-00"
    email: "", // [PREENCHER] e-mail para pedidos de privacidade (LGPD); sem ele, usa o WhatsApp
    lastUpdated: "2026-09-29",
  },

  // Âncoras com "/" para funcionarem também a partir das páginas internas (políticas, 404)
  nav: [
    { label: "Nossa história", href: "/#historia" },
    { label: "Do jeito Gordinho", href: "/#jeito-gordinho" },
    { label: "O espaço", href: "/#espaco" },
    { label: "Horários", href: "/#horarios" },
    { label: "Visite", href: "/#visite" },
  ],

  legalPages: [
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Política de Cookies", href: "/cookies" },
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
