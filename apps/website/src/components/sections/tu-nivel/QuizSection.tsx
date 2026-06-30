import { useState, useCallback, useMemo } from "react";
import { m, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw, ChevronRight } from "lucide-react";
import { EASE } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { QuizOption } from "./QuizOption";

// ─── Types ────────────────────────────────────────────────────────────────────

type Direction = "descubrir" | "resistir" | "superarte" | "competir" | "compartir";
type LetterOption = "A" | "B" | "C" | "D" | "E";

interface BrujulaQuestion {
  text: string;
  options: { letter: LetterOption; label: string }[];
}

interface NivelQuestion {
  variable: keyof typeof NIVEL_WEIGHTS;
  text: string;
  options: { letter: LetterOption; label: string; score: number }[];
}

// ─── Brújula Questions ────────────────────────────────────────────────────────

const BRUJULA_QUESTIONS: BrujulaQuestion[] = [
  {
    text: "¿Qué te trae hoy a runluv®?",
    options: [
      { letter: "A", label: "Quiero probar algo nuevo." },
      { letter: "B", label: "Quiero poner a prueba mi resistencia." },
      { letter: "C", label: "Quiero mejorar mi condición o mi distancia." },
      { letter: "D", label: "Quiero competir y medir mi rendimiento." },
      { letter: "E", label: "Quiero vivir la experiencia con alguien más." },
    ],
  },
  {
    text: "¿Qué frase se parece más a lo que estás buscando?",
    options: [
      { letter: "A", label: "Quiero descubrir hasta dónde puedo llegar." },
      { letter: "B", label: "Quiero seguir aunque aparezca el cansancio." },
      { letter: "C", label: "Quiero ser mejor que antes." },
      { letter: "D", label: "Quiero medirme contra mi marca o contra otros." },
      { letter: "E", label: "Quiero compartir el camino." },
    ],
  },
  {
    text: "Cuando piensas en correr, ¿qué te emociona más?",
    options: [
      { letter: "A", label: "Vivir algo que nunca he probado." },
      { letter: "B", label: "Mantenerme en movimiento hasta el final." },
      { letter: "C", label: "Ver mi progreso." },
      { letter: "D", label: "Buscar un mejor resultado." },
      { letter: "E", label: "El ambiente, la gente y la convivencia." },
    ],
  },
  {
    text: "Cuando aparece el cansancio, normalmente piensas:",
    options: [
      { letter: "A", label: '"Quiero saber qué pasa si sigo un poco más."' },
      { letter: "B", label: '"No me voy a detener."' },
      { letter: "C", label: '"Esto me va a hacer más fuerte."' },
      { letter: "D", label: '"Puedo apretar y ganar tiempo."' },
      { letter: "E", label: '"Con apoyo se llega mejor."' },
    ],
  },
  {
    text: "¿Qué te gustaría sentir al terminar?",
    options: [
      { letter: "A", label: '"No sabía que podía hacerlo."' },
      { letter: "B", label: '"Resistí hasta el final."' },
      { letter: "C", label: '"Hoy fui mejor que antes."' },
      { letter: "D", label: '"Di mi mejor carrera."' },
      { letter: "E", label: '"Lo vivimos juntos."' },
    ],
  },
  {
    text: "¿Qué tipo de desafío te atrae más?",
    options: [
      { letter: "A", label: "Uno que me abra la puerta a algo nuevo." },
      { letter: "B", label: "Uno que me obligue a administrar mi energía." },
      { letter: "C", label: "Uno que me ayude a avanzar al siguiente nivel." },
      { letter: "D", label: "Uno donde el resultado importe." },
      { letter: "E", label: "Uno que pueda compartir con otra persona o equipo." },
    ],
  },
  {
    text: "Si tuvieras que elegir una razón para volver a correr, sería:",
    options: [
      { letter: "A", label: "Descubrir un nuevo límite." },
      { letter: "B", label: "Demostrarme que puedo continuar." },
      { letter: "C", label: "Seguir creciendo." },
      { letter: "D", label: "Mejorar mi resultado." },
      { letter: "E", label: "Volver a vivirlo con otros." },
    ],
  },
];

