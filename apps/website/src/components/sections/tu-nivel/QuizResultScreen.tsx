import { m, type Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw, Share2 } from "lucide-react";
import { EASE } from "@/lib/animation";
import { ACCENT } from "@/lib/theme";
import { DIRECTION_LABELS, MODAL_DESCRIPTIONS, type Direction } from "@/lib/quiz-scoring";
import type { QuizLead } from "./QuizLeadForm";
import type { QuizResult } from "./QuizSection";

export function QuizResultScreen({
  lead,
  result,
  slideVariants,
  sectionVariants,
  shouldReduceMotion,
  onShare,
  onReset,
}: {
  lead: QuizLead | null;
  result: QuizResult;
  slideVariants: Variants;
  sectionVariants: Variants;
  shouldReduceMotion: boolean;
  onShare: () => void;
  onReset: () => void;
}) {
  return (
    <m.div
      key="result"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-8"
    >
      {/* ── Cabecera personalizada — el nombre del corredor primero ── */}
      <m.div variants={sectionVariants}>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">
          Resultado oficial
        </p>
        <p
          className="text-balance text-4xl leading-none tracking-wider text-white uppercase sm:text-5xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {lead?.name}, <span style={{ color: ACCENT }}>cruzaste la meta</span>
        </p>
      </m.div>

      {/* ── En móvil el arquetipo va primero; en desktop se conserva el
          layout original (fortaleza + ADN arriba, arquetipo + desafío abajo) ── */}
      <div className="grid gap-8 lg:grid-cols-2">
        <m.div
          variants={sectionVariants}
          className="border border-white/10 border-l-2 bg-white/[0.03] p-6 lg:order-3"
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

        <m.div variants={sectionVariants} className="lg:order-1 lg:self-end">
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

        <m.div variants={sectionVariants} className="lg:order-2 lg:self-end">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
            Tu ADN runluv®
          </p>
          <div className="space-y-3">
            {result.sortedBrujula.map(([dir, pct], i) => (
              <m.div
                key={dir}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : i * 0.03,
                  duration: shouldReduceMotion ? 0 : 0.22,
                  ease: EASE,
                }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                    {DIRECTION_LABELS[dir as Direction]}
                  </span>
                  <span className="tabular-nums text-xs text-white/50">{Math.round(pct)}%</span>
                </div>
                <div className="h-[3px] w-full bg-white/10">
                  <m.div
                    className="h-full w-full"
                    style={{
                      background:
                        i === 0
                          ? ACCENT
                          : "color-mix(in srgb, var(--color-white) 80%, transparent)",
                      transformOrigin: "left",
                    }}
                    initial={shouldReduceMotion ? false : { scaleX: 0 }}
                    animate={{ scaleX: pct / 100 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : i * 0.03 + 0.05,
                      duration: shouldReduceMotion ? 0 : 0.28,
                      ease: EASE,
                    }}
                  />
                </div>
              </m.div>
            ))}
          </div>
        </m.div>

        <div className="flex flex-col gap-4 lg:order-4">
          {/* ── Tu desafío — the payoff, inverted lime ── */}
          <m.div
            variants={sectionVariants}
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
            <m.div variants={sectionVariants} className="grid grid-cols-2 gap-2">
              {result.alternatives.map((alt) => (
                <div
                  key={alt.key}
                  className="flex items-center justify-between gap-2 border border-white/10 px-3 py-2.5 transition-colors duration-150 hover:border-white/30"
                >
                  <span className="text-xs font-medium text-white">{alt.name}</span>
                  <span className="tabular-nums text-xs font-bold" style={{ color: ACCENT }}>
                    {alt.affinity}%
                  </span>
                </div>
              ))}
            </m.div>
          )}
        </div>
      </div>

      {/* ── Cierre + acciones ── */}
      <m.div variants={sectionVariants} className="border-t border-white/10 pt-8">
        <p
          className="mb-6 text-balance text-center text-2xl leading-snug tracking-wider text-white uppercase sm:text-3xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {result.archetype.closes}
        </p>
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onShare}
            className="flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wider text-black transition-[transform,filter] duration-150 active:scale-[0.96] hover:brightness-95"
            style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.25)" }}
          >
            <Share2 className="h-4 w-4" />
            Compartir mi resultado
          </button>
          <Link
            to="/eventos"
            className="flex items-center justify-center gap-2 bg-rl-text-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-rl-surface-canvas transition-[transform,background-color] duration-150 active:scale-[0.96] hover:bg-rl-text-primary/90"
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
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/50 transition-colors duration-150 active:scale-[0.96] hover:text-white/70"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Volver a la salida
          </button>
        </div>
      </m.div>
    </m.div>
  );
}
