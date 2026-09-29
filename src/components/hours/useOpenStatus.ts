"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";

// Relógio compartilhado: um "tique" por minuto já basta para abrir/fechar
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}
const currentMinute = () => Math.floor(Date.now() / 60_000);

/**
 * Status de funcionamento em tempo real (horário de Brasília).
 * Retorna null no servidor e na hidratação — o HTML estático não sabe "que horas são".
 */
export function useOpenStatus(): OpenStatus | null {
  const minute = useSyncExternalStore(subscribe, currentMinute, () => null);
  return minute === null ? null : getOpenStatus(new Date(minute * 60_000));
}
