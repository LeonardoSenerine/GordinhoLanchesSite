"use client";

import { useEffect } from "react";

/**
 * Liga os efeitos de movimento da página inteira (montado uma vez no layout):
 * - `.reveal*` ganham `.is-visible` ao entrar na tela;
 * - `[data-parallax="0.1"]` desloca o elemento na vertical conforme o scroll (só desktop);
 * - `#scroll-progress` mostra quanto da página já foi rolado;
 * - `--scroll-skew` (só nos `.marquee-skew`) acompanha a velocidade do scroll;
 * - `[data-tilt]` inclina em 3D seguindo o mouse (só desktop com mouse).
 * Sem JS ou com movimento reduzido, tudo aparece estático.
 */
export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-anim");
    const cleanups: (() => void)[] = [];

    // ---------- Revelação ao entrar na tela ----------
    const revealEls = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-zoom, .reveal-curtain, .reveal-write, .reveal-left, .reveal-right",
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
    cleanups.push(() => observer.disconnect());

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return () => cleanups.forEach((fn) => fn());

    const desktop = window.matchMedia("(min-width: 1024px)");
    const parallaxEls = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const progress = document.getElementById("scroll-progress");
    // A inclinação vai só nos letreiros: definir a variável no <html> a cada quadro forçava
    // o navegador a recalcular os estilos da página inteira (e as imagens "piscavam").
    const skewEls = [...document.querySelectorAll<HTMLElement>(".marquee-skew")];
    const setSkew = (v: string) => skewEls.forEach((el) => el.style.setProperty("--scroll-skew", v));

    // ---------- Scroll: parallax, barra de progresso e inclinação por velocidade ----------
    let frame = 0;
    let lastY = window.scrollY;
    let skew = 0;

    const tick = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;

      // Parallax: primeiro LÊ todas as posições, depois ESCREVE — intercalar leitura e escrita
      // força vários recálculos de layout por quadro.
      if (desktop.matches) {
        const offsets = parallaxEls.map((el) => {
          const rect = el.getBoundingClientRect();
          const visible = rect.bottom > -200 && rect.top < vh + 200;
          const speed = Number(el.dataset.parallax) || 0.1;
          return visible ? (rect.top + rect.height / 2 - vh / 2) * -speed : null;
        });
        parallaxEls.forEach((el, i) => {
          const o = offsets[i];
          if (o !== null) el.style.translate = `0 ${o.toFixed(1)}px`;
        });
      } else {
        parallaxEls.forEach((el) => (el.style.translate = ""));
      }

      if (progress) {
        const max = document.documentElement.scrollHeight - vh;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }

      // Velocidade → inclinação (suavizada), que volta a zero quando o scroll para
      const target = Math.max(-7, Math.min(7, (y - lastY) * 0.18));
      skew += (target - skew) * 0.2;
      lastY = y;
      if (Math.abs(skew) > 0.05) {
        setSkew(`${skew.toFixed(2)}deg`);
        frame = requestAnimationFrame(tick);
      } else if (skew !== 0) {
        skew = 0;
        setSkew("0deg");
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    });

    // ---------- Cartões 3D que seguem o mouse ----------
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const max = Number(el.dataset.tilt) || 8;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transition = "transform 0.1s ease-out";
          el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
          el.style.setProperty("--glare-x", `${((x + 0.5) * 100).toFixed(1)}%`);
          el.style.setProperty("--glare-y", `${((y + 0.5) * 100).toFixed(1)}%`);
        };
        const leave = () => {
          el.style.transition = "transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)";
          el.style.transform = "";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
