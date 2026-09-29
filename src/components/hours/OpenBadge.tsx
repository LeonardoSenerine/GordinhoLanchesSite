"use client";

import { siteConfig } from "@/config/site";
import { formatHour } from "@/lib/hours";
import { cn } from "@/lib/utils";
import { useOpenStatus } from "./useOpenStatus";

/** Selo "Aberto agora · até 01h" / "Fechado · abre hoje às 18h", ao vivo. */
export function OpenBadge({ className }: { className?: string }) {
  const status = useOpenStatus();
  const opens = formatHour(siteConfig.hours[0].opens);

  let dot = "bg-cream/40";
  let text = `Todas as noites a partir das ${opens}`;
  if (status?.open) {
    dot = "bg-emerald-400 animate-pulse";
    text = `Aberto agora · até ${formatHour(status.schedule.closes)}`;
    if (status.afterMidnight && "counterAfterMidnight" in status.schedule) text += " · pedidos no balcão";
  } else if (status) {
    dot = "bg-brand-red";
    text = `Fechado agora · abre às ${formatHour(status.schedule.opens)}`;
  }

  return (
    <p
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-charcoal/60 px-4 py-2 text-xs font-bold tracking-wider text-cream uppercase backdrop-blur sm:text-sm",
        className,
      )}
    >
      <span aria-hidden className={cn("size-2.5 shrink-0 rounded-full", dot)} />
      {text}
    </p>
  );
}
