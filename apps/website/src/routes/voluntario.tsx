import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Shield, Package, Coffee, Users, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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

const faqs = [
  {
    question: "¿Cuántas horas debo trabajar como voluntario?",
    answer:
      "El turno estándar es de 8 horas. Incluye briefing inicial, tu turno activo y el cierre del evento. Recibirás el horario exacto al momento de la confirmación.",
  },
  {
    question: "¿Necesito experiencia previa en eventos deportivos?",
    answer:
      "No es necesario. Nuestro equipo te dará toda la capacitación antes del evento. Solo necesitas actitud positiva, disposición para trabajar en equipo y estar listo para moverte.",
  },
  {
    question: "¿Puedo elegir en qué estación o área trabajar?",
    answer:
      "Puedes indicar tus preferencias en el formulario y las tomamos en cuenta, pero la asignación final depende de las necesidades del evento. Todos los roles son igual de importantes.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-white sm:text-base">{question}</span>
        <ChevronRight
          className="h-4 w-4 shrink-0 text-[#e5f93a] transition-transform duration-200 ease-out"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="border-t border-[#2a2a2a] px-5 py-4 text-sm leading-relaxed text-white/70">
            {answer}
          </div>
        </motion.div>
      )}
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

function VoluntarioPage() {
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
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        badge="HAZTE VOLUNTARIO"
        title="SÉ PARTE DE ALGO GRANDE"
        subtitle="Únete a nuestro equipo de voluntarios y vive la experiencia HYROX desde adentro."
      />

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
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
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              >
                <Card hover className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center bg-[#e5f93a]/10">
                      <benefit.icon className="h-5 w-5 text-[#e5f93a]" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{benefit.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-white/60">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        className="py-20 px-6 bg-[#0f0f0f] border-t border-[#2a2a2a]"
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
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="flex gap-5"
              >
                <span
                  className="shrink-0 text-[3.5rem] leading-none text-[#e5f93a]/20 select-none"
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-lg border border-[#e5f93a]/30 bg-[#e5f93a]/5 px-6 py-8 text-center"
            >
              <p
                className="mb-2 text-2xl text-[#e5f93a]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
              >
                ¡SOLICITUD ENVIADA!
              </p>
              <p className="text-sm text-white/60">
                Gracias por tu interés. Te contactaremos pronto con los detalles de tu asignación.
              </p>
            </motion.div>
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
                      Nombre completo <span className="text-[#e5f93a]">*</span>
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors duration-150 focus:border-[#e5f93a]"
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
                      Email <span className="text-[#e5f93a]">*</span>
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors duration-150 focus:border-[#e5f93a]"
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
                      Teléfono <span className="text-[#e5f93a]">*</span>
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors duration-150 focus:border-[#e5f93a]"
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
                      Ciudad / Evento de interés <span className="text-[#e5f93a]">*</span>
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition-colors duration-150 focus:border-[#e5f93a] appearance-none"
                    >
                      <option value="" disabled className="text-white/30">
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
                      <span className="normal-case font-normal text-white/30">(opcional)</span>
                    </label>
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={4}
                      className="w-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors duration-150 focus:border-[#e5f93a] resize-none"
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

          <p className="mt-6 text-center text-sm text-white/40">
            También puedes contactarnos por WhatsApp{" "}
            <a
              href="https://wa.me/5215500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e5f93a] hover:underline"
            >
              +52 55 0000 0000
            </a>
          </p>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        className="py-20 px-6 bg-[#0f0f0f] border-t border-[#2a2a2a]"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <Badge variant="dark" className="mb-4 border border-[#3a3a3a]">
              FAQ VOLUNTARIOS
            </Badge>
            <h2
              className="text-[clamp(2rem,6vw,4rem)] leading-none text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              PREGUNTAS RÁPIDAS
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}

export const Route = createFileRoute("/voluntario")({
  head: () => ({
    meta: seo({
      title: "Hazte Voluntario",
      description:
        "Únete al equipo de voluntarios HYROX y vive el evento desde adentro. Conoce los beneficios y regístrate.",
    }),
  }),
  component: VoluntarioPage,
});
