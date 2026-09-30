/**
 * Catálogo de fotos com texto alternativo.
 * Originais de câmera ficam em /fotos-originais (fora do build);
 * aqui estão as versões otimizadas (2400px, ~250 KB).
 */
import burgerMaos from "./burger-maos.jpg";
import comboLancheDrink from "./combo-lanche-drink.jpg";
import equipeBalcao from "./equipe-balcao.jpg";
import heroBrasa from "./hero-brasa.jpg";
import hotDog from "./hot-dog.jpg";
import lanchePrato from "./lanche-prato.jpg";
import lanchePrato2 from "./lanche-prato-2.jpg";
import lancheQueijo from "./lanche-queijo.jpg";
import lancheTabua from "./lanche-tabua.jpg";
import lancheTabuaDrink from "./lanche-tabua-drink.jpg";
import porcaoFrango from "./porcao-frango.jpg";
import salada from "./salada.jpg";
import salaoAmplo from "./salao-amplo.jpg";
import salaoPlayground from "./salao-playground.jpg";
import salaoPlayground2 from "./salao-playground-2.jpg";
import salaoVertical from "./salao-vertical.jpg";
import salaoVertical2 from "./salao-vertical-2.jpg";

export const photos = {
  burgerMaos: {
    src: burgerMaos,
    alt: "Hambúrguer alto com queijo, salada e molho, segurado com as duas mãos",
  },
  comboLancheDrink: {
    src: comboLancheDrink,
    alt: "Lanche na tábua com molho verde e refrigerante com limão",
  },
  equipeBalcao: {
    src: equipeBalcao,
    alt: "Equipe do Gordinho sorrindo atrás do balcão, ao lado da churrasqueira",
  },
  heroBrasa: { src: heroBrasa, alt: "Faíscas subindo da brasa enquanto o chapeiro prepara o fogo" },
  hotDog: { src: hotDog, alt: "Cachorro-quente do Gordinho coberto de batata palha e molho" },
  lanchePrato: { src: lanchePrato, alt: "Lanche caprichado cortado ao meio, com bife, alface e tomate" },
  lanchePrato2: { src: lanchePrato2, alt: "Lanche farto cortado ao meio servido no prato" },
  lancheQueijo: { src: lancheQueijo, alt: "Lanche partido ao meio com queijo derretido puxando" },
  lancheTabua: { src: lancheTabua, alt: "Lanche com bacon, ovo e salada servido na tábua de madeira" },
  lancheTabuaDrink: {
    src: lancheTabuaDrink,
    alt: "Lanche na tábua acompanhado de molho e refrigerante gelado",
  },
  porcaoFrango: { src: porcaoFrango, alt: "Porção de frango a passarinho com maionese e cebolinha" },
  salada: { src: salada, alt: "Salada com frango, croutons, tomate e queijo" },
  salaoAmplo: { src: salaoAmplo, alt: "Salão amplo com mesas de madeira e luminárias pendentes" },
  salaoPlayground: { src: salaoPlayground, alt: "Salão com mesas e o playground infantil ao fundo" },
  salaoPlayground2: { src: salaoPlayground2, alt: "Playground colorido ao lado das mesas do salão" },
  salaoVertical: { src: salaoVertical, alt: "Vista do salão com o espaço kids" },
  salaoVertical2: { src: salaoVertical2, alt: "Mesas e bancos estofados com o playground ao fundo" },
} as const;

export type Photo = (typeof photos)[keyof typeof photos];
