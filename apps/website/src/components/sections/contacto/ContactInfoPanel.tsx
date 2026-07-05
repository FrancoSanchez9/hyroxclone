import { m } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function ContactInfoPanel() {
  return (
    <m.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col gap-10"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-3">
          Tiempo de respuesta
        </p>
        <p className="text-white/70 text-sm leading-relaxed">
          Respondemos todos los mensajes en un plazo de{" "}
          <strong className="text-white">48 horas hábiles</strong>. Para urgencias de evento,
          incluye tu número de dorsal en el asunto.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <a href="mailto:hola@runluv.mx" className="flex items-center gap-4 group">
          <span
            className="flex items-center justify-center w-10 h-10 shrink-0 text-white/60 group-hover:text-black group-hover:bg-white transition-[background-color,color] duration-150"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <Mail className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-0.5">
              General
            </p>
            <p className="text-sm text-white group-hover:underline underline-offset-2">
              hola@runluv.mx
            </p>
          </div>
        </a>

        <div className="flex items-center gap-4">
          <span
            className="flex items-center justify-center w-10 h-10 shrink-0 text-white/60"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <MapPin className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-0.5">
              Sede
            </p>
            <p className="text-sm text-white/80">Ciudad de México, México</p>
          </div>
        </div>

        <a
          href="https://instagram.com/runluvmx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 group"
        >
          <span
            className="flex items-center justify-center w-10 h-10 shrink-0 text-white/60 group-hover:text-black group-hover:bg-white transition-[background-color,color] duration-150"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <InstagramIcon />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-0.5">
              Instagram
            </p>
            <p className="text-sm text-white group-hover:underline underline-offset-2">@runluvmx</p>
          </div>
        </a>
      </div>

      <div
        className="p-6 text-sm text-white/60 leading-relaxed"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p className="font-semibold text-white/80 uppercase tracking-widest text-xs mb-2">
          ¿Eres patrocinador?
        </p>
        <p>
          Escríbenos a{" "}
          <a href="mailto:alianzas@runluv.mx" className="text-white underline underline-offset-2">
            alianzas@runluv.mx
          </a>{" "}
          con una breve presentación de tu marca y tipo de colaboración que buscas.
        </p>
      </div>
    </m.div>
  );
}
