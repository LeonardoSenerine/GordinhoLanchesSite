import Image from "next/image";
import { photos } from "@/assets/images";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

/** Faixa de respiro com foto em parallax e frase de marca. */
export function ImageBand() {
  return (
    <section aria-label="O segredo do Gordinho" className="relative h-[70svh] min-h-[28rem] overflow-hidden">
      <div data-parallax="0.18" className="absolute inset-x-0 -inset-y-[15%]">
        <Image
          src={photos.lancheQueijo.src}
          alt=""
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(14_13_13/0.35),rgb(14_13_13/0.85))]" />

      <Container className="relative flex h-full flex-col items-center justify-center text-center">
        <p className="reveal-write font-script text-4xl text-brand-mustard sm:text-5xl">o segredo?</p>
        <p
          className="reveal mt-2 max-w-3xl font-display text-4xl text-balance uppercase sm:text-6xl"
          style={delay(200)}
        >
          Capricho em <span className="text-brand-red">cada mordida.</span>
        </p>
      </Container>
    </section>
  );
}
