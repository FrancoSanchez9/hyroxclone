import { lazy, Suspense, useEffect, useState } from "react";

const DeferredToaster = lazy(() => import("sonner").then(({ Toaster }) => ({ default: Toaster })));

export function IdleToaster() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idleWindow = window as unknown as {
      requestIdleCallback?: typeof window.requestIdleCallback;
      cancelIdleCallback?: typeof window.cancelIdleCallback;
    };
    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => idleWindow.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <DeferredToaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "var(--color-rl-surface-overlay)",
            border: "1px solid var(--color-rl-border-strong)",
            color: "var(--color-rl-text-primary)",
            fontFamily: "var(--font-sans)",
          },
        }}
      />
    </Suspense>
  );
}
