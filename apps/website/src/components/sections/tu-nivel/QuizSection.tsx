import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { m, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw, ChevronLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import { EASE } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { trackEvent } from "@/lib/analytics";
import {
  type Direction,
  type LetterOption,
  NIVEL_WEIGHTS,
  DIRECTION_LABELS,
  MODAL_DESCRIPTIONS,
  ARCHETYPES,
  computeBrujula,
  computeNivel,
  getNivelLabel,
  computeModalAffinity,
  getArchetype,
} from "@/lib/quiz-scoring";
import { QuizOption } from "./QuizOption";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Quiz Component ───────────────────────────────────────────────────────────

const TOTAL_QUESTIONS = 14;
const ACCENT = "#d4ff00";

// ─── Share card (Spotify-Wrapped-style 9:16 story image) ─────────────────────

interface ShareCardData {
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

  // Header
  ctx.letterSpacing = "10px";
  ctx.fillStyle = ACCENT;
  ctx.font = "bold 34px Inter, sans-serif";
  ctx.fillText("MI ADN RUNLUV®", M, 190);
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

const slideVariants: Variants = {
  enter: { opacity: 0, x: 48, filter: "blur(4px)" },
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE, staggerChildren: 0.08 },
  },
  exit: { opacity: 0, x: -48, filter: "blur(4px)", transition: { duration: 0.22, ease: EASE } },
};

