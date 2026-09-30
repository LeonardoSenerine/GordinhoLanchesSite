import { mottoMeanings } from "@/data/history";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

/** Lema da casa como assinatura institucional, com o significado de cada palavra (texto do mural). */
export function Motto() {
  return (
    <section aria-label="Nosso lema" className="grain relative overflow-hidden bg-charcoal py-20 sm:py-36">
      <Container className="relative text-center">
        <p
          className="reveal-write inline-block font-script text-2xl text-brand-mustard sm:text-4xl"
          style={delay(0)}
        >
          o lema que nos trouxe até aqui
        </p>

        <dl className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
          {mottoMeanings.map((item, i) => (
            <div
              key={item.word}
              className={i % 2 ? "reveal-right" : "reveal-left"}
              style={delay(150 + i * 180)}
            >
              <dt
                className={`font-display text-[clamp(2rem,8vw,6.5rem)] leading-[1.1] uppercase ${i === 1 ? "text-brand-red" : ""}`}
              >
                {item.word}.
              </dt>
              <dd className="mt-1 text-base text-cream/70 sm:text-xl">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
