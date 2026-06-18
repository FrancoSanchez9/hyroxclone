import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { createAppRouter } from "./router";
import "./globals.css";

const queryClient = new QueryClient();
const router = createAppRouter(queryClient);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

if (import.meta.env.DEV) {
  const { ReactQueryDevtools } = await import("@tanstack/react-query-devtools");
  const { TanStackRouterDevtools } = await import("@tanstack/router-devtools");
  const { createRoot: createDevRoot } = await import("react-dom/client");

  const devContainer = document.createElement("div");
  document.body.appendChild(devContainer);

  createDevRoot(devContainer).render(
    <>
      <ReactQueryDevtools />
      <TanStackRouterDevtools router={router} />
    </>,
  );
}
