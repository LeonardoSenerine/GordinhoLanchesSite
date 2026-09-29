import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// Gerador pseudoaleatório com semente fixa: o servidor e o navegador geram as mesmas
// faíscas (sem diferença de hidratação) e o desenho é igual a cada carregamento.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const COLORS = ["#f5b800", "#ff7a1a", "#d7141a", "#ffd35c"];

/**
 * Faíscas de brasa subindo (CSS puro, `.ember` em globals.css).
 * Decorativo: fica atrás do conteúdo e some com movimento reduzido.
 */
export function Embers({ count = 36, className }: { count?: number; className?: string }) {
  const rand = seeded(1992);
  const embers = Array.from({ length: count }, (_, i) => {
    const size = 3 + rand() * 5;
    return {
      key: i,
      style: {
        left: `${rand() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        color: COLORS[Math.floor(rand() * COLORS.length)],
        background: "currentColor",
        "--dur": `${7 + rand() * 9}s`,
        "--delay": `${-rand() * 16}s`,
        "--drift": `${(rand() - 0.5) * 160}px`,
        "--peak": (0.55 + rand() * 0.45).toFixed(2),
      } as CSSProperties,
    };
  });

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {embers.map((e) => (
        <span key={e.key} className="ember" style={e.style} />
      ))}
    </div>
  );
}
