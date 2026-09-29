import type { Metadata } from "next";
import Image from "next/image";
import { whatsappLink } from "@/config/site";
import mascot from "@/assets/brand/mascote.png";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-svh items-center overflow-hidden bg-charcoal pt-20">
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-brand-red/25 blur-[140px]"
      />
      <Container className="relative grid items-center gap-10 py-16 text-center md:grid-cols-[1fr_auto] md:text-left">
        <div>
          <p className="font-script text-[1.75rem] text-brand-mustard sm:text-4xl">Opa, errou a mesa!</p>
          <p aria-hidden className="font-display text-[clamp(6rem,22vw,11rem)] leading-none text-brand-red">
            404
          </p>
          <h1 className="text-[2rem] leading-tight sm:text-5xl">Esse lanche não saiu da chapa</h1>
          <p className="mx-auto mt-5 max-w-md text-base text-cream/70 sm:text-lg md:mx-0">
            A página que você procurou não existe ou mudou de lugar. Mas o Gordinho continua no mesmo capricho
            — é só voltar.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <ButtonLink href="/" size="lg">
              Voltar ao início
            </ButtonLink>
            <ButtonLink href={whatsappLink()} size="lg" variant="outline">
              <WhatsAppIcon className="size-5" /> Chamar no WhatsApp
            </ButtonLink>
          </div>
        </div>

        <Image
          src={mascot}
          alt=""
          sizes="(min-width: 768px) 288px, 192px"
          className="mx-auto w-48 animate-float drop-shadow-[0_20px_30px_rgb(0_0_0/0.6)] md:w-72"
        />
      </Container>
    </section>
  );
}
