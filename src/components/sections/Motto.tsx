import { siteConfig } from "@/config/site";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

/** Lema da casa como assinatura institucional, logo antes do rodapé. */
export function Motto() {
  return (
    <section aria-label="Nosso lema" className="grain relative overflow-hidden bg-charcoal py-20 sm:py-40">
      <Container className="relative text-center">
        <p className="font-display text-[clamp(2rem,8vw,6.5rem)] leading-[1.1] uppercase">
          {siteConfig.motto.map((word, i) => (
            <span
              key={word}
              className={`${i % 2 ? "reveal-right" : "reveal-left"} block ${i === 1 ? "text-brand-red" : ""}`}
              style={delay(i * 180)}
            >
              {word}.
            </span>
          ))}
        </p>
        <p
          className="reveal-write mt-8 font-script text-2xl text-brand-mustard sm:mt-10 sm:text-4xl"
          style={delay(600)}
        >
          O lema que acompanha o Gordinho desde o primeiro lanche.
        </p>
      </Container>
    </section>
  );
}
