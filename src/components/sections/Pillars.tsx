import Image from "next/image";
import { photos, type Photo } from "@/assets/images";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars: { title: string; text: string; photo: Photo }[] = [
  {
    title: "Lanches caprichados",
    text: "Pão macio, recheio generoso e chapa quente. O clássico que fez a fama da casa.",
    photo: photos.lanchePrato,
  },
  {
    title: "Hot dogs",
    text: "Prensado, com batata palha e molho na medida certa.",
    photo: photos.hotDog,
  },
  {
    title: "Porções pra dividir",
    text: "Petiscos tradicionais pra mesa inteira — e ainda tem pizza artesanal.",
    photo: photos.porcaoFrango,
  },
  {
    title: "Espaço kids",
    text: "Playground pra criançada enquanto a família aproveita sem pressa.",
    photo: photos.salaoPlayground,
  },
];

export function Pillars() {
  return (
    <section id="jeito-gordinho" className="grain relative overflow-hidden bg-charcoal py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Do jeito Gordinho"
          title={
            <>
              Aqui ninguém sai <em>com fome</em>
            </>
          }
          intro="Não é só lanche: é o sabor de sempre, servido com fartura, num lugar onde todo mundo cabe."
        />
      </Container>

      {/* Mobile: carrossel com scroll-snap · Desktop: grade de 4 */}
      <ul className="mt-14 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-8">
        {pillars.map((pillar, i) => (
          <li
            key={pillar.title}
            className="reveal group relative aspect-[3/4] w-[78%] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[45%] lg:w-auto"
            style={delay(i * 120)}
          >
            <Image
              src={pillar.photo.src}
              alt={pillar.photo.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 280px, 80vw"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="font-display text-sm text-brand-red">0{i + 1}</span>
              <h3 className="mt-1 text-2xl">{pillar.title}</h3>
              <p className="mt-2 text-sm text-cream/75 lg:max-h-0 lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-24 lg:group-hover:opacity-100">
                {pillar.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
