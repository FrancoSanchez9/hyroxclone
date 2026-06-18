import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIsHyroxSection } from "@/components/sections/WhatIsHyroxSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FindYourLevelSection } from "@/components/sections/FindYourLevelSection";
import { RaceFormatSection } from "@/components/sections/RaceFormatSection";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { UpcomingEventsSection } from "@/components/sections/UpcomingEventsSection";
import { SponsorsBanner } from "@/components/sections/SponsorsBanner";
import { MediaStripSection } from "@/components/sections/MediaStripSection";
import { VolunteerSection } from "@/components/sections/VolunteerSection";
import { CTASection } from "@/components/sections/CTASection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsHyroxSection />
      <StatsSection />
      <FindYourLevelSection />
      <RaceFormatSection />
      <TrainingSection />
      <UpcomingEventsSection />
      <SponsorsBanner />
      <MediaStripSection />
      <VolunteerSection />
      <CTASection />
    </>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
