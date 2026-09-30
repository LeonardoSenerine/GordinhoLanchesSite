import Image from "next/image";
import { siteConfig, whatsappLink } from "@/config/site";
import { photos } from "@/assets/images";
import { formatHour } from "@/lib/hours";
import { delay } from "@/lib/utils";
import { coverPx, coverVw } from "@/lib/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Destaque do cachorro-quente — pedido do dono: é tão tradicional na casa quanto o lanche.
 * É o único bloco amarelo-mostarda do site (ketchup + mostarda), para não passar batido.
 * Sem ingredientes nem preço (o site não é cardápio).
 */
export function HotDog() {
  const photo = photos.hotDog;
  const { delivery } = siteConfig;

  const points = [
    { title: "Tradicional", text: "Um clássico do Gordinho, feito do mesmo jeito de sempre." },
    { title: "Caprichado", text: "Montado na hora, sem economizar — como tudo por aqui." },
    {
      title: "No salão ou em casa",
      text: `Todos os dias a partir das ${formatHour(siteConfig.hours[0].opens)}, com delivery até ${formatHour(delivery.closes)}.`,
    },
  ];

  const word = (copy?: boolean) => (
    <span aria-hidden={copy} className="flex shrink-0 items-center">
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className="pr-[0.35em]">
          Cachorro-quente ✦
        </span>
      ))}
    </span>
  );

  return (
    <section
      id="cachorro-quente"
      className="relative overflow-hidden bg-brand-mustard py-24 text-charcoal sm:py-36"
    >
      {/* Palavra gigante vazada correndo ao fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-6 overflow-hidden sm:top-10">
        <div
          className="text-outline flex w-max animate-marquee font-display text-[22vw] leading-none whitespace-nowrap uppercase sm:text-[13vw]"
          style={{ animationDuration: "48s" }}
        >
          {word()}
          {word(true)}
        </div>
      </div>

      <Container className="relative grid items-center gap-16 pt-[16vw] sm:pt-[9vw] lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Foto grande, inclinada, reagindo ao mouse */}
        <div className="relative">
          <div data-parallax="0.06">
            <div className="reveal-zoom -rotate-3">
              <div
                data-tilt="9"
                className="relative overflow-hidden rounded-[2rem] border-[10px] border-charcoal shadow-[0_40px_80px_-30px_rgb(14_13_13/0.7)]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  placeholder="blur"
                  quality={90}
                  sizes={`(min-width: 1024px) ${coverPx(photo.src, 620, 5 / 4)}, ${coverVw(photo.src, 100, 5 / 4)}`}
                  className="aspect-[5/4] object-cover"
                />
                <div aria-hidden className="tilt-glare pointer-events-none absolute inset-0" />
              </div>
            </div>
          </div>

          {/* Selo giratório */}
          <div
            aria-hidden
            className="reveal-zoom absolute -top-10 -right-3 size-32 sm:-top-14 sm:-right-8 sm:size-40"
            style={delay(450)}
          >
            <svg viewBox="0 0 200 200" className="spin-slow size-full drop-shadow-xl">
              <circle cx="100" cy="100" r="100" className="fill-brand-red" />
              <defs>
                <path id="hotdog-ring" d="M 100 100 m -72 0 a 72 72 0 1 1 144 0 a 72 72 0 1 1 -144 0" />
              </defs>
              <text
                className="fill-cream font-display uppercase"
                style={{ fontSize: "16px" }}
                // Circunferência do anel ≈ 452: o texto é ajustado para dar exatamente uma volta
                textLength="446"
                lengthAdjust="spacing"
              >
                <textPath href="#hotdog-ring" textLength="446" lengthAdjust="spacing">
                  Clássico da casa ✦ Clássico da casa ✦
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center font-script text-3xl text-cream sm:text-4xl">
              hot dog
            </span>
          </div>
        </div>

        {/* Texto */}
        <div>
          <p className="reveal-write inline-block font-script text-[1.9rem] text-brand-red sm:text-4xl">
            Tão tradicional quanto o lanche
          </p>
          <h2 className="reveal mt-1 text-[2.4rem] leading-[1.02] sm:text-6xl" style={delay(100)}>
            O cachorro-quente <span className="text-brand-red">do Gordinho</span>
            {/* Risco de ketchup que se desenha */}
            <svg
              aria-hidden
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              className="mt-3 block h-4 w-56 sm:w-72"
            >
              <path
                pathLength={1}
                className="squiggle-draw fill-none stroke-brand-red"
                strokeWidth="6"
                strokeLinecap="round"
                d="M4 12 Q 22 -2 40 10 T 76 10 T 112 10 T 148 10 T 184 10 T 220 10 T 256 10 T 296 8"
              />
            </svg>
          </h2>

          <p className="reveal mt-6 text-lg text-charcoal/80 sm:text-xl" style={delay(200)}>
            No Gordinho, cachorro-quente é coisa séria. É tradição da casa, feito com o mesmo capricho e a
            mesma fartura dos lanches que fizeram a fama do lugar.
          </p>
          <p className="reveal mt-4 text-lg text-charcoal/80 sm:text-xl" style={delay(280)}>
            Tem quem venha pelo lanche. E tem quem venha só por ele.
          </p>

          <ol className="mt-9 space-y-4">
            {points.map((p, i) => (
              <li
                key={p.title}
                className="reveal-right flex items-start gap-4 rounded-2xl bg-charcoal/[0.07] p-4 ring-1 ring-charcoal/10"
                style={delay(350 + i * 130)}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-red font-display text-lg text-cream">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl">{p.title}</h3>
                  <p className="text-charcoal/75">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div
            className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            style={delay(750)}
          >
            <ButtonLink href={whatsappLink("Olá!! Gostaria de pedir um cachorro-quente!")} size="lg">
              <WhatsAppIcon className="size-5" /> Pedir meu cachorro-quente
            </ButtonLink>
            <ButtonLink href="#horarios" size="lg" variant="dark">
              Ver horários
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
