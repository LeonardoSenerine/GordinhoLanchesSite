import { mapsLink, siteConfig, whatsappLink } from "@/config/site";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { MapEmbed } from "@/components/ui/MapEmbed";

export function Visit() {
  const { address, hours, contact } = siteConfig;

  return (
    <section id="visite" className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Vem pro Gordinho"
          title={
            <>
              Onde a gente <em>está</em>
            </>
          }
        />

        <div className="mt-14 grid overflow-hidden rounded-3xl ring-1 ring-cream/10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8 bg-ink-2 p-8 sm:p-10">
            <div className="reveal flex gap-4">
              <MapPinIcon className="mt-1 size-6 shrink-0 text-brand-red" />
              <address className="not-italic">
                <p className="font-bold">{address.complement}</p>
                <p className="text-cream/70">
                  {address.street} — {address.neighborhood}
                  <br />
                  {address.city}/{address.state} · {address.zip}
                </p>
              </address>
            </div>

            <div className="reveal flex gap-4" style={delay(100)}>
              <ClockIcon className="mt-1 size-6 shrink-0 text-brand-red" />
              <dl className="w-full">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt className="text-cream/70">{h.days}</dt>
                    <dd className="font-bold">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="reveal flex gap-4" style={delay(200)}>
              <PhoneIcon className="mt-1 size-6 shrink-0 text-brand-red" />
              <p>
                <span className="block text-cream/70">Telefone e WhatsApp</span>
                <a href={`tel:+${contact.whatsapp}`} className="font-bold underline-offset-4 hover:underline">
                  {contact.phone}
                </a>
              </p>
            </div>

            <div className="reveal flex flex-wrap gap-3 pt-2" style={delay(300)}>
              <ButtonLink href={mapsLink()}>Abrir no Maps</ButtonLink>
              <ButtonLink href={whatsappLink()} variant="outline">
                Chamar no WhatsApp
              </ButtonLink>
            </div>
          </div>

          <MapEmbed />
        </div>
      </Container>
    </section>
  );
}
