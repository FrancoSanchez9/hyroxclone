import { createFileRoute } from "@tanstack/react-router";
import { LaCarreraHeroSection } from "@/components/sections/la-carrera/LaCarreraHeroSection";
import { FormatSection } from "@/components/sections/la-carrera/FormatSection";
import { DivisionsSection } from "@/components/sections/la-carrera/DivisionsSection";
import { RulesSection } from "@/components/sections/la-carrera/RulesSection";
import { RulesByModalitySection } from "@/components/sections/la-carrera/RulesByModalitySection";
import { BottomCTA } from "@/components/sections/la-carrera/BottomCTA";

function LaCarreraPage() {
  return (
    <>
      <LaCarreraHeroSection />
      <FormatSection />
      <DivisionsSection />
      <RulesByModalitySection />
      <RulesSection />
      <BottomCTA />
    </>
  );
}

export const Route = createFileRoute("/la-carrera")({
  head: () => ({
    meta: [
      { title: "La Carrera | runluv® — Corre sobre circuitos de clase mundial" },
      {
        name: "description",
        content:
          "runluv® transforma los autódromos de México en pistas para corredores. Descubre el formato, las modalidades, las categorías y las reglas antes de competir.",
      },
    ],
  }),
  component: LaCarreraPage,
});
