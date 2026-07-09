import { useState } from "react";
import { m } from "framer-motion";
import { toast } from "sonner";
import { Check, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/theme";

type Fields = {
  gymName: string;
  manager: string;
  email: string;
  phone: string;
  city: string;
  type: string;
  members: string;
  message: string;
};

const EMPTY: Fields = {
  gymName: "",
  manager: "",
  email: "",
  phone: "",
  city: "",
  type: "",
  members: "",
  message: "",
};

const REQUIRED: (keyof Fields)[] = ["gymName", "manager", "email", "city", "type"];

const inputBase =
  "h-11 w-full border bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/40 outline-none transition-colors duration-150 focus:border-white";
const okBorder = "border-[#2a2a2a]";
const errBorder = "border-red-500";

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  for (const k of REQUIRED) if (!f[k].trim()) e[k] = "Este campo es obligatorio.";
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Ingresa un correo electrónico válido.";
  return e;
}

export function ApplicationFormSection() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(fields);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const first = REQUIRED.find((k) => found[k]) ?? (Object.keys(found)[0] as keyof Fields);
      document.getElementById(`gym-${first}`)?.focus();
      return;
    }
    setSubmitting(true);
    // Simulate the request; swap for a real endpoint when the backend is ready.
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      toast.success("¡Solicitud enviada!", {
        description: "El equipo runluv® revisará tu solicitud en 5-10 días hábiles.",
      });
    }, 700);
  }

  const fieldProps = (k: keyof Fields, id: string) => ({
    id: `gym-${k}`,
    value: fields[k],
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id}-error` : undefined,
    "aria-required": REQUIRED.includes(k) || undefined,
    onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      set(k)(ev.target.value),
  });

  return (
    <section className="border-t border-[#2a2a2a] px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10"
        >
          <Badge variant="yellow" className="mb-4">
            FORMULARIO
          </Badge>
          <h2
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="text-[clamp(2rem,6vw,3.5rem)] leading-none tracking-tight text-white"
          >
            SOLICITAR AFILIACIÓN
          </h2>
        </m.div>

        {sent ? (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col items-start gap-5 border border-rl-accent/40 bg-rl-accent/[0.06] p-8"
            role="status"
            aria-live="polite"
          >
            <span className="flex h-12 w-12 items-center justify-center bg-rl-accent text-black">
              <Check className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3
              className="text-3xl uppercase text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ¡Solicitud enviada!
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              Gracias, <strong className="text-white/80">{fields.gymName}</strong>. El equipo
              runluv® revisará tu solicitud y te contactará en{" "}
              <strong className="text-white/80">{fields.email}</strong> en 5-10 días hábiles.
            </p>
          </m.div>
        ) : (
          <m.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="space-y-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gym-gymName" className={labelCls}>
                  Nombre del gimnasio <span className="text-rl-accent">*</span>
                </label>
                <input
                  {...fieldProps("gymName", "gymName")}
                  type="text"
                  className={`${inputBase} ${errors.gymName ? errBorder : okBorder}`}
                  placeholder="CrossFit Box MX"
                />
                <FieldError id="gymName" msg={errors.gymName} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gym-manager" className={labelCls}>
                  Nombre del responsable <span className="text-rl-accent">*</span>
                </label>
                <input
                  {...fieldProps("manager", "manager")}
                  type="text"
                  autoComplete="name"
                  className={`${inputBase} ${errors.manager ? errBorder : okBorder}`}
                  placeholder="Juan Pérez"
                />
                <FieldError id="manager" msg={errors.manager} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gym-email" className={labelCls}>
                  Email <span className="text-rl-accent">*</span>
                </label>
                <input
                  {...fieldProps("email", "email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={`${inputBase} ${errors.email ? errBorder : okBorder}`}
                  placeholder="gym@ejemplo.com"
                />
                <FieldError id="email" msg={errors.email} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gym-phone" className={labelCls}>
                  Teléfono
                </label>
                <input
                  {...fieldProps("phone", "phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={`${inputBase} ${okBorder}`}
                  placeholder="+52 55 0000 0000"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="gym-city" className={labelCls}>
                Ciudad <span className="text-rl-accent">*</span>
              </label>
              <input
                {...fieldProps("city", "city")}
                type="text"
                autoComplete="address-level2"
                className={`${inputBase} ${errors.city ? errBorder : okBorder}`}
                placeholder="Ciudad de México"
              />
              <FieldError id="city" msg={errors.city} />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gym-type" className={labelCls}>
                  Tipo de afiliación deseada <span className="text-rl-accent">*</span>
                </label>
                <select
                  {...fieldProps("type", "type")}
                  className={`${inputBase} appearance-none ${errors.type ? errBorder : okBorder}`}
                >
                  <option value="" disabled>
                    Selecciona un tipo
                  </option>
                  <option value="training-club">Training Club</option>
                  <option value="performance-centre">Performance Centre</option>
                  <option value="performance-academy">Performance Academy</option>
                </select>
                <FieldError id="type" msg={errors.type} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gym-members" className={labelCls}>
                  ¿Cuántos miembros tiene tu gimnasio?
                </label>
                <select
                  {...fieldProps("members", "members")}
                  className={`${inputBase} appearance-none ${okBorder}`}
                >
                  <option value="" disabled>
                    Selecciona un rango
                  </option>
                  <option value="lt50">&lt;50</option>
                  <option value="50-150">50-150</option>
                  <option value="150-300">150-300</option>
                  <option value="300plus">300+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="gym-message" className={labelCls}>
                Mensaje adicional
              </label>
              <textarea
                {...fieldProps("message", "message")}
                rows={4}
                className={`w-full resize-none border bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-150 focus:border-white ${okBorder}`}
                placeholder="Cuéntanos más sobre tu gimnasio..."
              />
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                disabled={submitting}
              >
                {submitting ? "Enviando…" : "Enviar solicitud"}
                {!submitting && <ChevronRight className="h-4 w-4" />}
              </Button>
              <p className="text-xs text-white/60">
                También puedes contactar a nuestro equipo en{" "}
                <a
                  href="mailto:info@runluv.mx"
                  className="text-white underline underline-offset-2 transition-colors duration-150 hover:text-white/70"
                >
                  info@runluv.mx
                </a>
              </p>
            </div>
          </m.form>
        )}
      </div>
    </section>
  );
}

const labelCls = "text-xs font-semibold uppercase tracking-widest text-white/50";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
      {msg}
    </p>
  );
}