// ─── Nivel Questions ──────────────────────────────────────────────────────────

const NIVEL_QUESTIONS: NivelQuestion[] = [
  {
    variable: "frecuencia",
    text: "¿Con qué frecuencia corres actualmente?",
    options: [
      { letter: "A", label: "Casi nunca.", score: 0 },
      { letter: "B", label: "Una vez por semana.", score: 1 },
      { letter: "C", label: "Dos veces por semana.", score: 2 },
      { letter: "D", label: "Tres o cuatro veces por semana.", score: 3 },
      { letter: "E", label: "Cinco veces por semana o más.", score: 4 },
    ],
  },
  {
    variable: "largaDistancia",
    text: "¿Cuál ha sido tu mayor distancia reciente?",
    options: [
      { letter: "A", label: "Nunca he corrido una carrera.", score: 0 },
      { letter: "B", label: "Hasta 5K.", score: 1 },
      { letter: "C", label: "Hasta 10K.", score: 2 },
      { letter: "D", label: "Medio maratón o distancia similar.", score: 3 },
      { letter: "E", label: "Maratón, ultra o pruebas de resistencia.", score: 4 },
    ],
  },
  {
    variable: "consistencia",
    text: "En los últimos dos meses, ¿qué tan constante ha sido tu entrenamiento?",
    options: [
      { letter: "A", label: "No he entrenado.", score: 0 },
      { letter: "B", label: "He entrenado de forma irregular.", score: 1 },
      { letter: "C", label: "He entrenado algunas semanas sí y otras no.", score: 2 },
      { letter: "D", label: "He entrenado casi todas las semanas.", score: 3 },
      { letter: "E", label: "He entrenado de forma constante.", score: 4 },
    ],
  },
  {
    variable: "experiencia",
    text: "¿Cuánta experiencia tienes en eventos o carreras?",
    options: [
      { letter: "A", label: "Nunca he participado.", score: 0 },
      { letter: "B", label: "He participado en una carrera recreativa.", score: 1 },
      { letter: "C", label: "He participado en varias carreras.", score: 2 },
      { letter: "D", label: "Participo con cierta frecuencia.", score: 3 },
      { letter: "E", label: "Compito o participo con regularidad.", score: 4 },
    ],
  },
  {
    variable: "autonomia",
    text: "¿Qué tan cómodo te sientes manteniendo un esfuerzo prolongado?",
    options: [
      { letter: "A", label: "Me cuesta sostener el esfuerzo.", score: 0 },
      { letter: "B", label: "Puedo sostenerlo poco tiempo.", score: 1 },
      { letter: "C", label: "Puedo sostenerlo si administro mi ritmo.", score: 2 },
      { letter: "D", label: "Me siento cómodo en esfuerzos largos.", score: 3 },
      { letter: "E", label: "Disfruto los esfuerzos largos y exigentes.", score: 4 },
    ],
  },
  {
    variable: "preparacion",
    text: "¿Cómo llegas físicamente a este momento?",
    options: [
      { letter: "A", label: "Apenas estoy retomando actividad física.", score: 0 },
      { letter: "B", label: "Estoy activo, pero sin entrenar formalmente.", score: 1 },
      { letter: "C", label: "Me siento en condiciones para correr una distancia corta.", score: 2 },
      { letter: "D", label: "Me siento preparado para un reto intermedio.", score: 3 },
      { letter: "E", label: "Me siento listo para un desafío exigente.", score: 4 },
    ],
  },
  {
    variable: "tiempo",
    text: "¿Cuánto tiempo real puedes dedicar a prepararte?",
    options: [
      { letter: "A", label: "No puedo entrenar de forma regular.", score: 0 },
      { letter: "B", label: "Puedo entrenar 1 día por semana.", score: 1 },
      { letter: "C", label: "Puedo entrenar 2 días por semana.", score: 2 },
      { letter: "D", label: "Puedo entrenar 3 o 4 días por semana.", score: 3 },
      { letter: "E", label: "Puedo entrenar 5 días o más por semana.", score: 4 },
    ],
  },
];

