import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/PageHero";
import { VolunteerBenefitsSection } from "@/components/sections/voluntario/VolunteerBenefitsSection";
import { VolunteerFormSection } from "@/components/sections/voluntario/VolunteerFormSection";
import { VolunteerFaqSection } from "@/components/sections/voluntario/VolunteerFaqSection";

function VoluntarioPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        inverted
        badge="HAZTE VOLUNTARIO"
        title="SÉ PARTE DE ALGO GRANDE"
        subtitle="Únete a nuestro equipo de voluntarios y vive la experiencia runluv® desde adentro."
      />
      <VolunteerBenefitsSection />
      <VolunteerFormSection />
      <VolunteerFaqSection />
    </div>
  );
}

export const Route = createFileRoute("/voluntario")({
  head: () => ({
    meta: [
      { title: "Voluntario | runluv® — Únete al Equipo de Operación" },
      {
        name: "description",
        content:
          "Sé parte del equipo runluv® como voluntario. Vive el evento desde adentro, apoya a los atletas y obtén accreditation oficial. Regístrate para el próximo evento.",
      },
    ],
  }),
  component: VoluntarioPage,
});
