import { FaqItem } from "./FaqItem";

const FAQ = [
  {
    q: "¿Qué necesito para participar?",
    a: "Solo necesitas registro y motivación. No hay calificación previa. Cualquier persona puede participar en la categoría Open.",
  },
  {
    q: "¿Qué incluye mi registro?",
    a: "Acceso al evento, finisher pack (medalla, camiseta técnica y kit de recuperación), cronometraje oficial, ranking global y acceso a la app RunLuv.",
  },
  {
    q: "¿Puedo cambiar mi división después de registrarme?",
    a: "Sí, puedes cambiar de categoría hasta 14 días antes del evento sin costo adicional. Después de esa fecha aplica un cargo de $200 MXN.",
  },
  {
    q: "¿Qué pasa si no puedo asistir?",
    a: "Puedes transferir tu lugar a otra persona sin costo hasta 7 días antes. No se hacen devoluciones, pero los créditos son válidos para la siguiente carrera.",
  },
  {
    q: "¿Hay estacionamiento en el venue?",
    a: "Sí, el recinto cuenta con estacionamiento disponible. También recomendamos llegar en transporte público o plataformas de movilidad para evitar tráfico.",
  },
  {
    q: "¿Puedo ir a apoyar si no compito?",
    a: "¡Por supuesto! El acceso para espectadores es gratuito. Los espectadores pueden moverse libremente por el recinto y ver las estaciones desde múltiples puntos.",
  },
];

export function EventFaqSection() {
  return (
    <section aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-4xl leading-none tracking-wider text-white uppercase mb-6"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Preguntas Frecuentes
      </h2>
      <div className="border-t border-white/10">
        {FAQ.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}
