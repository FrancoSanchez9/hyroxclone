import {
  Activity,
  ChevronsRight,
  ChevronsLeft,
  Zap,
  Waves,
  Dumbbell,
  Package,
  Target,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

export const STATION_ICONS: Record<number, React.ComponentType<LucideProps>> = {
  1: Activity,
  2: ChevronsRight,
  3: ChevronsLeft,
  4: Zap,
  5: Waves,
  6: Dumbbell,
  7: Package,
  8: Target,
};
