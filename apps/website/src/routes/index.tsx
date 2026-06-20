import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIsRunluvSection } from "@/components/sections/WhatIsRunluvSection";
import { ModalidadesSection } from "@/components/sections/ModalidadesSection";
import { CategoriasSection } from "@/components/sections/CategoriasSection";
import { DiferenciadorSection } from "@/components/sections/DiferenciadorSection";
import { ImpactoSection } from "@/components/sections/ImpactoSection";
import { ModeloSection } from "@/components/sections/ModeloSection";
import { CTASection } from "@/components/sections/CTASection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsRunluvSection />
      <ModalidadesSection />
      <CategoriasSection />
      <DiferenciadorSection />
      <ImpactoSection />
      <ModeloSection />
      <CTASection />
    </>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo({
      title: "runluv® — Eventos de Running en Autódromos | Desarrollo para Ciudades de México",
      description:
        "runluv® transforma el running en desarrollo económico para ciudades. Eventos en autódromos con 15,000 asistentes y 7x retorno por peso invertido. Modelo llave en mano para gobiernos municipales y estatales de México.",
      keywords:
        "runluv, eventos de running, running en autódromos, La Última Vuelta, Endurance 4H, turismo deportivo, desarrollo económico, eventos B2G, gobiernos México",
    }),
  }),
  component: HomePage,
});
