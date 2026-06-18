import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Dumbbell, User, GraduationCap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: i * 0.1 },
  }),
};

const trainingCards = [
  {
    title: "HYROX Training Club",
    description: "Entrena en un gimnasio oficial con metodología HYROX y equipamiento certificado.",
    cta: "Encuentra tu gimnasio",
    href: "/gimnasios",
    Icon: Dumbbell,
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&q=80&fit=crop&auto=format",
  },
  {
    title: "Performance Coach",
    description: "Trabaja con un coach certificado por HYROX para preparación personalizada.",
    cta: "Buscar coach",
    href: "/gimnasios",
    Icon: User,
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=300&q=80&fit=crop&auto=format",
  },
  {
    title: "HYROX Academy",
    description: "Si eres coach o dueño de gimnasio, certifícate como HYROX Performance Coach.",
    cta: "Ver formación",
    href: "/afiliaciones",
    Icon: GraduationCap,
    imageUrl:
      "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=600&h=300&q=80&fit=crop&auto=format",
  },
];

function TrainingCard({ card, index }: { card: (typeof trainingCards)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { title, description, cta, href, Icon, imageUrl } = card;

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group"
    >
      <Card className="h-full overflow-hidden border-t-2 border-t-transparent transition-colors duration-200 group-hover:border-t-[#e5f93a]">
        {imageUrl && (
          <div className="relative h-44 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
            <div className="absolute bottom-3 left-4">
              <Icon size={24} className="text-[#e5f93a]" aria-hidden="true" />
            </div>
          </div>
        )}
        <CardHeader>
          {!imageUrl && <Icon size={32} className="text-[#e5f93a]" aria-hidden="true" />}
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
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#e5f93a] uppercase tracking-wider transition-opacity duration-150 hover:opacity-80"
          >
            {cta}
            <span aria-hidden="true"> →</span>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function TrainingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#0d0d0d] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <Badge variant="yellow" className="mb-4">
            HYROX TRAINING
          </Badge>
          <h2
            className="text-6xl leading-none tracking-wider text-white uppercase sm:text-7xl md:text-8xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ENTRENA PARA TU HYROX
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Más de 5,000 gimnasios afiliados en todo el mundo con entrenadores certificados HYROX.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {trainingCards.map((card, idx) => (
            <TrainingCard key={card.title} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
