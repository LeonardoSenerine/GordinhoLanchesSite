/**
 * A trajetória do Gordinho, contada por eles mesmos.
 *
 * Fonte: mural em quadrinhos "Nossa História" que fica na parede da lanchonete
 * (fotos enviadas pelo cliente em 30/09/2026). Os textos seguem o mural, em primeira
 * pessoa, com ajustes mínimos de pontuação. Os títulos curtos são nossos.
 *
 * Não acrescente marcos que não venham do cliente.
 */
export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export const milestones: Milestone[] = [
  {
    year: "1992",
    title: "A kombinha e o carrinho",
    text: "Começa nossa história: chegamos no canteiro central que dá acesso à CECAP, estacionamos nossa kombinha e tiramos o carrinho — que nem rodinha tinha.",
  },
  {
    year: "1997",
    title: "Um carrinho melhor",
    // [CONFIRMAR] trecho parcialmente cortado na foto do mural ("ao lado d… endereço anterior")
    text: "Com um carrinho melhor, fomos para a calçada ao lado do endereço anterior.",
  },
  {
    year: "2002",
    title: "A primeira barraca",
    text: "Atravessamos a rua e construímos nossa primeira barraca, com lona.",
  },
  {
    year: "2005",
    title: "Os primeiros muros",
    text: "Os primeiros muros foram construídos.",
  },
  {
    year: "2010",
    title: "Janelas e novas acomodações",
    text: "Nossa lanchonete estava mais bonita, com janelas e novas acomodações.",
  },
  {
    year: "2016",
    title: "Mais amplo e confortável",
    text: "Mas podia melhorar — e melhorou: o espaço se tornou mais amplo e confortável.",
  },
];

/** Frase que fecha o mural. */
export const historyClosing = "Nossa história não termina aqui, apenas recomeça diariamente junto com vocês.";

/** O lema e o que cada palavra significa, como está no mural. */
export const mottoMeanings = [
  { word: "Perseverança", meaning: "Acredite no sonho que será realizado!" },
  { word: "Tribulação", meaning: "Saiba que a ajuda vem na nossa vida." },
  { word: "Paciência", meaning: "Nós iremos vencer!" },
];
