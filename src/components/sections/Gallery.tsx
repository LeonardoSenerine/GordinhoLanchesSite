import Image from "next/image";
import { siteConfig } from "@/config/site";
import { photos } from "@/assets/images";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/icons";

const gallery = [
  photos.burgerMaos,
  photos.lanchePrato2,
  photos.comboLancheDrink,
  photos.porcaoFrango,
  photos.lancheTabua,
  photos.salada,
  photos.lancheTabuaDrink,
  photos.hotDog,
];

export function Gallery() {
  const { instagram, instagramHandle } = siteConfig.social;

  return (
    <section id="galeria" className="grain relative bg-charcoal pt-24 sm:pt-32">
      <Container className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          kicker="Pra dar água na boca"
          title={
            <>
              Direto da <em>nossa chapa</em>
            </>
          }
        />
        <ButtonLink href={instagram} variant="outline" className="reveal">
          <InstagramIcon className="size-4" /> Siga {instagramHandle}
        </ButtonLink>
      </Container>

      <ul className="mt-14 grid grid-cols-2 sm:grid-cols-4">
        {gallery.map((photo, i) => (
          <li key={photo.alt} className="reveal-zoom" style={delay((i % 4) * 80)}>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                placeholder="blur"
                sizes="(min-width: 640px) 25vw, 50vw"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-brand-red/0 transition-colors duration-500 group-hover:bg-brand-red/60">
                <InstagramIcon className="size-10 scale-50 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
