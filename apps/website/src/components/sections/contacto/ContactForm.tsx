import { m } from "framer-motion";
import { Check } from "lucide-react";
import type { ContactState, ContactAction } from "./types";

const EASE = [0.23, 1, 0.32, 1] as const;

const SUBJECTS = [
  "Inscripción a un evento",
  "Duda sobre el formato de carrera",
  "Voluntariado",
  "Patrocinio o alianza comercial",
  "Prensa y medios",
  "Tienda y merch",
  "Otro",
];

const inputClass = "h-12 w-full px-4 text-sm text-black placeholder-black/40 outline-none bg-white";
const errorBorder = "border-2 border-red-400";
const normalBorder = "border-2 border-transparent";

interface ContactFormProps {
  state: ContactState;
  dispatch: React.Dispatch<ContactAction>;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactForm({ state, dispatch, onSubmit }: ContactFormProps) {
  const { name, email, subject, message, sent, errors } = state;

  return (
    <m.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
    >
      {sent ? (
        <div className="flex flex-col items-start gap-5 pt-4">
          <span
            className="flex items-center justify-center w-14 h-14"
            style={{ background: "#ffffff" }}
          >
            <Check className="h-7 w-7 text-black" />
          </span>
          <h2
            className="text-4xl text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Mensaje enviado
          </h2>
          <p className="text-sm text-white/60 text-pretty">
            Gracias, <strong className="text-white/80">{name}</strong>. Te respondemos en menos de
            48 horas hábiles a <strong className="text-white/80">{email}</strong>.
          </p>
          <button
            type="button"
            onClick={() => dispatch({ type: "reset" })}
            className="mt-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white underline underline-offset-4 transition-colors duration-150"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="c-name"
              className="text-[10px] font-bold uppercase tracking-widest text-white/50"
            >
              Nombre completo *
            </label>
            <input
              id="c-name"
              type="text"
              value={name}
              onChange={(e) => dispatch({ type: "setField", field: "name", value: e.target.value })}
              placeholder="Alejandro Ramos"
              className={`${inputClass} ${errors.name ? errorBorder : normalBorder}`}
            />
            {errors.name && (
              <p role="alert" className="text-xs text-red-400">
                Ingresa tu nombre.
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="c-email"
              className="text-[10px] font-bold uppercase tracking-widest text-white/50"
            >
              Correo electrónico *
            </label>
            <input
              id="c-email"
              type="email"
              value={email}
              onChange={(e) =>
                dispatch({ type: "setField", field: "email", value: e.target.value })
              }
              placeholder="tu@correo.com"
              className={`${inputClass} ${errors.email ? errorBorder : normalBorder}`}
            />
            {errors.email && (
              <p role="alert" className="text-xs text-red-400">
                Ingresa tu correo.
              </p>
            )}
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="c-subject"
              className="text-[10px] font-bold uppercase tracking-widest text-white/50"
            >
              Asunto *
            </label>
            <div className="relative">
              <select
                id="c-subject"
                value={subject}
                onChange={(e) =>
                  dispatch({ type: "setField", field: "subject", value: e.target.value })
                }
                className={`h-12 w-full appearance-none px-4 pr-10 text-sm outline-none ${errors.subject ? errorBorder : normalBorder}`}
                style={{ background: "#fff", color: subject ? "#000" : "rgba(0,0,0,0.4)" }}
              >
                <option value="" disabled>
                  Selecciona un asunto
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} style={{ color: "#000" }}>
                    {s}
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
            {errors.subject && (
              <p role="alert" className="text-xs text-red-400">
                Selecciona un asunto.
              </p>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="c-message"
              className="text-[10px] font-bold uppercase tracking-widest text-white/50"
            >
              Mensaje *
            </label>
            <textarea
              id="c-message"
              value={message}
              rows={5}
              onChange={(e) =>
                dispatch({ type: "setField", field: "message", value: e.target.value })
              }
              placeholder="Cuéntanos en qué podemos ayudarte..."
              className={`w-full px-4 py-3 text-sm text-black placeholder-black/40 outline-none resize-none bg-white ${errors.message ? errorBorder : normalBorder}`}
            />
            {errors.message && (
              <p role="alert" className="text-xs text-red-400">
                Escribe tu mensaje.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-1 h-12 w-full px-8 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/85 transition-[background-color] duration-150 active:scale-[0.96]"
          >
            Enviar mensaje
          </button>
        </form>
      )}
    </m.div>
  );
}
