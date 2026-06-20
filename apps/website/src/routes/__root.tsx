import { createRootRoute, HeadContent, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { seo } from "@/lib/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: seo({
      title: "runluv® — Eventos de Running en Autódromos",
      description:
        "runluv® transforma el running en desarrollo económico para ciudades. Eventos en autódromos con 15,000 asistentes y 7x retorno por peso invertido. Modelo llave en mano para gobiernos de México.",
      keywords:
        "runluv, eventos de running, running en autódromos, desarrollo económico, turismo deportivo, eventos B2G, gobiernos México, La Última Vuelta",
    }),
  }),
  component: () => (
    <>
      <HeadContent />
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <CookieBanner />
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            color: "#f5f5f5",
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />
    </>
  ),
});
