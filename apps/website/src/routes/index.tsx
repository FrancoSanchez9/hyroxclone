import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIsHyroxSection } from "@/components/sections/WhatIsHyroxSection";
import { RaceFormatSection } from "@/components/sections/RaceFormatSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { Reveal } from "@/components/ui/Reveal";

function HomePage() {
  return (
    <>
      <HeroSection />
      <Reveal>
        <WhatIsHyroxSection />
      </Reveal>
      <Reveal>
        <RaceFormatSection />
      </Reveal>
      <Reveal>
        <StatsSection />
      </Reveal>
      <Reveal>
        <UpcomingEventsSection />
      </Reveal>
    </>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo({
      title: "La Competencia de Fitness Funcional en México",
      description:
        "runluv® transforma los autódromos de México en pistas para corredores. Elige tu desafío, corre el circuito y vive la experiencia. Regístrate en el próximo evento.",
      keywords:
        "runluv, carrera, running México, autódromo, eventos deportivos México, correr, maratón",
    }),
  }),
  component: HomePage,
});
