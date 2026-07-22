import { EASE } from "@/lib/theme";

export const DIVISION_CATEGORIES: Record<string, string[]> = {
  "La Última Vuelta": ["Individual Open", "Individual Pro", "Doubles", "Teams"],
  "Cada Paso Cuenta": ["Individual Open", "Individual Pro", "Doubles", "Teams"],
  "5K": ["18–29", "30–39", "40–49", "50+"],
  "10K": ["18–29", "30–39", "40–49", "50+"],
  "LUV Pro": ["Femenil", "Varonil"],
};

export const DIVISION_HINTS: Record<string, string> = {
  "La Última Vuelta": "Eliminación progresiva",
  "Cada Paso Cuenta": "4 horas · máx distancia",
  "5K": "Contrarreloj · bloques",
  "10K": "Contrarreloj · bloques",
  "LUV Pro": "Élite",
};

export const MAX_PASSES = 8;
export const STEP_LABELS = ["División", "Categoría", "Pases"];

export const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
};
export const cardItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.16, ease: EASE } },
};
export const panel = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.16, ease: EASE } },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.08, ease: [0.4, 0, 1, 1] as const },
  },
};
