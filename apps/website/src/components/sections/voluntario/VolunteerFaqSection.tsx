import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EASE, fadeUp } from "@/lib/animation";

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
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left active:scale-[0.98] transition-transform"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-white sm:text-base">{question}</span>
        <ChevronRight
          className="h-4 w-4 shrink-0 text-[#ffffff] transition-transform duration-200 ease-out"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <div className="border-t border-[#2a2a2a] px-5 py-4 text-sm leading-relaxed text-white/70">
              {answer}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function VolunteerFaqSection() {
  return (
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
    </m.section>
  );
}
