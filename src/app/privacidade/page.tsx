import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ControllerInfo, LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como o site do ${siteConfig.name} trata dados pessoais, de acordo com a LGPD.`,
  alternates: { canonical: "/privacidade" },
};

/*
 * Texto baseado no funcionamento REAL do site: sem formulários, sem analytics,
 * sem cookies próprios. Se isso mudar (ex.: incluir Google Analytics, Pixel ou
 * formulário), esta página e /cookies precisam ser atualizadas.
 */
export default function PrivacyPage() {
  const { contact, legal } = siteConfig;

  return (
    <LegalPage
      kicker="Transparência"
      title="Política de Privacidade"
      intro={`Esta política explica, de forma simples, quais dados pessoais podem ser tratados quando você visita o site do ${siteConfig.name} e quais são os seus direitos, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).`}
    >
      <h2>1. Quem somos</h2>
      <p>O responsável (controlador) pelos dados tratados neste site é:</p>
      <ControllerInfo />

      <h2>2. Resumo</h2>
      <ul>
        <li>Este site não tem cadastro, login nem formulários.</li>
        <li>Não usamos ferramentas de análise de audiência nem de publicidade.</li>
        <li>
          Não gravamos cookies próprios no seu navegador — veja a{" "}
          <Link href="/cookies">Política de Cookies</Link>.
        </li>
        <li>
          Quando você escolhe falar com a gente pelo WhatsApp, abrir o mapa ou visitar nosso Instagram, os
          dados passam a ser tratados também por esses serviços.
        </li>
      </ul>

      <h2>3. Quais dados podem ser tratados</h2>
      <p>
        <strong>Dados técnicos de acesso.</strong> Como qualquer site, o servidor que hospeda estas páginas
        registra automaticamente informações técnicas da conexão, como endereço IP, data e hora, página
        acessada e tipo de navegador. Esses registros servem para manter o site funcionando e seguro.
      </p>
      <p>
        <strong>Dados que você nos envia.</strong> Ao clicar em “Chamar no WhatsApp”, você é direcionado ao
        WhatsApp com uma mensagem pronta. A partir daí, nós recebemos o que você decidir enviar — normalmente
        seu nome, número de telefone e o conteúdo da conversa (por exemplo, um pedido).
      </p>

      <h2>4. Para que usamos</h2>
      <ul>
        <li>Responder mensagens, atender pedidos e tirar dúvidas;</li>
        <li>Manter o site no ar, com segurança e desempenho;</li>
        <li>Cumprir obrigações legais, quando aplicável.</li>
      </ul>
      <p>
        As bases legais são a execução de contrato ou procedimentos preliminares a pedido do titular (art. 7º,
        V), o legítimo interesse para segurança e funcionamento do site (art. 7º, IX) e o cumprimento de
        obrigação legal (art. 7º, II).
      </p>

      <h2>5. Serviços de terceiros</h2>
      <p>
        Alguns recursos do site levam você a serviços de outras empresas, que têm suas próprias políticas de
        privacidade:
      </p>
      <ul>
        <li>
          <strong>WhatsApp (Meta)</strong> — ao clicar nos botões de contato.
        </li>
        <li>
          <strong>Google Maps</strong> — o mapa na seção “Visite” só é carregado se você clicar em “Mostrar
          mapa”, e os links “Como chegar” abrem o Google Maps.
        </li>
        <li>
          <strong>Instagram (Meta)</strong> — ao clicar nas fotos da galeria ou no link do nosso perfil.
        </li>
        <li>
          <strong>Provedor de hospedagem</strong> — que armazena e entrega as páginas do site e mantém os
          registros técnicos citados acima.
        </li>
      </ul>
      <p>Não vendemos nem compartilhamos seus dados pessoais para fins de publicidade.</p>

      <h2>6. Por quanto tempo guardamos</h2>
      <p>
        Mantemos os dados apenas pelo tempo necessário para as finalidades acima ou para cumprir obrigações
        legais. Conversas de WhatsApp ficam no aplicativo e podem ser apagadas a seu pedido, salvo quando a
        lei exigir a guarda.
      </p>

      <h2>7. Seus direitos</h2>
      <p>Pela LGPD, você pode, a qualquer momento:</p>
      <ul>
        <li>Confirmar se tratamos seus dados e ter acesso a eles;</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
        <li>Pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários;</li>
        <li>Pedir a portabilidade dos dados;</li>
        <li>Saber com quem compartilhamos seus dados;</li>
        <li>Revogar o consentimento, quando ele for a base do tratamento;</li>
        <li>Reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</li>
      </ul>
      <p>
        Para exercer esses direitos, fale com a gente{" "}
        {legal.email ? (
          <>
            pelo e-mail <a href={`mailto:${legal.email}`}>{legal.email}</a> ou{" "}
          </>
        ) : null}
        pelo WhatsApp <a href={`tel:+${contact.whatsapp}`}>{contact.phone}</a>.
      </p>

      <h2>8. Segurança</h2>
      <p>
        O site é servido por conexão segura (HTTPS) e não armazena dados pessoais em banco de dados próprio.
        Mesmo assim, nenhum sistema é totalmente imune a riscos; se identificarmos um incidente relevante,
        agiremos conforme a LGPD.
      </p>

      <h2>9. Crianças</h2>
      <p>
        O site não coleta intencionalmente dados de crianças e adolescentes. O contato pelo WhatsApp deve ser
        feito por um adulto responsável.
      </p>

      <h2>10. Alterações</h2>
      <p>
        Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última
        atualização fica sempre no topo da página.
      </p>
    </LegalPage>
  );
}
