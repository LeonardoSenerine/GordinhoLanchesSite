import Image from "next/image";
import { photos } from "@/assets/images";
import { team } from "@/data/people";
import { delay } from "@/lib/utils";
import { coverPx, coverVw } from "@/lib/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Quem faz o Gordinho: bastidores e equipe. A lista de nomes só aparece quando preenchida em data/people.ts. */
export function Team() {
  return (
    <section id="quem-faz" className="relative overflow-hidden bg-cream py-20 text-charcoal sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid grid-cols-5 gap-4">
          <div className="reveal-curtain col-span-3 overflow-hidden rounded-3xl">
            <Image
              src={photos.heroBrasa.src}
              alt={photos.heroBrasa.alt}
              placeholder="blur"
              quality={90}
              sizes={`(min-width: 1024px) ${coverPx(photos.heroBrasa.src, 400, 3 / 4)}, ${coverVw(photos.heroBrasa.src, 60, 3 / 4)}`}
              className="aspect-[3/4] object-cover object-[40%_center]"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-4 pt-12">
            <div className="reveal-curtain overflow-hidden rounded-3xl" style={delay(150)}>
              <Image
                src={photos.burgerMaos.src}
                alt={photos.burgerMaos.alt}
                placeholder="blur"
                sizes={`(min-width: 1024px) ${coverPx(photos.burgerMaos.src, 260, 1)}, ${coverVw(photos.burgerMaos.src, 40, 1)}`}
                className="aspect-square object-cover"
              />
            </div>
            <div className="reveal-curtain overflow-hidden rounded-3xl" style={delay(300)}>
              <Image
                src={photos.comboLancheDrink.src}
                alt={photos.comboLancheDrink.alt}
                placeholder="blur"
                sizes={`(min-width: 1024px) ${coverPx(photos.comboLancheDrink.src, 260, 1)}, ${coverVw(photos.comboLancheDrink.src, 40, 1)}`}
                className="aspect-square object-cover"
              />
            </div>
          </div>
        </div>

        <div>
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
