import Image from "next/image";
import { siteConfig } from "@/config/site";
import { photos, type Photo } from "@/assets/images";
import mascot from "@/assets/brand/mascote.png";
import { cn, delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/icons";
import { StoriesViewer, type Story } from "@/components/motion/StoriesViewer";

// "O Gordinho acontecendo" — momentos, não catálogo de produtos
const stories: Story[] = [
  {
    kind: "video",
    src: "/videos/lanches.mp4",
    poster: "/videos/lanches-poster.jpg",
    kicker: "na chapa",
    title: "Direto da brasa, feito na hora",
    duration: 7000,
  },
  {
    kind: "image",
    src: photos.burgerMaos.src,
    alt: photos.burgerMaos.alt,
    kicker: "na mão",
    title: "Aqui recheio não é detalhe",
  },
  {
    kind: "image",
    src: photos.equipeBalcao.src,
    alt: photos.equipeBalcao.alt,
    kicker: "nos bastidores",
    title: "Quem faz o Gordinho acontecer",
  },
  {
    kind: "image",
    src: photos.salaoPlayground2.src,
    alt: photos.salaoPlayground2.alt,
    kicker: "no salão",
    title: "Criança brinca, família aproveita",
  },
  {
    kind: "image",
    src: photos.comboLancheDrink.src,
    alt: photos.comboLancheDrink.alt,
    kicker: "na mesa",
    title: "Do jeito que Itatiba gosta",
  },
];

// Faixas de fotos em movimento (sentidos opostos)
const rowA: Photo[] = [
  photos.lanchePrato,
  photos.porcaoFrango,
  photos.salaoVertical,
  photos.lancheQueijo,
  photos.hotDog,
  photos.salada,
];
const rowB: Photo[] = [
  photos.lancheTabuaDrink,
  photos.heroBrasa,
  photos.lanchePrato2,
  photos.salaoAmplo,
  photos.lancheTabua,
  photos.burgerMaos,
];

function PhotoRow({ items, reverse }: { items: Photo[]; reverse?: boolean }) {
  const { instagram } = siteConfig.social;
  // Trilha duplicada para o loop não ter emenda; a cópia fica fora da árvore de acessibilidade
  const track = (copy?: boolean) => (
    <ul aria-hidden={copy} className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4">
      {items.map((photo) => (
        <li key={photo.alt} className="shrink-0">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={copy ? -1 : undefined}
            className="group relative block h-44 w-36 overflow-hidden rounded-2xl sm:h-64 sm:w-52"
          >
            <Image
              src={photo.src}
              alt={copy ? "" : photo.alt}
              fill
              sizes="(min-width: 640px) 208px, 144px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-0 grid place-items-center bg-brand-red/0 transition-colors duration-500 group-hover:bg-brand-red/60">
              <InstagramIcon className="size-8 scale-50 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden">
      <div
        className={cn("marquee-track flex w-max", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ animationDuration: "60s" }}
      >
        {track()}
        {track(true)}
      </div>
    </div>
  );
}

export function Gallery() {
  const { instagram, instagramHandle } = siteConfig.social;

  return (
    <section id="de-perto" className="grain relative overflow-hidden bg-charcoal py-20 sm:py-32">
      {/* Brilho vermelho atrás do viewer */}
      <div
        aria-hidden
        className="absolute top-1/4 right-0 size-[34rem] translate-x-1/3 rounded-full bg-brand-red/20 blur-[140px]"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_22rem] lg:gap-20">
        <div>
          <SectionHeading
            kicker={instagramHandle}
            title={
              <>
                O Gordinho <em>de perto</em>
              </>
            }
            intro="O que acontece na chapa, na mesa e nos bastidores — todo dia. Toque nos lados do story para navegar."
          />
          <ul className="reveal mt-8 flex flex-wrap gap-2" style={delay(250)}>
            {stories.map((s) => (
              <li
                key={s.kicker}
                className="rounded-full border border-cream/15 px-4 py-1.5 font-script text-xl text-cream/80"
              >
                {s.kicker}
              </li>
            ))}
          </ul>
          <ButtonLink href={instagram} className="reveal mt-10" style={delay(350)}>
            <InstagramIcon className="size-4" /> Ver no Instagram
          </ButtonLink>
        </div>

        <div className="reveal-zoom mx-auto w-full max-w-[20rem] sm:max-w-[22rem]" style={delay(200)}>
          <StoriesViewer stories={stories} handle={instagramHandle} avatar={mascot} />
        </div>
      </Container>

      {/* Faixas de fotos em movimento; param no hover */}
      <div className="relative -mx-[5%] mt-16 -rotate-2 space-y-3 sm:mt-24 sm:space-y-4">
        <PhotoRow items={rowA} />
        <PhotoRow items={rowB} reverse />
      </div>
    </section>
  );
}
