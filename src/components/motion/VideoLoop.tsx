"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoLoopProps {
  src: string;
  poster: string;
  /** Trecho do vídeo que fica em loop (segundos). Útil quando o arquivo tem partes que não servem de fundo. */
  start?: number;
  end?: number;
  className?: string;
}

/**
 * Vídeo decorativo mudo que só toca enquanto está visível na tela
 * e repete apenas o trecho [start, end]. Com movimento reduzido, fica no pôster.
 */
export function VideoLoop({ src, poster, start = 0, end, className }: VideoLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const toStart = () => {
      if (video.currentTime < start) video.currentTime = start;
    };
    const onTimeUpdate = () => {
      if (end !== undefined && video.currentTime >= end) video.currentTime = start;
    };
    const onEnded = () => {
      video.currentTime = start;
      void video.play();
    };

    video.addEventListener("loadedmetadata", toStart);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    if (video.readyState >= 1) toStart();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadedmetadata", toStart);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [start, end]);

  return (
    <video
      ref={ref}
      className={cn("object-cover", className)}
      src={`${src}#t=${start}`}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
    />
  );
}
