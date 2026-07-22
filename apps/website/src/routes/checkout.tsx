import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { upcomingEvents, seasonPass } from "@/data/events";
import { useSession } from "@/lib/auth";
import { EASE } from "@/lib/animation";
import { trackEvent } from "@/lib/analytics";
import { ACCENT } from "@/lib/theme";
import { IdentifyStep } from "@/components/sections/checkout/IdentifyStep";
import { DetailsStep } from "@/components/sections/checkout/DetailsStep";
import { PaymentStep } from "@/components/sections/checkout/PaymentStep";
import { DoneStep } from "@/components/sections/checkout/DoneStep";
import { STEP_LABELS, STEP_ORDER, money, type Step } from "@/components/sections/checkout/shared";

interface CheckoutSearch {
  event: string;
  division: string;
  category: string;
  qty: number;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { event: eventId, division, category, qty } = Route.useSearch();
  const event =
    upcomingEvents.find((e) => e.id === eventId) ??
    (eventId === seasonPass.id ? seasonPass : undefined);

  // La sesión resuelve async, así que no puede decidir el paso inicial de entrada:
  // arrancamos en "identify" y saltamos a "details" cuando confirmamos que hay
  // sesión (ver efecto abajo). Mientras tanto se muestra un loader — sin él, un
  // usuario logueado vería parpadear la pantalla de "identifícate".
  const { session, loading: authLoading } = useSession();
  const [step, setStep] = useState<Step>("identify");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (authLoading || !session) return;
    // Updates funcionales: si el usuario ya escribió algo, no lo pisamos.
    setEmail((prev) => prev || session.email);
    setName((prev) => prev || session.name);
    setStep((prev) => (prev === "identify" ? "details" : prev));
  }, [authLoading, session]);

  const tier = event?.prices?.find((p) => p.available) ?? event?.prices?.[0];
  const total = tier ? tier.price * qty : 0;
  const orderId = useMemo(() => "RL-" + Date.now().toString(36).slice(-6).toUpperCase(), []);

  if (authLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-rl-dark">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: ACCENT }} />
        <span className="sr-only">Cargando…</span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-rl-dark text-white">
        <p
          className="px-6 text-center text-4xl sm:text-6xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Compra no válida
        </p>
        <Link
          to="/eventos"
          className="text-sm font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-white"
        >
          ← Volver a eventos
        </Link>
      </div>
    );
  }

  const currentIndex = STEP_ORDER.indexOf(step);
  const totalLabel = money(total, event.currency);

  // ponytail: fake gateway — swap the setTimeout for a real PSP (Stripe / Mercado Pago) when a backend exists.
  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("done");
      // Simulated "order emailed" confirmation. No real inbox is touched.
      toast.success(`Orden ${orderId} enviada a ${email}`);
      trackEvent("checkout_completed", {
        orderId,
        eventId: event?.id,
        eventName: event?.name,
        total,
        qty,
        division,
        category,
      });
    }, 900);
  };

  return (
    <section
      className="relative min-h-dvh w-full overflow-hidden px-6 py-24"
      style={{
        background:
          "linear-gradient(160deg, var(--color-rl-surface-canvas) 0%, var(--color-rl-surface-subtle) 45%, var(--color-rl-surface-overlay) 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.06), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-lg">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
          {event.name}
        </p>
        <h1
          className="text-[clamp(2.4rem,8vw,3.5rem)] leading-[0.9] uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {step === "done" ? "¡Listo!" : "Finaliza tu compra"}
        </h1>

        {/* Progress tracker */}
        {step !== "done" && (
          <div className="mt-6 flex items-center gap-2">
            {STEP_ORDER.slice(0, 3).map((s, i) => {
              const done = currentIndex > i;
              const active = step === s;
              return (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-bold tabular-nums transition-colors duration-300"
                      style={{
                        background: done || active ? ACCENT : "transparent",
                        borderColor:
                          done || active
                            ? ACCENT
                            : "color-mix(in srgb, var(--color-white) 20%, transparent)",
                        color:
                          done || active
                            ? "#000"
                            : "color-mix(in srgb, var(--color-white) 50%, transparent)",
                      }}
                    >
                      {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                    </div>
                    <span
                      className={
                        "hidden text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 sm:inline " +
                        (done || active ? "text-white" : "text-white/50")
                      }
                    >
                      {STEP_LABELS[s]}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="relative h-px flex-1 bg-white/10">
                      <div
                        className="absolute inset-y-0 left-0 w-full origin-left transition-transform duration-300"
                        style={{ transform: `scaleX(${done ? 1 : 0})`, background: ACCENT }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <m.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24, transition: { duration: 0.2, ease: EASE } }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {step === "identify" && (
                <IdentifyStep
                  email={email}
                  onEmailChange={setEmail}
                  onLogin={() => navigate({ to: "/auth/login" })}
                  onContinueAsGuest={() => setStep("details")}
                />
              )}

              {step === "details" && (
                <DetailsStep
                  name={name}
                  onNameChange={setName}
                  email={email}
                  onEmailChange={setEmail}
                  phone={phone}
                  onPhoneChange={setPhone}
                  showBack={!session}
                  onBack={() => setStep("identify")}
                  onContinue={() => setStep("payment")}
                />
              )}

              {step === "payment" && (
                <PaymentStep
                  eventName={event.name}
                  division={division}
                  category={category}
                  qty={qty}
                  tierLabel={tier?.label}
                  totalLabel={totalLabel}
                  processing={processing}
                  onBack={() => setStep("details")}
                  onPay={pay}
                />
              )}

              {step === "done" && (
                <DoneStep
                  email={email}
                  eventName={event.name}
                  division={division}
                  category={category}
                  qty={qty}
                  tierLabel={tier?.label}
                  totalLabel={totalLabel}
                  orderId={orderId}
                  onViewDashboard={() => navigate({ to: "/dashboard" })}
                  onBackHome={() => navigate({ to: "/" })}
                />
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): CheckoutSearch => ({
    event: typeof s.event === "string" ? s.event : "",
    division: typeof s.division === "string" ? s.division : "",
    category: typeof s.category === "string" ? s.category : "",
    qty: Math.max(1, Math.floor(Number(s.qty)) || 1),
  }),
  // Client-only: the initial step depends on localStorage auth (isAuthenticated),
  // which the server can't read — SSR'ing it would cause a hydration mismatch for
  // logged-in users. No SEO value on a checkout flow anyway.
  ssr: false,
  component: CheckoutPage,
});
