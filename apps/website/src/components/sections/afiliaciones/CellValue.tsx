import { CheckIcon } from "./CheckIcon";
import { CrossIcon } from "./CrossIcon";

export function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-white/80">{value}</span>;
  }
  return value ? <CheckIcon /> : <CrossIcon />;
}