// ─── Weights & Mappings ───────────────────────────────────────────────────────

const NIVEL_WEIGHTS = {
  largaDistancia: 0.25,
  frecuencia: 0.2,
  consistencia: 0.15,
  autonomia: 0.15,
  experiencia: 0.1,
  preparacion: 0.1,
  tiempo: 0.05,
} as const;

const LETTER_TO_DIRECTION: Record<LetterOption, Direction> = {
  A: "descubrir",
  B: "resistir",
  C: "superarte",
  D: "competir",
  E: "compartir",
};

const DIRECTION_LABELS: Record<Direction, string> = {
  descubrir: "DESCUBRIR",
  resistir: "RESISTIR",
  superarte: "SUPERARTE",
  competir: "COMPETIR",
  compartir: "COMPARTIR",
};

// ─── Modalidades ──────────────────────────────────────────────────────────────

type ModalKey = "5K" | "10K" | "LUV" | "CPC" | "LUV_PRO" | "TEAMS";

const MODAL_EMOTIONAL_AFFINITY: Record<ModalKey, Record<Direction, number>> = {
  "5K": { descubrir: 0.4, compartir: 0.25, superarte: 0.2, resistir: 0.1, competir: 0.05 },
  "10K": { superarte: 0.35, descubrir: 0.2, resistir: 0.2, competir: 0.15, compartir: 0.1 },
  LUV: { resistir: 0.35, competir: 0.25, superarte: 0.2, descubrir: 0.1, compartir: 0.1 },
  CPC: { resistir: 0.5, superarte: 0.2, competir: 0.15, compartir: 0.1, descubrir: 0.05 },
  LUV_PRO: { competir: 0.45, superarte: 0.25, resistir: 0.2, descubrir: 0.05, compartir: 0.05 },
  TEAMS: { compartir: 0.5, resistir: 0.15, competir: 0.15, descubrir: 0.1, superarte: 0.1 },
};

const MODAL_RECOMMENDED_LEVELS: Record<ModalKey, number[]> = {
  "5K": [1, 2],
  "10K": [2, 3],
  LUV: [3, 4],
  CPC: [4, 5],
  LUV_PRO: [5],
  TEAMS: [1, 2, 3, 4, 5],
};

const MODAL_NAMES: Record<ModalKey, string> = {
  "5K": "5K",
  "10K": "10K",
  LUV: "La Última Vuelta",
  CPC: "Cada Paso Cuenta",
  LUV_PRO: "LUV Pro",
  TEAMS: "Teams / Doubles",
};

