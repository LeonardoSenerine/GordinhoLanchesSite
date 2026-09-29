import Image from "next/image";
import type { CSSProperties } from "react";
import { siteConfig, whatsappLink, yearsOfHistory } from "@/config/site";
import { photos } from "@/assets/images";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

// Foto sem moldura (como no Ponto Alto): some à esquerda e embaixo, fundindo com o fundo escuro
const fadeDesktop: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent 0, #000 50%), linear-gradient(to top, transparent 0, #000 30%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0, #000 50%), linear-gradient(to top, transparent 0, #000 30%)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};
// No celular a foto vira fundo, sumindo para baixo onde fica o texto
const fadeMobile: CSSProperties = {
  maskImage: "linear-gradient(to top, transparent 15%, #000 70%)",
  WebkitMaskImage: "linear-gradient(to top, transparent 15%, #000 70%)",
};

export function Hero() {
  const years = yearsOfHistory();
  const salao = photos.salaoPlayground2;

  return (
    <section
      id="inicio"
      className="grain relative isolate flex min-h-svh items-center overflow-hidden bg-charcoal"
    >
      {/* ---- Fundo: o salão ---- */}
      {/* Desktop: ~52% à direita, sangrando, com a luz "vazando" (cópia desfocada) */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-[54%] lg:block">
        <Image
          src={salao.src}
          alt=""
          fill
          sizes="60vw"
          className="scale-110 object-cover opacity-20 blur-[80px] brightness-50 saturate-150"
        />
        <div data-parallax="0.08" className="absolute inset-0 overflow-hidden" style={fadeDesktop}>
          <Image
            src={salao.src}
            alt=""
            fill
            priority
            quality={85}
            sizes="54vw"
            className="animate-kenburns object-cover object-[60%_45%] brightness-[.45] contrast-[1.1] saturate-[1.1]"
          />
        </div>
      </div>

      {/* Mobile/tablet: salão como fundo escurecido */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden lg:hidden" style={fadeMobile}>
        <Image
          src={salao.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover object-[55%_50%] opacity-30 brightness-75"
        />
      </div>

      {/* Brilho vermelho */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 -z-10 size-[30rem] rounded-full bg-brand-red/25 blur-[130px] sm:size-[42rem]"
      />

      {/* ---- Texto ---- */}
      <Container className="relative pt-32 pb-28 sm:pt-36 lg:py-32">
        <div className="max-w-3xl">
          <p
            className="reveal text-xs font-bold tracking-[0.25em] text-brand-mustard uppercase sm:text-sm"
            style={delay(100)}
          >
            {siteConfig.name} · {siteConfig.category} · {siteConfig.city}, {siteConfig.state}
          </p>

          <h1 className="mt-5 [text-shadow:0_6px_40px_rgb(0_0_0/0.55)]">
            <span className="sr-only">{siteConfig.name} — </span>
            <span className="reveal block text-[clamp(2.6rem,12vw,7rem)] whitespace-nowrap leading-[0.9]" style={delay(200)}>
              Desde {siteConfig.foundedYear}.
            </span>
            <span
              className="reveal mt-3 block text-[clamp(1.9rem,5.6vw,4.4rem)] leading-[1] text-brand-red"
              style={delay(320)}
            >
              Sem economizar
              <br />
              no sabor.
            </span>
          </h1>

          <p
            className="reveal mt-7 max-w-xl text-base text-cream/80 sm:text-lg lg:text-xl"
            style={delay(450)}
          >
            {years ? `Há ${years} anos` : "Há décadas"} fazendo parte das noites de {siteConfig.city}, com
            lanche caprichado, família reunida e aquele sabor que continua o mesmo.
          </p>

          <div
            className="reveal mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
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
      </Container>

      {/* Selo sobre a foto (desktop), como o "Casa cheia." do Ponto Alto */}
      <p
        aria-hidden
        className="reveal absolute right-[6%] bottom-28 hidden text-right leading-[0.92] uppercase [text-shadow:0_4px_30px_rgb(0_0_0/0.7)] lg:block"
        style={delay(800)}
      >
        <span className="block font-display text-[clamp(2.5rem,4vw,4rem)]">Família reunida.</span>
        <span className="mt-2 block text-xs font-bold tracking-[0.3em] text-brand-mustard">
          {years ? `há ${years} anos em ${siteConfig.city}` : `em ${siteConfig.city}`}
        </span>
      </p>

      {/* Chamada para rolar */}
      <a
        href="#historia"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.7rem] font-bold tracking-[0.3em] whitespace-nowrap text-cream/75 uppercase transition-colors before:h-px before:w-10 before:bg-cream/25 after:h-px after:w-10 after:bg-cream/25 hover:text-brand-mustard sm:inline-flex"
      >
        <span className="animate-nudge text-brand-red">↓</span> Conheça nossa história
      </a>
    </section>
  );
}
