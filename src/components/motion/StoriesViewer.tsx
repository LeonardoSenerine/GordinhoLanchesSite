"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { coverPx } from "@/lib/image";

export type Story =
  | { kind: "video"; src: string; poster: string; kicker: string; title: string; duration?: number }
  | { kind: "image"; src: StaticImageData; alt: string; kicker: string; title: string; duration?: number };

interface StoriesViewerProps {
  stories: Story[];
  /** Nome exibido no topo, como no Instagram. */
  handle: string;
  avatar: StaticImageData;
  className?: string;
}

const DEFAULT_DURATION = 5000;

/**
 * Viewer no formato "Stories": avança sozinho com barras de progresso,
 * toque à esquerda/direita navega, pausa no hover, fora da tela ou com a aba oculta.
 * Com movimento reduzido começa pausado.
 */
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(reducedMotionQuery);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function StoriesViewer({ stories, handle, avatar, className }: StoriesViewerProps) {
  const [index, setIndex] = useState(0);
  // null = sem escolha do usuário → segue a preferência de movimento reduzido do sistema
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const elapsed = useRef(0);

  const paused = userPaused ?? reducedMotion;
  const running = !paused && !hovered && visible;
  const current = stories[index];
  const duration = current.duration ?? DEFAULT_DURATION;

  const go = useCallback(
    (next: number) => {
      elapsed.current = 0;
      setIndex((next + stories.length) % stories.length);
    },
    [stories.length],
  );

  // Só roda quando está na tela e a aba está visível
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    const onVisibility = () => {
      if (document.hidden) setVisible(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Barras de progresso: anteriores cheias, atual animada, seguintes vazias
  useEffect(() => {
    barRefs.current.forEach((bar, i) => {
      if (bar)
        bar.style.transform = `scaleX(${i < index ? 1 : i === index ? elapsed.current / duration : 0})`;
    });
  }, [index, duration]);

  // Relógio do story atual (rAF, sem re-render a cada quadro)
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const progress = Math.min(elapsed.current / duration, 1);
      const bar = barRefs.current[index];
      if (bar) bar.style.transform = `scaleX(${progress})`;
      if (progress >= 1) go(index + 1);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, index, duration, go]);

  // Vídeo só toca quando é o story ativo e o viewer está rodando
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index && running) void video.play().catch(() => {});
      else video.pause();
      if (i !== index) video.currentTime = 0;
    });
  }, [index, running]);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Momentos do Gordinho"
      className={cn(
        "relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] bg-ink shadow-2xl ring-1 shadow-black/60 ring-cream/10",
        className,
      )}
      // Só mouse: no toque, "enter" dispara e nunca sai, o que travaria o story pausado
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
    >
      {stories.map((story, i) => (
        <div
          key={story.title}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          {story.kind === "video" ? (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={story.src}
              poster={story.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="size-full object-cover"
            />
          ) : (
            <Image
              src={story.src}
              alt={story.alt}
              fill
              quality={85}
              sizes={`(min-width: 640px) ${coverPx(story.src, 352, 9 / 16)}, ${coverPx(story.src, 320, 9 / 16)}`}
              className={cn(
                "object-cover transition-transform ease-linear",
                // Ken Burns leve enquanto o story está ativo
                i === index && running ? "scale-110 duration-[6000ms]" : "scale-100 duration-700",
              )}
            />
          )}
        </div>
      ))}

      {/* Sombras para legibilidade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-charcoal/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-charcoal via-charcoal/60 to-transparent" />

      {/* Barras de progresso + perfil */}
      <div className="absolute inset-x-0 top-0 p-4">
        <div className="flex gap-1.5">
          {stories.map((story, i) => (
            <span key={story.title} className="h-1 flex-1 overflow-hidden rounded-full bg-cream/30">
              <span
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                className="block h-full origin-left scale-x-0 rounded-full bg-cream"
              />
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-cream p-0.5 ring-2 ring-brand-red">
            <Image src={avatar} alt="" sizes="36px" className="size-full rounded-full object-contain" />
          </span>
          <span className="text-sm font-bold">{handle}</span>
          <button
            type="button"
            onClick={() => setUserPaused(!paused)}
            aria-label={paused ? "Reproduzir" : "Pausar"}
            className="relative z-20 ml-auto grid size-9 place-items-center rounded-full bg-charcoal/40 backdrop-blur transition-colors hover:bg-charcoal/70"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Legenda do story atual */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6" aria-live="polite">
        <p
          key={`k-${index}`}
          className="animate-[menu-in_.6s_var(--ease-brand)_both] font-script text-3xl text-brand-mustard"
        >
          {current.kicker}
        </p>
        <p
          key={`t-${index}`}
          className="mt-1 animate-[menu-in_.6s_var(--ease-brand)_.1s_both] font-display text-2xl leading-tight uppercase"
        >
          {current.title}
        </p>
      </div>

      {/* Zonas de toque para navegar */}
      <button
        type="button"
        aria-label="Momento anterior"
        onClick={() => go(index - 1)}
        className="absolute inset-y-24 left-0 z-10 w-1/3 cursor-w-resize"
      />
      <button
        type="button"
        aria-label="Próximo momento"
        onClick={() => go(index + 1)}
        className="absolute inset-y-24 right-0 z-10 w-2/3 cursor-e-resize"
      />
    </div>
  );
}
