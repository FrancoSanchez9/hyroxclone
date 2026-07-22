import { m } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OrderSummary } from "@/components/sections/checkout/OrderSummary";
import { ACCENT } from "@/lib/theme";

export function DoneStep({
  email,
  eventName,
  division,
  category,
  qty,
  tierLabel,
  totalLabel,
  orderId,
  onViewDashboard,
  onBackHome,
}: {
  email: string;
  eventName: string;
  division: string;
  category: string;
  qty: number;
  tierLabel?: string;
  totalLabel: string;
  orderId: string;
  onViewDashboard: () => void;
  onBackHome: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <m.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: ACCENT }}
      >
        <Check size={40} strokeWidth={3} className="text-black" />
      </m.div>
      <div>
        <h2
          className="text-3xl uppercase tracking-wide text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Tu lugar está confirmado
        </h2>
        <p className="mt-2 text-sm text-white/55">
          Enviamos la confirmación y tu boleto a{" "}
          <span className="font-semibold text-white">{email}</span>.
        </p>
      </div>
      <OrderSummary
        eventName={eventName}
        division={division}
        category={category}
        qty={qty}
        tierLabel={tierLabel}
        total={totalLabel}
        orderId={orderId}
      />
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Button variant="outline" size="lg" className="flex-1" onClick={onViewDashboard}>
          Ver mi panel
        </Button>
        <Button variant="ghost" size="lg" className="flex-1" onClick={onBackHome}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
