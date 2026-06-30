import { createFileRoute } from "@tanstack/react-router";
import { LaCarreraHeroSection } from "@/components/sections/la-carrera/LaCarreraHeroSection";
import { StationsSection } from "@/components/sections/la-carrera/StationsSection";
import { DivisionsSection } from "@/components/sections/la-carrera/DivisionsSection";
import { RulesSection } from "@/components/sections/la-carrera/RulesSection";
import { BottomCTA } from "@/components/sections/la-carrera/BottomCTA";

function LaCarreraPage() {
  return (
    <>
      <LaCarreraHeroSection />
      <StationsSection />
      <DivisionsSection />
      <RulesSection />
      <BottomCTA />
    </>
  );
}

export const Route = createFileRoute("/la-carrera")({
  head: () => ({
    meta: [
      { title: "La Carrera | runluv® — Formato y Dinámica del Evento" },
      {
        name: "description",
        content:
          "Descubre el formato runluv®: 8 rondas de 1 km de carrera más una estación funcional diferente. Conoce las estaciones, reglas y categorías antes de competir.",
      },
    ],
  }),
  component: LaCarreraPage,
});
