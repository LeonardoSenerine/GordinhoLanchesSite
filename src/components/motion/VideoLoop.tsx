"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoLoopProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * Vídeo decorativo mudo em loop que só toca enquanto está visível na tela.
 * Com movimento reduzido, fica parado no pôster.
 */
export function VideoLoop({ src, poster, className }: VideoLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={cn("object-cover", className)}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
    />
  );
}
