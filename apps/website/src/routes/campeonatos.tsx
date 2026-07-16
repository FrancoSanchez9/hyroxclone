import { createFileRoute } from "@tanstack/react-router";
import { ChampionshipHero } from "@/components/sections/campeonatos/ChampionshipHero";
import { QualifySection } from "@/components/sections/campeonatos/QualifySection";
import { Elite15Section } from "@/components/sections/campeonatos/Elite15Section";
import { ChampionshipTeaserSection } from "@/components/sections/campeonatos/ChampionshipTeaserSection";
import { BeyondMexicoSection } from "@/components/sections/campeonatos/BeyondMexicoSection";
import { CTASection } from "@/components/sections/campeonatos/CTASection";
import { SEASON_NAME } from "@/data/season";

function CampeonatosPage() {
  return (
    <>
      <ChampionshipHero />
      <QualifySection />
      <Elite15Section />
      <ChampionshipTeaserSection />
      <BeyondMexicoSection />
      <CTASection />
    </>
  );
}

export const Route = createFileRoute("/campeonatos")({
  head: () => ({
    meta: [
      { title: `${SEASON_NAME} | runluv® — Rankings y Gran Final` },
      {
        name: "description",
        content:
          "runluv® llega a México con su primera temporada nacional: 4 sedes clasificatorias y la Gran Final en el Autódromo Hermanos Rodríguez, Ciudad de México.",
      },
    ],
  }),
  component: CampeonatosPage,
});
