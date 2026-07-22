import { type ChangeEvent, type FormEvent, type ReactNode, useState } from "react";
import { ArrowRight, Building2, ChevronDown, Mail, Users } from "lucide-react";

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
  "min-h-12 w-full border bg-white/[0.04] px-4 text-sm text-white placeholder:text-rl-text-muted outline-none transition-[border-color,background-color,box-shadow] duration-160 hover:border-rl-border-strong focus:border-rl-accent focus:bg-white/[0.07] focus:ring-2 focus:ring-rl-accent/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent";
const okBorder = "border-rl-border-strong";
const errBorder = "border-red-400";
const labelCls = "text-xs font-bold uppercase tracking-[0.16em] text-rl-text-secondary";

function validate(fields: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  for (const key of REQUIRED) {
    if (!fields[key].trim()) errors[key] = "Este campo es obligatorio.";
  }
  if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }
  return errors;
}

export function ApplicationFormSection() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});

  const set = (key: keyof Fields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validate(fields);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const first = REQUIRED.find((key) => found[key]) ?? (Object.keys(found)[0] as keyof Fields);
      document.getElementById(`gym-${first}`)?.focus();
      return;
    }

    const subject = `Solicitud de afiliación — ${fields.gymName}`;
    const body = [
      `Gimnasio: ${fields.gymName}`,
      `Responsable: ${fields.manager}`,
      `Correo: ${fields.email}`,
      `Teléfono: ${fields.phone || "No indicado"}`,
      `Ciudad: ${fields.city}`,
      `Nivel de interés: ${fields.type}`,
      `Miembros: ${fields.members || "No indicado"}`,
      "",
      "Mensaje:",
      fields.message || "Sin mensaje adicional",
    ].join("\n");

    window.location.href = `mailto:contacto@runluv.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    void import("sonner").then(({ toast }) =>
      toast.info("Solicitud preparada", {
        description: "Revisa el mensaje en tu aplicación de correo y presiona enviar.",
      }),
    );
  }

  const fieldProps = (key: keyof Fields) => ({
    id: `gym-${key}`,
    value: fields[key],
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    "aria-required": REQUIRED.includes(key) || undefined,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      set(key)(event.target.value),
  });

  return (
    <section
      id="afiliacion"
      className="rl-deferred-section scroll-mt-24 bg-rl-surface-raised px-6 py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-rl-accent">
            Tu sede, el siguiente punto
          </p>
          <h2 className="max-w-xl text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.9] tracking-[0.01em] text-white">
            Hablemos de tu afiliación
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-rl-text-secondary">
            Comparte la información básica. La solicitud inicia una conversación; no implica un
            compromiso ni una afiliación automática.
          </p>

          <div className="mt-10 border-y border-rl-border-subtle">
            {[
              { icon: Building2, text: "Información general de tu gimnasio" },
              { icon: Users, text: "Tamaño aproximado de tu comunidad" },
              { icon: Mail, text: "Un contacto para continuar la conversación" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex min-h-16 items-center gap-4 border-b border-rl-border-subtle last:border-b-0"
              >
                <item.icon className="h-5 w-5 shrink-0 text-rl-accent" aria-hidden="true" />
                <span className="text-sm text-rl-text-secondary">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-rl-text-muted">
            ¿Prefieres escribirnos?{" "}
            <a
              href="mailto:contacto@runluv.mx"
              className="inline-flex min-h-11 items-center text-white underline decoration-white/40 underline-offset-4 transition-[color,decoration-color] duration-160 hover:text-rl-accent hover:decoration-rl-accent"
            >
              contacto@runluv.mx
            </a>
          </p>
        </div>

        <div className="border border-rl-border-strong bg-white/[0.03] p-5 sm:p-8 lg:p-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="flex items-center justify-between gap-4 border-b border-rl-border-subtle pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rl-accent">
                  Solicitud inicial
                </p>
                <p className="mt-1 text-sm text-rl-text-secondary">
                  Los campos con * son obligatorios.
                </p>
              </div>
              <span className="font-mono text-xs text-rl-text-muted">01 / 01</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre del gimnasio" name="gymName" error={errors.gymName}>
                <input
                  {...fieldProps("gymName")}
                  type="text"
                  autoComplete="organization"
                  className={`${inputBase} ${errors.gymName ? errBorder : okBorder}`}
                  placeholder="Tu gimnasio"
                />
              </Field>
              <Field label="Nombre del responsable" name="manager" error={errors.manager}>
                <input
                  {...fieldProps("manager")}
                  type="text"
                  autoComplete="name"
                  className={`${inputBase} ${errors.manager ? errBorder : okBorder}`}
                  placeholder="Nombre y apellido"
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Correo electrónico" name="email" error={errors.email}>
                <input
                  {...fieldProps("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={`${inputBase} ${errors.email ? errBorder : okBorder}`}
                  placeholder="equipo@gimnasio.mx"
                />
              </Field>
              <Field label="Teléfono" name="phone">
                <input
                  {...fieldProps("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={`${inputBase} ${okBorder}`}
                  placeholder="+52 55 0000 0000"
                />
              </Field>
            </div>

            <Field label="Ciudad" name="city" error={errors.city}>
              <input
                {...fieldProps("city")}
                type="text"
                autoComplete="address-level2"
                className={`${inputBase} ${errors.city ? errBorder : okBorder}`}
                placeholder="Ciudad, estado"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Modelo de interés" name="type" error={errors.type}>
                <SelectWrap>
                  <select
                    {...fieldProps("type")}
                    className={`${inputBase} appearance-none pr-11 ${errors.type ? errBorder : okBorder}`}
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="Running Club">Running Club</option>
                    <option value="Performance Centre">Performance Centre</option>
                    <option value="Performance Academy">Performance Academy</option>
                  </select>
                </SelectWrap>
              </Field>
              <Field label="Número de miembros" name="members">
                <SelectWrap>
                  <select
                    {...fieldProps("members")}
                    className={`${inputBase} appearance-none pr-11 ${okBorder}`}
                  >
                    <option value="" disabled>
                      Selecciona un rango
                    </option>
                    <option value="lt50">Menos de 50</option>
                    <option value="50-150">50–150</option>
                    <option value="150-300">150–300</option>
                    <option value="300plus">Más de 300</option>
                  </select>
                </SelectWrap>
              </Field>
            </div>

            <Field label="Cuéntanos un poco más" name="message">
              <textarea
                {...fieldProps("message")}
                rows={4}
                className={`w-full resize-y border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-rl-text-muted outline-none transition-[border-color,background-color,box-shadow] duration-160 hover:border-rl-border-strong focus:border-rl-accent focus:bg-white/[0.07] focus:ring-2 focus:ring-rl-accent/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent ${okBorder}`}
                placeholder="Comunidad, objetivos o ideas para colaborar…"
              />
            </Field>

            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-rl-accent px-7 text-sm font-bold uppercase tracking-widest text-black transition-[filter,transform] duration-160 hover:brightness-95 active:scale-[0.96] sm:w-auto"
            >
              Preparar solicitud
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="text-xs leading-relaxed text-rl-text-muted">
              Al continuar, abriremos tu aplicación de correo con la solicitud preparada. Revisa el
              mensaje y envíalo para compartir tus datos. Consulta nuestro{" "}
              <a
                href="/privacidad"
                className="inline-flex min-h-11 items-center text-white underline decoration-white/40 underline-offset-4 transition-[color,decoration-color] duration-160 hover:text-rl-accent hover:decoration-rl-accent"
              >
                aviso de privacidad
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: keyof Fields;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`gym-${name}`} className={labelCls}>
        {label} {REQUIRED.includes(name) && <span className="text-rl-accent">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className="text-xs font-medium text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-rl-text-secondary"
        aria-hidden="true"
      />
    </div>
  );
}
