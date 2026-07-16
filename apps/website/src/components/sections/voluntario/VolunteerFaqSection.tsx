import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto dura un turno de voluntariado?",
    answer:
      "La duración depende del evento y del rol asignado. Recibirás el horario exacto antes de confirmar tu participación, junto con la hora de llegada y el punto de encuentro.",
  },
  {
    question: "¿Necesito experiencia previa en eventos deportivos?",
    answer:
      "No. Te compartiremos un briefing claro antes de comenzar. Lo más importante es llegar con actitud de equipo, puntualidad y disposición para ayudar.",
  },
  {
    question: "¿Puedo elegir el área en la que quiero participar?",
    answer:
      "Puedes contarnos tus preferencias y experiencia en el formulario. La asignación final depende de las necesidades de cada sede, pero siempre buscamos el mejor encaje para ti.",
  },
  {
    question: "¿Qué debo llevar el día del evento?",
    answer:
      "Ropa cómoda, calzado cerrado y muchas ganas de moverte. Antes del evento te enviaremos instrucciones específicas y te indicaremos qué materiales proporcionará runluv®.",
  },
  {
    question: "¿Hay requisitos de edad o condición física?",
    answer:
      "Los requisitos pueden cambiar según la sede y el rol. Antes de confirmar tu participación te indicaremos la edad mínima, las actividades esperadas y cualquier consideración de seguridad.",
  },
];

export function VolunteerFaqSection() {
  return (
    <section className="bg-rl-surface-canvas px-6 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-rl-accent">
            Antes de registrarte
          </p>
          <h2 className="text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-white">
            Preguntas rápidas
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-rl-text-secondary sm:text-base">
            Lo esencial para llegar preparado, conocer el proceso y disfrutar tu experiencia con el
            equipo.
          </p>
        </div>

        <div className="border-t border-rl-border-strong">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group border-b border-rl-border-strong">
              <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 py-5 text-left transition-[color] duration-160 marker:hidden hover:text-rl-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rl-accent [&::-webkit-details-marker]:hidden">
                <span className="w-8 shrink-0 text-xs font-bold tabular-nums text-rl-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-base font-semibold text-white group-hover:text-rl-accent sm:text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-rl-text-muted transition-transform duration-160 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-6 pl-12 pr-8 text-sm leading-relaxed text-rl-text-secondary sm:text-base">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
