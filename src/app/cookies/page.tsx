import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ControllerInfo, LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: `Quais cookies e tecnologias semelhantes o site do ${siteConfig.name} usa.`,
  alternates: { canonical: "/cookies" },
};

/*
 * Estado atual: o site NÃO grava cookies próprios nem usa localStorage.
 * O único conteúdo de terceiros que pode gravar cookies é o mapa do Google,
 * carregado só após clique (components/ui/MapEmbed.tsx).
 * Se adicionar analytics/pixel, será preciso um banner de consentimento e revisar este texto.
 */
export default function CookiesPage() {
  return (
    <LegalPage
      kicker="Sem letra miúda"
      title="Política de Cookies"
      intro="Cookies são pequenos arquivos que alguns sites gravam no seu navegador. Aqui explicamos, sem rodeios, como isso funciona no site do Gordinho."
    >
      <h2>1. O site do Gordinho grava cookies?</h2>
      <p>
        <strong>Não.</strong> Este site não grava cookies próprios, não usa ferramentas de análise de
        audiência (como Google Analytics) e não usa pixels de publicidade. As fontes, as fotos e o vídeo são
        carregados do nosso próprio servidor.
      </p>

      <h2>2. E o mapa?</h2>
      <p>
        Na seção “Visite”, o mapa do Google <strong>não é carregado automaticamente</strong>. Ele só aparece
        se você clicar em “Mostrar mapa”. Nesse momento, o Google Maps pode gravar cookies e coletar dados de
        uso de acordo com a{" "}
        <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer">
          política de privacidade do Google
        </a>
        . Se preferir, use o botão “Abrir no Maps”, que leva direto ao aplicativo ou site do Google.
      </p>

      <h2>3. Links para outros serviços</h2>
      <p>
        Ao clicar em links para o WhatsApp, o Instagram ou o Google Maps, você sai do nosso site. Esses
        serviços têm suas próprias políticas de cookies, que passam a valer a partir daí.
      </p>

      <h2>4. Como controlar cookies no navegador</h2>
      <p>
        Você pode ver, bloquear e apagar cookies nas configurações do seu navegador (Chrome, Safari, Firefox,
        Edge etc.). Bloquear cookies de terceiros não afeta o funcionamento deste site — só o mapa incorporado
        pode deixar de funcionar.
      </p>

      <h2>5. Mudanças</h2>
      <p>
        Se um dia passarmos a usar cookies (por exemplo, para medir visitas), esta página será atualizada e
        pediremos o seu consentimento antes, quando a lei exigir.
      </p>

      <h2>6. Contato</h2>
      <p>
        Dúvidas? Veja também a <Link href="/privacidade">Política de Privacidade</Link> ou fale com a gente:
      </p>
      <ControllerInfo />
    </LegalPage>
  );
}
