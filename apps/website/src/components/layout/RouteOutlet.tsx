import { lazy, Suspense } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";

const DeferredMotionProvider = lazy(() =>
  import("@/components/ui/MotionProvider").then(({ MotionProvider }) => ({
    default: MotionProvider,
  })),
);

const MOTION_ROUTES = [
  "/admin",
  "/athletes",
  "/auth/login",
  "/campeonatos",
  "/checkout",
  "/contacto",
  "/cookies",
  "/dashboard",
  "/elite-15",
  "/eventos",
  "/gimnasios",
  "/la-carrera",
  "/preparacion",
  "/privacidad",
  "/ranking",
  "/terminos",
  "/tu-nivel",
] as const;

export function RouteOutlet() {
  const { pathname } = useLocation();
  const needsMotion = MOTION_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!needsMotion) return <Outlet />;

  return (
    <Suspense fallback={null}>
      <DeferredMotionProvider>
        <Outlet />
      </DeferredMotionProvider>
    </Suspense>
  );
}
