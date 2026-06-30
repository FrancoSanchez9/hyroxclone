import { createFileRoute } from "@tanstack/react-router";
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
    meta: [
      { title: "runluv® — La Competencia de Fitness Funcional en México" },
      {
        name: "description",
        content:
          "Corre 1 km, completa una estación funcional, repítelo 8 veces. La competencia de fitness funcional más exigente y accesible de México. Regístrate en el próximo evento.",
      },
    ],
  }),
  component: HomePage,
});
