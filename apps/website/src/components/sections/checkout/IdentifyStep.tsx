import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { inputCls, labelCls, isEmail } from "@/components/sections/checkout/shared";

export function IdentifyStep({
  email,
  onEmailChange,
  onLogin,
  onContinueAsGuest,
}: {
  email: string;
  onEmailChange: (value: string) => void;
  onLogin: () => void;
  onContinueAsGuest: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-white/55">
        Inicia sesión para guardar tu orden en tu panel, o continúa como invitado y recibe la
        confirmación por correo.
      </p>
      <Button variant="primary" size="lg" onClick={onLogin}>
        Iniciar sesión <ArrowRight size={16} />
      </Button>

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
          o continúa como invitado
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelCls}>Correo</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="tu@correo.com"
            className={inputCls}
          />
        </div>
      </label>
      <Button variant="outline" size="lg" disabled={!isEmail(email)} onClick={onContinueAsGuest}>
        Continuar como invitado <ArrowRight size={16} />
      </Button>
    </div>
  );
}
