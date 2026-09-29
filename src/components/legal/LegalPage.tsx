import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

interface LegalPageProps {
  kicker: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Layout das páginas legais: cabeçalho de marca + texto longo legível sobre fundo claro. */
export function LegalPage({ kicker, title, intro, children }: LegalPageProps) {
  return (
    <>
      <header className="grain relative overflow-hidden bg-charcoal pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 size-[32rem] rounded-full bg-brand-red/20 blur-[120px]"
        />
        <Container className="relative max-w-3xl">
          <p className="font-script text-[1.75rem] text-brand-mustard sm:text-4xl">{kicker}</p>
          <h1 className="mt-2 text-[2.25rem] leading-[1.1] sm:text-5xl">{title}</h1>
          <p className="mt-5 text-base text-cream/70 sm:text-lg">{intro}</p>
          <p className="mt-6 text-sm text-cream/50">
            Última atualização: {formatDate(siteConfig.legal.lastUpdated)}
          </p>
        </Container>
      </header>

      <div className="bg-cream py-16 text-charcoal sm:py-24">
        <Container className="max-w-3xl">
          <article className="space-y-5 text-base leading-relaxed text-charcoal/85 sm:text-lg [&_a]:font-semibold [&_a]:text-brand-red [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:pt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:leading-tight [&_h2]:text-charcoal [&_h2]:uppercase sm:[&_h2]:text-3xl [&_li]:pl-1 [&_strong]:text-charcoal [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-brand-red">
            {children}
          </article>

          <nav
            aria-label="Outras políticas"
            className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-charcoal/10 pt-8 text-sm"
          >
            <Link href="/" className="font-bold text-brand-red hover:underline">
              ← Voltar ao site
            </Link>
            {siteConfig.legalPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-muted hover:text-charcoal hover:underline"
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </>
  );
}

/** Bloco "quem é o controlador" + canal de contato, reaproveitado nas duas políticas. */
export function ControllerInfo() {
  const { legal, contact, address, name } = siteConfig;
  return (
    <ul>
      <li>
        <strong>{legal.companyName || name}</strong>
        {legal.cnpj && <> — CNPJ {legal.cnpj}</>}
      </li>
      <li>
        {address.street}, {address.neighborhood} — {address.complement}, {address.city}/{address.state}, CEP{" "}
        {address.zip}
      </li>
      <li>
        Telefone e WhatsApp: <a href={`tel:+${contact.whatsapp}`}>{contact.phone}</a>
      </li>
      {legal.email && (
        <li>
          E-mail: <a href={`mailto:${legal.email}`}>{legal.email}</a>
        </li>
      )}
    </ul>
  );
}
