import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Award, Star, Trophy, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const tiers = [
  {
    icon: Star,
    name: "HYROX Training Club",
    description:
      "El nivel de entrada. Gimnasios que ofrecen entrenamiento HYROX con metodología oficial.",
    level: "Nivel 1",
  },
  {
    icon: Trophy,
    name: "HYROX Performance Centre",
    description:
      "Nivel premium. Equipamiento completo certificado, coaches con certificación avanzada.",
    level: "Nivel 2",
  },
  {
    icon: Zap,
    name: "HYROX Performance Academy",
    description: "El nivel más alto. Formación de coaches y centro de excelencia HYROX.",
    level: "Nivel 3",
  },
];

const gyms = [
  {
    id: 1,
    name: "CrossFit CDMX Norte",
    city: "Ciudad de México",
    type: "Training Club",
    address: "Calz. de Guadalupe 123",
  },
  {
    id: 2,
    name: "Functional Fitness Monterrey",
    city: "Monterrey",
    type: "Performance Centre",
    address: "Av. Constitución 456",
  },
  {
    id: 3,
    name: "Box Training Guadalajara",
    city: "Guadalajara",
    type: "Training Club",
    address: "Blvd. Puerta de Hierro 789",
  },
  {
    id: 4,
    name: "Elite Performance Cancún",
    city: "Cancún",
    type: "Performance Centre",
    address: "Blvd. Kukulcán Km 8",
  },
];

function GimnasiasPage() {
  const [searchValue, setSearchValue] = useState("");
  const [affiliationType, setAffiliationType] = useState("Todos");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        badge="TRAINING CLUBS"
        title="ENCUENTRA TU HYROX TRAINING CLUB"
        subtitle="Más de 5,000 gimnasios certificados en todo el mundo con metodología y equipamiento HYROX oficial."
      />

      <section className="py-20 px-6 border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="text-5xl md:text-6xl uppercase tracking-wider text-white mb-12"
          >
            Niveles de Certificación
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <Card hover className="h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="p-2.5 bg-[#e5f93a]/10 rounded-none">
                          <Icon className="w-6 h-6 text-[#e5f93a]" />
                        </div>
                        <Badge
                          variant="outline"
                          className="text-[#e5f93a] border-[#e5f93a] shrink-0"
                        >
                          {tier.level}
                        </Badge>
                      </div>
                      <h3
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        className="text-2xl uppercase tracking-wider text-white leading-tight"
                      >
                        {tier.name}
                      </h3>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-[#888888] text-sm leading-relaxed">{tier.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="text-5xl md:text-6xl uppercase tracking-wider text-white mb-10"
          >
            Buscar Gimnasio
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
              <input
                type="text"
                placeholder="Ciudad o código postal"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm placeholder:text-[#555555] focus:outline-none focus:border-[#e5f93a] transition-colors duration-150"
              />
            </div>
            <select
              value={affiliationType}
              onChange={(e) => setAffiliationType(e.target.value)}
              className="h-10 px-4 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:outline-none focus:border-[#e5f93a] transition-colors duration-150 cursor-pointer"
            >
              <option value="Todos">Tipo de afiliación</option>
              <option value="Training Club">Training Club</option>
              <option value="Performance Centre">Performance Centre</option>
              <option value="Academy">Academy</option>
            </select>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {gyms.map((gym, i) => (
              <motion.div
                key={gym.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -3 }}
              >
                <Card hover className="h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-lg leading-tight text-white">{gym.name}</h3>
                      <Badge
                        variant={gym.type === "Performance Centre" ? "yellow" : "outline"}
                        className={
                          gym.type !== "Performance Centre"
                            ? "text-white border-white shrink-0"
                            : "shrink-0"
                        }
                      >
                        {gym.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-[#888888] text-sm">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{gym.city}</span>
                    </div>
                    <p className="text-white/50 text-xs">{gym.address}</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline" className="w-full">
                      Ver más
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="text-center border border-[#2a2a2a] p-6"
          >
            <p className="text-[#888888] text-sm mb-4">
              ¿No encuentras tu ciudad? Ayúdanos a expandir la red:
            </p>
            <Link to="/afiliaciones">
              <Button size="sm" variant="primary">
                Afiliar mi gimnasio
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="border border-[#2a2a2a] p-10 md:p-16 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-[#e5f93a]/10">
                <Award className="w-8 h-8 text-[#e5f93a]" />
              </div>
            </div>
            <h2
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-5xl md:text-6xl uppercase tracking-wider text-white mb-4"
            >
              ¿Tienes un Gimnasio?
            </h2>
            <p className="text-[#888888] text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Únete a la red HYROX y ofrece a tus atletas la preparación oficial para la carrera de
              fitness más grande del mundo.
            </p>
            <Link to="/afiliaciones">
              <Button size="lg" variant="primary">
                Solicitar afiliación
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/gimnasios")({
  head: () => ({
    meta: seo({
      title: "Gimnasios Afiliados",
      description:
        "Encuentra un gimnasio afiliado HYROX cerca de ti y entrena con equipo y coaches certificados.",
    }),
  }),
  component: GimnasiasPage,
});
