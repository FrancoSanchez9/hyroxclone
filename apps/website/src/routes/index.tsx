import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIsHyroxSection } from "@/components/sections/WhatIsHyroxSection";
import { RaceFormatSection } from "@/components/sections/RaceFormatSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AthletesSection } from "@/components/sections/AthletesSection";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsHyroxSection />
      <RaceFormatSection />
      <StatsSection />
      <AthletesSection />
      <TrainingSection />
      <UpcomingEventsSection />
    </>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo({
      title: "La Competencia de Fitness Funcional en México",
      description:
        "Corre 1 km, completa una estación funcional, repítelo 8 veces. La competencia de fitness funcional más exigente y accesible de México. Regístrate en el próximo evento.",
      keywords:
        "runluv, fitness funcional, competencia fitness, carrera de fitness, eventos deportivos México, HYROX",
    }),
  }),
  component: HomePage,
});
