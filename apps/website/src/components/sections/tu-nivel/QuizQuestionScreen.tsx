import { m, type Variants } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { EASE } from "@/lib/animation";
import { ACCENT } from "@/lib/theme";
import { QuizOption } from "./QuizOption";
import type { LetterOption } from "@/lib/quiz-scoring";
import type { BrujulaQuestion, NivelQuestion } from "./QuizSection";

export function QuizQuestionScreen({
  step,
  totalQuestions,
  isBrujula,
  brujulaQuestion,
  nivelQuestion,
  selectedBrujulaLetter,
  selectedNivelScore,
  shouldReduceMotion,
  slideVariants,
  onSelectBrujula,
  onSelectNivel,
  onBack,
}: {
  step: number;
  totalQuestions: number;
  isBrujula: boolean;
  brujulaQuestion: BrujulaQuestion;
  nivelQuestion: NivelQuestion;
  selectedBrujulaLetter: LetterOption | null;
  selectedNivelScore: number | null;
  shouldReduceMotion: boolean;
  slideVariants: Variants;
  onSelectBrujula: (letter: LetterOption) => void;
  onSelectNivel: (score: number) => void;
  onBack: () => void;
}) {
  return (
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
            KM {step + 1} <span className="text-white/25">/ {totalQuestions}</span>
          </span>
        </div>
        <div className="h-1.5 w-full bg-white/10">
          <m.div
            className="h-full w-full"
            style={{ background: ACCENT, transformOrigin: "left" }}
            initial={false}
            animate={{ scaleX: (step + 1) / totalQuestions }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: EASE }}
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
          {isBrujula ? brujulaQuestion.text : nivelQuestion.text}
        </h2>
      </div>

      {/* Options — selecting auto-advances */}
      <div role="radiogroup" className="space-y-3">
        {isBrujula
          ? brujulaQuestion.options.map((opt) => (
              <QuizOption
                key={opt.letter}
                id={opt.letter}
                letter={opt.letter}
                label={opt.label}
                selected={selectedBrujulaLetter === opt.letter}
                onSelect={onSelectBrujula}
              />
            ))
          : nivelQuestion.options.map((opt) => (
              <QuizOption
                key={opt.letter}
                id={String(opt.score)}
                letter={opt.letter}
                label={opt.label}
                selected={selectedNivelScore === opt.score}
                onSelect={(s) => onSelectNivel(Number(s))}
              />
            ))}
      </div>

      {/* Back */}
      <div className="mt-8 flex min-h-8 items-center">
        {step > 0 && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 transition-colors duration-150 hover:text-white active:scale-[0.96]"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Anterior
          </button>
        )}
      </div>
    </m.div>
  );
}
