import { siteConfig, yearsOfHistory } from "@/config/site";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/motion/CountUp";

/** Assinatura de legado: "34 ANOS" gigante e a linha do tempo 1992 → hoje. */
export function Legacy() {
  const years = yearsOfHistory();
  if (!years || !siteConfig.foundedYear) return null;
  const now = siteConfig.foundedYear + years;

  return (
    <section
      aria-label={`${years} anos de história`}
      className="grain relative overflow-hidden bg-charcoal pt-24 pb-20 sm:pt-36 sm:pb-24"
    >
      <Container className="relative text-center">
        <p className="reveal-write font-script text-3xl text-brand-mustard sm:text-4xl">
          fazendo parte de Itatiba há
        </p>

        <p className="reveal-zoom mt-2 font-display leading-[0.85] uppercase" style={delay(100)}>
          <span className="block text-[clamp(7rem,26vw,18rem)] text-brand-red [text-shadow:0_20px_60px_rgb(215_20_26/0.35)]">
            <CountUp to={years} duration={1800} />
          </span>
          <span className="block text-[clamp(2.5rem,9vw,6rem)]">anos</span>
        </p>

        <p className="reveal mx-auto mt-8 max-w-xl text-xl text-cream/80 sm:text-2xl" style={delay(250)}>
          Uma história que virou parte de Itatiba.
        </p>

        {/* Linha do tempo */}
        <div className="reveal mx-auto mt-12 max-w-3xl sm:mt-16" style={delay(400)}>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-display text-2xl sm:text-5xl">{siteConfig.foundedYear}</span>
            <span aria-hidden className="relative h-1 flex-1 rounded-full bg-cream/15">
              <span className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-brand-red" />
              <span className="absolute top-1/2 left-0 size-4 -translate-1/2 rounded-full bg-brand-red ring-4 ring-charcoal" />
              <span className="absolute top-1/2 right-0 size-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-cream ring-4 ring-charcoal" />
            </span>
            <span className="font-display text-2xl text-brand-red sm:text-5xl">{now}</span>
          </div>
          <div className="mt-3 flex justify-between gap-4 text-xs text-cream/60 sm:text-sm">
            <span>Abrimos as portas</span>
            <span>O mesmo capricho de sempre</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
