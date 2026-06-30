import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { m } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { EASE, fadeUp } from "@/lib/animation";
import { Button } from "@/components/ui/Button";

export function VolunteerFormSection() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      ciudad: "",
      experiencia: "",
    },
    onSubmit: async () => {
      setSubmitted(true);
      toast.success("¡Solicitud enviada!", {
        description: "Te contactaremos en los próximos días con tu asignación.",
      });
    },
  });

  return (
    <m.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="py-20 px-6 border-t border-[#2a2a2a]"
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-10">
          <Badge variant="yellow" className="mb-4">
            FORMULARIO
          </Badge>
          <h2
            className="text-[clamp(2rem,6vw,4rem)] leading-none text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            QUIERO SER VOLUNTARIO
          </h2>
        </div>

        {submitted ? (
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="rounded-lg border border-[#ffffff]/30 bg-[#ffffff]/5 px-6 py-8 text-center"
          >
            <p
              className="mb-2 text-2xl text-[#ffffff]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              ¡SOLICITUD ENVIADA!
            </p>
            <p className="text-sm text-white/60">
              Gracias por tu interés. Te contactaremos pronto con los detalles de tu asignación.
            </p>
          </m.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field name="nombre">
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50"
                  >
                    Nombre completo <span className="text-[#ffffff]">*</span>
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    aria-label="Nombre completo"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    aria-required="true"
                    className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-150 focus:border-[#ffffff]"
                    placeholder="Tu nombre completo"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50"
                  >
                    Email <span className="text-[#ffffff]">*</span>
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="email"
                    aria-label="Email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    aria-required="true"
                    className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-150 focus:border-[#ffffff]"
                    placeholder="tu@email.com"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="telefono">
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50"
                  >
                    Teléfono <span className="text-[#ffffff]">*</span>
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    inputMode="tel"
                    aria-label="Teléfono"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    aria-required="true"
                    className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-150 focus:border-[#ffffff]"
                    placeholder="+52 55 0000 0000"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="ciudad">
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50"
                  >
                    Ciudad / Evento de interés <span className="text-[#ffffff]">*</span>
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    aria-required="true"
                    className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition-colors duration-150 focus:border-[#ffffff] appearance-none"
                  >
                    <option value="" disabled className="text-white/50">
                      Selecciona un evento
                    </option>
                    <option value="acapulco-2026">Acapulco — Sep 2026</option>
                    <option value="cdmx-2026">Ciudad de México — Oct 2026</option>
                    <option value="monterrey-2026">Monterrey — Nov 2026</option>
                    <option value="guadalajara-2027">Guadalajara — Ene 2027</option>
                  </select>
                </div>
              )}
            </form.Field>

            <form.Field name="experiencia">
              {(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50"
                  >
                    Experiencia previa{" "}
                    <span className="normal-case font-normal text-white/50">(opcional)</span>
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    aria-label="Experiencia previa"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={4}
                    className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-150 focus:border-[#ffffff] resize-none"
                    placeholder="Cuéntanos sobre cualquier experiencia previa en eventos deportivos o como voluntario..."
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
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                </Button>
              )}
            </form.Subscribe>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-white/60">
          También puedes contactarnos por WhatsApp{" "}
          <a
            href="https://wa.me/5215500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffffff] hover:underline"
          >
            +52 55 0000 0000
          </a>
        </p>
      </div>
    </m.section>
  );
}
