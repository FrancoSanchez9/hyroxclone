// Pure scoring logic for the "Tu Nivel" quiz — extracted from QuizSection.tsx
// so the algorithm (brújula, nivel, afinidad por modalidad, arquetipo) is
// testable without rendering the component.

export type Direction = "descubrir" | "resistir" | "superarte" | "competir" | "compartir";
export type LetterOption = "A" | "B" | "C" | "D" | "E";
export type ModalKey = "5K" | "10K" | "LUV" | "CPC" | "LUV_PRO" | "TEAMS";

export type ArchetypeKey =
  | "EL_QUE_VUELVE"
  | "EL_COMPAÑERO"
  | "EL_COMPETIDOR"
  | "EL_ESTRATEGA"
  | "EL_INCANSABLE"
  | "EL_CAMINANTE"
  | "EL_PRIMERO";

export interface Archetype {
  name: string;
  headline: string;
  message: string;
  phrase: string;
  closes: string;
}

export const NIVEL_WEIGHTS = {
  largaDistancia: 0.25,
  frecuencia: 0.2,
  consistencia: 0.15,
  autonomia: 0.15,
  experiencia: 0.1,
  preparacion: 0.1,
  tiempo: 0.05,
} as const;

export const LETTER_TO_DIRECTION: Record<LetterOption, Direction> = {
  A: "descubrir",
  B: "resistir",
  C: "superarte",
  D: "competir",
  E: "compartir",
};

export const DIRECTION_LABELS: Record<Direction, string> = {
  descubrir: "DESCUBRIR",
  resistir: "RESISTIR",
  superarte: "SUPERARTE",
  competir: "COMPETIR",
  compartir: "COMPARTIR",
};

export const MODAL_EMOTIONAL_AFFINITY: Record<ModalKey, Record<Direction, number>> = {
  "5K": { descubrir: 0.4, compartir: 0.25, superarte: 0.2, resistir: 0.1, competir: 0.05 },
  "10K": { superarte: 0.35, descubrir: 0.2, resistir: 0.2, competir: 0.15, compartir: 0.1 },
  LUV: { resistir: 0.35, competir: 0.25, superarte: 0.2, descubrir: 0.1, compartir: 0.1 },
  CPC: { resistir: 0.5, superarte: 0.2, competir: 0.15, compartir: 0.1, descubrir: 0.05 },
  LUV_PRO: { competir: 0.45, superarte: 0.25, resistir: 0.2, descubrir: 0.05, compartir: 0.05 },
  TEAMS: { compartir: 0.5, resistir: 0.15, competir: 0.15, descubrir: 0.1, superarte: 0.1 },
};

export const MODAL_RECOMMENDED_LEVELS: Record<ModalKey, number[]> = {
  "5K": [1, 2],
  "10K": [2, 3],
  LUV: [3, 4],
  CPC: [4, 5],
  LUV_PRO: [5],
  TEAMS: [1, 2, 3, 4, 5],
};

export const MODAL_NAMES: Record<ModalKey, string> = {
  "5K": "5K",
  "10K": "10K",
  LUV: "La Última Vuelta",
  CPC: "Cada Paso Cuenta",
  LUV_PRO: "LUV Pro",
  TEAMS: "Teams / Doubles",
};

