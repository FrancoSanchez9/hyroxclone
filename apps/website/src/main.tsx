import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { createAppRouter } from "./router";
import { initAnalytics } from "./lib/analytics";
import "./globals.css";

const queryClient = new QueryClient();
const router = createAppRouter(queryClient);

// Carga analytics solo si el usuario ya aceptó todas las cookies (o cuando lo haga).
initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

if (import.meta.env.DEV) {
  const [{ ReactQueryDevtools }, { TanStackRouterDevtools }, { createRoot: createDevRoot }] =
    await Promise.all([
      import("@tanstack/react-query-devtools"),
      import("@tanstack/react-router-devtools"),
      import("react-dom/client"),
    ]);

  const devContainer = document.createElement("div");
  document.body.appendChild(devContainer);

  createDevRoot(devContainer).render(
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <TanStackRouterDevtools router={router} />
    </QueryClientProvider>,
  );
}
