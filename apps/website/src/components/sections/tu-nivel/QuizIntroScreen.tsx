import { m, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE } from "@/lib/animation";
import { ACCENT } from "@/lib/theme";

export function QuizIntroScreen({
  shouldReduceMotion,
  slideVariants,
  onStart,
}: {
  shouldReduceMotion: boolean;
  slideVariants: Variants;
  onStart: () => void;
}) {
  return (
    <m.div key="intro" variants={slideVariants} initial="enter" animate="center" exit="exit">
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
              initial={shouldReduceMotion ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.28,
                ease: EASE,
                delay: shouldReduceMotion ? 0 : 0.03 + i * 0.04,
              }}
              style={line.accent ? { color: ACCENT } : undefined}
            >
              {line.text}
            </m.span>
          </span>
        ))}
      </h1>

      <m.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.22,
          ease: EASE,
          delay: shouldReduceMotion ? 0 : 0.1,
        }}
        className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
      >
        Descubre tu arquetipo de corredor, tu ADN runluv® y el desafío que te toca correr. No hay
        respuestas correctas — cada corredor marca su propio ritmo.
      </m.p>

      {/* Animated start line */}
      <m.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.2,
          ease: EASE,
          delay: shouldReduceMotion ? 0 : 0.18,
        }}
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
        onClick={onStart}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.22,
          ease: EASE,
          delay: shouldReduceMotion ? 0 : 0.2,
        }}
        className="mt-10 inline-flex items-center gap-2 px-9 py-4 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-[160ms] ease-out-strong hover:brightness-95 active:scale-[0.96]"
        style={{ background: ACCENT, boxShadow: "0 0 40px rgba(212,255,0,0.3)" }}
      >
        Comenzar
        <ArrowRight className="h-4 w-4" />
      </m.button>
    </m.div>
  );
}
