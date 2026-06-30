import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Sobre runluv®",
    items: [
      {
        question: "¿Qué es runluv®?",
        answer:
          "runluv® es una plataforma mexicana de eventos de running en autódromos. Combina carrera, resistencia y festival en un formato de 6 a 8 horas diseñado para generar impacto económico, turístico y social en las ciudades donde opera. Bajo el lema 'Resiste hasta el final', transforma el running en una herramienta de desarrollo urbano.",
      },
      {
        question: "¿Qué diferencia a runluv® de una carrera tradicional?",
        answer:
          "Las carreras tradicionales terminan en la meta. runluv® empieza ahí. El formato incluye 6-8 horas de evento, público activo, festival gastronómico-musical y es el único formato de este tipo en México.",
      },
      {
        question: "¿Qué modalidades de carrera ofrece runluv®?",
        answer: (
          <ul className="space-y-2">
            {[
              {
                name: "La Última Vuelta® (LUV)",
                desc: "Formato de eliminación progresiva exclusivo: completa cada vuelta antes del tiempo límite o quedas eliminado. Gana quien resiste hasta el final.",
              },
              {
                name: "Endurance 4H",
                desc: "Cuatro horas para acumular la mayor distancia posible. Corre, trota, camina o descansa: cada kilómetro cuenta.",
              },
              {
                name: "5K / 10K",
                desc: "Formato clásico para velocidad, marca personal o primera experiencia runluv.",
              },
            ].map((modalidad) => (
              <li key={modalidad.name} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a855f7]" />
                <span>
                  <span className="font-semibold text-white">{modalidad.name}:</span>{" "}
                  <span className="text-white/70">{modalidad.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        ),
      },
    ],
  },
  {
    title: "Modelo y Gobiernos",
    items: [
      {
        question: "¿Cómo funciona el modelo de colaboración de runluv® con los gobiernos?",
        answer:
          "runluv® opera bajo un modelo de colaboración público-privada llave en mano. El gobierno municipal o estatal aporta infraestructura, permisos, seguridad, difusión y coinversión. runluv® aporta la producción integral del evento, comercialización, operación completa y la marca.",
      },
      {
        question: "¿Por qué las ciudades deben adoptar el formato runluv® ahora?",
        answer:
          "México tiene más de 15 millones de corredores con crecimiento del 8-12% anual. Los formatos tradicionales están saturados. Las primeras ciudades en adoptar runluv® se posicionarán como sede insignia con retorno económico medible.",
      },
    ],
  },
  {
    title: "Impacto y Contacto",
    items: [
      {
        question: "¿Cuál es el impacto económico de un evento runluv® para una ciudad?",
        answer:
          "Cada evento runluv® genera un retorno de 7 pesos por cada peso invertido. Atrae entre 3,000 y 5,000 corredores y hasta 15,000 asistentes totales. Entre el 20% y el 35% son visitantes foráneos, generando entre 1,500 y 3,500 noches de hotel y un impacto visible durante más de 90 días post-evento.",
      },
      {
        question: "¿Cómo contactar a runluv® para llevar un evento a mi ciudad?",
        answer:
          "Escribe a contacto@runluv.mx o visita runluv.mx para agendar una reunión. runluv® trabaja con gobiernos municipales, estatales y secretarías de turismo en México.",
      },
    ],
  },
];

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[#2a2a3a] bg-[#16161f] transition-colors duration-150",
        open && "border-[#3a3a4a]",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-white sm:text-base">{item.question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#a855f7] transition-transform duration-200 ease-out",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] },
            }}
          >
            <div className="border-t border-[#2a2a3a] px-5 py-4 text-sm leading-relaxed text-white/70">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQPage() {
  return (
    <main className="min-h-screen bg-[#060608] px-4 pb-24 pt-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#a855f7]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.3em" }}
          >
            RUNLUV®
          </p>
          <h1
            className="text-[clamp(2.5rem,8vw,5rem)] font-normal leading-none tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            PREGUNTAS FRECUENTES
          </h1>
          <p className="mt-4 text-base text-white/70">
            Todo lo que gobiernos, corredores y aliados necesitan saber sobre runluv®.
          </p>
        </div>

        <div className="space-y-10">
          {faqData.map((category) => (
            <section key={category.title}>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#2a2a3a]" />
                <h2
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a855f7]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.2em" }}
                >
                  {category.title}
                </h2>
                <span className="h-px flex-1 bg-[#2a2a3a]" />
              </div>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <FAQAccordionItem key={item.question} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: seo({
      title: "Preguntas Frecuentes",
      description:
        "Resolvemos las dudas más comunes sobre runluv®: modalidades de carrera, modelo de colaboración con gobiernos, impacto económico y cómo llevar un evento a tu ciudad.",
    }),
  }),
  component: FAQPage,
});
