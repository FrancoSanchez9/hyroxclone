import { useCallback, useMemo, useReducer, useRef, useEffect } from "react";
import { m, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { toast } from "sonner";
import { EASE } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { getSupabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";
import { QuizLeadForm, type QuizLead } from "./QuizLeadForm";
import {
  type Direction,
  type LetterOption,
  NIVEL_WEIGHTS,
  DIRECTION_LABELS,
  ARCHETYPES,
  computeBrujula,
  computeNivel,
  getNivelLabel,
  computeModalAffinity,
  getArchetype,
} from "@/lib/quiz-scoring";
import { QuizIntroScreen } from "./QuizIntroScreen";
import { QuizQuestionScreen } from "./QuizQuestionScreen";
import { QuizResultScreen } from "./QuizResultScreen";
import { ACCENT } from "@/lib/theme";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BrujulaQuestion {
  text: string;
  options: { letter: LetterOption; label: string }[];
}

export interface NivelQuestion {
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

// ─── Quiz Component ───────────────────────────────────────────────────────────

const TOTAL_QUESTIONS = 14;

// ─── Share card (Spotify-Wrapped-style 9:16 story image) ─────────────────────

interface ShareCardData {
  name: string;
  direction: string;
  bars: { label: string; pct: number }[];
  archetypeName: string;
  phrase: string;
  challengeName: string;
  affinity: number;
  levelLabel: string;
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function generateShareImage(data: ShareCardData): Promise<Blob> {
  await Promise.all([
    document.fonts.load("100px 'Bebas Neue'"),
    document.fonts.load("bold 32px Inter"),
  ]);

  const W = 1080;
  const H = 1920;
  const M = 80; // margin
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D & { letterSpacing: string };

  // Background — dark gradient + lane lines + lime glow
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#000000");
  bg.addColorStop(1, "#101204");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(255,255,255,0.04)";
  for (let x = 120; x < W; x += 120) ctx.fillRect(x, 0, 2, H);

  const glow = ctx.createRadialGradient(W * 0.88, H * 0.12, 0, W * 0.88, H * 0.12, 520);
  glow.addColorStop(0, "rgba(212,255,0,0.16)");
  glow.addColorStop(1, "rgba(212,255,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Header — personalised brand line, auto-shrunk so long names still fit the margin
  ctx.letterSpacing = "8px";
  ctx.fillStyle = ACCENT;
  const header = data.name ? `EL ADN RUNLUV® DE ${data.name.toUpperCase()}` : "MI ADN RUNLUV®";
  let headerSize = 34;
  ctx.font = `bold ${headerSize}px Inter, sans-serif`;
  while (ctx.measureText(header).width > W - M * 2 && headerSize > 20) {
    headerSize -= 2;
    ctx.font = `bold ${headerSize}px Inter, sans-serif`;
  }
  ctx.fillText(header, M, 190);
  ctx.letterSpacing = "0px";

  // Direction — the giant lime payoff
  ctx.font = "190px 'Bebas Neue', sans-serif";
  ctx.fillStyle = ACCENT;
  ctx.fillText(data.direction, M, 400);

  // ADN bars
  let y = 520;
  ctx.letterSpacing = "4px";
  ctx.font = "bold 28px Inter, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillText("TU ADN RUNLUV®", M, y);
  ctx.letterSpacing = "0px";
  y += 60;
  const barW = W - M * 2;
  data.bars.forEach((bar, i) => {
    ctx.font = "bold 30px Inter, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText(bar.label, M, y);
    const pctText = `${Math.round(bar.pct)}%`;
    ctx.fillStyle = i === 0 ? ACCENT : "rgba(255,255,255,0.5)";
    ctx.fillText(pctText, W - M - ctx.measureText(pctText).width, y);
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(M, y + 18, barW, 10);
    ctx.fillStyle = i === 0 ? ACCENT : "rgba(255,255,255,0.8)";
    ctx.fillRect(M, y + 18, barW * (bar.pct / 100), 10);
    y += 96;
  });

  // Archetype
  y += 60;
  ctx.letterSpacing = "4px";
  ctx.font = "bold 28px Inter, sans-serif";
  ctx.fillStyle = ACCENT;
  ctx.fillText("MI ARQUETIPO", M, y);
  ctx.letterSpacing = "0px";
  y += 100;
  ctx.font = "110px 'Bebas Neue', sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(data.archetypeName, M, y);
  y += 56;
  ctx.font = "italic 32px Inter, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  for (const line of wrapLines(ctx, `"${data.phrase}"`, W - M * 2)) {
    ctx.fillText(line, M, y);
    y += 44;
  }

  // Challenge — inverted lime card
  const cardY = 1440;
  const cardH = 330;
  ctx.fillStyle = ACCENT;
  ctx.fillRect(M, cardY, W - M * 2, cardH);
  ctx.letterSpacing = "4px";
  ctx.font = "bold 28px Inter, sans-serif";
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillText(`MI DESAFÍO — ${data.affinity}% DE AFINIDAD`, M + 48, cardY + 76);
  ctx.letterSpacing = "0px";
  ctx.font = "140px 'Bebas Neue', sans-serif";
  ctx.fillStyle = "#000000";
  ctx.fillText(data.challengeName, M + 48, cardY + 210);
  ctx.letterSpacing = "4px";
  ctx.font = "bold 28px Inter, sans-serif";
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillText(data.levelLabel.toUpperCase(), M + 48, cardY + 276);
  ctx.letterSpacing = "0px";

  // Footer
  ctx.letterSpacing = "6px";
  ctx.font = "bold 28px Inter, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fillText("¿CUÁL ES TU SIGUIENTE VUELTA?", M, 1850);
  ctx.fillStyle = ACCENT;
  const runluvText = "RUNLUV.MX";
  ctx.fillText(runluvText, W - M - ctx.measureText(runluvText).width, 1850);
  ctx.letterSpacing = "0px";

  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas.toBlob failed"))), "image/png");
  });
}

const EXIT_EASE = [0.4, 0, 1, 1] as const;
const ANSWER_CONFIRMATION_MS = 220;

function getSlideVariants(shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    return {
      enter: { opacity: 1 },
      center: { opacity: 1, transition: { duration: 0 } },
      exit: { opacity: 0, transition: { duration: 0.08 } },
    };
  }

  return {
    enter: { opacity: 0, x: 16 },
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.16, ease: EASE },
    },
    exit: {
      opacity: 0,
      x: -8,
      transition: { duration: 0.08, ease: EXIT_EASE },
    },
  };
}

