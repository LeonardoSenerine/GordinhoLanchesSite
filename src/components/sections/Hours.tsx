import { siteConfig } from "@/config/site";
import { formatHour } from "@/lib/hours";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoursBoard } from "@/components/hours/HoursBoard";
import { OpenBadge } from "@/components/hours/OpenBadge";

/** Horários em destaque: salão por dia da semana, aviso de balcão e delivery. */
export function Hours() {
  return (
    <section id="horarios" className="grain relative overflow-hidden bg-charcoal py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-brand-red/15 blur-[140px]"
      />
      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Quando a gente abre"
            title={
              <>
                Todas as noites, <em>a partir das {formatHour(siteConfig.hours[0].opens)}</em>
              </>
            }
          />
          <OpenBadge className="reveal" />
        </div>

        <div className="mt-12">
          <HoursBoard />
        </div>
      </Container>
    </section>
  );
}
