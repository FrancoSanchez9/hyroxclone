import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const channels = [
  {
    icon: Mail,
    label: "Correo",
    value: "info@hyrox.mx",
    href: "mailto:info@hyrox.mx",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+52 222 321 7136",
    href: "https://wa.me/522223217136",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@hyroxmexico",
    href: "https://www.instagram.com/hyroxmexico",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    value: "/hyroxmexico",
    href: "https://www.facebook.com/hyroxmexico",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const subjects = [
  "Información general",
  "Inscripciones a eventos",
  "Afiliación de gimnasios",
  "Voluntariado",
  "Patrocinios y prensa",
  "Otro",
];

function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    },
    // TODO: conectar con Supabase (insertar en tabla `mensajes_contacto`)
    // y enviar notificación por correo. Por ahora solo confirma en el cliente.
    onSubmit: async () => {
      setSubmitted(true);
      toast.success("¡Mensaje enviado!", {
        description: "Gracias por escribirnos. Te responderemos lo antes posible.",
      });
    },
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        badge="CONTACTO"
        title="HABLEMOS"
        subtitle="¿Tienes una duda, propuesta o quieres llevar runluv® a tu ciudad? Escríbenos."
      />

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        className="py-20 px-6 border-t border-[#2a2a2a]"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Canales de contacto */}
          <div>
            <Badge variant="dark" className="mb-4 border border-[#3a3a3a]">
              CANALES
            </Badge>
            <h2
              className="mb-8 text-[clamp(2rem,6vw,3.5rem)] leading-none text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ENCUÉNTRANOS
            </h2>

            <div className="space-y-3">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 border border-[#2a2a2a] bg-[#1a1a1a] px-5 py-4 transition-colors duration-150 hover:border-[#e5f93a]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#e5f93a]/10">
                    <channel.icon className="h-5 w-5 text-[#e5f93a]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-white/40">
                      {channel.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-white group-hover:text-[#e5f93a]">
                      {channel.value}
                    </span>
                  </span>
                </a>
              ))}

              <div className="flex items-center gap-4 border border-[#2a2a2a] bg-[#1a1a1a] px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#e5f93a]/10">
                  <MapPin className="h-5 w-5 text-[#e5f93a]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-white/40">
                    Ubicación
                  </span>
                  <span className="block text-sm font-medium text-white">México</span>
                </span>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div>
            <Badge variant="yellow" className="mb-4">
              FORMULARIO
            </Badge>
            <h2
              className="mb-8 text-[clamp(2rem,6vw,3.5rem)] leading-none text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ESCRÍBENOS
            </h2>

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
                  ¡MENSAJE ENVIADO!
                </p>
                <p className="text-sm text-white/60">
                  Gracias por escribirnos. Te responderemos lo antes posible.
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

                <form.Field name="asunto">
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50"
                      >
                        Asunto <span className="text-[#e5f93a]">*</span>
                      </label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                        className="w-full appearance-none border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition-colors duration-150 focus:border-[#e5f93a]"
                      >
                        <option value="" disabled>
                          Selecciona un tema
                        </option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </form.Field>

                <form.Field name="mensaje">
                  {(field) => (
                    <div>
                      <label
                        htmlFor={field.name}
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50"
                      >
                        Mensaje <span className="text-[#e5f93a]">*</span>
                      </label>
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                        rows={5}
                        className="w-full resize-none border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors duration-150 focus:border-[#e5f93a]"
                        placeholder="Cuéntanos en qué podemos ayudarte..."
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
                      {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  )}
                </form.Subscribe>

                <p className="text-center text-xs text-white/40">
                  Al enviar aceptas nuestro{" "}
                  <a href="/privacidad" className="text-[#e5f93a] hover:underline">
                    Aviso de Privacidad
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </motion.section>
    </main>
  );
}

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: seo({
      title: "Contacto",
      description:
        "¿Tienes dudas o una propuesta? Contacta al equipo de HYROX México por correo, WhatsApp o redes sociales.",
    }),
  }),
  component: ContactoPage,
});
