import type { ReactNode } from "react";
import { cn, delay } from "@/lib/utils";

interface SectionHeadingProps {
  /** Frase manuscrita acima do título. */
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Cabeçalho padrão das seções: kicker manuscrito → título slab → introdução.
 * Use <em> dentro do título para destacar palavras em vermelho.
 */
export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {kicker && (
        <p
          className={cn(
            "reveal-write mb-2 inline-block font-script text-[1.75rem] sm:text-4xl",
            tone === "dark" ? "text-brand-mustard" : "text-brand-red",
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        className="heading-mark reveal text-[2rem] text-balance sm:text-5xl [&_em]:text-brand-red [&_em]:not-italic"
        style={delay(100)}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "reveal mt-5 text-base text-pretty sm:text-lg",
            tone === "dark" ? "text-cream/70" : "text-muted",
          )}
          style={delay(200)}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
