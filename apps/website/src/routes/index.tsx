import { createFileRoute } from "@tanstack/react-router";
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
  component: HomePage,
});
