import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FaqAccordionItem } from "@/components/sections/faq/FaqAccordionItem";
import { faqData, type FAQCategory } from "@/data/faq";

export function FaqCategoryList({
  categories,
  searchTerm,
  slug,
}: {
  categories: FAQCategory[];
  searchTerm: string;
  slug: (title: string) => string;
}) {
  return (
    <div className="space-y-14 sm:space-y-16">
      {categories.map((category) => {
        const categoryIndex = faqData.findIndex((item) => item.title === category.title);
        const headingId = `faq-cat-${categoryIndex}`;

        return (
          <section
            key={category.title}
            id={slug(category.title)}
            data-faq-section
            data-idx={categoryIndex}
            aria-labelledby={headingId}
            className="scroll-mt-40 lg:scroll-mt-28"
          >
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-rl-border-strong pb-5">
              <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  className="text-4xl leading-none tabular-nums sm:text-5xl"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(212,255,0,0.65)",
                  }}
                >
                  {String(categoryIndex + 1).padStart(2, "0")}
                </span>
                <h2
                  id={headingId}
                  className="text-balance text-3xl leading-none tracking-wide text-white uppercase sm:text-4xl"
                >
                  {category.title}
                </h2>
              </div>
              <span
                className="shrink-0 text-xs font-semibold tabular-nums text-rl-text-muted"
                aria-label={`${category.items.length} ${category.items.length === 1 ? "pregunta" : "preguntas"}`}
              >
                {category.items.length}
                <span className="hidden sm:inline">
                  {category.items.length === 1 ? " pregunta" : " preguntas"}
                </span>
              </span>
            </div>

            <div>
              {category.items.map((item, index) => (
                <FaqAccordionItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  index={index}
                  searchTerm={searchTerm}
                />
              ))}
            </div>
          </section>
        );
      })}

      <aside className="border-y border-rl-border-strong bg-white/[0.025] px-5 py-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-rl-accent">
            ¿Aún tienes dudas?
          </p>
          <h2 className="mt-2 text-balance text-3xl leading-none text-white sm:text-4xl">
            Hablemos de tu siguiente desafío
          </h2>
        </div>
        <Link
          to="/contacto"
          className="mt-6 inline-flex min-h-12 shrink-0 items-center gap-2 bg-rl-accent px-6 text-sm font-bold uppercase tracking-widest text-black transition-[filter,transform] duration-160 hover:brightness-95 active:scale-[0.96] sm:mt-0"
        >
          Contactar al equipo
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
