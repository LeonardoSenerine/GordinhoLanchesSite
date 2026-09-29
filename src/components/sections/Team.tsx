import Image from "next/image";
import { photos, type Photo } from "@/assets/images";
import { team } from "@/data/people";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Os três momentos do trabalho — sem afirmar fatos específicos da operação
const craft: { label: string; text: string; photo: Photo }[] = [
  { label: "Na brasa", text: "O fogo que dá o sabor de sempre.", photo: photos.burgerMaos },
  { label: "Na chapa", text: "Lanche montado na hora, do jeito certo.", photo: photos.lancheTabua },
  {
    label: "No balcão",
    text: "Atendimento de quem recebe como se fosse em casa.",
    photo: photos.comboLancheDrink,
  },
];

/** Quem faz o Gordinho: bastidores e equipe. Os nomes só aparecem quando preenchidos em data/people.ts. */
export function Team() {
  return (
    <section id="quem-faz" className="relative overflow-hidden bg-cream text-charcoal">
      <Container className="relative grid items-center gap-14 py-20 sm:py-32 lg:grid-cols-2 lg:gap-16">
        {/*
          Foto emoldurada na proporção original (paisagem): a cena inteira — faíscas + chapeiro —
          sem zoom. Esta foto é a versão de 1600px do WhatsApp; ampliada/sangrada ela granula.
        */}
        <div className="relative">
          <div aria-hidden className="absolute -inset-3 rotate-2 rounded-[2rem] bg-charcoal sm:-inset-4" />
          <div className="reveal-curtain relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={photos.heroBrasa.src}
              alt={photos.heroBrasa.alt}
              placeholder="blur"
              quality={90}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[3/2] object-cover"
            />
          </div>
          <p
            aria-hidden
            className="reveal-zoom absolute -right-3 -bottom-8 grid size-28 -rotate-12 place-items-center rounded-full bg-brand-red text-center font-display text-sm leading-tight text-cream uppercase shadow-xl sm:-right-6 sm:size-32 sm:text-base"
            style={delay(500)}
          >
            Feito
            <br />
            na hora
          </p>
        </div>

        <div className="lg:py-8">
          <SectionHeading
            tone="light"
            kicker="Quem faz o Gordinho"
            title={
              <>
                Gente que põe a <em>mão na massa</em>
              </>
            }
            intro="Por trás de cada lanche tem gente acendendo a brasa, cuidando da chapa e recebendo cada cliente como se fosse de casa."
          />

          <blockquote
            className="reveal mt-8 border-l-4 border-brand-red pl-5 font-script text-[1.7rem] leading-snug text-charcoal sm:text-3xl"
            style={delay(250)}
          >
            Tem gente que faz lanche. E tem gente que faz o Gordinho.
          </blockquote>

          <ol className="mt-10 space-y-4">
            {craft.map((item, i) => (
              <li
                key={item.label}
                className="reveal group flex items-center gap-4 rounded-2xl bg-cream-dark/70 p-3 pr-5 ring-1 ring-charcoal/5 transition-colors hover:bg-cream-dark"
                style={delay(350 + i * 100)}
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl sm:size-20">
                  <Image
                    src={item.photo.src}
                    alt=""
                    fill
                    quality={85}
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="w-8 shrink-0 font-display text-2xl text-brand-red">0{i + 1}</span>
                <div>
                  <h3 className="text-lg sm:text-xl">{item.label}</h3>
                  <p className="text-sm text-muted sm:text-base">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>

          {team.length > 0 && (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {team.map((person, i) => (
                <li
                  key={person.name}
                  className="reveal rounded-2xl border border-charcoal/10 p-5"
                  style={delay(200 + i * 80)}
                >
                  <p className="font-display text-xl uppercase">{person.name}</p>
                  <p className="text-muted">
                    {person.role}
                    {person.since && ` · desde ${person.since}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