export const MODAL_DESCRIPTIONS: Record<ModalKey, string> = {
  "5K": "El punto de entrada perfecto. Una distancia accesible para quienes quieren descubrir qué significa correr en comunidad.",
  "10K":
    "Un desafío real para quienes ya tienen una base y quieren seguir creciendo. Ideal para superarte.",
  LUV: "La Última Vuelta es para quienes buscan poner a prueba su resistencia y saber qué hay más allá del límite.",
  CPC: "Cada Paso Cuenta es la prueba definitiva de resistencia. Para atletas que disfrutan administrar cada kilómetro.",
  LUV_PRO:
    "El formato más exigente. Para competidores que buscan el mejor resultado y corren para ganar.",
  TEAMS:
    "El desafío colectivo. Se corre en equipo y cada persona suma. La mejor opción para compartir la experiencia.",
};

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  EL_QUE_VUELVE: {
    name: "EL QUE VUELVE",
    headline: "No corre por una meta. Corre porque siempre existe una siguiente vuelta.",
    message:
      "Entiendes que ninguna llegada es definitiva. Cada resultado, cada kilómetro y cada desafío abren la puerta a algo más.",
    phrase: "No terminé. Volví a empezar.",
    closes: "La última vuelta siempre es la siguiente.",
  },
  EL_COMPAÑERO: {
    name: "EL COMPAÑERO",
    headline: "Las mejores metas no siempre se cruzan en solitario.",
    message:
      "Entiendes que correr también puede ser una forma de compartir. Disfrutas la energía de los demás y la celebración colectiva de cada kilómetro.",
    phrase: "Correr sabe mejor cuando se comparte.",
    closes: "Corre junto a quienes importan.",
  },
  EL_COMPETIDOR: {
    name: "EL COMPETIDOR",
    headline: "Cada resultado le habla. Y siempre responde con un nuevo desafío.",
    message:
      "Disfrutas medirte. Contra el reloj, contra otros o contra tu propia marca. No corres solamente para terminar; corres para saber cuánto puedes mejorar.",
    phrase: "Mi meta de hoy es el punto de partida de mañana.",
    closes: "Cada resultado es el inicio del siguiente desafío.",
  },
  EL_ESTRATEGA: {
    name: "EL ESTRATEGA",
    headline: "No desperdicia energía. Cada vuelta tiene una intención.",
    message:
      "Corres con la cabeza tanto como con las piernas. Sabes administrar tu ritmo, leer el momento y decidir cuándo avanzar y cuándo resistir.",
    phrase: "No corro más rápido. Corro mejor.",
    closes: "Cada vuelta se gana antes de correrla.",
  },
  EL_INCANSABLE: {
    name: "EL INCANSABLE",
    headline: "Cuando otros frenan, encuentra una razón para seguir.",
    message:
      "No necesariamente eres el más rápido. Tu fuerza está en continuar. Sabes que la carrera cambia cuando aparece el cansancio y que ahí, justo ahí, comienza el verdadero desafío.",
    phrase: "Cuando aparece el cansancio, empieza mi carrera.",
    closes: "Resiste hasta el final.",
  },
  EL_CAMINANTE: {
    name: "EL CAMINANTE",
    headline: "No tiene prisa. Sabe que cada kilómetro también cuenta antes de la meta.",
    message:
      "Entiendes que correr no siempre se trata de ganar, acelerar o demostrar. A veces se trata de avanzar con calma y construir una relación más profunda con el propio cuerpo.",
    phrase: "No corro para llegar rápido. Corro para seguir avanzando.",
    closes: "El camino también es parte del desafío.",
  },
  EL_PRIMERO: {
    name: "EL PRIMERO",
    headline: "No significa llegar antes que todos. Significa atreverse a empezar.",
    message:
      "Tal vez no tienes muchos kilómetros encima. Pero ya tomaste la decisión más importante: presentarte al desafío.",
    phrase: "No llegué primero. Me atreví a empezar.",
    closes: "Todo comienza aquí.",
  },
};

export function computeBrujula(answers: (LetterOption | null)[]): Record<Direction, number> {
  const counts: Record<Direction, number> = {
    descubrir: 0,
    resistir: 0,
    superarte: 0,
    competir: 0,
    compartir: 0,
  };
  for (const ans of answers) {
    if (ans) counts[LETTER_TO_DIRECTION[ans]] += 4;
  }
  const total = 28;
  return {
    descubrir: (counts.descubrir / total) * 100,
    resistir: (counts.resistir / total) * 100,
    superarte: (counts.superarte / total) * 100,
    competir: (counts.competir / total) * 100,
    compartir: (counts.compartir / total) * 100,
  };
}

