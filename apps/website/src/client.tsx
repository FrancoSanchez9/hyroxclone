import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";
import { initAnalytics } from "./lib/analytics";

// Carga analytics solo si el usuario ya aceptó todas las cookies (o cuando lo haga).
initAnalytics();

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
});

if (import.meta.env.DEV) {
  const { TanStackRouterDevtools } = await import("@tanstack/react-router-devtools");
  const { createRoot } = await import("react-dom/client");
  const { getRouter } = await import("./router");

  const devContainer = document.createElement("div");
  document.body.appendChild(devContainer);

  createRoot(devContainer).render(<TanStackRouterDevtools router={getRouter()} />);
}
