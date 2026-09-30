/**
 * A trajetória do Gordinho, contada por eles mesmos.
 *
 * Fonte: mural em quadrinhos "Nossa História" que fica na parede da lanchonete
 * (fotos enviadas pelo cliente em 30/09/2026).
 *
 * Cada marco tem dois textos, de origens diferentes:
 * - `text`   → o que está no MURAL, em primeira pessoa, com ajustes mínimos de pontuação;
 * - `detail` → texto NOSSO, que desenvolve a cena sem acrescentar fatos (as contas de anos
 *              vêm das próprias datas do mural). Precisa da aprovação do cliente.
 * Os títulos curtos também são nossos.
 *
 * Não acrescente marcos nem fatos que não venham do cliente.
 */
export interface Milestone {
  year: string;
  title: string;
  text: string;
  detail: string;
}

export const milestones: Milestone[] = [
  {
    year: "1992",
    title: "A kombinha e o carrinho",
    text: "Começa nossa história: chegamos no canteiro central que dá acesso à CECAP, estacionamos nossa kombinha e tiramos o carrinho — que nem rodinha tinha.",
    detail:
      "Sem salão e sem estrutura: só a kombi, o carrinho e a vontade de fazer dar certo. Foi ali, na rua, que o Gordinho começou a fazer parte das noites de Itatiba.",
  },
  {
    year: "1997",
    title: "Um carrinho melhor",
    // [CONFIRMAR] trecho parcialmente cortado na foto do mural ("ao lado d… endereço anterior")
    text: "Com um carrinho melhor, fomos para a calçada ao lado do endereço anterior.",
    detail:
      "Cinco anos depois, o primeiro passo. Parece pouco para quem vê de fora — mas é muito para quem estava construindo tudo aos poucos, uma noite de cada vez.",
  },
  {
    year: "2002",
    title: "A primeira barraca",
    text: "Atravessamos a rua e construímos nossa primeira barraca, com lona.",
    detail:
      "Dez anos de rua até o primeiro teto. Era de lona, mas era nosso: um lugar para a chapa e para receber quem já vinha comer com a gente.",
  },
  {
    year: "2005",
    title: "Os primeiros muros",
    text: "Os primeiros muros foram construídos.",
    detail:
      "A lona deu lugar à alvenaria. Tijolo por tijolo, a barraca começava a virar lanchonete — e o sonho, a ganhar endereço.",
  },
  {
    year: "2010",
    title: "Janelas e novas acomodações",
    text: "Nossa lanchonete estava mais bonita, com janelas e novas acomodações.",
    detail:
      "Dezoito anos depois da kombinha, o Gordinho já tinha cara de casa: mais conforto para sentar, comer sem pressa e voltar na semana seguinte.",
  },
  {
    year: "2016",
    title: "Mais amplo e confortável",
    text: "Mas podia melhorar — e melhorou: o espaço se tornou mais amplo e confortável.",
    detail:
      "Mais espaço para mais gente. O salão cresceu para receber a família inteira, do mesmo jeito que a história foi crescendo: com perseverança, tribulação e paciência.",
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