/** variableOrder = orden de la variable asociada a cada una de las 7 preguntas de nivel. */
export function computeNivel(
  answers: (number | null)[],
  variableOrder: (keyof typeof NIVEL_WEIGHTS)[],
): number {
  let weighted = 0;
  for (let i = 0; i < variableOrder.length; i++) {
    const score = answers[i] ?? 0;
    const pct = (score / 4) * 100;
    weighted += pct * NIVEL_WEIGHTS[variableOrder[i]];
  }
  return weighted; // los pesos ya suman 1
}

export function getNivelLabel(score: number): { level: number; label: string; desc: string } {
  if (score < 25)
    return {
      level: 1,
      label: "Nivel 1 — Inicio",
      desc: "Estás en la línea de salida. Cualquier paso que des hoy es el primero de tu carrera.",
    };
  if (score < 45)
    return {
      level: 2,
      label: "Nivel 2 — Base",
      desc: "Ya calentaste motores. Estás en condiciones de tomar la salida en tu primer desafío.",
    };
  if (score < 65)
    return {
      level: 3,
      label: "Nivel 3 — Desarrollo",
      desc: "Tu zancada ya es constante. Puedes atacar retos intermedios y seguir subiendo de nivel.",
    };
  if (score < 85)
    return {
      level: 4,
      label: "Nivel 4 — Resistencia",
      desc: "Sabes administrar tu energía y sostener el ritmo. El fondo es tu terreno.",
    };
  return {
    level: 5,
    label: "Nivel 5 — Alto rendimiento",
    desc: "Estás en modo competencia. Los retos más exigentes del circuito son para ti.",
  };
}

export function getLevelAdjust(userLevel: number, recommendedLevels: number[]): number {
  const closest = recommendedLevels.reduce((a, b) =>
    Math.abs(b - userLevel) < Math.abs(a - userLevel) ? b : a,
  );
  const diff = closest - userLevel;
  if (diff === 0) return 100;
  if (diff === -1) return 90;
  if (diff <= -2) return 75;
  if (diff === 1) return 70;
  if (diff === 2) return 35;
  return 0;
}

export function computeModalAffinity(
  brujula: Record<Direction, number>,
  userLevel: number,
): { key: ModalKey; name: string; affinity: number }[] {
  const MODAL_KEYS: ModalKey[] = ["5K", "10K", "LUV", "CPC", "LUV_PRO", "TEAMS"];
  return MODAL_KEYS.map((key) => {
    const emotionalAff = (Object.keys(MODAL_EMOTIONAL_AFFINITY[key]) as Direction[]).reduce(
      (sum, dir) => sum + (brujula[dir] / 100) * MODAL_EMOTIONAL_AFFINITY[key][dir],
      0,
    );
    const levelAdj = getLevelAdjust(userLevel, MODAL_RECOMMENDED_LEVELS[key]) / 100;
    const affinity = emotionalAff * 0.7 + levelAdj * 0.3;
    return { key, name: MODAL_NAMES[key], affinity: Math.round(affinity * 100) };
  }).sort((a, b) => b.affinity - a.affinity);
}

export function getArchetype(brujula: Record<Direction, number>, userLevel: number): ArchetypeKey {
  const sorted = (Object.entries(brujula) as [Direction, number][]).sort((a, b) => b[1] - a[1]);
  const top1 = sorted[0][0];
  const top2 = sorted[1][0];

  const inTop2 = (d: Direction) => top1 === d || top2 === d;

  if (inTop2("resistir") && inTop2("superarte") && userLevel >= 3) return "EL_QUE_VUELVE";
  if (top1 === "compartir" || inTop2("compartir")) return "EL_COMPAÑERO";
  if (top1 === "competir") return "EL_COMPETIDOR";
  if (top1 === "resistir" && (top2 === "superarte" || top2 === "competir") && userLevel >= 3)
    return "EL_ESTRATEGA";
  if (top1 === "resistir") return "EL_INCANSABLE";
  if ((top1 === "descubrir" || top1 === "superarte") && brujula.competir < 25)
    return "EL_CAMINANTE";
  return "EL_PRIMERO";
}
