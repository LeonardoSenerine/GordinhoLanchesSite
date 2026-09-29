import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Story } from "@/components/sections/Story";
import { Pillars } from "@/components/sections/Pillars";
import { ImageBand } from "@/components/sections/ImageBand";
import { Space } from "@/components/sections/Space";
import { Gallery } from "@/components/sections/Gallery";
import { FinalCta } from "@/components/sections/FinalCta";
import { Visit } from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Faixa inclinada invadindo a próxima seção; o wrapper corta só a sobra horizontal */}
      <div className="relative z-10 -my-6 overflow-x-clip py-6">
        <Marquee className="scale-105 -rotate-2 shadow-xl shadow-black/40" />
      </div>
      <Story />
      <Pillars />
      <ImageBand />
      <Space />
      <Gallery />
      <FinalCta />
      <Visit />
    </>
  );
}
