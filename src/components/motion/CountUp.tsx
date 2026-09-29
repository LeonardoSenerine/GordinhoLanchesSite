"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
  /** Formata o número exibido (ex.: separador de milhar, "mil"). */
  format?: "plain" | "thousands";
}

function formatValue(value: number, format: CountUpProps["format"]) {
  if (format === "thousands") {
    return value >= 1000
      ? `${(value / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`
      : `${value}`;
  }
  return `${value}`;
}

/** Número que conta do zero até `to` quando entra na tela. O valor final é renderizado no servidor (SEO/sem JS). */
export function CountUp({ to, duration = 1600, format = "plain" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(to * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setValue(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatValue(value, format)}
    </span>
  );
}
