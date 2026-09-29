import Image from "next/image";
import type { CSSProperties } from "react";
import { siteConfig, whatsappLink, yearsOfHistory } from "@/config/site";
import { photos } from "@/assets/images";
import mascot from "@/assets/brand/mascote.png";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { VideoLoop } from "@/components/motion/VideoLoop";

// Salão sem moldura (como no Ponto Alto): some à esquerda e embaixo, fundindo com o fundo escuro
const fadeSalao: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent 0, #000 50%), linear-gradient(to top, transparent 0, #000 30%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0, #000 50%), linear-gradient(to top, transparent 0, #000 30%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

export function Hero() {
  const years = yearsOfHistory();
  const salao = photos.salaoPlayground2;

  return (
    <section id="inicio" className="grain relative isolate overflow-hidden bg-charcoal lg:pt-20">
      {/* ---- Desktop: salão ao fundo, sangrando pela direita, em movimento lento ---- */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] lg:block">
        <Image
          src={salao.src}
          alt=""
          fill
          sizes="60vw"
          className="scale-110 object-cover opacity-20 blur-[80px] brightness-50 saturate-150"
        />
        <div data-parallax="0.08" className="absolute inset-0 overflow-hidden" style={fadeSalao}>
          <Image
            src={salao.src}
            alt=""
            fill
            priority
            quality={85}
            sizes="58vw"
            className="animate-kenburns object-cover object-[60%_45%] brightness-[.4] contrast-[1.1] saturate-[1.1]"
          />
        </div>
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

      {/* Brilho vermelho (desktop) */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 -z-10 hidden size-[42rem] rounded-full bg-brand-red/25 blur-[140px] lg:block"
      />

      <Container className="relative grid min-h-svh items-end gap-14 pt-28 pb-12 sm:pb-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
        {/* ---- Texto ---- */}
        <div>
          <p
            className="reveal text-xs font-bold tracking-[0.25em] text-brand-mustard uppercase sm:text-sm"
            style={delay(100)}
          >
            {siteConfig.name} · {siteConfig.category} · {siteConfig.city}, {siteConfig.state}
          </p>

          <h1 className="mt-4 [text-shadow:0_6px_40px_rgb(0_0_0/0.55)]">
            <span className="sr-only">{siteConfig.name} — </span>
            <span
              className="reveal block text-[clamp(2.6rem,11vw,5rem)] leading-[0.95] whitespace-nowrap"
              style={delay(200)}
            >
              Desde {siteConfig.foundedYear}.
            </span>
            <span
              className="reveal mt-2 block text-[1.7rem] leading-[1.05] text-brand-red sm:text-[2rem]"
              style={delay(320)}
            >
              Sem economizar <br className="lg:hidden" />
              no sabor.
            </span>
          </h1>

          <p className="reveal mt-6 max-w-lg text-base text-cream/80 sm:text-lg" style={delay(450)}>
            {years ? `Há ${years} anos` : "Há décadas"} fazendo parte das noites de {siteConfig.city}, com
            lanche caprichado, família reunida e aquele sabor que continua o mesmo.
          </p>

          <div
            className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            style={delay(580)}
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
            data-parallax="0.05"
            className="reveal-zoom relative mx-auto aspect-[9/14] max-h-[calc(100svh-10rem)] overflow-hidden rounded-[2rem] shadow-2xl ring-1 shadow-black/70 ring-cream/15"
            style={delay(200)}
          >
            <VideoLoop
              src="/videos/lanches.mp4"
              poster="/videos/lanches-poster.jpg"
              className="absolute inset-0 size-full"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-charcoal/50 via-transparent" />
          </div>

          {/* O PNG do mascote vem inclinado como no logo; a rotação o nivela na borda do vídeo */}
          <div className="reveal-zoom absolute bottom-0 -left-12 w-36 translate-y-[14%]" style={delay(700)}>
            <Image
              src={mascot}
              alt=""
              sizes="144px"
              className="rotate-[11deg] drop-shadow-[0_12px_18px_rgb(0_0_0/0.55)]"
            />
          </div>

          {years && (
            <div
              className="reveal-zoom absolute -top-6 -right-8 grid size-32 rotate-12 place-items-center rounded-full bg-brand-red text-center shadow-xl"
              style={delay(800)}
            >
              <p className="font-display leading-none">
                <span className="block text-5xl">{years}</span>
                <span className="block text-xs leading-tight tracking-widest">ANOS DE HISTÓRIA</span>
              </p>
            </div>
          )}
        </div>
      </Container>

      {/* Chamada para rolar (desktop) */}
      <a
        href="#historia"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.7rem] font-bold tracking-[0.3em] whitespace-nowrap text-cream/70 uppercase transition-colors before:h-px before:w-10 before:bg-cream/25 after:h-px after:w-10 after:bg-cream/25 hover:text-brand-mustard lg:inline-flex"
      >
        <span className="animate-nudge text-brand-red">↓</span> Conheça nossa história
      </a>
    </section>
  );
}
