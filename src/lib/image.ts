import type { StaticImageData } from "next/image";

/**
 * Com `object-cover`, uma foto HORIZONTAL numa caixa VERTICAL é ampliada pela altura:
 * ela é desenhada bem mais larga que a caixa. Se o `sizes` informar só a largura da
 * caixa, o Next entrega um arquivo pequeno demais e a foto sai borrada.
 *
 * Estas funções calculam a largura realmente desenhada, para montar o `sizes` certo.
 */

/** Quantas vezes a foto fica mais larga que a caixa (1 = cabe na largura). */
export function coverFactor(img: StaticImageData, boxAspect: number) {
  return Math.max(1, img.width / img.height / boxAspect);
}

/** Largura desenhada (px) de uma foto `object-cover` numa caixa de `boxWidth` px e proporção `boxAspect` (largura/altura). */
export function coverPx(img: StaticImageData, boxWidth: number, boxAspect: number) {
  return `${Math.ceil(boxWidth * coverFactor(img, boxAspect))}px`;
}

/** Idem para caixas medidas em vw. */
export function coverVw(img: StaticImageData, boxVw: number, boxAspect: number) {
  return `${Math.ceil(boxVw * coverFactor(img, boxAspect))}vw`;
}
