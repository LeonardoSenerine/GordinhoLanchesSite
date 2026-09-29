"use client";

import { useEffect } from "react";

/**
 * Liga os efeitos de scroll da página inteira (montado uma vez no layout):
 * - `.reveal`, `.reveal-zoom`, `.reveal-curtain`, `.reveal-write` ganham `.is-visible` ao entrar na tela;
 * - `[data-parallax="0.1"]` desloca o elemento na vertical conforme o scroll (só desktop).
 * Sem JS ou com movimento reduzido, tudo aparece estático.
 */
export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-anim");

    const revealEls = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-zoom, .reveal-curtain, .reveal-write",
    );
    // O IntersectionObserver considera o clip-path do próprio alvo: um elemento que começa
    // 100% recortado (curtain/write) nunca "intersecta". Nesses casos observamos o pai.
    const targets = new Map<Element, HTMLElement[]>();
    revealEls.forEach((el) => {
      const clipped = el.matches(".reveal-curtain, .reveal-write");
      const target = (clipped && el.parentElement) || el;
      targets.set(target, [...(targets.get(target) ?? []), el]);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            targets.get(entry.target)?.forEach((el) => el.classList.add("is-visible"));
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((_, target) => observer.observe(target));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const parallaxEls = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of parallaxEls) {
        if (!desktop.matches) {
          el.style.translate = "";
          continue;
        }
        const rect = el.getBoundingClientRect();
        const speed = Number(el.dataset.parallax) || 0.1;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateParallax);
    };

    if (!reduceMotion && parallaxEls.length) {
      updateParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
