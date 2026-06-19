import { createRootRoute, HeadContent, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { seo } from "@/lib/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: seo({
      title: "HYROX México — La Carrera de Fitness",
      description:
        "HYROX México: la competencia de fitness para todos. 8 km de running + 8 estaciones funcionales. Encuentra tu carrera más cercana e inscríbete.",
      keywords:
        "HYROX, HYROX México, fitness funcional, competencia fitness, carrera de fitness, eventos deportivos México",
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
