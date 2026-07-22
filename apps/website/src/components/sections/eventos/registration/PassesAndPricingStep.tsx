import { m, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { type RunluvEvent } from "@/data/events";
import { cn } from "@/lib/utils";
import { ACCENT, EASE } from "@/lib/theme";
import { MAX_PASSES } from "@/components/sections/eventos/registration/shared";

export function PassesAndPricingStep({
  event,
  quantity,
  shouldReduceMotion,
  onChangeQuantity,
}: {
  event: RunluvEvent;
  quantity: number;
  shouldReduceMotion: boolean;
  onChangeQuantity: (quantity: number) => void;
}) {
  const activeTier = event.prices?.find((p) => p.available);

  return (
    <>
      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/50">
          Paso 3 — ¿Cuántos pases?
        </p>
        <div className="inline-flex items-center border border-white/15 bg-white/3">
          <m.button
            type="button"
            aria-label="Quitar un pase"
            disabled={quantity <= 1}
            onClick={() => onChangeQuantity(quantity - 1)}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="flex h-12 w-12 cursor-pointer items-center justify-center text-rl-text-secondary transition-colors duration-(--motion-duration-fast) hover:text-rl-accent disabled:cursor-not-allowed disabled:text-white/15"
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
                initial={shouldReduceMotion ? { opacity: 0 } : { y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { y: -8, opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.08 : 0.16, ease: EASE }}
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
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="flex h-12 w-12 cursor-pointer items-center justify-center text-rl-text-secondary transition-colors duration-(--motion-duration-fast) hover:text-rl-accent disabled:cursor-not-allowed disabled:text-white/15"
          >
            <Plus size={20} />
          </m.button>
        </div>
        <p className="mt-2 text-[11px] text-white/50">Máximo {MAX_PASSES} pases por compra.</p>
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
                initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : i * 0.03,
                  duration: shouldReduceMotion ? 0 : 0.22,
                  ease: EASE,
                }}
                className={cn(
                  "relative flex items-center justify-between overflow-hidden border px-5 py-4 transition-colors duration-200",
                  tier.available
                    ? "border-rl-accent/40 bg-rl-accent/6"
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
                  {tier.note && <p className="mt-0.5 text-[11px] text-white/50">{tier.note}</p>}
                </div>
                <div className="text-right">
                  <p
                    className="text-xl font-normal tabular-nums text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    ${tier.price.toLocaleString("es-MX")} {event.currency}
                  </p>
                  {tier.available ? (
                    <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] font-bold uppercase tracking-wider text-rl-accent">
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
    </>
  );
}
