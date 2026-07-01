import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/PageHero";
import { PillarsSection } from "@/components/sections/preparacion/PillarsSection";
import { TimelineSection } from "@/components/sections/preparacion/TimelineSection";
import { StationTipsSection } from "@/components/sections/preparacion/StationTipsSection";
import { TrainingClubCTA } from "@/components/sections/preparacion/TrainingClubCTA";

function PreparacionPage() {
  return (
    <>
      <PageHero
        inverted
        badge="PREPARACIÓN"
        title="LA MEJOR PREPARACIÓN HYROX"
        subtitle="Todo lo que necesitas saber para llegar al día de la carrera en tu mejor forma."
      />
      <PillarsSection />
      <TimelineSection />
      <StationTipsSection />
      <TrainingClubCTA />
    </>
  );
}

export const Route = createFileRoute("/preparacion")({
  head: () => ({
    meta: [
      { title: "Preparación | runluv® — Guías y Entrenamientos para Competir" },
      {
        name: "description",
        content:
          "Prepárate para tu próximo runluv®. Planes de entrenamiento, guías de fuerza funcional y consejos de nutrición para que llegues listo al día de la competencia.",
      },
    ],
  }),
  component: PreparacionPage,
});
