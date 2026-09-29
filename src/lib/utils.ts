import type { CSSProperties } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Junta classes condicionais e resolve conflitos do Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Atraso de animação para escalonar revelações: style={delay(120)} */
export function delay(ms: number) {
  return { "--delay": `${ms}ms` } as CSSProperties;
}
