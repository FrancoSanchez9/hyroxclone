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
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-10 text-center">
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
