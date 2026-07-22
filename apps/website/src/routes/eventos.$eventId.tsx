import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth";
import { m, AnimatePresence } from "framer-motion";
import { upcomingEvents } from "@/data/events";
import { EventHero } from "@/components/sections/eventos/EventHero";
import { CountdownStrip } from "@/components/sections/CountdownStrip";
import { EventDetailsPanel } from "@/components/sections/eventos/EventDetailsPanel";
import { EventRegistrationSection } from "@/components/sections/eventos/EventRegistrationSection";
import { EventWelcomeSection } from "@/components/sections/eventos/EventWelcomeSection";
import { EventRulesSection } from "@/components/sections/eventos/EventRulesSection";
import { EventContentSections } from "@/components/sections/eventos/EventContentSections";
import { EventFaqSection } from "@/components/sections/eventos/EventFaqSection";
import { EASE } from "@/lib/theme";
import { ACCENT } from "@/lib/theme";

const TABS = [
  { id: "info", label: "Información" },
  { id: "registro", label: "Registro" },
  { id: "reglamento", label: "Reglamento" },
  { id: "venue", label: "Venue & Horarios" },
  { id: "faq", label: "FAQ" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function EventDetailPage() {
  const { eventId } = Route.useParams();
  const navigate = useNavigate();
  const event = upcomingEvents.find((e) => e.id === eventId);
  // Solo decide el texto del botón: comprar funciona igual como invitado, el paso de
  // identificarse lo resuelve /checkout. Arranca en null tanto en SSR como en el
  // primer render del cliente, así que no hay mismatch al hidratar.
  const { session } = useSession();

  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<TabId>("info");

  // Hero / countdown "Registrarse" links use #registro — open that tab when they fire.
  useEffect(() => {
    const openRegistro = () => {
      if (window.location.hash === "#registro") {
        setTab("registro");
        document.getElementById("detalles")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    openRegistro();
    window.addEventListener("hashchange", openRegistro);
    return () => window.removeEventListener("hashchange", openRegistro);
  }, []);

  if (!event) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-rl-dark text-white gap-6">
        <p
          className="px-6 text-center text-4xl font-normal sm:text-6xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Evento no encontrado
        </p>
        <Link
          to="/eventos"
          className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
        >
          ← Volver a eventos
        </Link>
      </div>
    );
  }

  const activePriceTier = event.prices?.find((p) => p.available);
  const readyToBuy = Boolean(selectedDivision && selectedCategory);
  const total = activePriceTier ? activePriceTier.price * quantity : 0;

  // Carry the selection into the simulated checkout flow.
  const handleCheckout = () => {
    if (!readyToBuy) {
      setTab("registro");
      document.getElementById("detalles")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    void navigate({
      to: "/checkout",
      search: {
        event: event.id,
        division: selectedDivision ?? "",
        category: selectedCategory ?? "",
        qty: quantity,
      },
    });
  };

  return (
    <div
      style={{ background: "var(--color-rl-surface-subtle)", minHeight: "100dvh" }}
      className="text-white"
    >
      <EventHero event={event} />

      <CountdownStrip event={event} registerHref="#registro" />

      <EventDetailsPanel event={event} />

      {/* ── MAIN CONTENT ── */}
      <div id="detalles" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
          {/* LEFT COLUMN — tabbed to cut the scroll */}
          <div className="min-w-0">
            {/* Tab bar — sticky under the details panel */}
            <div className="sticky top-16 z-20 -mx-4 mb-10 border-b border-white/10 bg-rl-dark/95 px-4 backdrop-blur-sm sm:-mx-6 sm:px-6">
              <div className="flex gap-1 overflow-x-auto">
                {TABS.map((t) => {
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={`relative shrink-0 px-4 py-4 text-xs font-bold uppercase tracking-widest transition-colors duration-150 ${
                        active ? "text-white" : "text-white/50 hover:text-white/70"
                      }`}
                    >
                      {t.label}
                      {active && (
                        <m.span
                          layoutId="tab-underline"
                          className="absolute inset-x-2 -bottom-px h-0.5"
                          style={{ background: ACCENT }}
                          transition={{ type: "spring", stiffness: 500, damping: 32 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Panels */}
            <AnimatePresence mode="wait">
              <m.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex flex-col gap-16"
              >
                {tab === "info" && <EventWelcomeSection event={event} />}
                {tab === "registro" && (
                  <EventRegistrationSection
                    event={event}
                    selectedDivision={selectedDivision}
                    selectedCategory={selectedCategory}
                    quantity={quantity}
                    onSelectDivision={(div) => {
                      setSelectedDivision(div);
                      setSelectedCategory(null);
                    }}
                    onSelectCategory={setSelectedCategory}
                    onChangeQuantity={setQuantity}
                  />
                )}
                {tab === "reglamento" && <EventRulesSection />}
                {tab === "venue" && <EventContentSections event={event} />}
                {tab === "faq" && <EventFaqSection />}
              </m.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDEBAR — sticky register CTA */}
          <div className="lg:relative">
            <div className="lg:sticky lg:top-28 flex flex-col gap-0 border border-white/15">
              {/* Price header */}
              <div
                className="px-6 py-6 border-b border-white/10"
                style={{ background: "var(--color-rl-surface-raised)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                  Precio actual
                </p>
                {activePriceTier ? (
                  <>
                    <p
                      className="text-4xl font-normal leading-none tabular-nums text-rl-accent"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      ${activePriceTier.price.toLocaleString("es-MX")}
                      <span className="text-lg ml-1 text-white/50">{event.currency}</span>
                    </p>
                    <p className="mt-1 text-[11px] text-white/50">{activePriceTier.label}</p>
                  </>
                ) : (
                  <p className="text-2xl font-normal text-white/50">Consultar precio</p>
                )}
              </div>

              {/* Register button */}
              <div
                className="px-6 py-6 flex flex-col gap-4"
                style={{ background: "var(--color-rl-surface-subtle)" }}
              >
                {event.soldOut ? (
                  <div
                    className="flex items-center justify-center h-14 text-sm font-bold uppercase tracking-widest text-black/40"
                    style={{ background: "#555" }}
                  >
                    Agotado
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="cursor-pointer flex items-center justify-center h-14 text-sm font-bold uppercase tracking-widest text-black transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.96]"
                    style={{ background: ACCENT }}
                  >
                    {!readyToBuy
                      ? "Elige división y categoría"
                      : session
                        ? `Comprar ${quantity} ${quantity === 1 ? "pase" : "pases"}`
                        : "Inicia sesión para comprar"}
                  </button>
                )}

                {event.spotsLeft !== undefined && !event.soldOut && (
                  <p className="text-center text-[11px] text-white/50">
                    Solo quedan{" "}
                    <span className="tabular-nums font-bold text-rl-accent">{event.spotsLeft}</span>{" "}
                    lugares disponibles
                  </p>
                )}

                {/* Selection summary */}
                {(selectedDivision || selectedCategory) && (
                  <m.div
                    // react-doctor-disable-next-line react-doctor/no-layout-property-animation -- FLIP-optimized mount reveal, not per-frame layout
                    initial={{ opacity: 0, height: 0 }}
                    // react-doctor-disable-next-line react-doctor/no-layout-property-animation -- FLIP-optimized mount reveal, not per-frame layout
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ ease: EASE, duration: 0.3 }}
                    className="border-t border-white/10 pt-4 flex flex-col gap-2"
                  >
                    {selectedDivision && (
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50 uppercase tracking-wide">División</span>
                        <span className="font-bold text-white">{selectedDivision}</span>
                      </div>
                    )}
                    {selectedCategory && (
                      <div className="flex justify-between text-xs">
                        <span className="text-white/50 uppercase tracking-wide">Categoría</span>
                        <span className="font-bold text-white">{selectedCategory}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50 uppercase tracking-wide">Pases</span>
                      <span className="font-bold text-white tabular-nums">{quantity}</span>
                    </div>
                    {readyToBuy && activePriceTier && (
                      <div className="flex justify-between border-t border-white/10 pt-2 text-xs">
                        <span className="text-white/50 uppercase tracking-wide">Total</span>
                        <span className="font-bold tabular-nums text-rl-accent">
                          ${total.toLocaleString("es-MX")} {event.currency}
                        </span>
                      </div>
                    )}
                  </m.div>
                )}
              </div>

              {/* What's included */}
              <div
                className="px-6 py-6 border-t border-white/10 flex flex-col gap-3"
                style={{ background: "var(--color-rl-surface-raised)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                  Incluye
                </p>
                {[
                  "Finisher pack (medalla + camiseta)",
                  "Cronometraje oficial RunLuv",
                  "Ranking global de temporada",
                  "Acceso a app RunLuv",
                  "Certificado digital de finalización",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 flex items-center justify-center"
                      style={{ background: ACCENT }}
                      aria-hidden="true"
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path
                          d="M1.5 4L3 5.5L6.5 2"
                          stroke="#000"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-white/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/eventos/$eventId")({
  component: EventDetailPage,
});
