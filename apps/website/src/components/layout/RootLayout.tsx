import { ClientOnly } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { RouteOutlet } from "@/components/layout/RouteOutlet";
import { IdleToaster } from "@/components/layout/IdleToaster";

export function RootLayout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest focus:text-black focus:bg-white focus:outline-2 focus:outline-black focus:outline-offset-2"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content">
        <RouteOutlet />
      </main>
      <Footer />
      <CookieBanner />
      <ClientOnly>
        <IdleToaster />
      </ClientOnly>
    </>
  );
}
