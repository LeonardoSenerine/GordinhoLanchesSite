import Image from "next/image";
import { photos, type Photo } from "@/assets/images";
import { delay } from "@/lib/utils";
import { coverPx, coverVw } from "@/lib/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// O que torna o Gordinho diferente — valores, não produtos.
const pillars: { title: string; text: string; photo: Photo }[] = [
  {
    title: "Fartura",
    text: "Aqui recheio não é detalhe.",
    photo: photos.lanchePrato,
  },
  {
    title: "Chapa",
    text: "O lanche sai quente, feito na hora.",
    photo: photos.lancheTabua,
  },
  {
    title: "Família",
    text: "Criança brinca. Adulto conversa. Todo mundo come.",
    photo: photos.salaoPlayground,
  },
  {
    title: "Tradição",
    text: "O sabor que atravessou gerações.",
    photo: photos.lanchePrato2,
  },
];

export function Pillars() {
  return (
    <section id="jeito-gordinho" className="grain relative overflow-hidden bg-charcoal py-20 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Do jeito Gordinho"
          title={
            <>
              Aqui ninguém sai <em>com fome</em>
            </>
          }
          intro="Não é sobre um lanche específico. É sobre o jeito de fazer que Itatiba reconhece de longe."
        />
      </Container>

      <p
        aria-hidden
        className="mt-10 flex items-center gap-2 px-4 text-xs font-bold tracking-[0.2em] text-cream/50 uppercase sm:hidden"
      >
        Arraste para o lado <span className="animate-pulse">→</span>
      </p>

      {/* Mobile: carrossel com scroll-snap · Desktop: grade de 4 */}
      <ul className="mt-4 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-4 pb-4 sm:mt-14 sm:px-6 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-8">
        {pillars.map((pillar, i) => (
          <li
            key={pillar.title}
            data-tilt="10"
            className="reveal group relative aspect-[3/4] w-[78%] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[45%] lg:w-auto"
            style={delay(i * 120)}
          >
            <Image
              src={pillar.photo.src}
              alt={pillar.photo.alt}
              placeholder="blur"
              quality={85}
              sizes={`(min-width: 1024px) ${coverPx(pillar.photo.src, 260, 3 / 4)}, (min-width: 640px) ${coverVw(pillar.photo.src, 45, 3 / 4)}, ${coverVw(pillar.photo.src, 78, 3 / 4)}`}
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/45 to-transparent" />
            <div aria-hidden className="tilt-glare pointer-events-none absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="font-display text-sm text-brand-red">0{i + 1}</span>
              <h3 className="mt-1 text-3xl">{pillar.title}</h3>
              <p className="mt-2 font-script text-2xl leading-tight text-brand-mustard">{pillar.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
