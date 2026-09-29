import Link from "next/link";
import { siteConfig, whatsappLink } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const { social, contact, address } = siteConfig;

  return (
    <footer className="grain relative overflow-hidden bg-brand-red pb-24 text-cream lg:pb-20">
      <Container className="relative grid gap-10 py-14 sm:grid-cols-2 sm:gap-12 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* Placa escura: o emblema vermelho sumiria sobre o fundo vermelho */}
          <div className="inline-block -rotate-2 rounded-3xl bg-charcoal px-5 py-3 shadow-xl">
            <Logo className="w-40 sm:w-52" />
          </div>
          <p className="mt-4 font-script text-2xl sm:text-3xl">
            Tradição que alimenta Itatiba desde {siteConfig.foundedYear}.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-sans text-xs font-bold tracking-[0.2em] text-cream/70">Navegue</h2>
          <ul className="mt-4 space-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="font-semibold hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-bold tracking-[0.2em] text-cream/70">Contato</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold hover:underline"
              >
                <WhatsAppIcon className="size-5" /> {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold hover:underline"
              >
                <InstagramIcon className="size-5" /> {social.instagramHandle}
              </a>
            </li>
            <li className="text-cream/80">
              {address.street}
              <br />
              {address.complement} — {address.city}/{address.state}
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-cream/20">
        <Container className="flex flex-col gap-2 py-6 text-sm text-cream/80 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
            <span className="block sm:inline">
              {" "}
              {siteConfig.city}/{siteConfig.state} · desde {siteConfig.foundedYear}
            </span>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {siteConfig.legalPages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="hover:text-cream hover:underline">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
