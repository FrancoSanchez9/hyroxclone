import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/PageHero";
import { FitnessRacingSection } from "@/components/sections/about/FitnessRacingSection";
import { RaceFormatSection } from "@/components/sections/about/RaceFormatSection";
import { DivisionsSection } from "@/components/sections/about/DivisionsSection";
import { FindMyLevelSection } from "@/components/sections/about/FindMyLevelSection";
import { WeightCategoriesSection } from "@/components/sections/about/WeightCategoriesSection";

function AboutPage() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PageHero title="ABOUT RUNLUV" inverted />
      <FitnessRacingSection />
      <RaceFormatSection />
      <DivisionsSection />
      <FindMyLevelSection />
      <WeightCategoriesSection />
    </div>
  );
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
});
