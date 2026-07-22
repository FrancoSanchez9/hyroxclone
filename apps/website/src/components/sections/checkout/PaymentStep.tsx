import { CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OrderSummary } from "@/components/sections/checkout/OrderSummary";
import { inputCls, labelCls } from "@/components/sections/checkout/shared";

export function PaymentStep({
  eventName,
  division,
  category,
  qty,
  tierLabel,
  totalLabel,
  processing,
  onBack,
  onPay,
}: {
  eventName: string;
  division: string;
  category: string;
  qty: number;
  tierLabel?: string;
  totalLabel: string;
  processing: boolean;
  onBack: () => void;
  onPay: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <OrderSummary
        eventName={eventName}
        division={division}
        category={category}
        qty={qty}
        tierLabel={tierLabel}
        total={totalLabel}
      />
      <label className="flex flex-col gap-2">
        <span className={labelCls}>Número de tarjeta</span>
        <div className="relative">
          <CreditCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <input inputMode="numeric" placeholder="4242 4242 4242 4242" className={inputCls} />
        </div>
      </label>
      <div className="flex gap-3">
        <label className="flex flex-1 flex-col gap-2">
          <span className={labelCls}>Vence</span>
          <input
            inputMode="numeric"
            placeholder="MM/AA"
            className={inputCls.replace("pl-11", "px-4")}
          />
        </label>
        <label className="flex flex-1 flex-col gap-2">
          <span className={labelCls}>CVC</span>
          <input
            inputMode="numeric"
            placeholder="123"
            className={inputCls.replace("pl-11", "px-4")}
          />
        </label>
      </div>
      <p className="text-[11px] text-white/40">Pago simulado — no se realiza ningún cargo real.</p>
      <div className="mt-1 flex gap-3">
        <Button variant="ghost" size="lg" onClick={onBack}>
          <ArrowLeft size={16} /> Atrás
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={processing}
          onClick={onPay}
        >
          {processing ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Procesando…
            </>
          ) : (
            <>Pagar {totalLabel}</>
          )}
        </Button>
      </div>
    </div>
  );
}
