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
          animate={{ y: "0%", transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } }}
          exit={{ y: "100%", transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
          style={{ backgroundColor: "#111111" }}
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-3 border-t border-white/10 px-5 py-3.5 shadow-[0_-10px_40px_rgba(0,0,0,0.55)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4"
          role="dialog"
          aria-label="Aviso de cookies"
        >
          <p className="text-xs text-white sm:text-sm">
            Usamos cookies para ofrecerte la mejor experiencia en nuestra web.{" "}
            <Link
              to="/privacidad"
              className="underline underline-offset-2 hover:text-gray-300 transition-colors duration-150"
            >
              Lee nuestra política de privacidad
            </Link>
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <Button variant="ghost" size="sm" onClick={necessary}>
              Solo necesarias
            </Button>
            <Button variant="primary" size="sm" onClick={accept}>
              Aceptar todas
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
