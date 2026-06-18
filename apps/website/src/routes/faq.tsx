import { createFileRoute } from "@tanstack/react-router";
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
    title: "La Carrera",
    items: [
      {
        question: "¿Qué es HYROX?",
        answer:
          "HYROX es la competencia de fitness que combina 8 km de running con 8 estaciones de ejercicio funcional, todo en formato de carrera contrarreloj.",
      },
      {
        question: "¿Cuánto tiempo dura una carrera HYROX?",
        answer:
          "El tiempo promedio de los competidores es de 90 minutos. Los atletas élite terminan entre 55–75 minutos.",
      },
      {
        question: "¿Cuáles son las 8 estaciones?",
        answer: (
          <ul className="space-y-2">
            {[
              { name: "SkiErg", desc: "1,000 m en máquina de remo nórdico" },
              { name: "Sled Push", desc: "50 m empujando trineo con peso" },
              { name: "Sled Pull", desc: "50 m jalando trineo con peso" },
              { name: "Burpee Broad Jumps", desc: "80 m de burpees con salto frontal" },
              { name: "Rowing", desc: "1,000 m en remo ergómetro" },
              { name: "Farmers Carry", desc: "200 m cargando pesas en cada mano" },
              { name: "Sandbag Lunges", desc: "100 m de lunges con sandbag al hombro" },
              { name: "Wall Balls", desc: "75–100 repeticiones de wall ball shots" },
            ].map((station) => (
              <li key={station.name} className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5f93a]" />
                <span>
                  <span className="font-semibold text-white">{station.name}:</span>{" "}
                  <span className="text-white/70">{station.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        ),
      },
      {
        question: "¿Puedo participar si soy principiante?",
        answer:
          "Sí. La categoría Open está diseñada para todos los niveles. No necesitas experiencia previa en competencias; cualquier persona con una base de condición física puede completar un HYROX.",
      },
    ],
  },
  {
    title: "Registro e Inscripción",
    items: [
      {
        question: "¿Cómo me registro?",
        answer:
          "Ingresa a nuestra página de eventos, elige el evento de tu interés y haz clic en 'Registrarse'. Completa el formulario y realiza el pago en línea para confirmar tu lugar.",
      },
      {
        question: "¿Puedo cambiar mi categoría después de registrarme?",
        answer:
          "Sí. Puedes solicitar un cambio de categoría hasta 4 semanas antes del evento. Después de esa fecha no se aceptan modificaciones.",
      },
      {
        question: "¿Qué incluye la inscripción?",
        answer:
          "La inscripción incluye número de pecho (bib number), chip de cronometraje, medalla de finisher y acceso a los resultados oficiales publicados en plataforma.",
      },
    ],
  },
  {
    title: "El Día de la Carrera",
    items: [
      {
        question: "¿Qué debo llevar el día de la carrera?",
        answer:
          "Trae calzado deportivo para correr, ropa cómoda de entrenamiento, agua o hidratación personal y tu confirmación de registro (digital o impresa). Se recomienda llegar al menos 45 minutos antes de tu wave de inicio.",
      },
      {
        question: "¿Hay estacionamiento?",
        answer:
          "La disponibilidad de estacionamiento depende del venue de cada evento. Consulta la página específica del evento para conocer las opciones de acceso y estacionamiento cercano.",
      },
      {
        question: "¿Puedo entrenar en el venue antes de la carrera?",
        answer:
          "No hay zona de calentamiento con acceso al circuito oficial. Sin embargo, se ofrece un recorrido de reconocimiento (walkthrough) del venue para que puedas familiarizarte con las estaciones antes de tu salida.",
      },
    ],
  },
  {
    title: "Tickets y Precios",
    items: [
      {
        question: "¿Cómo compro tickets para un evento?",
        answer:
          'Visita la sección de Eventos en nuestra página, selecciona tu evento y haz clic en "Registrarse". Elige tu categoría (atleta o espectador) y completa la compra en línea. Si un evento está agotado, puedes unirte a la lista de espera.',
      },
      {
        question: "¿Cuándo debo personalizar mi ticket?",
        answer:
          "Todos los tickets de atletas deben personalizarse al menos dos semanas antes del evento para recibir tu asignación de hora de inicio y código QR descargable.",
      },
      {
        question: "¿Puedo transferir mi ticket a otra carrera o división?",
        answer:
          "No es posible transferir tickets a otra carrera o división, incluyendo cambios de día de competencia.",
      },
      {
        question: "¿Cómo funciona el reembolso?",
        answer:
          "Con el Complemento Flex, tienes reembolso del 100% hasta 42 días antes de la carrera y del 50% hasta 7 días antes (a las 7:59 AM). Sin el Flex, no aplican reembolsos.",
      },
      {
        question: "¿Qué es el Complemento Flex?",
        answer:
          "El Complemento Flex es un add-on comprable durante la inscripción que permite cambios de nombre y/o reembolso según el tier elegido (Lite Flex o Flex). Solo disponible durante la compra del ticket.",
      },
    ],
  },
  {
    title: "Espectadores",
    items: [
      {
        question: "¿Se permite la entrada de espectadores?",
        answer:
          "Sí. Los tickets de espectador se compran a través de las páginas del evento según disponibilidad. No se venden en el lugar el día del evento.",
      },
      {
        question: "¿Mis acompañantes pueden grabar mi carrera?",
        answer: "Sí, desde las zonas de espectadores con su ticket correspondiente.",
      },
      {
        question: "¿Se permiten mascotas en el evento?",
        answer:
          "Solo se permiten animales de servicio. No se permiten mascotas regulares. Las restricciones pueden variar por venue.",
      },
      {
        question: "¿Hay servicio de guardarropa para espectadores?",
        answer:
          "No. El guardarropa es exclusivo para atletas. Los espectadores deben llevar consigo todos sus objetos personales.",
      },
    ],
  },
  {
    title: "Resultados y Rankings",
    items: [
      {
        question: "¿Dónde puedo ver mis resultados?",
        answer:
          "Los resultados oficiales se publican en results.hyrox.com organizados por evento, nombre y división. Estarán disponibles el mismo día de la carrera.",
      },
      {
        question: "¿Qué es el Elite 15?",
        answer:
          "El Elite 15 es el circuito de alto rendimiento de HYROX donde los mejores atletas acumulan puntos durante la temporada para clasificar al Campeonato Mundial. Más información en /campeonatos.",
      },
      {
        question: "¿Cómo funcionan los grupos de edad?",
        answer:
          "Los grupos de edad van desde Sub-24 (16-24 años) hasta 85-89. En Doubles, se promedia la edad de ambos competidores. En Relay, los grupos son Sub-40 y 40+.",
      },
    ],
  },
];

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] transition-colors duration-150",
        open && "border-[#3a3a3a]",
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
            "h-4 w-4 shrink-0 text-[#e5f93a] transition-transform duration-200 ease-out",
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
            <div className="border-t border-[#2a2a2a] px-5 py-4 text-sm leading-relaxed text-white/70">
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
    <main className="min-h-screen bg-[#0a0a0a] px-4 pb-24 pt-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#e5f93a]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.3em" }}
          >
            HYROX MÉXICO
          </p>
          <h1
            className="text-[clamp(2.5rem,8vw,5rem)] font-normal leading-none tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            PREGUNTAS FRECUENTES
          </h1>
          <p className="mt-4 text-base text-white/50">
            Todo lo que necesitas saber antes de tu primera carrera HYROX.
          </p>
        </div>

        <div className="space-y-10">
          {faqData.map((category) => (
            <section key={category.title}>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#2a2a2a]" />
                <h2
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e5f93a]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.2em" }}
                >
                  {category.title}
                </h2>
                <span className="h-px flex-1 bg-[#2a2a2a]" />
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
  component: FAQPage,
});
