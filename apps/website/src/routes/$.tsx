import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 text-center">
      <p
        className="text-[clamp(8rem,30vw,18rem)] leading-none text-rl-purple"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        404
      </p>
      <h1
        className="mt-2 text-[clamp(1.5rem,6vw,3rem)] leading-none tracking-tight text-white"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        PÁGINA NO ENCONTRADA
      </h1>
      <p className="mt-4 max-w-sm text-sm text-white/70">
        La página que buscas no existe o fue movida.
      </p>
      <Link to="/">
        <Button size="lg" variant="primary" className="mt-10">
          Volver al inicio
        </Button>
      </Link>
    </main>
  );
}

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      ...seo({
        title: "Página no encontrada",
        description: "La página que buscas no existe o fue movida.",
      }),
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});
