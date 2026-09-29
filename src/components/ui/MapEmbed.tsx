"use client";

import { useState } from "react";
import { mapsEmbedLink } from "@/config/site";
import { MapPinIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";

/**
 * Mapa do Google carregado só quando a pessoa pede — evita cookies de terceiros
 * e peso extra no carregamento inicial.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Mapa com a localização do Gordinho Lanches"
        src={mapsEmbedLink()}
        className="size-full min-h-80 border-0 grayscale-[.3]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex size-full min-h-80 flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,var(--color-ink-2),var(--color-charcoal))] p-8 text-center">
      <MapPinIcon className="size-12 animate-float text-brand-red" />
      <p className="max-w-xs text-cream/70">O mapa é carregado do Google Maps só quando você pedir.</p>
      <Button variant="light" onClick={() => setLoaded(true)}>
        Mostrar mapa
      </Button>
    </div>
  );
}
