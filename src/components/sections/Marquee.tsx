import { cn } from "@/lib/utils";
import { SparkIcon } from "@/components/ui/icons";

// Valores da marca — não produtos (o site não é cardápio)
const defaultItems = [
  "Desde 1992",
  "Feito na chapa",
  "Sem economizar no sabor",
  "Família reunida",
  "Orgulho de Itatiba",
  "Tradição que atravessa gerações",
];

interface MarqueeProps {
  items?: string[];
  reverse?: boolean;
  className?: string;
}

/** Letreiro infinito. A trilha é duplicada para o loop não ter emenda; a cópia fica oculta de leitores de tela. */
export function Marquee({ items = defaultItems, reverse, className }: MarqueeProps) {
  const track = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-8 pr-8 font-display text-xl whitespace-nowrap uppercase sm:text-3xl"
        >
          {item}
          <SparkIcon className="size-5 text-charcoal" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn("marquee relative z-10 overflow-hidden bg-brand-red py-4 text-cream sm:py-5", className)}
    >
      <div
        className={cn("marquee-track flex w-max", reverse ? "animate-marquee-reverse" : "animate-marquee")}
      >
        {track()}
        {track(true)}
      </div>
    </div>
  );
}
