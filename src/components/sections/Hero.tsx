import Image from "next/image";
import { siteConfig, whatsappLink, yearsOfHistory } from "@/config/site";
import { photos } from "@/assets/images";
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
        className="absolute -top-40 -left-40 size-[42rem] rounded-full bg-brand-red/25 blur-[140px]"
      />

      <Container className="relative grid min-h-[calc(100svh-5rem)] items-center gap-14 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <Logo className="reveal-zoom w-full max-w-[16rem] sm:max-w-[19rem]" />

          <h1 className="reveal mt-8 text-5xl leading-[0.95] sm:text-6xl xl:text-7xl" style={delay(200)}>
            <span className="sr-only">{siteConfig.name} — </span>
            Desde {siteConfig.foundedYear}.
            <span className="mt-2 block text-3xl text-brand-red sm:text-4xl xl:text-5xl">
              Sem economizar no sabor.
            </span>
          </h1>
          <p className="reveal mt-6 max-w-lg text-lg text-cream/75" style={delay(350)}>
            {years ? `Há ${years} anos` : "Há décadas"} fazendo parte das noites de {siteConfig.city}, com
            lanche caprichado, família reunida e aquele sabor que continua o mesmo.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-4" style={delay(500)}>
            <ButtonLink href="#historia" size="lg">
              Conheça o Gordinho
            </ButtonLink>
            <ButtonLink href={whatsappLink()} size="lg" variant="outline">
              <WhatsAppIcon className="size-5" /> Chamar no WhatsApp
            </ButtonLink>
          </div>
        </div>

        {/* Coluna visual: vídeo vertical + foto flutuante + selo */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div
            data-parallax="0.05"
            className="reveal-zoom relative mx-auto aspect-[9/14] max-h-[calc(100svh-9rem)] overflow-hidden rounded-[2rem] shadow-2xl ring-1 shadow-black/60 ring-cream/10"
            style={delay(200)}
          >
            <VideoLoop
              src="/videos/lanches.mp4"
              poster={photos.burgerMaos.src.src}
              start={5}
              end={16}
              className="absolute inset-0 size-full"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-charcoal/50 via-transparent" />
          </div>

          <div data-parallax="0.14" className="absolute -bottom-8 -left-6 w-40 sm:-left-16 sm:w-52">
            <div className="reveal-zoom animate-float" style={delay(600)}>
              <Image
                src={photos.lancheQueijo.src}
                alt={photos.lancheQueijo.alt}
                placeholder="blur"
                sizes="208px"
                className="aspect-square -rotate-6 rounded-2xl border-4 border-cream object-cover shadow-xl"
              />
            </div>
          </div>

          {years && (
            <div
              className="reveal-zoom absolute -top-6 -right-3 grid size-28 rotate-12 place-items-center rounded-full bg-brand-red text-center shadow-xl sm:-right-8 sm:size-32"
              style={delay(800)}
            >
              <p className="font-display leading-none">
                <span className="block text-4xl sm:text-5xl">{years}</span>
                <span className="block text-[0.65rem] leading-tight tracking-widest sm:text-xs">ANOS DE HISTÓRIA</span>
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
