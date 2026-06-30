import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { m } from "framer-motion";
import { upcomingEvents } from "@/data/events";
import { EventHero } from "@/components/sections/eventos/EventHero";
import { EventDetailsPanel } from "@/components/sections/eventos/EventDetailsPanel";
import { EventRegistrationSection } from "@/components/sections/eventos/EventRegistrationSection";
import { EventContentSections } from "@/components/sections/eventos/EventContentSections";
import { EventFaqSection } from "@/components/sections/eventos/EventFaqSection";

const EASE = [0.23, 1, 0.32, 1] as const;

function EventDetailPage() {
  const { eventId } = Route.useParams();
  const event = upcomingEvents.find((e) => e.id === eventId);

  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white gap-6">
        <p className="text-6xl font-normal" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
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

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }} className="text-white">
      <EventHero event={event} />

      <EventDetailsPanel event={event} />

      {/* ── MAIN CONTENT ── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-16">
            <EventRegistrationSection
              event={event}
              selectedDivision={selectedDivision}
              selectedCategory={selectedCategory}
              onSelectDivision={(div) => {
                setSelectedDivision(div);
                setSelectedCategory(null);
              }}
              onSelectCategory={setSelectedCategory}
            />

            <EventContentSections event={event} />

            <EventFaqSection />
          </div>

          {/* RIGHT SIDEBAR — sticky register CTA */}
          <div className="lg:relative">
            <div className="lg:sticky lg:top-28 flex flex-col gap-0 border border-white/15">
              {/* Price header */}
              <div className="px-6 py-6 border-b border-white/10" style={{ background: "#111" }}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
                  Precio actual
                </p>
                {activePriceTier ? (
                  <>
                    <p
                      className="text-4xl font-normal leading-none tabular-nums text-white"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      ${activePriceTier.price.toLocaleString("es-MX")}
                      <span className="text-lg ml-1 text-white/50">{event.currency}</span>
                    </p>
                    <p className="mt-1 text-[11px] text-white/40">{activePriceTier.label}</p>
                  </>
                ) : (
                  <p className="text-2xl font-normal text-white/50">Consultar precio</p>
                )}
              </div>

              {/* Register button */}
              <div className="px-6 py-6 flex flex-col gap-4" style={{ background: "#0d0d0d" }}>
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
                    className="flex items-center justify-center h-14 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/90 transition-[background-color] duration-150 active:scale-[0.96]"
                  >
                    Registrarse ahora
                  </button>
                )}

                {event.spotsLeft !== undefined && !event.soldOut && (
                  <p className="text-center text-[11px] text-white/40">
                    Solo quedan{" "}
                    <span className="tabular-nums font-bold text-white">{event.spotsLeft}</span>{" "}
                    lugares disponibles
                  </p>
                )}

                {/* Selection summary */}
                {(selectedDivision || selectedCategory) && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ ease: EASE, duration: 0.3 }}
                    className="border-t border-white/10 pt-4 flex flex-col gap-2"
                  >
                    {selectedDivision && (
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40 uppercase tracking-wide">División</span>
                        <span className="font-bold text-white">{selectedDivision}</span>
                      </div>
                    )}
                    {selectedCategory && (
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40 uppercase tracking-wide">Categoría</span>
                        <span className="font-bold text-white">{selectedCategory}</span>
                      </div>
                    )}
                  </m.div>
                )}
              </div>

              {/* What's included */}
              <div
                className="px-6 py-6 border-t border-white/10 flex flex-col gap-3"
                style={{ background: "#111" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
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
                      style={{ background: "#ffffff" }}
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
