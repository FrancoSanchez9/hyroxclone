import { m } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

const EASE = [0.23, 1, 0.32, 1] as const;

const steps = [
  {
    number: "01",
    title: "Completa el formulario",
    description: "Envía tu solicitud con información de tu gimnasio.",
  },
  {
    number: "02",
    title: "Revisión y aprobación",
    description: "El equipo HYROX revisa tu solicitud en 5-10 días hábiles.",
  },
  {
    number: "03",
    title: "Onboarding",
    description: "Recibe tu kit de bienvenida, acceso a la plataforma y comienza a crecer.",
  },
];

export function HowToApplySection() {
  return (
    <section className="py-20 px-6 border-t border-[#2a2a2a]">
      <div className="mx-auto max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12"
        >
          <Badge variant="yellow" className="mb-4">
            PROCESO
          </Badge>
          <h2
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="text-[clamp(2rem,6vw,3.5rem)] leading-none tracking-tight text-white"
          >
            CÓMO APLICAR
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <m.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <span
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  className="text-4xl leading-none text-[#ffffff]"
                >
                  {step.number}
                </span>
                {i < steps.length - 1 && (
                  <div className="mt-3 hidden md:block h-full w-px bg-[#2a2a2a]" />
                )}
              </div>
              <div className="pb-6">
                <h3
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  className="text-xl tracking-wide text-white mb-2"
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
