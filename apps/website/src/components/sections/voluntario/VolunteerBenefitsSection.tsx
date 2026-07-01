import { m } from "framer-motion";
import { Shield, Package, Coffee, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { EASE, fadeUp } from "@/lib/animation";

const benefits = [
  {
    icon: Shield,
    title: "Acceso gratuito",
    description: "Entra al evento sin costo y vive la adrenalina desde el interior.",
  },
  {
    icon: Package,
    title: "Camiseta oficial",
    description: "Recibe tu camiseta exclusiva de voluntario HYROX.",
  },
  {
    icon: Coffee,
    title: "Alimentación incluida",
    description: "Almuerzo proporcionado durante tu turno de voluntariado.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description: "Conoce a atletas, coaches y al equipo detrás de HYROX.",
  },
];

const steps = [
  {
    number: "01",
    title: "Regístrate",
    description: "Completa el formulario de interés antes de tu evento elegido.",
  },
  {
    number: "02",
    title: "Confirmación",
    description: "Recibirás un email de confirmación con tu asignación de rol.",
  },
  {
    number: "03",
    title: "El gran día",
    description: "Llega 2 horas antes, recibe tu briefing y disfruta la experiencia.",
  },
];

export function VolunteerBenefitsSection() {
  return (
    <>
      <m.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="py-20 px-6 border-t border-[#2a2a2a]"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <Badge variant="dark" className="mb-4 border border-[#3a3a3a]">
              BENEFICIOS
            </Badge>
            <h2
              className="text-[clamp(2rem,6vw,4rem)] leading-none text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ¿POR QUÉ SER VOLUNTARIO?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit, i) => (
              <m.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.38, delay: i * 0.05, ease: EASE }}
              >
                <Card hover className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center bg-[#ffffff]/10">
                      <benefit.icon className="h-5 w-5 text-[#ffffff]" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{benefit.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-white/60">{benefit.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </div>
      </m.section>

      <m.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="py-20 px-6 bg-[#0f0f0f] border-t border-[#2a2a2a]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.025) 31px, rgba(255,255,255,0.025) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.025) 31px, rgba(255,255,255,0.025) 32px)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <Badge variant="dark" className="mb-4 border border-[#3a3a3a]">
              PROCESO
            </Badge>
            <h2
              className="text-[clamp(2rem,6vw,4rem)] leading-none text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ¿CÓMO FUNCIONA?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <m.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.38, delay: i * 0.05, ease: EASE }}
                className="flex gap-5"
              >
                <span
                  className="shrink-0 text-[3.5rem] leading-none text-[#ffffff]/20 select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {step.number}
                </span>
                <div className="pt-1">
                  <h3
                    className="text-xl text-white mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </m.section>
    </>
  );
}
