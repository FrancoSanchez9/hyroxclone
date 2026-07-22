import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { faqData, type FAQCategory } from "@/data/faq";
import { FaqSearchHeader } from "@/components/sections/faq/FaqSearchHeader";
import { FaqMobileCategoryNav } from "@/components/sections/faq/FaqMobileCategoryNav";
import { FaqDesktopCategoryNav } from "@/components/sections/faq/FaqDesktopCategoryNav";
import { FaqEmptyState } from "@/components/sections/faq/FaqEmptyState";
import { FaqCategoryList } from "@/components/sections/faq/FaqCategoryList";

const normalized = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f®]/g, "");

const slug = (title: string) =>
  normalized(title)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const TOTAL_QUESTIONS = faqData.reduce((total, category) => total + category.items.length, 0);

function FAQPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const searchTerm = normalized(query.trim());
  const filtered = useMemo(() => {
    if (!searchTerm) return faqData;

    return faqData.reduce<typeof faqData>((acc, category) => {
      const categoryMatches = normalized(category.title).includes(searchTerm);
      const items = categoryMatches
        ? category.items
        : category.items.filter(
            (item) =>
              normalized(item.question).includes(searchTerm) ||
              normalized(item.answer).includes(searchTerm),
          );
      if (items.length > 0) acc.push({ ...category, items });
      return acc;
    }, []);
  }, [searchTerm]);

  const resultCount = filtered.reduce((total, category) => total + category.items.length, 0);
  const visibleSections = filtered.map((category) => slug(category.title)).join("|");

  // react-doctor-disable-next-line react-doctor/effect-needs-cleanup -- cleanup already returned below (observer.disconnect)
  useEffect(() => {
    const sections = document.querySelectorAll("[data-faq-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.idx));
          }
        }
      },
      { rootMargin: "-18% 0px -72% 0px" },
    );
    sections.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleSections]);

  const categoryLink = (category: FAQCategory) => {
    const categoryIndex = faqData.findIndex((item) => item.title === category.title);
    return {
      categoryIndex,
      isActive: active === categoryIndex,
      href: `#${slug(category.title)}`,
    };
  };

  return (
    <div
      className="relative min-h-dvh overflow-x-clip px-4 pb-24 pt-28 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(170deg, var(--color-rl-surface-canvas) 0%, var(--color-rl-surface-subtle) 40%, var(--color-rl-surface-overlay) 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -right-56 top-32 h-[34rem] w-[34rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.07), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 119px, color-mix(in srgb, var(--color-white) 2.5%, transparent) 119px, color-mix(in srgb, var(--color-white) 2.5%, transparent) 120px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <FaqSearchHeader
          query={query}
          onQueryChange={setQuery}
          totalQuestions={TOTAL_QUESTIONS}
          topicCount={faqData.length}
          searchTerm={searchTerm}
          resultCount={resultCount}
          filteredCount={filtered.length}
        />

        {filtered.length > 0 && (
          <FaqMobileCategoryNav categories={filtered} categoryLink={categoryLink} />
        )}

        <div className="grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          <FaqDesktopCategoryNav
            categories={filtered}
            categoryLink={categoryLink}
            searchTerm={searchTerm}
          />

          <div className="min-w-0">
            {filtered.length === 0 ? (
              <FaqEmptyState query={query} onClearQuery={() => setQuery("")} />
            ) : (
              <FaqCategoryList categories={filtered} searchTerm={searchTerm} slug={slug} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes | runluv®" },
      {
        name: "description",
        content:
          "Resuelve tus dudas sobre runluv®: inscripciones, modalidades, preparación, horarios, seguridad, espectadores y resultados.",
      },
    ],
  }),
  component: FAQPage,
});
