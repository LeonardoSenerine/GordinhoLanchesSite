import Image from "next/image";
import { siteConfig, yearsOfHistory } from "@/config/site";
import { photos } from "@/assets/images";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/motion/CountUp";

export function Story() {
  const years = yearsOfHistory();

  const stats = [
    { value: <>{siteConfig.foundedYear}</>, label: "o ano em que tudo começou" },
    ...(years ? [{ value: <CountUp to={years} />, label: "anos de chapa quente" }] : []),
    {
      value: (
        <>
          +<CountUp to={siteConfig.social.instagramFollowers} format="thousands" />
        </>
      ),
      label: "seguidores no Instagram",
    },
  ];

  return (
    <section id="historia" className="relative overflow-hidden bg-cream py-24 text-charcoal sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        {/* Colagem — TODO: trocar por foto antiga (anos 90) + foto atual quando o cliente enviar */}
        <div className="relative pb-16 lg:pb-0">
          <div className="reveal-curtain overflow-hidden rounded-3xl">
            <Image
              src={photos.salaoAmplo.src}
              alt={photos.salaoAmplo.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/3] object-cover"
            />
          </div>
          <div data-parallax="0.1" className="absolute right-4 -bottom-4 w-1/2 sm:-right-6 lg:-bottom-16">
            <div className="reveal-zoom" style={delay(300)}>
              <Image
                src={photos.lanchePrato2.src}
                alt={photos.lanchePrato2.alt}
                placeholder="blur"
                sizes="280px"
                className="aspect-square rotate-3 rounded-2xl border-[6px] border-cream object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* TODO: complementar com a história real (quem fundou, como começou, momentos marcantes) */}
        <div>
          <SectionHeading
            tone="light"
            kicker="Nossa história"
            title={
              <>
                Tradição que passa de <em>geração em geração</em>
              </>
            }
            intro={`Desde ${siteConfig.foundedYear}, o Gordinho é ponto de encontro em Itatiba: sanduíches caseiros, petiscos tradicionais e um ambiente descontraído, onde a família inteira se sente em casa.`}
          />
          {/* [CONFIRMAR] com o cliente — texto de legado, sem fatos específicos */}
          <p className="reveal mt-5 text-lg text-muted" style={delay(300)}>
            Tem gente que vinha criança e hoje traz os filhos. Tem mesa que já viu aniversário, primeiro
            encontro e muita conversa depois do jogo. Muita coisa mudou{years ? ` em ${years} anos` : ""}. O
            capricho, não.
          </p>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-charcoal/10 pt-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="reveal" style={delay(400 + i * 100)}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl text-brand-red sm:text-4xl">{stat.value}</dd>
                <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
