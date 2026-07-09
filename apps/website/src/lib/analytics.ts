/**
 * Carga de analytics/marketing GATEADA por el consentimiento de cookies.
 *
 * Cómo usar cuando se integren analytics:
 *   1. Rellena `loadAnalyticsScripts()` con la carga real (GA4, Meta Pixel, etc.).
 *   2. Nada más: ya se llama desde `client.tsx` vía `initAnalytics()` y solo
 *      ejecuta esa carga si el usuario aceptó TODAS las cookies.
 *
 * Si el usuario acepta más tarde (sin recargar), la suscripción a
 * `onConsentChange` dispara la carga en ese momento.
 */

import { hasAnalyticsConsent, onConsentChange } from "@/lib/consent";

let loaded = false;

/**
 * Punto único donde se inyectan los scripts de terceros. HOY ESTÁ VACÍO a
 * propósito: el sitio no usa analytics todavía.
 *
 * Ejemplo (GA4) — descomentar y poner el ID cuando toque:
 *
 *   const id = "G-XXXXXXXXXX";
 *   const s = document.createElement("script");
 *   s.async = true;
 *   s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
 *   document.head.appendChild(s);
 *   const w = window as unknown as { dataLayer: unknown[] };
 *   w.dataLayer = w.dataLayer || [];
 *   const gtag = (...args: unknown[]) => w.dataLayer.push(args);
 *   gtag("js", new Date());
 *   gtag("config", id);
 */
function loadAnalyticsScripts(): void {
  // TODO: integrar analytics aquí. Sin scripts mientras tanto.
}

/**
 * Inicializa analytics respetando el consentimiento.
 * - Si ya hay consentimiento "all", carga de inmediato.
 * - Si no, espera y carga en cuanto el usuario acepte.
 * Idempotente: no carga dos veces. Llamar una sola vez al arrancar la app.
 */
export function initAnalytics(): void {
  const tryLoad = () => {
    if (loaded || !hasAnalyticsConsent()) return;
    loaded = true;
    loadAnalyticsScripts();
  };

  tryLoad();
  onConsentChange(tryLoad);
}

/**
 * Registra un evento personalizado en la consola (en desarrollo) y en el dataLayer si se cuenta con consentimiento.
 */
export function trackEvent(name: string, properties?: Record<string, any>): void {
  if (!hasAnalyticsConsent()) return;

  if (import.meta.env.DEV) {
    console.log("[Analytics Event]", name, properties);
  }

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: name,
    ...properties,
    timestamp: new Date().toISOString(),
  });
}
