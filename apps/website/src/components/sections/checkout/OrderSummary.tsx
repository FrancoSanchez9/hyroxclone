import { ACCENT } from "@/lib/theme";

export function OrderSummary({
  eventName,
  division,
  category,
  qty,
  tierLabel,
  total,
  orderId,
}: {
  eventName: string;
  division: string;
  category: string;
  qty: number;
  tierLabel?: string;
  total: string;
  orderId?: string;
}) {
  return (
    <div className="w-full border border-white/10 bg-white/[0.03] p-5 text-left">
      {orderId && (
        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            Orden
          </span>
          <span className="font-mono text-sm font-bold" style={{ color: ACCENT }}>
            {orderId}
          </span>
        </div>
      )}
      <p className="text-sm font-bold text-white">{eventName}</p>
      <dl className="mt-3 flex flex-col gap-1.5 text-sm">
        {[
          { label: "División", value: division || "—" },
          { label: "Categoría", value: category || "—" },
          { label: "Boletos", value: `${qty} × ${tierLabel ?? "General"}` },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <dt className="text-white/50">{row.label}</dt>
            <dd className="font-medium text-white">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Total</span>
        <span className="text-lg font-bold text-white">{total}</span>
      </div>
    </div>
  );
}
