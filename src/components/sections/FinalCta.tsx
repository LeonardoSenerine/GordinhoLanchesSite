import Image from "next/image";
import { mapsLink, whatsappLink } from "@/config/site";
import { photos } from "@/assets/images";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Chamada final. Assume a ausência de cardápio no site como posicionamento. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="grain relative overflow-hidden py-24 sm:py-44">
      <div data-parallax="0.15" className="absolute inset-x-0 -inset-y-[20%]">
        <Image
          src={photos.heroBrasa.src}
          alt=""
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(14_13_13/0.55),rgb(14_13_13/0.92))]" />

      <Container className="relative text-center">
        <p className="reveal-write font-script text-4xl text-brand-mustard sm:text-5xl">Bateu a fome?</p>
        <h2 id="cta-title" className="reveal mt-3 text-[2.5rem] text-balance sm:text-7xl" style={delay(150)}>
          O cardápio muda. <span className="text-brand-red">O Gordinho, não.</span>
        </h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-base text-cream/75 sm:text-lg" style={delay(250)}>
          Quer saber o que tem hoje ou fazer um pedido? Fala direto com a gente.
        </p>
        <div
          className="reveal mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          style={delay(350)}
        >
          <ButtonLink href={whatsappLink()} size="lg">
            <WhatsAppIcon className="size-5" /> Fale com a gente
          </ButtonLink>
          <ButtonLink href={mapsLink()} size="lg" variant="light">
            Como chegar
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
