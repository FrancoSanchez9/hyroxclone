import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { createAppRouter } from "./router";
import { initAnalytics } from "./lib/analytics";
import "./globals.css";

const router = createAppRouter();

// Carga analytics solo si el usuario ya aceptó todas las cookies (o cuando lo haga).
initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

if (import.meta.env.DEV) {
  const { TanStackRouterDevtools } = await import("@tanstack/react-router-devtools");

  const devContainer = document.createElement("div");
  document.body.appendChild(devContainer);

  createRoot(devContainer).render(<TanStackRouterDevtools router={router} />);
}