const sectionV: Variants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function QuizSection() {
  const [started, setStarted] = useState(false); // intro screen before question 1
  const [step, setStep] = useState(0); // 0-13 = questions, 14 = result
  const [brujulaAnswers, setBrujulaAnswers] = useState<(LetterOption | null)[]>(() =>
    Array(7).fill(null),
  );
  const [nivelAnswers, setNivelAnswers] = useState<(number | null)[]>(() => Array(7).fill(null));

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
      setStep((s) => Math.min(s + 1, TOTAL_QUESTIONS));
    }, 450);
  }, [clearAdvance]);
  useEffect(() => clearAdvance, [clearAdvance]);

  const handleSelectBrujula = useCallback(
    (letter: LetterOption) => {
      setBrujulaAnswers((prev) => {
        const next = [...prev];
        next[step] = letter;
        return next;
      });
      scheduleAdvance();
    },
    [step, scheduleAdvance],
  );

  const handleSelectNivel = useCallback(
    (score: number) => {
      setNivelAnswers((prev) => {
        const next = [...prev];
        next[step - 7] = score;
        return next;
      });
      scheduleAdvance();
    },
    [step, scheduleAdvance],
  );

  const handleBack = useCallback(() => {
    clearAdvance();
    setStep((s) => Math.max(0, s - 1));
  }, [clearAdvance]);

  const handleReset = useCallback(() => {
    clearAdvance();
    setStep(0);
    setStarted(false);
    setBrujulaAnswers(Array(7).fill(null));
    setNivelAnswers(Array(7).fill(null));
  }, [clearAdvance]);

  // ── Result calculation ──
  const result = useMemo(() => {
    if (step < TOTAL_QUESTIONS) return null;
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
  }, [step, brujulaAnswers, nivelAnswers]);

  // Persist the result once per completion — fire-and-forget, no-op sin Supabase.
  const savedRef = useRef(false);
  useEffect(() => {
    if (!result || savedRef.current) return;
    savedRef.current = true;

    trackEvent("quiz_completed", {
      archetype: result.archetype.name,
      recommendedModality: result.primary.name,
      level: result.nivelInfo.level,
      levelPct: Math.round(result.nivelScore),
    });

    if (!supabase) return;
    const session = getSession();
    void supabase
      .from("quiz_results")
      .insert({
        email: session?.email ?? null,
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
      })
      .then(({ error }) => {
        // ponytail: fallo silencioso — guardar el resultado nunca debe romper la UX del quiz.
        if (error) console.warn("quiz_results insert:", error.message);
      });
  }, [result]);

  const handleShare = useCallback(async () => {
    if (!result) return;
    const text = `Mi ADN runluv®: ${DIRECTION_LABELS[result.topDirection]} · Arquetipo: ${result.archetype.name} · Mi desafío: ${result.primary.name} (${result.primary.affinity}% de afinidad)`;

    try {
      const blob = await generateShareImage({
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
  }, [result]);

  const isBrujula = step < 7;
  const nivelIndex = step - 7;

  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden pb-20 pt-32 md:pt-36"
      style={{ background: "linear-gradient(160deg, #000 0%, #0a0a0a 45%, #101204 100%)" }}
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
            "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.03) 119px, rgba(255,255,255,0.03) 120px)",
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
              <m.div
                key="intro"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <m.p
                  variants={sectionV}
                  className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: ACCENT }}
                >
                  <span
                    className="h-2 w-2 animate-pulse rounded-full"
                    style={{ background: ACCENT }}
                  />
                  En tus marcas · runluv®
                </m.p>

                <h1
                  aria-label="Descubre hasta dónde puedes llegar"
                  className="uppercase leading-[0.9] tracking-tight text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {[
                    { text: "DESCUBRE HASTA DÓNDE", accent: false },
                    { text: "PUEDES LLEGAR", accent: true },
                  ].map((line, i) => (
                    <span key={line.text} aria-hidden="true" className="block overflow-hidden">
                      <m.span
                        className="block text-[clamp(2.6rem,8vw,5.5rem)]"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
                        style={line.accent ? { color: ACCENT } : undefined}
                      >
                        {line.text}
                      </m.span>
                    </span>
                  ))}
                </h1>

                <m.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
                  className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
                >
                  Responde algunas preguntas y descubre tu arquetipo de corredor, tu ADN runluv® y
                  el desafío ideal para tu momento. No hay respuestas correctas — solo la tuya.
                </m.p>

                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
                  className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
                >
                  {[
                    { value: "14", label: "preguntas" },
                    { value: "~2", label: "minutos" },
                    { value: "1", label: "desafío para ti" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-baseline gap-2">
                      <span
                        className="text-3xl leading-none tabular-nums"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
                      >
                        {s.value}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </m.div>

                {/* Animated start line */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
                  className="relative mt-8 h-px w-full max-w-md overflow-hidden bg-white/10"
                  aria-hidden="true"
                >
                  <div
                    className="animate-line-sweep absolute inset-y-0 w-1/3"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
                    }}
                  />
                </m.div>

                <m.button
                  type="button"
                  onClick={() => setStarted(true)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
                  className="mt-10 inline-flex items-center gap-2 px-9 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:brightness-95 active:scale-[0.96]"
                  style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.3)" }}
                >
                  Comenzar test
                  <ArrowRight className="h-4 w-4" />
                </m.button>
              </m.div>
            ) : step < TOTAL_QUESTIONS ? (
              <m.div
                key={`question-${step}`}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Progress */}
                <div className="mb-12">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
                      style={{ borderColor: "rgba(212,255,0,0.4)", color: ACCENT }}
                    >
                      {isBrujula ? "01 — Tu motor" : "02 — Tu nivel"}
                    </span>
                    <span
                      className="tabular-nums text-2xl leading-none uppercase text-white/50"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      KM {step + 1} <span className="text-white/25">/ {TOTAL_QUESTIONS}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10">
                    <m.div
                      className="h-full"
                      style={{ background: ACCENT }}
                      initial={false}
                      animate={{ width: `${((step + 1) / TOTAL_QUESTIONS) * 100}%` }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-10 flex items-start gap-6">
                  <span
                    className="shrink-0 tabular-nums text-[5.5rem] leading-[0.8] sm:text-[7rem]"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: "transparent",
                      WebkitTextStroke: "2px rgba(212,255,0,0.5)",
                    }}
                    aria-hidden="true"
                  >
                    {String(step + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className="text-balance pt-1 text-4xl leading-[0.95] tracking-wide text-white uppercase sm:text-5xl md:text-6xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {isBrujula ? BRUJULA_QUESTIONS[step].text : NIVEL_QUESTIONS[nivelIndex].text}
                  </h2>
                </div>

                {/* Options — selecting auto-advances */}
                <div role="radiogroup" className="space-y-3">
                  {isBrujula
                    ? BRUJULA_QUESTIONS[step].options.map((opt, i) => (
                        <QuizOption
                          key={opt.letter}
                          id={opt.letter}
                          letter={opt.letter}
                          label={opt.label}
                          index={i}
                          selected={brujulaAnswers[step] === opt.letter}
                          onSelect={handleSelectBrujula}
                        />
                      ))
                    : NIVEL_QUESTIONS[nivelIndex].options.map((opt, i) => (
                        <QuizOption
                          key={opt.letter}
                          id={String(opt.score)}
                          letter={opt.letter}
                          label={opt.label}
                          index={i}
                          selected={nivelAnswers[nivelIndex] === opt.score}
                          onSelect={(s) => handleSelectNivel(Number(s))}
                        />
                      ))}
                </div>

                {/* Back */}
                <div className="mt-8 flex min-h-8 items-center">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 transition-colors duration-150 hover:text-white active:scale-[0.96]"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Anterior
                    </button>
                  )}
                </div>
              </m.div>
            ) : result ? (
              <m.div
                key="result"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-8"
              >
                {/* ── Row 1: Brújula + Fortaleza | ADN ── */}
                <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
                  <m.div variants={sectionV}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">
                      Corres para
                    </p>
                    <p
                      className="text-balance text-6xl leading-none tracking-wider uppercase sm:text-7xl"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
                    >
                      {DIRECTION_LABELS[result.topDirection]}
                    </p>
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">
                        Tu fortaleza
                      </p>
                      <p
                        className="text-2xl leading-none tracking-wider text-white uppercase sm:text-3xl"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {result.nivelInfo.label}
                      </p>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-white/60">
                        {result.nivelInfo.desc}
                      </p>
                    </div>
                  </m.div>

                  <m.div variants={sectionV}>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
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
                              className="h-full"
                              style={{ background: i === 0 ? ACCENT : "rgba(255,255,255,0.8)" }}
                              initial={{ width: "0%" }}
                              animate={{ width: `${pct}%` }}
                              transition={{ delay: i * 0.1 + 0.1, duration: 0.7, ease: EASE }}
                            />
                          </div>
                        </m.div>
                      ))}
                    </div>
                  </m.div>
                </div>

                {/* ── Row 2: Arquetipo | Desafío + alternativas ── */}
                <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
                  <m.div
                    variants={sectionV}
                    className="border border-white/10 border-l-2 bg-white/[0.03] p-6"
                    style={{ borderLeftColor: ACCENT }}
                  >
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">
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
                  </m.div>

                  <div className="flex flex-col gap-4">
                    {/* ── Tu desafío — the payoff, inverted lime ── */}
                    <m.div
                      variants={sectionV}
                      className="relative flex-1 overflow-hidden p-6 sm:p-8"
                      style={{ background: ACCENT }}
                    >
                      <span
                        className="pointer-events-none absolute -right-2 -top-4 select-none tabular-nums leading-none text-black/10"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "9rem" }}
                        aria-hidden="true"
                      >
                        {result.primary.affinity}%
                      </span>
                      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-black/60">
                        Tu desafío — {result.primary.affinity}% de afinidad
                      </p>
                      <p
                        className="mb-3 text-5xl leading-none tracking-wider text-black uppercase sm:text-6xl"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {result.primary.name}
                      </p>
                      <p className="max-w-md text-pretty text-sm font-medium leading-relaxed text-black/75">
                        {MODAL_DESCRIPTIONS[result.primary.key]}
                      </p>
                    </m.div>

                    {/* ── 6. También podrías disfrutar ── */}
                    {result.alternatives.length > 0 && (
                      <m.div variants={sectionV} className="grid grid-cols-2 gap-2">
                        {result.alternatives.map((alt) => (
                          <div
                            key={alt.key}
                            className="flex items-center justify-between gap-2 border border-white/10 px-3 py-2.5 transition-colors duration-150 hover:border-white/30"
                          >
                            <span className="text-xs font-medium text-white">{alt.name}</span>
                            <span
                              className="tabular-nums text-xs font-bold"
                              style={{ color: ACCENT }}
                            >
                              {alt.affinity}%
                            </span>
                          </div>
                        ))}
                      </m.div>
                    )}
                  </div>
                </div>

                {/* ── Cierre + acciones ── */}
                <m.div variants={sectionV} className="border-t border-white/10 pt-8">
                  <p
                    className="mb-6 text-balance text-center text-2xl leading-snug tracking-wider text-white uppercase sm:text-3xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {result.archetype.closes}
                  </p>
                  <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wider text-black transition-[transform,filter] duration-150 active:scale-[0.96] hover:brightness-95"
                      style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
                    >
                      <Share2 className="h-4 w-4" />
                      Compartir mi resultado
                    </button>
                    <Link
                      to="/eventos"
                      className="flex items-center justify-center gap-2 bg-white px-7 py-4 text-sm font-bold uppercase tracking-wider text-black transition-[transform,background-color] duration-150 active:scale-[0.96] hover:bg-white/90"
                    >
                      Inscribirme
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/la-carrera"
                      className="flex items-center justify-center gap-2 border border-white/40 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-[border-color,background-color] duration-150 active:scale-[0.96] hover:border-white hover:bg-white/5"
                    >
                      Otros desafíos
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white/50 transition-colors duration-150 active:scale-[0.96] hover:text-white/70"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Volver a empezar
                    </button>
                  </div>
                </m.div>
              </m.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
