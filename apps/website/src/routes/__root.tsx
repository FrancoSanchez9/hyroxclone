import { createRootRoute, Outlet, HeadContent } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

function RootLayout() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
        <HeadContent />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest focus:text-black focus:bg-white focus:outline-2 focus:outline-black focus:outline-offset-2"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main-content">
          <Outlet />
        </main>
        <NewsletterSection />
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
      </MotionConfig>
    </LazyMotion>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
