import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/PageHero";
import { BenefitsSection } from "@/components/sections/afiliaciones/BenefitsSection";
import { PlansTableSection } from "@/components/sections/afiliaciones/PlansTableSection";
import { HowToApplySection } from "@/components/sections/afiliaciones/HowToApplySection";
import { ApplicationFormSection } from "@/components/sections/afiliaciones/ApplicationFormSection";

function AfiliacionesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        inverted
        badge="AFILIACIONES"
        title="ÚNETE A RUNLUV®"
        subtitle="Expande tu negocio uniéndote a la red de gimnasios oficiales runluv® más grande del mundo."
      />
      <BenefitsSection />
      <PlansTableSection />
      <HowToApplySection />
      <ApplicationFormSection />
    </div>
  );
}

export const Route = createFileRoute("/afiliaciones")({
  head: () => ({
    meta: [
      { title: "Afiliaciones | runluv® — Registra Tu Gimnasio" },
      {
        name: "description",
        content:
          "Afilía tu gimnasio a la red oficial runluv®. Accede a contenido exclusivo, visibilidad en nuestra plataforma y beneficios para tu comunidad de atletas.",
      },
    ],
  }),
  component: AfiliacionesPage,
});
