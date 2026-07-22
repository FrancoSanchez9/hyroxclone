import { cn } from "@/lib/utils";
import { type FAQCategory } from "@/data/faq";

export function FaqDesktopCategoryNav({
  categories,
  categoryLink,
  searchTerm,
}: {
  categories: FAQCategory[];
  categoryLink: (category: FAQCategory) => {
    categoryIndex: number;
    isActive: boolean;
    href: string;
  };
  searchTerm: string;
}) {
  return (
    <nav aria-label="Categorías de preguntas" className="hidden lg:block">
      <div className="sticky top-28 border-t border-rl-border-subtle pt-3">
        <p className="mb-3 px-4 text-[11px] font-bold uppercase tracking-[0.22em] text-rl-text-muted">
          {searchTerm ? "Temas encontrados" : "Explora por tema"}
        </p>
        {categories.map((category) => {
          const link = categoryLink(category);
          return (
            <a
              key={category.title}
              href={link.href}
              className={cn(
                "grid min-h-11 grid-cols-[2rem_1fr_auto] items-center gap-3 border-l-2 px-4 py-2 transition-[color,border-color,background-color] duration-160",
                link.isActive
                  ? "border-rl-accent bg-white/[0.035] text-white"
                  : "border-rl-border-subtle text-rl-text-muted hover:border-white/40 hover:bg-white/[0.025] hover:text-white",
              )}
              aria-current={link.isActive ? "location" : undefined}
            >
              <span
                className={cn(
                  "text-lg leading-none tabular-nums",
                  link.isActive && "text-rl-accent",
                )}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {String(link.categoryIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                {category.title}
              </span>
              <span className="text-xs tabular-nums opacity-70">{category.items.length}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
