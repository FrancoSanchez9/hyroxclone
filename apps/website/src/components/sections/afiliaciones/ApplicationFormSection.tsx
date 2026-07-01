import { m } from "framer-motion";
import { toast } from "sonner";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const EASE = [0.23, 1, 0.32, 1] as const;

export function ApplicationFormSection() {
  return (
    <section className="py-20 px-6 border-t border-[#2a2a2a]">
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

        <m.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("¡Solicitud enviada!", {
              description: "El equipo HYROX revisará tu solicitud en 5-10 días hábiles.",
            });
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="gym-name"
                className="text-xs font-semibold uppercase tracking-widest text-white/50"
              >
                Nombre del gimnasio
              </label>
              <input
                id="gym-name"
                type="text"
                className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/40 outline-none focus:border-[#ffffff] transition-colors duration-150"
                placeholder="CrossFit Box MX"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="gym-manager"
                className="text-xs font-semibold uppercase tracking-widest text-white/50"
              >
                Nombre del responsable
              </label>
              <input
                id="gym-manager"
                type="text"
                className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/40 outline-none focus:border-[#ffffff] transition-colors duration-150"
                placeholder="Juan Pérez"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="gym-email"
                className="text-xs font-semibold uppercase tracking-widest text-white/50"
              >
                Email
              </label>
              <input
                id="gym-email"
                type="email"
                className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/40 outline-none focus:border-[#ffffff] transition-colors duration-150"
                placeholder="gym@ejemplo.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="gym-phone"
                className="text-xs font-semibold uppercase tracking-widest text-white/50"
              >
                Teléfono
              </label>
              <input
                id="gym-phone"
                type="tel"
                className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/40 outline-none focus:border-[#ffffff] transition-colors duration-150"
                placeholder="+52 55 0000 0000"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="gym-city"
              className="text-xs font-semibold uppercase tracking-widest text-white/50"
            >
              Ciudad
            </label>
            <input
              id="gym-city"
              type="text"
              className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/40 outline-none focus:border-[#ffffff] transition-colors duration-150"
              placeholder="Ciudad de México"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="affiliation-type"
                className="text-xs font-semibold uppercase tracking-widest text-white/50"
              >
                Tipo de afiliación deseada
              </label>
              <select
                id="affiliation-type"
                className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white outline-none focus:border-[#ffffff] transition-colors duration-150 appearance-none"
              >
                <option value="" disabled>
                  Selecciona un tipo
                </option>
                <option value="training-club">Training Club</option>
                <option value="performance-centre">Performance Centre</option>
                <option value="performance-academy">Performance Academy</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="gym-members"
                className="text-xs font-semibold uppercase tracking-widest text-white/50"
              >
                ¿Cuántos miembros tiene tu gimnasio?
              </label>
              <select
                id="gym-members"
                className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white outline-none focus:border-[#ffffff] transition-colors duration-150 appearance-none"
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
            <label
              htmlFor="gym-message"
              className="text-xs font-semibold uppercase tracking-widest text-white/50"
            >
              Mensaje adicional
            </label>
            <textarea
              id="gym-message"
              rows={4}
              className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#ffffff] transition-colors duration-150 resize-none"
              placeholder="Cuéntanos más sobre tu gimnasio..."
            />
          </div>

          <div className="pt-2 flex flex-col gap-4">
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              Enviar solicitud
              <ChevronRight className="h-4 w-4" />
            </Button>
            <p className="text-xs text-white/60">
              También puedes contactar a nuestro equipo en{" "}
              <a
                href="mailto:info@hyrox.mx"
                className="text-[#ffffff] underline underline-offset-2 hover:text-[#cccccc] transition-colors duration-150"
              >
                info@hyrox.mx
              </a>
            </p>
          </div>
        </m.form>
      </div>
    </section>
  );
}
