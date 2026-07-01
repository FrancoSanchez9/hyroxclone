import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/PageHero";
import { QuizSection } from "@/components/sections/tu-nivel/QuizSection";

function TuNivelPage() {
  return (
    <>
      <PageHero
        inverted
        badge="ENCUENTRA TU DESAFÍO"
        title="¿CUÁL ES TU SIGUIENTE VUELTA?"
        subtitle="Responde algunas preguntas y descubre qué desafío de runluv® se adapta mejor a ti."
      />
      <QuizSection />
    </>
  );
}

export const Route = createFileRoute("/tu-nivel")({
  head: () => ({
    meta: [
      { title: "Tu Nivel | runluv® — Encuentra Tu Desafío" },
      {
        name: "description",
        content:
          "Responde algunas preguntas y descubre qué desafío de runluv® se adapta mejor a ti.",
      },
    ],
  }),
  component: TuNivelPage,
});
