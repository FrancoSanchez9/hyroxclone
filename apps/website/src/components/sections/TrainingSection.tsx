import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Dumbbell, Map, GraduationCap, Heart, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { EASE, fadeUp } from "@/lib/animation";

const trainingCards = [
  {
    title: "Entrena para tu desafío",
    description:
      "Cada modalidad de runluv® presenta un reto diferente. Desde carreras de velocidad hasta pruebas de resistencia, cada desafío exige una preparación específica. Elige la modalidad que mejor se adapte a tu nivel y prepara tus entrenamientos de acuerdo con sus características.",
    cta: "Ver modalidades",
    href: "/la-carrera",
    Icon: Dumbbell,
    imageUrl: "/images/1534438327276-14e5300c3a48-600x300.webp",
  },
  {
    title: "Conoce el circuito",
    description:
      "Cada evento transforma un autódromo en un escenario para correr, competir y disfrutar. Antes de iniciar, familiarízate con el recorrido, identifica las zonas de abastecimiento, los puntos de relevo y las áreas para espectadores.",
    cta: "Ver eventos",
    href: "/eventos",
    Icon: Map,
    imageUrl: "/images/1517836357463-d25dfeac3438-600x300.webp",
  },
  {
    title: "Administra tu ritmo",
    description:
      "No importa cuál sea tu desafío: comienza a un ritmo que puedas mantener. La estrategia es tan importante como la preparación. Escucha a tu cuerpo, administra tu energía y recuerda que la resistencia se construye kilómetro a kilómetro.",
    cta: "Encuentra tu nivel",
    href: "/tu-nivel",
    Icon: GraduationCap,
    imageUrl: "/images/1544216717-3bbf52512659-600x300.webp",
  },
  {
    title: "Descansa, aliméntate e hidrátate",
    description:
      "Los días previos al evento también forman parte del desafío. Descansa lo suficiente, mantén una alimentación equilibrada e hidrátate correctamente antes, durante y después de la competencia. El día del evento llega con anticipación.",
    cta: "Ver FAQ",
    href: "/faq",
    Icon: Heart,
    imageUrl: "/images/1512621776951-a57141f2eefd-600x300.webp",
  },
  {
    title: "Disfruta la experiencia",
    description:
      "runluv® es mucho más que una carrera. Cada evento reúne competencia, resistencia, comunidad y entretenimiento. Entre un desafío y otro encontrarás música, zonas de descanso, alimentos, activaciones y espacios para convivir.",
    cta: "Ver eventos",
    href: "/eventos",
    Icon: Users,
    imageUrl: "/images/1530549387789-4c1017266635-600x300.webp",
  },
];

function TrainingCard({ card, index }: { card: (typeof trainingCards)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { title, description, cta, href, Icon, imageUrl } = card;

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
    >
      <Card className="h-full overflow-hidden border-t-2 border-t-transparent transition-colors duration-200 group-hover:border-t-rl-accent">
        {imageUrl && (
          <div className="relative h-44 overflow-hidden">
            <img
              src={imageUrl}
              width={600}
              height={300}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{
                outline: "1px solid color-mix(in srgb, var(--color-white) 10%, transparent)",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70" />
            <div className="absolute bottom-3 left-4">
              <Icon size={24} className="text-[#ffffff]" aria-hidden="true" />
            </div>
          </div>
        )}
        <CardHeader>
          {!imageUrl && <Icon size={32} className="text-white" aria-hidden="true" />}
          <h3
            className="mt-4 text-2xl leading-none tracking-wider text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-white/60">{description}</p>
        </CardContent>
        <CardFooter>
          <Link
            to={href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-rl-accent uppercase tracking-wider transition-opacity duration-150 hover:opacity-80"
          >
            {cta}
            <span aria-hidden="true"> →</span>
          </Link>
        </CardFooter>
      </Card>
    </m.div>
  );
}

export function TrainingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, var(--color-rl-surface-overlay) 0%, var(--color-rl-surface-subtle) 25%, var(--color-rl-surface-canvas) 100%)",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 31px, color-mix(in srgb, var(--color-white) 2.5%, transparent) 31px, color-mix(in srgb, var(--color-white) 2.5%, transparent) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, color-mix(in srgb, var(--color-white) 2.5%, transparent) 31px, color-mix(in srgb, var(--color-white) 2.5%, transparent) 32px), linear-gradient(180deg, var(--color-rl-surface-overlay) 0%, var(--color-rl-surface-subtle) 25%, var(--color-rl-surface-canvas) 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -right-48 top-10 h-[30rem] w-[30rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.07), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.38, ease: EASE }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-rl-accent">
            PREPARACIÓN RUNLUV®
          </p>
          <AnimatedTitle
            text="PREPÁRATE PARA RUNLUV®"
            accent={["RUNLUV®"]}
            className="text-balance text-6xl text-white sm:text-7xl md:text-8xl"
          />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base text-pretty">
            Prepárate para tu desafío, conoce el circuito y llega listo para disfrutar cada
            kilómetro.
          </p>
        </m.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {trainingCards.map((card, idx) => (
            <div key={card.title} className={idx < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
              <TrainingCard card={card} index={idx} />
            </div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.38, delay: 0.3, ease: EASE }}
          className="mt-16 border-t border-white/10 pt-10 text-center"
        >
          <p
            className="text-balance text-xl tracking-widest text-white/70 uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Corre. Descansa. Comparte. Vuelve a correr.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 text-pretty">
            En runluv® cada kilómetro cuenta, cada meta merece celebrarse y cada llegada marca el
            inicio del siguiente desafío.
          </p>
        </m.div>
      </div>
    </section>
  );
}
