import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Legacy } from "@/components/sections/Legacy";
import { Story } from "@/components/sections/Story";
import { Pillars } from "@/components/sections/Pillars";
import { Space } from "@/components/sections/Space";
import { ImageBand } from "@/components/sections/ImageBand";
import { Team } from "@/components/sections/Team";
import { Community } from "@/components/sections/Community";
import { Gallery } from "@/components/sections/Gallery";
import { FinalCta } from "@/components/sections/FinalCta";
import { Visit } from "@/components/sections/Visit";
import { Motto } from "@/components/sections/Motto";
import { StructuredData } from "@/components/seo/StructuredData";

/*
 * Narrativa: legado primeiro (desde 1992) → história → jeito de fazer → lugar de família
 * → quem faz → quem já faz parte → o Gordinho de perto → chamada → visite → lema.
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      {/* Faixa inclinada invadindo a próxima seção; o wrapper corta só a sobra horizontal */}
      <div className="relative z-10 -my-6 overflow-x-clip py-6">
        <Marquee className="scale-105 -rotate-2 shadow-xl shadow-black/40" />
      </div>
      <Legacy />
      <Story />
      <Pillars />
      <Space />
      <ImageBand />
      <Team />
      <Community />
      <Gallery />
      <FinalCta />
      <Visit />
      <Motto />
    </>
  );
}
