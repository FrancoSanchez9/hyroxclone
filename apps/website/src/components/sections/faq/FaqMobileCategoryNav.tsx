import { cn } from "@/lib/utils";
import { type FAQCategory } from "@/data/faq";

export function FaqMobileCategoryNav({
  categories,
  categoryLink,
}: {
  categories: FAQCategory[];
  categoryLink: (category: FAQCategory) => {
    categoryIndex: number;
    isActive: boolean;
    href: string;
  };
}) {
  return (
    <nav
      aria-label="Categorías de preguntas"
      className="sticky top-20 z-30 -mx-4 mb-10 border-y border-rl-border-subtle bg-black/92 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden"
    >
      <div className="flex gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const link = categoryLink(category);
          return (
            <a
              key={category.title}
              href={link.href}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 text-xs font-bold uppercase tracking-wider transition-[color,border-color,background-color,transform] duration-160 active:scale-[0.96]",
                link.isActive
                  ? "border-rl-accent bg-rl-accent text-black"
                  : "border-rl-border-strong bg-black/70 text-rl-text-secondary hover:border-white/60 hover:text-white",
              )}
              aria-current={link.isActive ? "location" : undefined}
            >
              {category.title}
              <span className="tabular-nums opacity-70">{category.items.length}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
