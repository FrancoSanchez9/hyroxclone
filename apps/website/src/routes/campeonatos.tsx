import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/PageHero";
import { AboutSection } from "@/components/sections/campeonatos/AboutSection";
import { QualifySection } from "@/components/sections/campeonatos/QualifySection";
import { Elite15Section } from "@/components/sections/campeonatos/Elite15Section";
import { ChampionshipTeaserSection } from "@/components/sections/campeonatos/ChampionshipTeaserSection";
import { CTASection } from "@/components/sections/campeonatos/CTASection";

function CampeonatosPage() {
  return (
    <>
      <PageHero
        inverted
        badge="TEMPORADA 2027"
        title="TEMPORADA RUNLUV® 2027"
        subtitle="La primera temporada nacional de runluv® arranca en México con cuatro sedes clasificatorias y una Gran Final que cerrará el año con la comunidad más grande de corredores."
      />
      <AboutSection />
      <QualifySection />
      <Elite15Section />
      <ChampionshipTeaserSection />
      <CTASection />
    </>
  );
}

export const Route = createFileRoute("/campeonatos")({
  head: () => ({
    meta: [
      { title: "Temporada 2027 | runluv® — Rankings y Gran Final" },
      {
        name: "description",
        content:
          "runluv® llega a México con su primera temporada nacional: 4 sedes clasificatorias y la Gran Final en el Autódromo Hermanos Rodríguez, Ciudad de México.",
      },
    ],
  }),
  component: CampeonatosPage,
});
