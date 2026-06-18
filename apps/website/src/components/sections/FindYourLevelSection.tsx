import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

interface Division {
  name: string;
  forText: string;
  description: string;
  color: string;
  badge: string;
}

const divisions: Division[] = [
  {
    name: "OPEN",
    forText: "Para todos los niveles. Tu primera HYROX.",
    description:
      "El formato estándar con pesos accesibles. Compite en grupos de edad desde 16 hasta 85+ años.",
    color: "#e5f93a",
    badge: "RECOMENDADO PARA PRINCIPIANTES",
  },
  {
    name: "PRO",
    forText: "Para atletas de alto rendimiento",
    description:
      "Mismo formato que Open pero con pesos significativamente más elevados. Requiere experiencia previa en HYROX.",
    color: "#ffffff",
    badge: "NIVEL AVANZADO",
  },
  {
    name: "DOUBLES",
    forText: "Para parejas y amigos",
    description:
      "Compite con un compañero. Corren juntos y dividen los ejercicios entre dos. Disponible en Mixed, Women y Men.",
    color: "#aaaaaa",
    badge: "EN EQUIPO",
  },
  {
    name: "RELAY",
    forText: "Para grupos de 4",
    description:
      "Cada miembro completa 2 km de running y 2 estaciones. Perfecto para equipos corporativos y amigos.",
    color: "#666666",
    badge: "CORPORATIVO / GRUPAL",
  },
];

export function FindYourLevelSection() {
  return (
    <section className="w-full bg-[#0a0a0a] py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="mb-12 text-center"
        >
          <h2
            className="text-[clamp(2.5rem,7vw,5rem)] font-normal leading-none tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ENCUENTRA TU NIVEL
          </h2>
          <p className="mt-3 text-base text-white/50 sm:text-lg">
            HYROX tiene una categoría para cada atleta
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {divisions.map((division) => (
            <motion.div key={division.name} variants={cardVariants}>
              <Card
                className="group relative overflow-hidden border-[#2a2a2a] bg-[#111111] transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderLeft: `3px solid ${division.color}`,
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 0 24px 0 ${division.color}33, 0 4px 24px 0 rgba(0,0,0,0.5)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <CardHeader className="pb-2">
                  <div className="mb-3">
                    <Badge
                      variant="outline"
                      className="border-current text-[10px]"
                      style={{ color: division.color }}
                    >
                      {division.badge}
                    </Badge>
                  </div>
                  <h3
                    className="text-[clamp(2rem,5vw,3rem)] font-normal leading-none"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: division.color,
                    }}
                  >
                    {division.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-white/80">{division.forText}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-white/50">{division.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link to="/eventos">
            <Button variant="primary" size="lg">
              Inscribirse ahora
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
