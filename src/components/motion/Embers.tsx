import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// Gerador pseudoaleatório com semente fixa: o servidor e o navegador geram os mesmos
// elementos (sem diferença de hidratação) e o desenho é igual a cada carregamento.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const EMBER_COLORS = ["#f5b800", "#ff7a1a", "#d7141a", "#ffd35c"];
const COAL_COLORS = ["#d7141a", "#ff5a0a", "#ff7a1a", "#b30f14", "#f5b800"];

/**
 * Brasa no hero (CSS puro, classes em globals.css), em camadas:
 * - `.fire-flicker`: luz quente variando sobre a parte de baixo da cena;
 * - `.coal`: leito de brasas incandescentes tremulando no rodapé;
 * - `.ember`: faíscas redondas subindo devagar;
 * - `.spark`: fagulhas alongadas, rápidas, com rastro.
 * Decorativo: fica atrás do conteúdo e some com movimento reduzido.
 */
export function Embers({
  embers = 36,
  sparks = 14,
  coals = 11,
  className,
}: {
  embers?: number;
  sparks?: number;
  coals?: number;
  className?: string;
}) {
  const rand = seeded(1992);
  const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)];

  const coalEls = Array.from({ length: coals }, (_, i) => (
    <span
      key={`c${i}`}
      className="coal"
      style={
        {
          left: `${(i / coals) * 100 - 8 + rand() * 10}%`,
          width: `${18 + rand() * 22}%`,
          height: `${90 + rand() * 90}px`,
          color: pick(COAL_COLORS),
          "--dur": `${2.2 + rand() * 3}s`,
          "--delay": `${-rand() * 5}s`,
          "--min": (0.35 + rand() * 0.25).toFixed(2),
        } as CSSProperties
      }
    />
  ));

  const emberEls = Array.from({ length: embers }, (_, i) => {
    const size = 3 + rand() * 5;
    return (
      <span
        key={`e${i}`}
        className="ember"
        style={
          {
            left: `${rand() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            color: pick(EMBER_COLORS),
            background: "currentColor",
            "--dur": `${7 + rand() * 9}s`,
            "--delay": `${-rand() * 16}s`,
            "--drift": `${(rand() - 0.5) * 160}px`,
            "--peak": (0.55 + rand() * 0.45).toFixed(2),
          } as CSSProperties
        }
      />
    );
  });

  const sparkEls = Array.from({ length: sparks }, (_, i) => {
    const drift = (rand() - 0.5) * 220;
    return (
      <span
        key={`s${i}`}
        className="spark"
        style={
          {
            left: `${5 + rand() * 90}%`,
            height: `${10 + rand() * 14}px`,
            color: pick(EMBER_COLORS),
            "--dur": `${2.4 + rand() * 2.6}s`,
            "--delay": `${-rand() * 8}s`,
            "--drift": `${drift}px`,
            // Inclina a fagulha na direção em que ela sobe
            "--tilt": `${(drift / 220) * 28}deg`,
          } as CSSProperties
        }
      />
    );
  });

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="fire-flicker absolute inset-x-0 bottom-0 h-2/3" />
      <div className="absolute inset-x-0 bottom-0 h-56">{coalEls}</div>
      {emberEls}
      {sparkEls}
    </div>
  );
}
