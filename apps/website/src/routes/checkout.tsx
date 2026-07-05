import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Mail, User, Phone, CreditCard, Check, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { upcomingEvents } from "@/data/events";
import { isAuthenticated, getSession } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/animation";

const ACCENT = "#d4ff00";

interface CheckoutSearch {
  event: string;
  division: string;
  category: string;
  qty: number;
}

type Step = "identify" | "details" | "payment" | "done";
const STEP_LABELS: Record<Step, string> = {
  identify: "Identifícate",
  details: "Datos",
  payment: "Pago",
  done: "Listo",
};
const STEP_ORDER: Step[] = ["identify", "details", "payment", "done"];

const isEmail = (v: string) => /.+@.+\..+/.test(v);
const money = (n: number, currency = "MXN") => `$${n.toLocaleString("es-MX")} ${currency}`;

// Shared input styling — mirrors the login page.
const inputCls =
  "w-full border border-white/15 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 transition-[border-color] duration-150 focus:border-[#d4ff00] focus:outline-none";
const labelCls = "text-[10px] font-bold uppercase tracking-widest text-white/50";

function CheckoutPage() {
  const navigate = useNavigate();
  const { event: eventId, division, category, qty } = Route.useSearch();
  const event = upcomingEvents.find((e) => e.id === eventId);

  const session = getSession();
  const [step, setStep] = useState<Step>(isAuthenticated() ? "details" : "identify");
  const [email, setEmail] = useState(session?.email ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);

  const tier = event?.prices?.find((p) => p.available) ?? event?.prices?.[0];
  const total = tier ? tier.price * qty : 0;
  const orderId = useMemo(() => "RL-" + Date.now().toString(36).slice(-6).toUpperCase(), []);

  // Simulated "order emailed" confirmation. No real inbox is touched.
  useEffect(() => {
    if (step === "done") toast.success(`Orden ${orderId} enviada a ${email}`);
  }, [step, orderId, email]);

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0a0a0a] text-white">
        <p className="text-6xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
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

  // ponytail: fake gateway — swap the setTimeout for a real PSP (Stripe / Mercado Pago) when a backend exists.
  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("done");
    }, 900);
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden px-6 py-24"
      style={{ background: "linear-gradient(160deg, #000 0%, #0a0a0a 45%, #101204 100%)" }}
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
                        borderColor: done || active ? ACCENT : "rgba(255,255,255,0.2)",
                        color: done || active ? "#000" : "rgba(255,255,255,0.5)",
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
                        className="absolute inset-y-0 left-0 transition-[width] duration-300"
                        style={{ width: done ? "100%" : "0%", background: ACCENT }}
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
              {/* ── STEP: IDENTIFY ── */}
              {step === "identify" && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-white/55">
                    Inicia sesión para guardar tu orden en tu panel, o continúa como invitado y
                    recibe la confirmación por correo.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate({ to: "/auth/login" })}
                  >
                    Iniciar sesión <ArrowRight size={16} />
                  </Button>

                  <div className="flex items-center gap-3 py-1">
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                      o continúa como invitado
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className={labelCls}>Correo</span>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className={inputCls}
                      />
                    </div>
                  </label>
                  <Button
                    variant="outline"
                    size="lg"
                    disabled={!isEmail(email)}
                    onClick={() => setStep("details")}
                  >
                    Continuar como invitado <ArrowRight size={16} />
                  </Button>
                </div>
              )}

              {/* ── STEP: DETAILS ── */}
              {step === "details" && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-white/55">¿A nombre de quién va la inscripción?</p>
                  <label className="flex flex-col gap-2">
                    <span className={labelCls}>Nombre completo</span>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre y apellido"
                        className={inputCls}
                      />
                    </div>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className={labelCls}>Correo</span>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className={inputCls}
                      />
                    </div>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className={labelCls}>Teléfono</span>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="55 1234 5678"
                        className={inputCls}
                      />
                    </div>
                  </label>
                  <div className="mt-1 flex gap-3">
                    {!isAuthenticated() && (
                      <Button variant="ghost" size="lg" onClick={() => setStep("identify")}>
                        <ArrowLeft size={16} /> Atrás
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      disabled={!name.trim() || !isEmail(email)}
                      onClick={() => setStep("payment")}
                    >
                      Continuar al pago <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {/* ── STEP: PAYMENT ── */}
              {step === "payment" && (
                <div className="flex flex-col gap-5">
                  <OrderSummary
                    eventName={event.name}
                    division={division}
                    category={category}
                    qty={qty}
                    tierLabel={tier?.label}
                    total={money(total, event.currency)}
                  />
                  <label className="flex flex-col gap-2">
                    <span className={labelCls}>Número de tarjeta</span>
                    <div className="relative">
                      <CreditCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        inputMode="numeric"
                        placeholder="4242 4242 4242 4242"
                        className={inputCls}
                      />
                    </div>
                  </label>
                  <div className="flex gap-3">
                    <label className="flex flex-1 flex-col gap-2">
                      <span className={labelCls}>Vence</span>
                      <input
                        inputMode="numeric"
                        placeholder="MM/AA"
                        className={inputCls.replace("pl-11", "px-4")}
                      />
                    </label>
                    <label className="flex flex-1 flex-col gap-2">
                      <span className={labelCls}>CVC</span>
                      <input
                        inputMode="numeric"
                        placeholder="123"
                        className={inputCls.replace("pl-11", "px-4")}
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-white/40">
                    Pago simulado — no se realiza ningún cargo real.
                  </p>
                  <div className="mt-1 flex gap-3">
                    <Button variant="ghost" size="lg" onClick={() => setStep("details")}>
                      <ArrowLeft size={16} /> Atrás
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      disabled={processing}
                      onClick={pay}
                    >
                      {processing ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Procesando…
                        </>
                      ) : (
                        <>Pagar {money(total, event.currency)}</>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* ── STEP: DONE ── */}
              {step === "done" && (
                <div className="flex flex-col items-center gap-6 text-center">
                  <m.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full"
                    style={{ background: ACCENT }}
                  >
                    <Check size={40} strokeWidth={3} className="text-black" />
                  </m.div>
                  <div>
                    <h2
                      className="text-3xl uppercase tracking-wide text-white"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      Tu lugar está confirmado
                    </h2>
                    <p className="mt-2 text-sm text-white/55">
                      Enviamos la confirmación y tu boleto a{" "}
                      <span className="font-semibold text-white">{email}</span>.
                    </p>
                  </div>
                  <OrderSummary
                    eventName={event.name}
                    division={division}
                    category={category}
                    qty={qty}
                    tierLabel={tier?.label}
                    total={money(total, event.currency)}
                    orderId={orderId}
                  />
                  <div className="flex w-full flex-col gap-3 sm:flex-row">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => navigate({ to: "/dashboard" })}
                    >
                      Ver mi panel
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="flex-1"
                      onClick={() => navigate({ to: "/" })}
                    >
                      Volver al inicio
                    </Button>
                  </div>
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function OrderSummary({
  eventName,
  division,
  category,
  qty,
  tierLabel,
  total,
  orderId,
}: {
  eventName: string;
  division: string;
  category: string;
  qty: number;
  tierLabel?: string;
  total: string;
  orderId?: string;
}) {
  return (
    <div className="w-full border border-white/10 bg-white/[0.03] p-5 text-left">
      {orderId && (
        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            Orden
          </span>
          <span className="font-mono text-sm font-bold" style={{ color: ACCENT }}>
            {orderId}
          </span>
        </div>
      )}
      <p className="text-sm font-bold text-white">{eventName}</p>
      <dl className="mt-3 flex flex-col gap-1.5 text-sm">
        <Row label="División" value={division || "—"} />
        <Row label="Categoría" value={category || "—"} />
        <Row label="Boletos" value={`${qty} × ${tierLabel ?? "General"}`} />
      </dl>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Total</span>
        <span className="text-lg font-bold text-white">{total}</span>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/50">{label}</dt>
      <dd className="font-medium text-white">{value}</dd>
    </div>
  );
}

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): CheckoutSearch => ({
    event: typeof s.event === "string" ? s.event : "",
    division: typeof s.division === "string" ? s.division : "",
    category: typeof s.category === "string" ? s.category : "",
    qty: Math.max(1, Math.floor(Number(s.qty)) || 1),
  }),
  component: CheckoutPage,
});
