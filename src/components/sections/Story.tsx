import Image from "next/image";
import { siteConfig, yearsOfHistory } from "@/config/site";
import { photos } from "@/assets/images";
import { historyClosing, milestones } from "@/data/history";
import { cn, delay } from "@/lib/utils";
import { formatHour } from "@/lib/hours";
import { coverPx, coverVw } from "@/lib/image";
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

  // O mural termina em 2016; "Hoje" usa só o que já sabemos do endereço e do horário atuais
  const timeline = [
    ...milestones,
    {
      year: "Hoje",
      title: "A história continua",
      text: `Estamos no ${siteConfig.address.complement}, com salão amplo, espaço kids e estacionamento na porta.`,
      detail: `E a vontade é a mesma de ${siteConfig.foundedYear}: lanche caprichado, casa cheia e a porta aberta toda noite, a partir das ${formatHour(siteConfig.hours[0].opens)}.`,
    },
  ];

  return (
    <section id="historia" className="relative overflow-hidden bg-cream py-20 text-charcoal sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        {/* Colagem — TODO: trocar por foto antiga (kombi, carrinho, barraca) quando o cliente enviar */}
        <div className="relative pb-16 lg:pb-0">
          <div className="reveal-curtain overflow-hidden rounded-3xl">
            <Image
              src={photos.equipeBalcao.src}
              alt={photos.equipeBalcao.alt}
              placeholder="blur"
              quality={90}
              sizes={`(min-width: 1024px) ${coverPx(photos.equipeBalcao.src, 560, 4 / 3)}, ${coverVw(photos.equipeBalcao.src, 100, 4 / 3)}`}
              className="aspect-[4/3] object-cover"
            />
          </div>
          <div data-parallax="0.1" className="absolute right-4 -bottom-4 w-1/2 sm:-right-6 lg:-bottom-16">
            <div className="reveal-zoom" style={delay(300)}>
              <Image
                src={photos.lanchePrato2.src}
                alt={photos.lanchePrato2.alt}
                placeholder="blur"
                sizes={coverPx(photos.lanchePrato2.src, 280, 1)}
                className="aspect-square rotate-3 rounded-2xl border-[6px] border-cream object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            tone="light"
            kicker="Nossa história"
            title={
              <>
                De uma kombinha a <em>uma casa cheia</em>
              </>
            }
            intro={`Em ${siteConfig.foundedYear}, o Gordinho era uma kombi estacionada no canteiro central e um carrinho que nem rodinha tinha. O que veio depois foi construído aos poucos — carrinho, barraca, muros, janelas — com perseverança, tribulação e paciência.`}
          />

          <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-charcoal/10 pt-8 sm:mt-12 sm:gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="reveal" style={delay(300 + i * 100)}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[1.35rem] whitespace-nowrap text-brand-red sm:text-4xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/* ---------- A trajetória (texto do mural da lanchonete) ---------- */}
      <Container className="mt-24 sm:mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal-write inline-block font-script text-[1.75rem] text-brand-red sm:text-4xl">
            ano a ano
          </p>
          <h3 className="reveal text-[1.75rem] sm:text-4xl" style={delay(100)}>
            A trajetória do Gordinho
          </h3>
          <p className="reveal mt-5 text-base text-muted sm:text-lg" style={delay(200)}>
            Da rua ao salão, foram {years ?? "muitos"} anos e seis paradas pelo caminho. A história abaixo é a
            mesma que está pintada no mural da nossa parede — contada por quem viveu cada uma delas.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Linha do tempo: à esquerda no celular, no centro no desktop; desenha-se ao entrar na tela */}
          <div aria-hidden className="reveal absolute inset-y-0 left-[1.15rem] w-1 md:left-1/2 md:-ml-0.5">
            <span className="block size-full rounded-full bg-charcoal/10" />
            <span className="line-draw-y absolute inset-0 origin-top rounded-full bg-brand-red" />
          </div>

          <ol>
            {timeline.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={m.year}
                  className={cn(
                    "relative pb-12 pl-14 last:pb-0 md:w-1/2 md:pb-16 md:pl-0",
                    right ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right",
                  )}
                >
                  {/* Marcador na linha */}
                  <span
                    aria-hidden
                    className={cn(
                      "reveal absolute top-2 left-[0.4rem] md:left-auto",
                      right ? "md:-left-3" : "md:-right-3",
                    )}
                  >
                    <span className="dot-pop block size-6 rounded-full border-4 border-cream bg-brand-red shadow" />
                  </span>
                  <div className={right ? "reveal-right" : "reveal-left"}>
                    <p className="font-display text-5xl leading-none text-brand-red sm:text-6xl">{m.year}</p>
                    <h4 className="mt-2 font-display text-xl uppercase sm:text-2xl">{m.title}</h4>
                    {/* Frase do mural em destaque; em seguida, o nosso texto de apoio */}
                    <p className="mt-3 text-base font-medium text-charcoal sm:text-lg">{m.text}</p>
                    <p className="mt-2 text-sm text-muted sm:text-base">{m.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Fecho do mural */}
        <blockquote className="reveal mx-auto mt-16 max-w-3xl rounded-3xl bg-charcoal px-6 py-10 text-center text-cream sm:mt-20 sm:px-12 sm:py-14">
          <p className="font-script text-3xl leading-snug text-brand-mustard sm:text-4xl">
            “{historyClosing}”
          </p>
          <footer className="mt-4 text-xs font-bold tracking-[0.25em] text-cream/60 uppercase">
            Do mural da nossa lanchonete
          </footer>
        </blockquote>
      </Container>
    </section>
  );
}
