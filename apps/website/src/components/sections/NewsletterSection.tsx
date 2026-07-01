import { useReducer } from "react";
import { m } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

const EASE = [0.23, 1, 0.32, 1] as const;
const STORAGE_KEY = "runluv-newsletter-subs:v1";

const perks = [
  "10% de descuento en tu primera compra",
  "Apertura de inscripciones antes que nadie",
  "Resultados, rankings y noticias exclusivas",
];

const CITIES = [
  "Ciudad de México",
  "Monterrey",
  "Guadalajara",
  "Acapulco",
  "Cancún",
  "Puebla",
  "Tijuana",
  "Otro",
];

function saveSubscriber(email: string, city: string) {
  const existing: { email: string; city: string; date: string }[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? "[]",
  );
  if (existing.some((s) => s.email === email)) return;
  existing.push({ email, city, date: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

type State = {
  email: string;
  city: string;
  sent: boolean;
  emailError: boolean;
  cityError: boolean;
};

type Action =
  | { type: "setEmail"; value: string }
  | { type: "setCity"; value: string }
  | { type: "validate"; emailError: boolean; cityError: boolean }
  | { type: "submit" };

const initialState: State = {
  email: "",
  city: "",
  sent: false,
  emailError: false,
  cityError: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.value, emailError: false };
    case "setCity":
      return { ...state, city: action.value, cityError: false };
    case "validate":
      return { ...state, emailError: action.emailError, cityError: action.cityError };
    case "submit":
      return { ...state, sent: true };
  }
}

export function NewsletterSection() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, city, sent, emailError, cityError } = state;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const noEmail = !email;
    const noCity = !city;
    dispatch({ type: "validate", emailError: noEmail, cityError: noCity });
    if (noEmail || noCity) return;
    saveSubscriber(email, city);
    dispatch({ type: "submit" });
  }

  return (
    <section
      style={{
        background: "#0a0a0a",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.018) 3px, rgba(255,255,255,0.018) 4px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <m.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-3">
              Newsletter
            </p>
            <h2
              className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-none text-white uppercase mb-8 text-balance"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              SUSCRÍBETE AL{" "}
              <span
                style={{
                  background: "#ffffff",
                  color: "#000",
                  padding: "0 8px",
                  display: "inline-block",
                }}
              >
                RUNLUV
              </span>{" "}
              NEWSLETTER
            </h2>

            <ul className="flex flex-col gap-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center w-5 h-5 shrink-0"
                    style={{ background: "#ffffff" }}
                  >
                    <Check className="h-3 w-3 text-black" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-white/65">{p}</span>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Right — form */}
          <m.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            {sent ? (
              <output aria-live="polite" className="flex flex-col items-start gap-4">
                <span
                  className="flex items-center justify-center w-12 h-12"
                  style={{ background: "#ffffff" }}
                >
                  <Check className="h-6 w-6 text-black" aria-hidden="true" />
                </span>
                <p
                  className="text-3xl font-normal text-white uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  ¡Listo! Bienvenido a la familia RunLuv
                </p>
                <p className="text-sm text-white/50 text-pretty">
                  Recibirás noticias de eventos en{" "}
                  <span className="font-semibold text-white/70">{city}</span> y todo México.
                </p>
              </output>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="nl-email"
                    className="text-[10px] font-bold uppercase tracking-widest text-white/40"
                  >
                    Correo electrónico *
                  </label>
                  <input
                    id="nl-email"
                    type="email"
                    inputMode="email"
                    value={email}
                    aria-invalid={emailError}
                    aria-describedby={emailError ? "nl-email-error" : undefined}
                    onChange={(e) => dispatch({ type: "setEmail", value: e.target.value })}
                    placeholder="tu@correo.com"
                    className="h-12 px-4 text-sm text-black placeholder-black/40 outline-none w-full"
                    style={{
                      background: "#ffffff",
                      border: emailError ? "2px solid #ff4444" : "2px solid transparent",
                    }}
                  />
                  {emailError && (
                    <p id="nl-email-error" role="alert" className="text-xs text-red-400">
                      Ingresa un correo electrónico válido.
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="nl-city"
                    className="text-[10px] font-bold uppercase tracking-widest text-white/40"
                  >
                    Tu ciudad *
                  </label>
                  <div className="relative">
                    <select
                      id="nl-city"
                      value={city}
                      aria-invalid={cityError}
                      aria-describedby={cityError ? "nl-city-error" : undefined}
                      onChange={(e) => dispatch({ type: "setCity", value: e.target.value })}
                      className="h-12 w-full appearance-none px-4 pr-10 text-sm outline-none"
                      style={{
                        background: "#ffffff",
                        color: city ? "#000" : "rgba(0,0,0,0.4)",
                        border: cityError ? "2px solid #ff4444" : "2px solid transparent",
                      }}
                    >
                      <option value="" disabled>
                        Selecciona tu ciudad
                      </option>
                      {CITIES.map((c) => (
                        <option key={c} value={c} style={{ color: "#000" }}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 5l5 5 5-5"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {cityError && (
                    <p id="nl-city-error" role="alert" className="text-xs text-red-400">
                      Selecciona tu ciudad.
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-1 h-12 w-full px-8 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/85 transition-[background-color] duration-150 active:scale-[0.96]"
                >
                  Suscribirme
                </button>

                <p className="text-xs text-white/40 text-pretty">
                  Al suscribirte aceptas nuestra{" "}
                  <Link
                    to="/privacidad"
                    className="underline underline-offset-2 hover:text-white/60 transition-colors duration-150"
                  >
                    política de privacidad
                  </Link>
                  . Sin spam, solo lo que importa.
                </p>
              </form>
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
}