const MODAL_DESCRIPTIONS: Record<ModalKey, string> = {
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

// ─── Archetypes ───────────────────────────────────────────────────────────────

type ArchetypeKey =
  | "EL_QUE_VUELVE"
  | "EL_COMPAÑERO"
  | "EL_COMPETIDOR"
  | "EL_ESTRATEGA"
  | "EL_INCANSABLE"
  | "EL_CAMINANTE"
  | "EL_PRIMERO";

interface Archetype {
  name: string;
  headline: string;
  message: string;
  phrase: string;
  closes: string;
}

const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
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

// ─── Algorithm ────────────────────────────────────────────────────────────────

function computeBrujula(answers: (LetterOption | null)[]): Record<Direction, number> {
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

function computeNivel(answers: (number | null)[]): number {
  const variables = Object.keys(NIVEL_WEIGHTS) as (keyof typeof NIVEL_WEIGHTS)[];
  let weighted = 0;
  for (let i = 0; i < NIVEL_QUESTIONS.length; i++) {
    const q = NIVEL_QUESTIONS[i];
    const score = answers[i] ?? 0;
    const pct = (score / 4) * 100;
    weighted += pct * NIVEL_WEIGHTS[q.variable];
  }
  // Re-weight by variables order
  let total = 0;
  for (let i = 0; i < variables.length; i++) {
    total += NIVEL_WEIGHTS[variables[i]];
  }
  return weighted; // weights already sum to 1
}

function getNivelLabel(score: number): { level: number; label: string; desc: string } {
  if (score < 25)
    return {
      level: 1,
      label: "Nivel 1 — Inicio",
      desc: "Estás comenzando. Cualquier paso que des hoy es el primero.",
    };
  if (score < 45)
    return {
      level: 2,
      label: "Nivel 2 — Base",
      desc: "Tienes una base inicial. Puedes asumir un primer desafío.",
    };
  if (score < 65)
    return {
      level: 3,
      label: "Nivel 3 — Desarrollo",
      desc: "Puedes asumir retos intermedios y seguir creciendo.",
    };
  if (score < 85)
    return {
      level: 4,
      label: "Nivel 4 — Resistencia",
      desc: "Puedes asumir desafíos que requieren administrar tu energía y sostenerte.",
    };
  return {
    level: 5,
    label: "Nivel 5 — Alto rendimiento",
    desc: "Puedes asumir retos avanzados y exigentes.",
  };
}

function getLevelAdjust(userLevel: number, recommendedLevels: number[]): number {
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

function computeModalAffinity(
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

function getArchetype(brujula: Record<Direction, number>, userLevel: number): ArchetypeKey {
  const sorted = (Object.entries(brujula) as [Direction, number][]).sort((a, b) => b[1] - a[1]);
  const top1 = sorted[0][0];
  const top2 = sorted[1][0];

  const inTop2 = (d: Direction) => top1 === d || top2 === d;

  // 1. EL_QUE_VUELVE
  if (inTop2("resistir") && inTop2("superarte") && userLevel >= 3) return "EL_QUE_VUELVE";
  // 2. EL_COMPAÑERO
  if (top1 === "compartir" || inTop2("compartir")) return "EL_COMPAÑERO";
  // 3. EL_COMPETIDOR
  if (top1 === "competir") return "EL_COMPETIDOR";
  // 4. EL_ESTRATEGA
  if (top1 === "resistir" && (top2 === "superarte" || top2 === "competir") && userLevel >= 3)
    return "EL_ESTRATEGA";
  // 5. EL_INCANSABLE
  if (top1 === "resistir") return "EL_INCANSABLE";
  // 6. EL_CAMINANTE
  if ((top1 === "descubrir" || top1 === "superarte") && brujula.competir < 25)
    return "EL_CAMINANTE";
  // 7. EL_PRIMERO (default)
  return "EL_PRIMERO";
}

// ─── Quiz Component ───────────────────────────────────────────────────────────

const TOTAL_QUESTIONS = 14;

const slideVariants: Variants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export function QuizSection() {
  const [step, setStep] = useState(0); // 0-13 = questions, 14 = result
  const [brujulaAnswers, setBrujulaAnswers] = useState<(LetterOption | null)[]>(
    Array(7).fill(null),
  );
  const [nivelAnswers, setNivelAnswers] = useState<(number | null)[]>(Array(7).fill(null));

  const currentAnswer: LetterOption | null | number =
    step < 7 ? brujulaAnswers[step] : nivelAnswers[step - 7];

  const handleSelectBrujula = useCallback(
    (letter: LetterOption) => {
      setBrujulaAnswers((prev) => {
        const next = [...prev];
        next[step] = letter;
        return next;
      });
    },
    [step],
  );

  const handleSelectNivel = useCallback(
    (score: number) => {
      setNivelAnswers((prev) => {
        const next = [...prev];
        next[step - 7] = score;
        return next;
      });
    },
    [step],
  );

  const handleNext = useCallback(() => {
    if (step < TOTAL_QUESTIONS - 1) {
      setStep((s) => s + 1);
    } else {
      setStep(TOTAL_QUESTIONS); // show result
    }
  }, [step]);

  const handleReset = useCallback(() => {
    setStep(0);
    setBrujulaAnswers(Array(7).fill(null));
    setNivelAnswers(Array(7).fill(null));
  }, []);

  // ── Result calculation ──
  const result = useMemo(() => {
    if (step < TOTAL_QUESTIONS) return null;
    const brujula = computeBrujula(brujulaAnswers);
    const nivelScore = computeNivel(nivelAnswers);
    const nivelInfo = getNivelLabel(nivelScore);
    const modalities = computeModalAffinity(brujula, nivelInfo.level);
    const archetypeKey = getArchetype(brujula, nivelInfo.level);
    const archetype = ARCHETYPES[archetypeKey];
    const sortedBrujula = (Object.entries(brujula) as [Direction, number][]).sort(
      (a, b) => b[1] - a[1],
    );
    return {
      brujula,
      sortedBrujula,
      topDirection: sortedBrujula[0][0] as Direction,
      nivelInfo,
      modalities,
      primary: modalities[0],
      alternatives: modalities.slice(1, 3),
      archetype,
      archetypeKey,
    };
  }, [step, brujulaAnswers, nivelAnswers]);

  const isBrujula = step < 7;
  const nivelIndex = step - 7;

  return (
    <section className="w-full bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait" initial={false}>
          {step < TOTAL_QUESTIONS ? (
            <m.div
              key={`question-${step}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
                    {isBrujula
                      ? `Brújula — pregunta ${step + 1} de 7`
                      : `Tu nivel — pregunta ${nivelIndex + 1} de 7`}
                  </span>
                  <span className="tabular-nums text-xs text-white/30">
                    {step + 1} / {TOTAL_QUESTIONS}
                  </span>
                </div>
                <div className="h-[2px] w-full bg-white/10">
                  <m.div
                    className="h-full bg-white"
                    initial={false}
                    animate={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </div>
              </div>

              {/* Question */}
              <p className="mb-7 text-balance text-xl font-medium leading-snug text-white sm:text-2xl">
                {isBrujula ? BRUJULA_QUESTIONS[step].text : NIVEL_QUESTIONS[nivelIndex].text}
              </p>

              {/* Options */}
              <div role="radiogroup" className="space-y-2">
                {isBrujula
                  ? BRUJULA_QUESTIONS[step].options.map((opt) => (
                      <QuizOption
                        key={opt.letter}
                        id={opt.letter}
                        label={`${opt.letter}) ${opt.label}`}
                        selected={brujulaAnswers[step] === opt.letter}
                        onSelect={handleSelectBrujula}
                      />
                    ))
                  : NIVEL_QUESTIONS[nivelIndex].options.map((opt) => (
                      <QuizOption
                        key={opt.letter}
                        id={String(opt.score)}
                        label={`${opt.letter}) ${opt.label}`}
                        selected={nivelAnswers[nivelIndex] === opt.score}
                        onSelect={(s) => handleSelectNivel(Number(s))}
                      />
                    ))}
              </div>

              {/* Next button */}
              <m.div
                initial={false}
                animate={currentAnswer !== null ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="mt-6"
              >
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentAnswer === null}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 border px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-150 active:scale-[0.96]",
                    currentAnswer !== null
                      ? "border-white bg-white text-black hover:bg-white/90"
                      : "pointer-events-none border-white/10 bg-white/5 text-white/20",
                  )}
                >
                  {step === TOTAL_QUESTIONS - 1 ? "Ver mi resultado" : "Siguiente"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </m.div>
            </m.div>
          ) : result ? (
            <m.div
              key="result"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-10"
            >
              {/* ── 1. Brújula ── */}
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/40">
                  Tu brújula apunta a
                </p>
                <p
                  className="text-balance text-6xl leading-none tracking-wider text-white uppercase sm:text-7xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {DIRECTION_LABELS[result.topDirection]}
                </p>
              </div>

              {/* ── 2. ADN runluv® ── */}
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                  Tu ADN runluv®
                </p>
                <div className="space-y-3">
                  {result.sortedBrujula.map(([dir, pct], i) => (
                    <m.div
                      key={dir}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.35, ease: EASE }}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                          {DIRECTION_LABELS[dir as Direction]}
                        </span>
                        <span className="tabular-nums text-xs text-white/50">
                          {Math.round(pct)}%
                        </span>
                      </div>
                      <div className="h-[3px] w-full bg-white/10">
                        <m.div
                          className="h-full bg-white"
                          initial={{ width: "0%" }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: i * 0.1 + 0.1, duration: 0.7, ease: EASE }}
                        />
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>

              {/* ── 3. Arquetipo ── */}
              <div className="border border-white/10 bg-white/[0.03] p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/40">
                  Tu arquetipo
                </p>
                <p
                  className="mb-3 text-4xl leading-none tracking-wider text-white uppercase sm:text-5xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {result.archetype.name}
                </p>
                <p className="mb-3 text-pretty text-sm font-semibold leading-relaxed text-white">
                  {result.archetype.headline}
                </p>
                <p className="mb-4 text-pretty text-sm leading-relaxed text-white/60">
                  {result.archetype.message}
                </p>
                <p className="border-l-2 border-white/20 pl-4 text-sm italic text-white/50">
                  "{result.archetype.phrase}"
                </p>
              </div>

              {/* ── 4. Tu fortaleza (Nivel) ── */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                  Tu fortaleza
                </p>
                <p
                  className="mb-1 text-3xl leading-none tracking-wider text-white uppercase sm:text-4xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {result.nivelInfo.label}
                </p>
                <p className="text-pretty text-sm leading-relaxed text-white/60">
                  {result.nivelInfo.desc}
                </p>
              </div>

              {/* ── 5. Tu desafío ── */}
              <div className="border border-white bg-white/5 p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/40">
                  Tu desafío
                </p>
                <p
                  className="mb-3 text-5xl leading-none tracking-wider text-white uppercase sm:text-6xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {result.primary.name}
                </p>
                <p className="text-pretty text-sm leading-relaxed text-white/60">
                  {MODAL_DESCRIPTIONS[result.primary.key]}
                </p>
              </div>

              {/* ── 6. También podrías disfrutar ── */}
              {result.alternatives.length > 0 && (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
                    También podrías disfrutar
                  </p>
                  <div className="space-y-2">
                    {result.alternatives.map((alt) => (
                      <div
                        key={alt.key}
                        className="flex items-center justify-between border border-white/10 px-4 py-3"
                      >
                        <span className="text-sm font-medium text-white">{alt.name}</span>
                        <span className="tabular-nums text-xs text-white/40">{alt.affinity}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── 7. Frase de cierre ── */}
              <div className="border-t border-white/10 pt-8 text-center">
                <p
                  className="text-balance text-2xl leading-snug tracking-wider text-white uppercase sm:text-3xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {result.archetype.closes}
                </p>
              </div>

              {/* ── 8. Botones ── */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/eventos"
                  className="flex items-center justify-center gap-2 bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-150 active:scale-[0.96] hover:bg-white/90"
                >
                  Inscribirme
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/la-carrera"
                  className="flex items-center justify-center gap-2 border border-white px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-150 active:scale-[0.96] hover:bg-white/5"
                >
                  Descubrir otros desafíos
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm text-white/40 transition-all duration-150 active:scale-[0.96] hover:text-white/70"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Volver a empezar
                </button>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
