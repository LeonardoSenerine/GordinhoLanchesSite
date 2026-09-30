import Image from "next/image";
import { whatsappLink } from "@/config/site";
import { photos } from "@/assets/images";
import { delay } from "@/lib/utils";
import { coverPx, coverVw } from "@/lib/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Destaque do cachorro-quente — pedido do dono: é tão tradicional na casa quanto o lanche.
 * Sem ingredientes nem preço (o site não é cardápio).
 */
export function HotDog() {
  const photo = photos.hotDog;

  return (
    <section id="cachorro-quente" className="grain relative overflow-hidden bg-ink py-20 sm:py-32">
      <div
        aria-hidden
        className="absolute top-1/2 -right-40 size-[36rem] -translate-y-1/2 rounded-full bg-brand-mustard/10 blur-[140px]"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="relative">
          <div aria-hidden className="absolute -inset-3 -rotate-2 rounded-[2rem] bg-brand-red sm:-inset-4" />
          <div className="reveal-curtain relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={photo.src}
              alt={photo.alt}
              placeholder="blur"
              quality={85}
              sizes={`(min-width: 1024px) ${coverPx(photo.src, 600, 4 / 3)}, ${coverVw(photo.src, 100, 4 / 3)}`}
              className="aspect-[4/3] object-cover"
            />
          </div>
          <p
            aria-hidden
            className="reveal-zoom absolute -top-6 -right-2 grid size-28 rotate-12 place-items-center rounded-full bg-brand-mustard text-center font-display text-sm leading-tight text-charcoal uppercase shadow-xl sm:-right-6 sm:size-32 sm:text-base"
            style={delay(500)}
          >
            Clássico
            <br />
            da casa
          </p>
        </div>

        <div>
          <SectionHeading
            kicker="Tão tradicional quanto o lanche"
            title={
              <>
                O cachorro-quente <em>do Gordinho</em>
              </>
            }
            intro="No Gordinho, cachorro-quente é coisa séria: tradição da casa, feito com o mesmo capricho e a mesma fartura dos lanches."
          />
          <ButtonLink
            href={whatsappLink("Olá!! Gostaria de pedir um cachorro-quente!")}
            size="lg"
            className="reveal mt-9"
            style={delay(350)}
          >
            <WhatsAppIcon className="size-5" /> Pedir no WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
