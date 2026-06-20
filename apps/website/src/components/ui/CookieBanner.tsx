import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { hasDecision, setConsent } from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasDecision()) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    setConsent("all");
    setVisible(false);
  };

  const necessary = () => {
    setConsent("necessary");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ translateY: "100%" }}
          animate={{ translateY: "0%" }}
          exit={{ translateY: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ backgroundColor: "#111111" }}
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-white">
            Usamos cookies para ofrecerte la mejor experiencia en nuestra web.{" "}
            <a
              href="/cookies"
              className="underline underline-offset-2 hover:text-gray-300 transition-colors duration-150"
            >
              Más información
            </a>
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <Button variant="ghost" size="sm" onClick={necessary}>
              Solo necesarias
            </Button>
            <Button variant="primary" size="sm" onClick={accept}>
              Aceptar todas
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
