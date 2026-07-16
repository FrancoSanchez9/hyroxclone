import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "runluv-cookies-accepted";

export function CookieBanner() {
  // Hidden during SSR and the first client render (no `localStorage` on the
  // server); reveal after mount if consent hasn't been stored yet. Avoids the
  // "localStorage is not defined" SSR crash and a hydration mismatch.
  const [state, setState] = useState<"hidden" | "visible" | "closing">("hidden");

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setState("visible");
  }, []);

  const dismiss = (preference: "all" | "necessary") => {
    localStorage.setItem(STORAGE_KEY, preference);
    setState("closing");
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 160;
    window.setTimeout(() => setState("hidden"), delay);
  };

  if (state === "hidden") return null;

  return (
    <div
      data-closing={state === "closing" || undefined}
      className="cookie-banner fixed right-0 bottom-0 left-0 z-50 border-t border-white/15 bg-[#111111] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.55)] sm:px-6 sm:py-4"
      role="region"
      aria-labelledby="cookie-banner-title"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <h2 id="cookie-banner-title" className="sr-only">
          Preferencias de cookies
        </h2>
        <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
          Usamos cookies para mejorar tu experiencia.{" "}
          <Link
            to="/privacidad"
            className="font-semibold text-white underline underline-offset-2 transition-colors duration-150 hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-accent"
          >
            Política de privacidad
          </Link>
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => dismiss("necessary")}
            className="w-full sm:w-auto"
          >
            Solo necesarias
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dismiss("all")}
            className="w-full sm:w-auto"
          >
            Aceptar todas
          </Button>
        </div>
      </div>
    </div>
  );
}
