import Image from "next/image";
import type { CSSProperties } from "react";
import { siteConfig, whatsappLink, yearsOfHistory } from "@/config/site";
import { photos } from "@/assets/images";
import mascot from "@/assets/brand/mascote.png";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { VideoLoop } from "@/components/motion/VideoLoop";
import { OpenBadge } from "@/components/hours/OpenBadge";

// Atraso da coreografia de entrada (classes .hero-in / .hero-write / .hero-zoom em globals.css)
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  const years = yearsOfHistory();
  const salao = photos.salaoPlayground2;

  return (
    <section id="inicio" className="grain relative isolate overflow-hidden bg-charcoal lg:pt-20">
      {/*
        ---- Desktop: salão ao fundo, sangrando pela direita, em movimento lento ----
        O esmaecimento é feito com camadas de degradê por cima (e não com mask-image):
        máscara + zoom animado obrigava o navegador a redesenhar a área a cada quadro.
      */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] overflow-hidden lg:block">
        <div data-parallax="0.08" className="absolute inset-x-0 -inset-y-[6%]">
          <Image
            src={salao.src}
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
            className="animate-kenburns object-cover object-[60%_45%] brightness-[.4] contrast-[1.1] saturate-[1.1]"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/40 via-35% to-transparent to-60%" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-transparent via-30% to-transparent" />
      </div>

      {/* ---- Mobile/tablet (como no Samoa): vídeo em tela cheia no fundo, texto embaixo ---- */}
      <div aria-hidden className="absolute inset-0 -z-10 lg:hidden">
        <VideoLoop
          src="/videos/lanches.mp4"
          poster="/videos/lanches-poster.jpg"
          className="absolute inset-0 size-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal from-10% via-charcoal/80 via-45% to-charcoal/10" />
      </div>

      {/* Brilho vermelho (desktop), parado */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 -z-10 hidden size-[42rem] rounded-full bg-brand-red/25 blur-[140px] lg:block"
      />

      <Container className="relative grid min-h-svh items-end gap-14 pt-28 pb-12 sm:pb-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
        {/* ---- Texto: entra em sequência, desde o primeiro quadro ---- */}
        <div>
          <a href="#horarios" className="hero-in mb-6 inline-block" style={d(0.05)}>
            <OpenBadge />
          </a>
          <p
            className="hero-in text-xs font-bold tracking-[0.25em] text-brand-mustard uppercase sm:text-sm"
            style={d(0.1)}
          >
            {siteConfig.name} · {siteConfig.category} · {siteConfig.city}, {siteConfig.state}
          </p>

          <h1 className="mt-4 [text-shadow:0_6px_40px_rgb(0_0_0/0.55)]">
            <span className="sr-only">{siteConfig.name} — </span>
            <span
              className="hero-in block text-[clamp(2.6rem,11vw,5rem)] leading-[0.95] whitespace-nowrap"
              style={d(0.25)}
            >
              Desde {siteConfig.foundedYear}.
            </span>
            {/* A frase "se escreve" da esquerda para a direita, como o script do Samoa */}
            <span
              className="hero-write mt-2 block text-[1.7rem] leading-[1.05] text-brand-red sm:text-[2rem]"
              style={d(0.75)}
            >
              Sem economizar <br className="lg:hidden" />
              no sabor.
            </span>
          </h1>

          <p className="hero-in mt-6 max-w-lg text-base text-cream/80 sm:text-lg" style={d(0.95)}>
            {years ? `Há ${years} anos` : "Há décadas"} fazendo parte das noites de {siteConfig.city}, com
            lanche e cachorro-quente caprichados, família reunida e aquele sabor que continua o mesmo.
          </p>

          <div
            className="hero-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            style={d(1.1)}
          >
            <ButtonLink href={whatsappLink()} size="lg">
              <WhatsAppIcon className="size-5" /> Chamar no WhatsApp
            </ButtonLink>
            <ButtonLink href="#historia" size="lg" variant="outline">
              Conheça o Gordinho
            </ButtonLink>
          </div>
        </div>

        {/* ---- Desktop: vídeo vertical sobre o salão + mascote na borda + selo ---- */}
        <div className="relative mx-auto hidden w-full max-w-sm lg:block">
          <div
            data-tilt="7"
            className="hero-zoom relative mx-auto aspect-[9/14] max-h-[calc(100svh-10rem)] overflow-hidden rounded-[2rem] shadow-2xl ring-1 shadow-black/70 ring-cream/15"
            style={d(0.35)}
          >
            <VideoLoop
              src="/videos/lanches.mp4"
              poster="/videos/lanches-poster.jpg"
              className="absolute inset-0 size-full"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-charcoal/50 via-transparent" />
            <div aria-hidden className="tilt-glare pointer-events-none absolute inset-0" />
          </div>

          {/* O PNG do mascote vem inclinado como no logo; a rotação o nivela na borda do vídeo */}
          <div className="hero-in absolute -bottom-5 -left-12 w-36" style={d(1.2)}>
            <div className="mascot-idle">
              <Image
                src={mascot}
                alt=""
                sizes="144px"
                className="rotate-[11deg] drop-shadow-[0_12px_18px_rgb(0_0_0/0.55)]"
              />
            </div>
          </div>

          {years && (
            <div className="hero-zoom absolute -top-6 -right-8" style={d(1.0)}>
              <div className="stamp-swing grid size-32 rotate-12 place-items-center rounded-full bg-brand-red text-center shadow-xl">
                <p className="font-display leading-none">
                  <span className="block text-5xl">{years}</span>
                  <span className="block text-xs leading-tight tracking-widest">ANOS DE HISTÓRIA</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
