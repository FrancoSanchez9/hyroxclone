import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "runluv-cookies-accepted";

export function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(STORAGE_KEY));

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
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          role="dialog"
          aria-label="Aviso de cookies"
        >
          <p className="text-sm text-white">
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