function getSectionVariants(shouldReduceMotion: boolean): Variants {
  return shouldReduceMotion
    ? {
        enter: { opacity: 1 },
        center: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        enter: { opacity: 0, y: 8 },
        center: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE } },
      };
}

interface QuizState {
  started: boolean; // intro screen before question 1
  step: number; // 0-13 = questions, 14 = result
  brujulaAnswers: (LetterOption | null)[];
  nivelAnswers: (number | null)[];
  lead: QuizLead | null; // captured before the result reveal
}

type QuizAction =
  | { type: "start" }
  | { type: "selectBrujula"; letter: LetterOption }
  | { type: "selectNivel"; score: number }
  | { type: "advance" }
  | { type: "back" }
  | { type: "reset" }
  | { type: "setLead"; lead: QuizLead };

function initialQuizState(): QuizState {
  return {
    started: false,
    step: 0,
    brujulaAnswers: Array(7).fill(null),
    nivelAnswers: Array(7).fill(null),
    lead: null,
  };
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "start":
      return { ...state, started: true };
    case "selectBrujula": {
      const next = [...state.brujulaAnswers];
      next[state.step] = action.letter;
      return { ...state, brujulaAnswers: next };
    }
    case "selectNivel": {
      const next = [...state.nivelAnswers];
      next[state.step - 7] = action.score;
      return { ...state, nivelAnswers: next };
    }
    case "advance":
      return { ...state, step: Math.min(state.step + 1, TOTAL_QUESTIONS) };
    case "back":
      return { ...state, step: Math.max(0, state.step - 1) };
    case "reset":
      return initialQuizState();
    case "setLead":
      return { ...state, lead: action.lead };
    default:
      return state;
  }
}

