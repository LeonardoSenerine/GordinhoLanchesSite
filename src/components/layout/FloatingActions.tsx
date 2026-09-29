"use client";

import { useEffect, useState } from "react";
import { mapsLink, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";
import { MapPinIcon, WhatsAppIcon } from "@/components/ui/icons";

/** WhatsApp flutuante (desktop) e barra fixa inferior (mobile), exibidos depois do hero. */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = !visible && "pointer-events-none translate-y-6 opacity-0";

  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar no WhatsApp"
        tabIndex={visible ? 0 : -1}
        className={cn(
          "btn-shine fixed right-6 bottom-6 z-40 hidden items-center gap-3 rounded-full bg-[#25d366] py-3 pr-6 pl-4 font-bold text-charcoal shadow-2xl shadow-black/40 transition-all duration-500 lg:flex",
          hidden,
        )}
      >
        <WhatsAppIcon className="size-7" />
        Chamar no WhatsApp
      </a>

      <nav
        aria-label="Ações rápidas"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-cream/10 bg-charcoal/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur transition-all duration-500 lg:hidden",
          hidden,
        )}
      >
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red text-sm font-bold uppercase"
        >
          <WhatsAppIcon className="size-5" /> WhatsApp
        </a>
        <a
          href={mapsLink()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-cream text-sm font-bold text-charcoal uppercase"
        >
          <MapPinIcon className="size-5" /> Como chegar
        </a>
      </nav>
    </>
  );
}
