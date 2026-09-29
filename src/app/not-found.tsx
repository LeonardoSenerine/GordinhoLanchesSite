import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center bg-charcoal text-cream">
      <Container className="text-center">
        <p className="font-display text-8xl text-brand-mustard">404</p>
        <h1 className="mt-2 text-3xl">Esse lanche não está no cardápio</h1>
        <ButtonLink href="/" className="mt-8">
          Voltar ao início
        </ButtonLink>
      </Container>
    </section>
  );
}
