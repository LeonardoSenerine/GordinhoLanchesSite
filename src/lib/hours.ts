import { siteConfig } from "@/config/site";

type Schedule = (typeof siteConfig.hours)[number];

export interface OpenStatus {
  open: boolean;
  /** Expediente que vale agora (se aberto) ou o de hoje à noite (se fechado). */
  schedule: Schedule;
  /** Índice desse expediente em siteConfig.hours — para destacar "hoje". */
  scheduleIndex: number;
  /** Aberto agora, mas já depois da meia-noite (ex.: sexta madrugada de sábado). */
  afterMidnight: boolean;
  deliveryOpen: boolean;
}

const TZ = "America/Sao_Paulo";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** "01:00" → "01h", "18:30" → "18h30", "00:00" → "00h". */
export function formatHour(hhmm: string) {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${h}h` : `${h}h${m}`;
}

/** Dia da semana (0 = domingo) e minutos desde 00:00 no horário de Brasília. */
export function localTime(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    weekday: WEEKDAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function scheduleFor(weekday: number) {
  const index = siteConfig.hours.findIndex((s) => (s.days as readonly number[]).includes(weekday));
  return { schedule: siteConfig.hours[index], index };
}

/** O salão está aberto agora? Considera expedientes que atravessam a meia-noite. */
export function getOpenStatus(date: Date): OpenStatus {
  const { weekday, minutes } = localTime(date);
  const today = scheduleFor(weekday);
  const yesterday = scheduleFor((weekday + 6) % 7);

  // Madrugada: ainda vale o expediente que abriu ontem
  const yClose = toMinutes(yesterday.schedule.closes);
  const yOvernight = yClose < toMinutes(yesterday.schedule.opens);
  const afterMidnight = yOvernight && minutes < yClose;

  const openTonight = minutes >= toMinutes(today.schedule.opens);
  const current = afterMidnight ? yesterday : today;

  const d = siteConfig.delivery;
  const dOpen = toMinutes(d.opens);
  const dClose = toMinutes(d.closes) || 24 * 60; // "00:00" = meia-noite
  const deliveryOpen = minutes >= dOpen && minutes < dClose;

  return {
    open: afterMidnight || openTonight,
    schedule: current.schedule,
    scheduleIndex: current.index,
    afterMidnight,
    deliveryOpen,
  };
}
