import Image from "next/image";
import { siteConfig, whatsappLink, yearsOfHistory } from "@/config/site";
import mascot from "@/assets/brand/mascote.png";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/brand/Logo";
import { VideoLoop } from "@/components/motion/VideoLoop";

export function Hero() {
  const years = yearsOfHistory();

  return (
    <section id="inicio" className="grain relative overflow-hidden bg-charcoal pt-20">
      {/* Brilho vermelho de fundo */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 size-[32rem] rounded-full bg-brand-red/25 blur-[120px] sm:size-[42rem] sm:blur-[140px]"
      />

      <Container className="relative grid items-center gap-12 py-10 sm:gap-14 sm:py-12 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <Logo className="reveal-zoom w-full max-w-[13rem] sm:max-w-[19rem]" />

          <h1
            className="reveal mt-6 text-[2.75rem] leading-[0.95] sm:mt-8 sm:text-6xl xl:text-7xl"
            style={delay(200)}
          >
            <span className="sr-only">{siteConfig.name} — </span>
            Desde {siteConfig.foundedYear}.
            <span className="mt-2 block text-[1.7rem] leading-[1.05] text-brand-red sm:text-4xl xl:text-5xl">
              Sem economizar no sabor.
            </span>
          </h1>
          <p className="reveal mt-5 max-w-lg text-base text-cream/75 sm:mt-6 sm:text-lg" style={delay(350)}>
            {years ? `Há ${years} anos` : "Há décadas"} fazendo parte das noites de {siteConfig.city}, com
            lanche caprichado, família reunida e aquele sabor que continua o mesmo.
          </p>
          <div
            className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            style={delay(500)}
          >
            <ButtonLink href="#historia" size="lg">
              Conheça o Gordinho
            </ButtonLink>
            <ButtonLink href={whatsappLink()} size="lg" variant="outline">
              <WhatsAppIcon className="size-5" /> Chamar no WhatsApp
            </ButtonLink>
          </div>
        </div>

        {/* Coluna visual: vídeo vertical + mascote sentado na borda + selo */}
        <div className="relative mx-auto mb-6 w-full max-w-[17rem] sm:max-w-sm lg:mb-0 lg:max-w-md">
          <div
            data-parallax="0.05"
            className="reveal-zoom relative mx-auto aspect-[9/14] max-h-[calc(100svh-9rem)] overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 shadow-black/60 ring-cream/10 sm:rounded-[2rem]"
            style={delay(200)}
          >
            <VideoLoop
              src="/videos/lanches.mp4"
              poster="/videos/lanches-poster.jpg"
              className="absolute inset-0 size-full"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-charcoal/50 via-transparent" />
          </div>

          {/* Mascote: o PNG vem inclinado como no logo; a rotação o nivela na borda do vídeo */}
          <div
            className="reveal-zoom absolute bottom-0 -left-5 w-24 translate-y-[14%] sm:-left-12 sm:w-36"
            style={delay(700)}
          >
            <Image
              src={mascot}
              alt=""
              sizes="144px"
              className="rotate-[11deg] drop-shadow-[0_12px_18px_rgb(0_0_0/0.55)]"
            />
          </div>

          {years && (
            <div
              className="reveal-zoom absolute -top-5 -right-4 grid size-24 rotate-12 place-items-center rounded-full bg-brand-red text-center shadow-xl sm:-top-6 sm:-right-8 sm:size-32"
              style={delay(800)}
            >
              <p className="font-display leading-none">
                <span className="block text-3xl sm:text-5xl">{years}</span>
                <span className="block text-[0.6rem] leading-tight tracking-widest sm:text-xs">
                  ANOS DE HISTÓRIA
                </span>
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
