import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { type RunluvEvent } from "@/data/events";
import { cn } from "@/lib/utils";
import { ACCENT, EASE } from "@/lib/theme";
import { StepSummary } from "@/components/sections/eventos/registration/StepSummary";
import { DivisionStep } from "@/components/sections/eventos/registration/DivisionStep";
import { CategoryStep } from "@/components/sections/eventos/registration/CategoryStep";
import { PassesAndPricingStep } from "@/components/sections/eventos/registration/PassesAndPricingStep";
import {
  DIVISION_CATEGORIES,
  STEP_LABELS,
  panel,
} from "@/components/sections/eventos/registration/shared";

interface EventRegistrationSectionProps {
  event: RunluvEvent;
  selectedDivision: string | null;
  selectedCategory: string | null;
  quantity: number;
  onSelectDivision: (division: string) => void;
  onSelectCategory: (category: string) => void;
  onChangeQuantity: (quantity: number) => void;
}

export function EventRegistrationSection({
  event,
  selectedDivision,
  selectedCategory,
  quantity,
  onSelectDivision,
  onSelectCategory,
  onChangeQuantity,
}: EventRegistrationSectionProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  // Which step the runner is actively editing (overrides the natural flow).
  const [editing, setEditing] = useState<1 | 2 | 3 | null>(null);
  const derived: 1 | 2 | 3 = selectedCategory ? 3 : selectedDivision ? 2 : 1;
  const active = editing ?? derived;

  const availableCategories = selectedDivision ? (DIVISION_CATEGORIES[selectedDivision] ?? []) : [];

  return (
    <section id="registro" aria-labelledby="reg-heading" className="scroll-mt-28">
      {/* Header + step tracker */}
      <div className="mb-8">
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]"
          style={{ color: ACCENT }}
        >
          Inscripción
        </p>
        <h2
          id="reg-heading"
          className="text-4xl leading-none tracking-wider text-white uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Inscríbete ahora
        </h2>

        <div className="mt-5 flex items-center gap-2">
          {STEP_LABELS.map((label, i) => {
            const stepNo = i + 1;
            const done = derived > stepNo;
            const isActive = active === stepNo;
            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-bold tabular-nums transition-colors duration-(--motion-duration-ui)",
                      done || isActive
                        ? "border-rl-accent text-black"
                        : "border-white/20 text-white/50",
                    )}
                    style={{ background: done || isActive ? ACCENT : "transparent" }}
                  >
                    {done ? <Check size={14} strokeWidth={3} /> : stepNo}
                  </div>
                  <span
                    className={cn(
                      "hidden text-[10px] font-bold uppercase tracking-widest transition-colors duration-(--motion-duration-ui) sm:inline",
                      done || isActive ? "text-white" : "text-white/50",
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div className="relative h-px flex-1 bg-white/10">
                    <m.div
                      className="absolute inset-y-0 left-0 w-full"
                      style={{ background: ACCENT, transformOrigin: "left" }}
                      initial={false}
                      animate={{ scaleX: derived > stepNo ? 1 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: EASE }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progressive steps */}
      <div className="flex flex-col gap-3">
        {/* ── STEP 1 — DIVISIÓN ── */}
        <AnimatePresence mode="wait" initial={false}>
          {active === 1 ? (
            <m.div {...panel} key="s1-open">
              <DivisionStep
                categories={event.categories}
                selectedDivision={selectedDivision}
                shouldReduceMotion={shouldReduceMotion}
                onSelect={(cat) => {
                  onSelectDivision(cat);
                  setEditing(null);
                }}
              />
            </m.div>
          ) : (
            selectedDivision && (
              <StepSummary
                key="s1-sum"
                label="División"
                value={selectedDivision}
                onEdit={() => setEditing(1)}
              />
            )
          )}
        </AnimatePresence>

        {/* ── STEP 2 — CATEGORÍA ── */}
        {selectedDivision && (
          <AnimatePresence mode="wait" initial={false}>
            {active === 2 ? (
              <m.div {...panel} key="s2-open">
                <CategoryStep
                  categories={availableCategories}
                  selectedCategory={selectedCategory}
                  shouldReduceMotion={shouldReduceMotion}
                  onSelect={(cat) => {
                    onSelectCategory(cat);
                    setEditing(null);
                  }}
                />
              </m.div>
            ) : (
              selectedCategory && (
                <StepSummary
                  key="s2-sum"
                  label="Categoría"
                  value={selectedCategory}
                  onEdit={() => setEditing(2)}
                />
              )
            )}
          </AnimatePresence>
        )}

        {/* ── STEP 3 — PASES + PRECIOS ── */}
        <AnimatePresence initial={false}>
          {selectedCategory && active === 3 && (
            <m.div {...panel} key="s3-open" className="flex flex-col gap-6 pt-2">
              <PassesAndPricingStep
                event={event}
                quantity={quantity}
                shouldReduceMotion={shouldReduceMotion}
                onChangeQuantity={onChangeQuantity}
              />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
