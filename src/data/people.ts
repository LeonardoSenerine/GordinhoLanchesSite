/**
 * Pessoas que fazem parte da história do Gordinho.
 *
 * IMPORTANTE: só preencha com informações REAIS, autorizadas pelas pessoas.
 * As seções "Quem faz o Gordinho" e "Quem já faz parte" só exibem estes blocos
 * quando houver conteúdo — com as listas vazias, nada inventado vai ao ar.
 */

export interface TeamMember {
  name: string;
  role: string; // ex.: "Fundador", "Chapeiro há 20 anos"
  since?: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  detail?: string; // ex.: "cliente desde 1998", "vem com os filhos"
}

// TODO: nomes e funções reais da equipe
export const team: TeamMember[] = [];

// TODO: depoimentos reais de clientes (com autorização)
export const testimonials: Testimonial[] = [];
