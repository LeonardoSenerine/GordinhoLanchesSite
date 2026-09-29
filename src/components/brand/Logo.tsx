import { cn } from "@/lib/utils";
import mascot from "@/assets/brand/mascote.png";

interface LogoProps {
  className?: string;
  /** Texto do arco inferior (o logo original dizia "E SELF SERVICE", que não existe mais). */
  bottomText?: string;
  showMascot?: boolean;
}

/**
 * Emblema do Gordinho recriado em SVG a partir do logo oficial:
 * círculo vermelho, faixa inclinada com o nome e textos em arco.
 * Decorativo — quem usa deve fornecer o texto acessível (ex.: sr-only).
 */
export function Logo({ className, bottomText = "ITATIBA · SP", showMascot = true }: LogoProps) {
  return (
    <svg
      viewBox="0 0 480 300"
      aria-hidden
      className={cn("h-auto", className)}
      style={{ fontFamily: "var(--font-display)" }}
    >
      <defs>
        <path id="logo-arc-top" d="M 140 150 A 100 100 0 0 1 340 150" />
        <path id="logo-arc-bottom" d="M 128 150 A 112 112 0 0 0 352 150" />
      </defs>

      <g transform="rotate(-10 240 150)">
        <circle cx="240" cy="150" r="125" fill="var(--color-brand-red)" />
        <circle cx="240" cy="150" r="117" fill="none" stroke="var(--color-charcoal)" strokeWidth="4" />

        <text fill="white" fontSize="21" letterSpacing="2" textAnchor="middle">
          <textPath href="#logo-arc-top" startOffset="50%">
            HAMBURGUERIA
          </textPath>
        </text>
        <text fill="white" fontSize="19" letterSpacing="3" textAnchor="middle">
          <textPath href="#logo-arc-bottom" startOffset="50%">
            {bottomText}
          </textPath>
        </text>

        <line
          x1="18"
          y1="108"
          x2="462"
          y2="108"
          stroke="var(--color-brand-red)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="200"
          x2="462"
          y2="200"
          stroke="var(--color-brand-red)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        <text
          x="240"
          y="186"
          fill="white"
          fontSize="84"
          textAnchor="middle"
          textLength="400"
          lengthAdjust="spacingAndGlyphs"
          stroke="var(--color-charcoal)"
          strokeWidth="8"
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          GORDINHO
        </text>
      </g>

      {/* Mascote sentado na linha superior, como no logo original (já vem inclinado no PNG) */}
      {showMascot && <image href={mascot.src} x="10" y="41" width="98" height="97" />}
    </svg>
  );
}
