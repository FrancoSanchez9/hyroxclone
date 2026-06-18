import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";

export const Route = createRootRoute({
  component: () => (
    <>
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
