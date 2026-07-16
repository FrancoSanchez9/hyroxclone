import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "runluv-cookies-accepted";

export function CookieBanner() {
  // Hidden during SSR and the first client render (no `localStorage` on the
  // server); reveal after mount if consent hasn't been stored yet. Avoids the
  // "localStorage is not defined" SSR crash and a hydration mismatch.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "all");
    setVisible(false);
  };

  const necessary = () => {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setVisible(false);
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <m.div
          initial={{ y: "100%" }}
          animate={{ y: "0%", transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] } }}
          exit={{ y: "100%", transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }}
          style={{ backgroundColor: "#111111" }}
          className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/15 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.55)] sm:px-6 sm:py-4"
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
              <Button variant="outline" size="sm" onClick={necessary} className="w-full sm:w-auto">
                Solo necesarias
              </Button>
              <Button variant="outline" size="sm" onClick={accept} className="w-full sm:w-auto">
                Aceptar todas
              </Button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
