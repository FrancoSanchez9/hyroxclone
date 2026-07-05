import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Minus, Plus, Pencil } from "lucide-react";
import { type HyroxEvent } from "@/data/events";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;
const ACCENT = "#d4ff00";

const DIVISION_CATEGORIES: Record<string, string[]> = {
  "La Última Vuelta": ["Individual Open", "Individual Pro", "Doubles", "Teams"],
  "Cada Paso Cuenta": ["Individual Open", "Individual Pro", "Doubles", "Teams"],
  "5K": ["18–29", "30–39", "40–49", "50+"],
  "10K": ["18–29", "30–39", "40–49", "50+"],
  Doubles: ["Femenil", "Varonil", "Mixto"],
  Teams: ["Femenil", "Varonil", "Mixto"],
  "LUV Pro": ["Femenil", "Varonil"],
};

const DIVISION_HINTS: Record<string, string> = {
  "La Última Vuelta": "Eliminación progresiva",
  "Cada Paso Cuenta": "4 horas · máx distancia",
  "5K": "Contrarreloj · bloques",
  "10K": "Contrarreloj · bloques",
  Doubles: "2 corredores",
  Teams: "Equipos",
  "LUV Pro": "Élite",
};

const MAX_PASSES = 8;
const STEP_LABELS = ["División", "Categoría", "Pases"];

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};
const panel = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: EASE },
};

interface EventRegistrationSectionProps {
  event: HyroxEvent;
  selectedDivision: string | null;
  selectedCategory: string | null;
  quantity: number;
  onSelectDivision: (division: string) => void;
  onSelectCategory: (category: string) => void;
  onChangeQuantity: (quantity: number) => void;
}

