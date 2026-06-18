import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { TrendingUp, Award, BookOpen, Package, Users, Zap, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const benefits = [
  {
    icon: TrendingUp,
    title: "Más atletas",
    description:
      "Atrae a una comunidad de miles de atletas HYROX que buscan un lugar para entrenar.",
  },
  {
    icon: Award,
    title: "Reconocimiento oficial",
    description: "Aparece en el localizador oficial HYROX y recibe tráfico orgánico de atletas.",
  },
  {
    icon: BookOpen,
    title: "Formación exclusiva",
    description: "Acceso a la plataforma HYROX365 con contenido de entrenamiento certificado.",
  },
  {
    icon: Package,
    title: "Equipamiento certificado",
    description: "Descuentos en equipamiento oficial HYROX y Centr para tu box.",
  },
  {
    icon: Users,
    title: "Red global",
    description: "Forma parte de una comunidad de más de 5,000 gimnasios en más de 40 países.",
  },
  {
    icon: Zap,
    title: "Marketing",
    description: "Apoyo de HYROX para promoción local, eventos y campañas digitales.",
  },
];

const tableFeatures = [
  { label: "Uso del logo", trainingClub: true, performanceCentre: true, performanceAcademy: true },
  {
    label: "Localizador oficial",
    trainingClub: true,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Acceso HYROX365",
    trainingClub: false,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Cursos de coaches",
    trainingClub: false,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Equipamiento certificado",
    trainingClub: false,
    performanceCentre: false,
    performanceAcademy: true,
  },
  {
    label: "Precio afiliación anual",
    trainingClub: "€500–€800",
    performanceCentre: "€1,000–€1,500",
    performanceAcademy: "€2,000+",
  },
];

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

function CheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#e5f93a]/10">
      <svg className="h-3 w-3 text-[#e5f93a]" fill="none" viewBox="0 0 12 12" aria-hidden="true">
        <path
          d="M2 6l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CrossIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center">
      <svg className="h-3 w-3 text-white/20" fill="none" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-white/80">{value}</span>;
  }
  return value ? <CheckIcon /> : <CrossIcon />;
}

function AfiliacionesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        badge="AFILIACIONES"
        title="ÚNETE A LA RED HYROX"
        subtitle="Expande tu negocio uniéndote a la red de gimnasios oficiales HYROX más grande del mundo."
      />

      <section className="py-20 px-6 border-t border-[#2a2a2a]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-12"
          >
            <Badge variant="yellow" className="mb-4">
              BENEFICIOS
            </Badge>
            <h2
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-[clamp(2rem,6vw,3.5rem)] leading-none tracking-tight text-white"
            >
              BENEFICIOS DE AFILIARTE
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Card hover className="h-full">
                    <CardHeader className="pb-3">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center bg-[#e5f93a]/10">
                        <Icon className="h-5 w-5 text-[#e5f93a]" />
                      </div>
                      <h3
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        className="text-xl tracking-wide text-white"
                      >
                        {benefit.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-white/60">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-[#2a2a2a]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-12"
          >
            <Badge variant="yellow" className="mb-4">
              PLANES
            </Badge>
            <h2
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-[clamp(2rem,6vw,3.5rem)] leading-none tracking-tight text-white"
            >
              NIVELES DE AFILIACIÓN
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="border border-[#2a2a2a] bg-[#111111] px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/50 w-1/4">
                    Característica
                  </th>
                  <th className="border border-[#2a2a2a] bg-[#111111] px-5 py-4 text-center text-xs font-semibold uppercase tracking-widest text-white/70 w-1/4">
                    Training Club
                  </th>
                  <th className="border border-[#e5f93a]/30 bg-[#e5f93a]/5 px-5 py-4 text-center w-1/4">
                    <div className="flex flex-col items-center gap-1">
                      <Badge variant="yellow" className="text-[10px]">
                        RECOMENDADO
                      </Badge>
                      <span
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        className="text-base tracking-wide text-[#e5f93a]"
                      >
                        Performance Centre
                      </span>
                    </div>
                  </th>
                  <th className="border border-[#2a2a2a] bg-[#111111] px-5 py-4 text-center text-xs font-semibold uppercase tracking-widest text-white/70 w-1/4">
                    Performance Academy
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableFeatures.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-[#0e0e0e]" : "bg-[#111111]"}>
                    <td className="border border-[#2a2a2a] px-5 py-3.5 text-sm text-white/70">
                      {row.label}
                    </td>
                    <td className="border border-[#2a2a2a] px-5 py-3.5 text-center">
                      <CellValue value={row.trainingClub} />
                    </td>
                    <td className="border border-[#e5f93a]/20 bg-[#e5f93a]/[0.03] px-5 py-3.5 text-center">
                      <CellValue value={row.performanceCentre} />
                    </td>
                    <td className="border border-[#2a2a2a] px-5 py-3.5 text-center">
                      <CellValue value={row.performanceAcademy} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-[#2a2a2a]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <span
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    className="text-4xl leading-none text-[#e5f93a]"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-[#2a2a2a]">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Nombre del gimnasio
                </label>
                <input
                  type="text"
                  className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/30 outline-none focus:border-[#e5f93a] transition-colors duration-150"
                  placeholder="CrossFit Box MX"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Nombre del responsable
                </label>
                <input
                  type="text"
                  className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/30 outline-none focus:border-[#e5f93a] transition-colors duration-150"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Email
                </label>
                <input
                  type="email"
                  className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/30 outline-none focus:border-[#e5f93a] transition-colors duration-150"
                  placeholder="gym@ejemplo.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/30 outline-none focus:border-[#e5f93a] transition-colors duration-150"
                  placeholder="+52 55 0000 0000"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Ciudad
              </label>
              <input
                type="text"
                className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white placeholder-white/30 outline-none focus:border-[#e5f93a] transition-colors duration-150"
                placeholder="Ciudad de México"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Tipo de afiliación deseada
                </label>
                <select className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white outline-none focus:border-[#e5f93a] transition-colors duration-150 appearance-none">
                  <option value="" disabled selected>
                    Selecciona un tipo
                  </option>
                  <option value="training-club">Training Club</option>
                  <option value="performance-centre">Performance Centre</option>
                  <option value="performance-academy">Performance Academy</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  ¿Cuántos miembros tiene tu gimnasio?
                </label>
                <select className="h-11 w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-sm text-white outline-none focus:border-[#e5f93a] transition-colors duration-150 appearance-none">
                  <option value="" disabled selected>
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
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Mensaje adicional
              </label>
              <textarea
                rows={4}
                className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#e5f93a] transition-colors duration-150 resize-none"
                placeholder="Cuéntanos más sobre tu gimnasio..."
              />
            </div>

            <div className="pt-2 flex flex-col gap-4">
              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                Enviar solicitud
                <ChevronRight className="h-4 w-4" />
              </Button>
              <p className="text-xs text-white/40">
                También puedes contactar a nuestro equipo en{" "}
                <a
                  href="mailto:info@hyrox.mx"
                  className="text-[#e5f93a] underline underline-offset-2 hover:text-[#d4e82e] transition-colors duration-150"
                >
                  info@hyrox.mx
                </a>
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/afiliaciones")({
  component: AfiliacionesPage,
});
