import Image from "next/image";
import { mapsLink, siteConfig } from "@/config/site";
import { photos } from "@/assets/images";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const features = [
  { title: "Salão amplo", text: "Mesas pra turma toda, do casal à família inteira." },
  { title: "Espaço kids", text: "Playground no salão pra criançada gastar energia." },
  {
    title: "Estacionamento na porta",
    text: `No ${siteConfig.address.complement}, sem dor de cabeça pra parar.`,
  },
];

export function Space() {
  return (
    <section id="espaco" className="relative overflow-hidden bg-cream py-24 text-charcoal sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            tone="light"
            kicker="O espaço"
            title={
              <>
                Lugar de <em>família</em> reunida
              </>
            }
            intro="É chegar e ficar à vontade: salão confortável, cantinho das crianças e aquele clima de casa cheia."
          />

          <ol className="mt-10 space-y-6">
            {features.map((f, i) => (
              <li key={f.title} className="reveal flex gap-5" style={delay(200 + i * 100)}>
                <span className="w-14 shrink-0 font-display text-4xl leading-none text-brand-red">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl">{f.title}</h3>
                  <p className="mt-1 text-muted">{f.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <ButtonLink href={mapsLink()} variant="dark" size="lg" className="reveal mt-10" style={delay(500)}>
            Como chegar
          </ButtonLink>
        </div>

        {/* Mosaico */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <div className="reveal-curtain col-span-2 overflow-hidden rounded-3xl">
            <Image
              src={photos.salaoPlayground2.src}
              alt={photos.salaoPlayground2.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 620px, 100vw"
              className="aspect-[16/9] object-cover"
            />
          </div>
          <div className="reveal-curtain overflow-hidden rounded-3xl" style={delay(150)}>
            <Image
              src={photos.salaoVertical2.src}
              alt={photos.salaoVertical2.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 300px, 50vw"
              className="aspect-[3/4] object-cover"
            />
          </div>
          <div className="reveal-curtain overflow-hidden rounded-3xl" style={delay(300)}>
            <Image
              src={photos.salaoAmplo.src}
              alt={photos.salaoAmplo.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 300px, 50vw"
              className="aspect-[3/4] object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
