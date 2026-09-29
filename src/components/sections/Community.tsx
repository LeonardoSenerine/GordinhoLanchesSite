import { testimonials } from "@/data/people";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Quem já faz parte: depoimentos reais de clientes.
 * Não renderiza nada enquanto data/people.ts não tiver depoimentos — nunca invente.
 */
export function Community() {
  if (testimonials.length === 0) return null;

  return (
    <section id="quem-ja-faz-parte" className="grain relative overflow-hidden bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading
          align="center"
          kicker="Quem já faz parte"
          title={
            <>
              Gerações que <em>cresceram aqui</em>
            </>
          }
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li
              key={t.author}
              className="reveal rounded-3xl bg-ink-2 p-8 ring-1 ring-cream/10"
              style={delay(i * 120)}
            >
              <span aria-hidden className="font-display text-6xl leading-none text-brand-red">
                “
              </span>
              <blockquote className="mt-2 text-lg text-cream/85">{t.quote}</blockquote>
              <p className="mt-6 font-bold">{t.author}</p>
              {t.detail && <p className="text-sm text-cream/60">{t.detail}</p>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
