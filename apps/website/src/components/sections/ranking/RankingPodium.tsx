import { type RaceResult } from "@/data/results";
import { PodiumCard } from "./PodiumCard";

interface RankingPodiumProps {
  top3: RaceResult[];
  race: string;
  division: string;
}

export function RankingPodium({ top3, race, division }: RankingPodiumProps) {
  if (top3.length < 3) return null;

  return (
    <div className="hidden md:block" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-10 text-center text-xs font-bold tracking-widest text-white/70 uppercase">
          {race} · {division}
        </p>
        <div className="flex items-end justify-center">
          <PodiumCard r={top3[1]} stepH={112} />
          <PodiumCard r={top3[0]} stepH={156} isWinner />
          <PodiumCard r={top3[2]} stepH={80} />
        </div>
      </div>
    </div>
  );
}
