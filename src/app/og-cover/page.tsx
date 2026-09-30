import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { siteConfig, yearsOfHistory } from "@/config/site";
import { photos } from "@/assets/images";
import { Logo } from "@/components/brand/Logo";

/*
 * Arte da capa de compartilhamento (Open Graph), 1200x630.
 * Só existe em desenvolvimento: `npm run og` abre esta página no Edge headless
 * e salva a captura em src/app/opengraph-image.jpg e twitter-image.jpg.
 */
export const metadata: Metadata = {
  title: "Capa de compartilhamento",
  robots: { index: false, follow: false },
};

export default function OgCover() {
  if (process.env.NODE_ENV === "production") notFound();
  const years = yearsOfHistory();

  return (
    // Cobre header/rodapé do layout raiz: a captura pega só este quadro de 1200x630
    <div className="fixed inset-0 z-[100] bg-charcoal">
      <div id="og" className="relative h-[630px] w-[1200px] overflow-hidden bg-charcoal">
        {/* Foto à direita, fundindo com o painel escuro */}
        <div className="absolute inset-y-0 right-0 w-[560px]">
          <Image
            src={photos.burgerMaos.src}
            alt=""
            fill
            priority
            quality={95}
            sizes="560px"
            className="object-cover object-[50%_45%]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/30 via-25% to-transparent" />
        </div>

        {/* Brilho vermelho */}
        <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-brand-red/30 blur-[120px]" />

        {/* Painel de texto */}
        <div className="relative flex h-full w-[720px] flex-col justify-center pl-[72px]">
          <Logo className="w-[250px]" />
          <p className="mt-6 font-display text-[92px] leading-[0.95] uppercase">
            Desde {siteConfig.foundedYear}.
          </p>
          <p className="mt-2 font-display text-[37px] leading-[1.05] whitespace-nowrap text-brand-red uppercase">
            Sem economizar no sabor.
          </p>
          <p className="mt-5 font-script text-[40px] leading-none text-brand-mustard">
            Lanche de verdade, família reunida.
          </p>
          <p className="mt-7 text-[22px] font-bold tracking-[0.12em] text-cream/85 uppercase">
            Lanches · Cachorro-quente · {siteConfig.city}/{siteConfig.state}
          </p>
        </div>

        {/* Selo de anos */}
        {years && (
          <div className="absolute top-[42px] right-[48px] grid size-[150px] rotate-12 place-items-center rounded-full bg-brand-red text-center shadow-2xl ring-8 ring-charcoal/40">
            <p className="font-display leading-none">
              <span className="block text-[64px]">{years}</span>
              <span className="block text-[15px] leading-tight tracking-widest">
                ANOS DE
                <br />
                HISTÓRIA
              </span>
            </p>
          </div>
        )}

        {/* Faixa vermelha no rodapé, como nos outros projetos */}
        <div className="absolute inset-x-0 bottom-0 h-[14px] bg-brand-red" />
      </div>
    </div>
  );
}
