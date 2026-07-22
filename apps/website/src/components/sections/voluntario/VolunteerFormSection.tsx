import { useForm } from "@tanstack/react-form";
import { Check, ChevronDown, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { upcomingEvents } from "@/data/events";

const eventMonth = new Intl.DateTimeFormat("es-MX", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/70";
const inputClass =
  "min-h-12 w-full border border-rl-border-strong bg-white/[0.04] px-4 text-sm text-white outline-none transition-[background-color,border-color] duration-160 placeholder:text-rl-text-muted hover:border-white/40 focus:border-rl-accent focus:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent";

export function VolunteerFormSection() {
  const form = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      ciudad: "",
      experiencia: "",
    },
    onSubmit: async ({ value }) => {
      const event = upcomingEvents.find((item) => item.id === value.ciudad);
      const subject = `Solicitud de voluntariado — ${value.nombre}`;
      const body = [
        `Nombre: ${value.nombre}`,
        `Correo: ${value.email}`,
        `Teléfono: ${value.telefono}`,
        `Evento: ${event?.name ?? value.ciudad}`,
        "",
        "Preferencias y experiencia:",
        value.experiencia || "Sin información adicional",
      ].join("\n");

      window.location.href = `mailto:contacto@runluv.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast.info("Solicitud preparada", {
        description: "Revisa el mensaje en tu aplicación de correo y presiona enviar.",
      });
    },
  });

  return (
    <section
      id="solicitud"
      className="scroll-mt-20 border-b border-rl-border-subtle bg-rl-surface-subtle px-6 py-20 sm:py-24 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-rl-accent">
            Tu siguiente vuelta
          </p>
          <h2 className="max-w-xl text-[clamp(3rem,6vw,5.5rem)] leading-[0.88] text-white">
            Queremos conocerte
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-rl-text-secondary">
            Déjanos tus datos y el evento que te interesa. Te contactaremos para confirmar
            disponibilidad, horario y rol.
          </p>

          <div className="mt-10 border-y border-rl-border-strong py-6">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Sólo necesitas
            </p>
            <ul className="space-y-4">
              {[
                "Actitud de equipo",
                "Puntualidad y compromiso",
                "Energía para estar en movimiento",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-rl-text-secondary">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-rl-accent text-black">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="https://wa.me/522223217136"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-white transition-[color,transform] duration-160 hover:text-rl-accent active:scale-[0.96]"
          >
            <MessageCircle className="h-5 w-5 text-rl-accent" aria-hidden="true" />
            ¿Tienes dudas? Escríbenos por WhatsApp
            <span className="sr-only"> (abre en una pestaña nueva)</span>
          </a>
        </aside>

        <div className="border border-rl-border-strong bg-rl-surface-raised p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
          <div className="mb-8 flex items-start justify-between gap-4 border-b border-rl-border-subtle pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-rl-accent">
                Solicitud de voluntariado
              </p>
              <p className="mt-2 text-sm leading-relaxed text-rl-text-secondary">
                Los campos marcados con * son obligatorios.
              </p>
            </div>
            <span
              className="hidden text-5xl leading-none text-white/10 sm:block"
              aria-hidden="true"
            >
              01
            </span>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <form.Field name="nombre">
              {(field) => (
                <div className="sm:col-span-2">
                  <label htmlFor={field.name} className={labelClass}>
                    Nombre completo <span className="text-rl-accent">*</span>
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    autoComplete="name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    required
                    aria-required="true"
                    className={inputClass}
                    placeholder="Tu nombre completo"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <div>
                  <label htmlFor={field.name} className={labelClass}>
                    Email <span className="text-rl-accent">*</span>
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="email"
                    autoComplete="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    required
                    aria-required="true"
                    className={inputClass}
                    placeholder="tu@email.com"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="telefono">
              {(field) => (
                <div>
                  <label htmlFor={field.name} className={labelClass}>
                    Teléfono <span className="text-rl-accent">*</span>
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    required
                    aria-required="true"
                    className={inputClass}
                    placeholder="+52 55 0000 0000"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="ciudad">
              {(field) => (
                <div className="sm:col-span-2">
                  <label htmlFor={field.name} className={labelClass}>
                    Evento de interés <span className="text-rl-accent">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      required
                      aria-required="true"
                      className={`${inputClass} appearance-none pr-12`}
                    >
                      <option value="" disabled>
                        Selecciona un evento
                      </option>
                      {upcomingEvents.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.name.replace("runluv® ", "")} —{" "}
                          {eventMonth.format(new Date(event.date))}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-white/60"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}
            </form.Field>

            <form.Field name="experiencia">
              {(field) => (
                <div className="sm:col-span-2">
                  <label htmlFor={field.name} className={labelClass}>
                    Preferencias y experiencia{" "}
                    <span className="font-normal tracking-normal text-white/50">(opcional)</span>
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    rows={5}
                    className={`${inputClass} resize-none py-3`}
                    placeholder="Cuéntanos qué área prefieres, tu disponibilidad y si tienes experiencia en eventos o logística."
                  />
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="mt-2 w-full bg-rl-accent text-black hover:bg-rl-accent/90 sm:col-span-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Preparando..." : "Preparar solicitud"}
                </Button>
              )}
            </form.Subscribe>
            <p className="text-xs leading-relaxed text-rl-text-muted sm:col-span-2">
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