/** Compact summary of a completed step, click to re-open it. */
function StepSummary({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <m.button
      layout
      type="button"
      onClick={onEdit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group flex w-full cursor-pointer items-center justify-between border border-white/10 bg-white/[0.02] px-5 py-3.5 text-left transition-colors duration-150 hover:border-[#d4ff00]/40"
    >
      <span className="flex items-center gap-3">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center"
          style={{ background: ACCENT }}
        >
          <Check size={14} strokeWidth={3} className="text-black" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
          {label}
        </span>
        <span className="text-sm font-bold text-white">{value}</span>
      </span>
      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50 transition-colors group-hover:text-[#d4ff00]">
        <Pencil size={11} /> Cambiar
      </span>
    </m.button>
  );
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
  // Which step the runner is actively editing (overrides the natural flow).
  const [editing, setEditing] = useState<1 | 2 | 3 | null>(null);
  const derived: 1 | 2 | 3 = selectedCategory ? 3 : selectedDivision ? 2 : 1;
  const active = editing ?? derived;

  const availableCategories = selectedDivision ? (DIVISION_CATEGORIES[selectedDivision] ?? []) : [];
  const activeTier = event.prices?.find((p) => p.available);

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
          Regístrate ahora
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
                      "flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-bold tabular-nums transition-colors duration-300",
                      done || isActive
                        ? "border-[#d4ff00] text-black"
                        : "border-white/20 text-white/50",
                    )}
                    style={{ background: done || isActive ? ACCENT : "transparent" }}
                  >
                    {done ? <Check size={14} strokeWidth={3} /> : stepNo}
                  </div>
                  <span
                    className={cn(
                      "hidden text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 sm:inline",
                      done || isActive ? "text-white" : "text-white/50",
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div className="relative h-px flex-1 bg-white/10">
                    <m.div
                      className="absolute inset-y-0 left-0"
                      style={{ background: ACCENT }}
                      initial={false}
                      animate={{ width: derived > stepNo ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: EASE }}
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
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/50">
                Paso 1 — Elige tu división
              </p>
              <m.div
                variants={gridStagger}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-2 sm:grid-cols-3"
              >
                {event.categories.map((cat) => {
                  const selected = selectedDivision === cat;
                  return (
                    <m.button
                      key={cat}
                      type="button"
                      variants={cardItem}
                      onClick={() => {
                        onSelectDivision(cat);
                        setEditing(null);
                      }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 400, damping: 24 }}
                      className={cn(
                        "group relative flex cursor-pointer flex-col items-start gap-1 overflow-hidden border p-4 text-left transition-colors duration-200",
                        selected
                          ? "border-[#d4ff00] text-white"
                          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white",
                      )}
                      style={selected ? { background: "rgba(212,255,0,0.08)" } : undefined}
                    >
                      <span
                        className={cn(
                          "pointer-events-none absolute inset-y-0 left-0 w-1 transition-opacity duration-200",
                          selected ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                        )}
                        style={{ background: ACCENT }}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-bold uppercase tracking-wide">{cat}</span>
                      <span className="text-[10px] text-white/50">{DIVISION_HINTS[cat]}</span>
                      <ArrowRight
                        size={14}
                        className={cn(
                          "absolute right-3 top-3 transition-[opacity,transform] duration-200",
                          selected
                            ? "text-[#d4ff00] opacity-100"
                            : "-translate-x-1 text-white/50 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                        )}
                        aria-hidden="true"
                      />
                    </m.button>
                  );
                })}
              </m.div>
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
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Paso 2 — Elige tu categoría
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((cat, i) => (
                    <m.button
                      key={cat}
                      type="button"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, type: "spring", stiffness: 500, damping: 26 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => {
                        onSelectCategory(cat);
                        setEditing(null);
                      }}
                      className={cn(
                        "cursor-pointer border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors duration-150",
                        selectedCategory === cat
                          ? "border-[#d4ff00] bg-[#d4ff00] text-black"
                          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white",
                      )}
                    >
                      {cat}
                    </m.button>
                  ))}
                </div>
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
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Paso 3 — ¿Cuántos pases?
                </p>
                <div className="inline-flex items-center border border-white/15 bg-white/[0.03]">
                  <m.button
                    type="button"
                    aria-label="Quitar un pase"
                    disabled={quantity <= 1}
                    onClick={() => onChangeQuantity(quantity - 1)}
                    whileTap={{ scale: 0.85 }}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center text-white/70 transition-colors hover:text-[#d4ff00] disabled:cursor-not-allowed disabled:text-white/15"
                  >
                    <Minus size={20} />
                  </m.button>
                  <div
                    className="flex h-12 w-16 items-center justify-center overflow-hidden border-x border-white/15"
                    aria-live="polite"
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <m.span
                        key={quantity}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="text-2xl tabular-nums text-white"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {quantity}
                      </m.span>
                    </AnimatePresence>
                  </div>
                  <m.button
                    type="button"
                    aria-label="Agregar un pase"
                    disabled={quantity >= MAX_PASSES}
                    onClick={() => onChangeQuantity(quantity + 1)}
                    whileTap={{ scale: 0.85 }}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center text-white/70 transition-colors hover:text-[#d4ff00] disabled:cursor-not-allowed disabled:text-white/15"
                  >
                    <Plus size={20} />
                  </m.button>
                </div>
                <p className="mt-2 text-[11px] text-white/50">
                  Máximo {MAX_PASSES} pases por compra.
                </p>
              </div>

              {/* Precios — solo al final del flujo */}
              {event.prices && (
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Precios
                  </p>
                  <div className="flex flex-col gap-2">
                    {event.prices.map((tier, i) => (
                      <m.div
                        key={tier.label}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
                        className={cn(
                          "relative flex items-center justify-between overflow-hidden border px-5 py-4 transition-colors duration-200",
                          tier.available
                            ? "border-[#d4ff00]/40 bg-[#d4ff00]/[0.06]"
                            : "border-white/10 opacity-45",
                        )}
                      >
                        {tier.available && (
                          <span
                            className="pointer-events-none absolute inset-y-0 left-0 w-1"
                            style={{ background: ACCENT }}
                            aria-hidden="true"
                          />
                        )}
                        <div>
                          <p className="text-sm font-bold text-white">{tier.label}</p>
                          {tier.note && (
                            <p className="mt-0.5 text-[11px] text-white/50">{tier.note}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p
                            className="text-xl font-normal tabular-nums text-white"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                          >
                            ${tier.price.toLocaleString("es-MX")} {event.currency}
                          </p>
                          {tier.available ? (
                            <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] font-bold uppercase tracking-wider text-[#d4ff00]">
                              <span
                                className="h-1.5 w-1.5 animate-pulse rounded-full"
                                style={{ background: ACCENT }}
                              />
                              Disponible
                            </p>
                          ) : (
                            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/50">
                              No disponible
                            </p>
                          )}
                        </div>
                      </m.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total en vivo */}
              {activeTier && (
                <div
                  className="flex items-center justify-between border-2 px-5 py-4"
                  style={{ borderColor: ACCENT }}
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                    Total · {quantity} {quantity === 1 ? "pase" : "pases"}
                  </span>
                  <span
                    className="text-3xl leading-none tabular-nums"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: ACCENT }}
                  >
                    ${(activeTier.price * quantity).toLocaleString("es-MX")}
                    <span className="ml-1 text-sm text-white/50">{event.currency}</span>
                  </span>
                </div>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
