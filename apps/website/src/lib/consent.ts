/**
 * Fuente única de verdad del consentimiento de cookies.
 *
 * El CookieBanner escribe la decisión del usuario aquí; cualquier script que
 * dependa del consentimiento (analytics, marketing) debe leerlo desde este
 * módulo y, si quiere reaccionar sin recargar, suscribirse con `onConsentChange`.
 */

export const CONSENT_STORAGE_KEY = "runluv-cookies-accepted";

/** "all" = acepta todas las cookies; "necessary" = solo las esenciales. */
export type ConsentValue = "all" | "necessary";

const CONSENT_EVENT = "runluv:consent-change";

/** Devuelve la decisión guardada, o null si el usuario aún no ha elegido. */
export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "all" || value === "necessary" ? value : null;
}

/** True si el usuario ya tomó una decisión (para no volver a mostrar el banner). */
export function hasDecision(): boolean {
  return getConsent() !== null;
}

/** True solo si el usuario aceptó TODAS las cookies (analytics/marketing). */
export function hasAnalyticsConsent(): boolean {
  return getConsent() === "all";
}

/** Guarda la decisión y notifica a los suscriptores (misma pestaña). */
export function setConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

/**
 * Se suscribe a cambios de consentimiento. El callback se dispara cuando el
 * usuario elige en esta pestaña (CustomEvent) o en otra pestaña (storage event).
 * Devuelve una función para cancelar la suscripción.
 */
export function onConsentChange(callback: (value: ConsentValue) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handleCustom = (e: Event) => {
    const detail = (e as CustomEvent<ConsentValue>).detail;
    if (detail) callback(detail);
  };
  const handleStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_STORAGE_KEY && (e.newValue === "all" || e.newValue === "necessary")) {
      callback(e.newValue);
    }
  };

  window.addEventListener(CONSENT_EVENT, handleCustom);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CONSENT_EVENT, handleCustom);
    window.removeEventListener("storage", handleStorage);
  };
}
