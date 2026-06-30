import { m } from "framer-motion";
import { TrendingUp, Award, BookOpen, Package, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

const EASE = [0.23, 1, 0.32, 1] as const;

const benefits = [
  {
    icon: TrendingUp,
    title: "Más atletas",
    description:
      "Atrae a una comunidad de miles de atletas HYROX que buscan un lugar para entrenar.",
  },
  {
    icon: Award,
    title: "Reconocimiento oficial",
    description: "Aparece en el localizador oficial HYROX y recibe tráfico orgánico de atletas.",
  },
  {
    icon: BookOpen,
    title: "Formación exclusiva",
    description: "Acceso a la plataforma HYROX365 con contenido de entrenamiento certificado.",
  },
  {
    icon: Package,
    title: "Equipamiento certificado",
    description: "Descuentos en equipamiento oficial HYROX y Centr para tu box.",
  },
  {
    icon: Users,
    title: "Red global",
    description: "Forma parte de una comunidad de más de 5,000 gimnasios en más de 40 países.",
  },
  {
    icon: Zap,
    title: "Marketing",
    description: "Apoyo de HYROX para promoción local, eventos y campañas digitales.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 px-6 border-t border-[#2a2a2a]">
      <div className="mx-auto max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12"
        >
          <Badge variant="yellow" className="mb-4">
            BENEFICIOS
          </Badge>
          <h2
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="text-[clamp(2rem,6vw,3.5rem)] leading-none tracking-tight text-white"
          >
            BENEFICIOS DE AFILIARTE
          </h2>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <m.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
              >
                <Card hover className="h-full">
                  <CardHeader className="pb-3">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center bg-[#ffffff]/10">
                      <Icon className="h-5 w-5 text-[#ffffff]" />
                    </div>
                    <h3
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      className="text-xl tracking-wide text-white"
                    >
                      {benefit.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-white/60">{benefit.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
