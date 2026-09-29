import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Rubik, Yellowtail } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { MotionEffects } from "@/components/motion/MotionEffects";
import "./globals.css";

// Slab pesada, próxima da tipografia do logo
const display = Alfa_Slab_One({
  variable: "--font-display-family",
  weight: "400",
  subsets: ["latin"],
});

// Manuscrita estilo letreiro de lanchonete clássica, para kickers e frases de marca
const script = Yellowtail({
  variable: "--font-script-family",
  weight: "400",
  subsets: ["latin"],
});

const sans = Rubik({
  variable: "--font-sans-family",
  subsets: ["latin"],
});

const shareDescription =
  "Sem economizar no sabor. Lanche de verdade, família reunida, espaço kids e estacionamento na porta no Itacenter Mall.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.category} em ${siteConfig.city}/${siteConfig.state}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "hamburgueria",
    "lanchonete",
    "lanches",
    "hot dog",
    "Itatiba",
    "Gordinho Lanches",
    "espaço kids",
    "lugar para comer com crianças em Itatiba",
    "lanchonete tradicional Itatiba",
  ],
  // Imagem da prévia: src/app/opengraph-image.jpg e twitter-image.jpg (gerar com `npm run og`)
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Desde ${siteConfig.foundedYear} em ${siteConfig.city}/${siteConfig.state}`,
    description: shareDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Desde ${siteConfig.foundedYear} em ${siteConfig.city}/${siteConfig.state}`,
    description: shareDescription,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0e0d0d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${script.variable} ${sans.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        <MotionEffects />
      </body>
    </html>
  );
}
