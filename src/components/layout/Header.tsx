"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig, whatsappLink } from "@/config/site";
import { cn, delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/brand/Logo";

/** Header transparente no topo, sólido após rolar; some ao descer e volta ao subir. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 400 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll da página com o menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,translate,box-shadow] duration-500",
        solid || open ? "bg-charcoal/90 shadow-lg shadow-black/30 backdrop-blur-md" : "bg-transparent",
        hidden && !open && "-translate-y-full",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="#inicio" aria-label={`${siteConfig.name} — início`} onClick={() => setOpen(false)}>
          <Logo className="w-28" bottomText="" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-2 text-xs font-bold tracking-[0.15em] text-cream/85 uppercase transition-colors hover:text-cream"
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-red transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <ButtonLink href={whatsappLink()} className="hidden lg:inline-flex">
          <WhatsAppIcon className="size-4" /> WhatsApp
        </ButtonLink>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Principal"
          className="grain relative h-[calc(100svh-5rem)] overflow-y-auto border-t border-cream/10 lg:hidden"
        >
          <Container className="flex flex-col gap-2 py-8">
            {siteConfig.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={delay(i * 60)}
                className="animate-[menu-in_.5s_var(--ease-brand)_both] border-b border-cream/10 py-4 font-display text-3xl uppercase [animation-delay:var(--delay)]"
              >
                {item.label}
              </a>
            ))}
            <ButtonLink href={whatsappLink()} size="lg" className="mt-6" onClick={() => setOpen(false)}>
              <WhatsAppIcon className="size-5" /> Chamar no WhatsApp
            </ButtonLink>
          </Container>
        </nav>
      )}
    </header>
  );
}