export interface QuizResult {
  brujula: Record<Direction, number>;
  sortedBrujula: [Direction, number][];
  topDirection: Direction;
  nivelScore: number;
  nivelInfo: ReturnType<typeof getNivelLabel>;
  modalities: ReturnType<typeof computeModalAffinity>;
  primary: ReturnType<typeof computeModalAffinity>[number];
  alternatives: ReturnType<typeof computeModalAffinity>;
  archetype: (typeof ARCHETYPES)[keyof typeof ARCHETYPES];
  archetypeKey: ReturnType<typeof getArchetype>;
}

function computeQuizResult(
  brujulaAnswers: (LetterOption | null)[],
  nivelAnswers: (number | null)[],
): QuizResult {
  const brujula = computeBrujula(brujulaAnswers);
  const nivelScore = computeNivel(
    nivelAnswers,
    NIVEL_QUESTIONS.map((q) => q.variable),
  );
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
    nivelScore,
    nivelInfo,
    modalities,
    primary: modalities[0],
    alternatives: modalities.slice(1, 3),
    archetype,
    archetypeKey,
  };
}

export function QuizSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const slideVariants = getSlideVariants(shouldReduceMotion);
  const sectionV = getSectionVariants(shouldReduceMotion);
  const [{ started, step, brujulaAnswers, nivelAnswers, lead }, dispatch] = useReducer(
    quizReducer,
    undefined,
    initialQuizState,
  );
  const savedRef = useRef(false); // guards the one-time persist

  // Auto-advance: selecting an answer moves to the next question after a beat,
  // long enough to see the lime selection land.
  const advanceTimer = useRef<number | null>(null);
  const clearAdvance = useCallback(() => {
    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }, []);
  const scheduleAdvance = useCallback(() => {
    clearAdvance();
    advanceTimer.current = window.setTimeout(() => {
      dispatch({ type: "advance" });
    }, ANSWER_CONFIRMATION_MS);
  }, [clearAdvance]);
  useEffect(() => clearAdvance, [clearAdvance]);

  const handleSelectBrujula = useCallback(
    (letter: LetterOption) => {
      dispatch({ type: "selectBrujula", letter });
      scheduleAdvance();
    },
    [scheduleAdvance],
  );

  const handleSelectNivel = useCallback(
    (score: number) => {
      dispatch({ type: "selectNivel", score });
      scheduleAdvance();
    },
    [scheduleAdvance],
  );

  const handleBack = useCallback(() => {
    clearAdvance();
    dispatch({ type: "back" });
  }, [clearAdvance]);

  const handleReset = useCallback(() => {
    clearAdvance();
    dispatch({ type: "reset" });
    savedRef.current = false;
  }, [clearAdvance]);

  // ── Result calculation ──
  const result = useMemo(
    () => (step < TOTAL_QUESTIONS ? null : computeQuizResult(brujulaAnswers, nivelAnswers)),
    [step, brujulaAnswers, nivelAnswers],
  );

  // Capture the respondent, reveal the result, and persist (once). Fire-and-forget:
  // sin Supabase el quiz igual revela el resultado — solo no persiste.
  const handleCapture = useCallback(
    (data: QuizLead) => {
      dispatch({ type: "setLead", lead: data });
      if (!result || savedRef.current) return;
      savedRef.current = true;

      trackEvent("quiz_completed", {
        archetype: result.archetype.name,
        recommendedModality: result.primary.name,
        level: result.nivelInfo.level,
        levelPct: Math.round(result.nivelScore),
      });

      void getSupabase().then(async (supabase) => {
        if (!supabase) return;
        const { error } = await supabase.from("quiz_results").insert({
          name: data.name,
          descubrir: Math.round(result.brujula.descubrir),
          resistir: Math.round(result.brujula.resistir),
          superarte: Math.round(result.brujula.superarte),
          competir: Math.round(result.brujula.competir),
          compartir: Math.round(result.brujula.compartir),
          nivel: result.nivelInfo.level,
          nivel_pct: Math.round(result.nivelScore),
          archetype: result.archetype.name,
          recommended_modality: result.primary.name,
          affinities: result.modalities.map((mo) => ({ name: mo.name, affinity: mo.affinity })),
        });
        // ponytail: fallo silencioso — guardar nunca debe romper la UX del quiz.
        if (error) console.warn("quiz_results insert:", error.message);
      });
    },
    [result],
  );

  const handleShare = useCallback(async () => {
    if (!result) return;
    const text = `Mi ADN runluv®: ${DIRECTION_LABELS[result.topDirection]} · Arquetipo: ${result.archetype.name} · Mi desafío: ${result.primary.name} (${result.primary.affinity}% de afinidad)`;

    try {
      const blob = await generateShareImage({
        name: lead?.name ?? "",
        direction: DIRECTION_LABELS[result.topDirection],
        bars: result.sortedBrujula.map(([dir, pct]) => ({
          label: DIRECTION_LABELS[dir as Direction],
          pct,
        })),
        archetypeName: result.archetype.name,
        phrase: result.archetype.phrase,
        challengeName: result.primary.name,
        affinity: result.primary.affinity,
        levelLabel: result.nivelInfo.label,
      });
      const file = new File([blob], "mi-adn-runluv.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        // Mobile: native sheet → WhatsApp, Instagram Stories, etc.
        await navigator.share({ files: [file], title: "Mi resultado runluv®", text });
      } else {
        // Desktop: download the story image
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mi-adn-runluv.png";
        a.click();
        URL.revokeObjectURL(url);
        toast("Imagen descargada — súbela a tus historias");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return; // user closed the sheet
      // Last resort: text to clipboard
      await navigator.clipboard.writeText(`${text} — ${window.location.href}`);
      toast("Resultado copiado al portapapeles");
    }
  }, [result, lead]);

  const isBrujula = step < 7;
  const nivelIndex = step - 7;

  return (
    <section
      className="relative flex min-h-dvh w-full items-center overflow-hidden pb-20 pt-32 md:pt-36"
      style={{
        background:
          "linear-gradient(160deg, var(--color-rl-surface-canvas) 0%, var(--color-rl-surface-subtle) 45%, var(--color-rl-surface-overlay) 100%)",
      }}
    >
      {/* Floating accent glows */}
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -left-56 top-1/4 h-[34rem] w-[34rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.08), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="animate-blob-slow pointer-events-none absolute -right-56 bottom-0 h-[38rem] w-[38rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.06), transparent 70%)" }}
      />
      {/* Track lanes — faint verticals like lane lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 119px, color-mix(in srgb, var(--color-white) 3%, transparent) 119px, color-mix(in srgb, var(--color-white) 3%, transparent) 120px)",
        }}
      />
      <div className="relative z-10 w-full">
        <div
          className={cn(
            "mx-auto px-4 sm:px-6 lg:px-8",
            !started || step < TOTAL_QUESTIONS ? "max-w-3xl" : "max-w-5xl",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!started ? (
              <QuizIntroScreen
                shouldReduceMotion={shouldReduceMotion}
                slideVariants={slideVariants}
                onStart={() => dispatch({ type: "start" })}
              />
            ) : step < TOTAL_QUESTIONS ? (
              <QuizQuestionScreen
                step={step}
                totalQuestions={TOTAL_QUESTIONS}
                isBrujula={isBrujula}
                brujulaQuestion={BRUJULA_QUESTIONS[step]}
                nivelQuestion={NIVEL_QUESTIONS[nivelIndex]}
                selectedBrujulaLetter={brujulaAnswers[step]}
                selectedNivelScore={nivelAnswers[nivelIndex]}
                shouldReduceMotion={shouldReduceMotion}
                slideVariants={slideVariants}
                onSelectBrujula={handleSelectBrujula}
                onSelectNivel={handleSelectNivel}
                onBack={handleBack}
              />
            ) : result && !lead ? (
              <m.div
                key="capture"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <QuizLeadForm onSubmit={handleCapture} />
              </m.div>
            ) : result ? (
              <QuizResultScreen
                lead={lead}
                result={result}
                slideVariants={slideVariants}
                sectionVariants={sectionV}
                shouldReduceMotion={shouldReduceMotion}
                onShare={handleShare}
                onReset={handleReset}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
