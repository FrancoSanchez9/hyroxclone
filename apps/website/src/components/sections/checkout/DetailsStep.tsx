import { User, Mail, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { inputCls, labelCls, isEmail } from "@/components/sections/checkout/shared";

export function DetailsStep({
  name,
  onNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  showBack,
  onBack,
  onContinue,
}: {
  name: string;
  onNameChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  showBack: boolean;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-white/55">¿A nombre de quién va la inscripción?</p>
      <label className="flex flex-col gap-2">
        <span className={labelCls}>Nombre completo</span>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Nombre y apellido"
            className={inputCls}
          />
        </div>
      </label>
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
      <label className="flex flex-col gap-2">
        <span className={labelCls}>Teléfono</span>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="55 1234 5678"
            className={inputCls}
          />
        </div>
      </label>
      <div className="mt-1 flex gap-3">
        {showBack && (
          <Button variant="ghost" size="lg" onClick={onBack}>
            <ArrowLeft size={16} /> Atrás
          </Button>
        )}
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={!name.trim() || !isEmail(email)}
          onClick={onContinue}
        >
          Continuar al pago <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
