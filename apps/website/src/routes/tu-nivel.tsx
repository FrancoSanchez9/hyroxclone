import { createFileRoute } from "@tanstack/react-router";
import { QuizSection } from "@/components/sections/tu-nivel/QuizSection";

function TuNivelPage() {
  return <QuizSection />;
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
