"use client";

import { siteConfig, whatsappLink } from "@/config/site";
import { formatHour } from "@/lib/hours";
import { cn, delay } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { useOpenStatus } from "./useOpenStatus";

/** Quadro de horários com o expediente de hoje em destaque + cartão de delivery. */
export function HoursBoard() {
  const status = useOpenStatus();
  const { delivery } = siteConfig;

  return (
    <div className="grid gap-5 lg:gap-6">
      {/* Salão */}
      <ul className="grid gap-5 pt-3 md:grid-cols-3 lg:gap-6">
        {siteConfig.hours.map((h, i) => {
          const isToday = status?.scheduleIndex === i;
          return (
            <li
              key={h.label}
              data-tilt="6"
              className={cn(
                "reveal relative flex flex-col rounded-3xl p-6 ring-1 transition-colors sm:p-7",
                isToday ? "bg-brand-red ring-brand-red" : "bg-ink-2 ring-cream/10",
              )}
              style={delay(i * 100)}
            >
              {isToday && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-mustard px-3 py-1 text-[0.65rem] font-bold tracking-widest text-charcoal uppercase">
                  {status?.afterMidnight ? "Agora" : "Hoje"}
                </span>
              )}
              <p className={cn("text-sm font-bold", isToday ? "text-cream" : "text-cream/70")}>{h.label}</p>
              <p className="mt-3 font-display text-[2.6rem] leading-none whitespace-nowrap uppercase sm:text-5xl">
                {formatHour(h.opens)}
                <span className={cn("mx-1 text-2xl", isToday ? "text-cream/70" : "text-brand-red")}>→</span>
                {formatHour(h.closes)}
              </p>
              {"note" in h && (
                <p
                  className={cn(
                    "mt-4 border-t pt-4 text-sm leading-snug",
                    isToday ? "border-cream/25 text-cream" : "border-cream/10 text-cream/75",
                  )}
                >
                  {h.note}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {/* Delivery */}
      <div
        className="reveal flex flex-col gap-6 rounded-3xl bg-cream p-6 text-charcoal sm:p-8 lg:flex-row lg:items-center lg:justify-between"
        style={delay(300)}
      >
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-script text-3xl text-brand-red">delivery</p>
            {status && (
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-widest uppercase",
                  status.deliveryOpen ? "bg-emerald-500 text-white" : "bg-charcoal/10 text-muted",
                )}
              >
                {status.deliveryOpen ? "Entregando agora" : "Fora do horário"}
              </span>
            )}
          </div>
          <p className="mt-2 font-display text-[2.6rem] leading-none whitespace-nowrap uppercase sm:text-5xl">
            {formatHour(delivery.opens)} <span className="text-2xl text-brand-red">→</span>{" "}
            {formatHour(delivery.closes)}
          </p>
          <p className="mt-3 text-muted">
            Todos os dias, pelo <strong className="text-charcoal">WhatsApp</strong> e pelo{" "}
            <strong className="text-charcoal">iFood</strong>.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <ButtonLink href={whatsappLink()} className="sm:flex-1">
            <WhatsAppIcon className="size-4" /> Pedir no WhatsApp
          </ButtonLink>
          {delivery.ifood && (
            <ButtonLink href={delivery.ifood} variant="dark" className="sm:flex-1">
              Pedir no iFood
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
}
