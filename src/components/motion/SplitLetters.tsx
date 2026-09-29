import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Texto que entra letra por letra (CSS `.split-letters .char` em globals.css).
 * Leitores de tela leem o texto inteiro; as letras soltas ficam ocultas para eles.
 */
export function SplitLetters({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("split-letters", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {[...text].map((char, i) => (
          <span key={i} className="char" style={{ "--i": i } as CSSProperties}>
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  );
}
