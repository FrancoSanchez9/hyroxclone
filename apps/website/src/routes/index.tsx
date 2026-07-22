import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIsRunluvSection } from "@/components/sections/WhatIsRunluvSection";
import { RaceFormatSection } from "@/components/sections/RaceFormatSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { SeasonPassSection } from "@/components/sections/SeasonPassSection";
import { Reveal } from "@/components/ui/Reveal";

function HomePage() {
  return (
    <>
      <HeroSection />
      <Reveal>
        <WhatIsRunluvSection />
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
      <Reveal>
        <SeasonPassSection />
      </Reveal>
    </>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo({
      title: "runluv® · Corre los autódromos de México y descubre tu límite",
      description:
        "runluv® transforma los autódromos de México en pistas para corredores. Elige tu reto, corre el circuito y vuelve por más cada temporada. Inscríbete en el próximo evento.",
      keywords:
        "runluv, carrera, running México, autódromo, correr en pista F1, Hermanos Rodríguez, eventos deportivos México, maratón",
    }),
  }),
  component: HomePage,
});
