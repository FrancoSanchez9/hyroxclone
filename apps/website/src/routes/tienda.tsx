import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Camiseta HYROX Race", price: 599, category: "Ropa" },
  { id: 2, name: "HYROX Performance Tee", price: 699, category: "Ropa" },
  { id: 3, name: "Shorts HYROX Training", price: 799, category: "Ropa" },
  { id: 4, name: "Gorra HYROX", price: 499, category: "Accesorios" },
  { id: 5, name: "Mochila HYROX", price: 1299, category: "Accesorios" },
  { id: 6, name: "Medias de Compresión", price: 399, category: "Ropa" },
  { id: 7, name: "Botella HYROX 750ml", price: 349, category: "Accesorios" },
  { id: 8, name: "Kit de Iniciación HYROX", price: 1899, category: "Kits" },
];

const equipmentItems = [
  {
    id: 1,
    name: "Sled Set",
    description: "Trineo oficial HYROX para Sled Push y Sled Pull. Acero de alta resistencia.",
  },
  {
    id: 2,
    name: "Wall Ball",
    description: "Medicine ball oficial de HYROX. Disponible en 4, 6 y 9 kg.",
  },
  {
    id: 3,
    name: "Sandbag",
    description: "Sandbag oficial para Sandbag Lunges. Disponible en 10 y 20 kg.",
  },
];

function TiendaPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <PageHero
        badge="TIENDA OFICIAL"
        title="MERCH OFICIAL HYROX"
        subtitle="Viste los colores de la competencia de fitness más grande del mundo."
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-4xl md:text-5xl uppercase tracking-wider text-white mb-12"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Productos
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card hover className="flex flex-col overflow-hidden">
                  <div className="aspect-square bg-[#1a1a1a] border-b border-[#2a2a2a] flex flex-col items-center justify-center gap-3 px-4">
                    <span className="text-white/20 text-xs font-semibold uppercase tracking-widest text-center leading-relaxed">
                      {product.name}
                    </span>
                    <Badge variant="dark" className="border border-[#3a3a3a]">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="flex flex-col gap-4 pt-4">
                    <div>
                      <p className="text-sm font-semibold text-white leading-snug">
                        {product.name}
                      </p>
                      <p className="mt-1 text-[#e5f93a] text-sm font-bold">
                        ${product.price.toLocaleString("es-MX")} MXN
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Próximamente
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-12"
          >
            <Badge variant="yellow" className="mb-4">
              Equipamiento Oficial
            </Badge>
            <h2
              className="font-display text-4xl md:text-5xl uppercase tracking-wider text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              EQUIPAMIENTO CENTR × HYROX
            </h2>
            <p className="mt-4 max-w-2xl text-white/60 text-base">
              Entrena con el equipamiento oficial de HYROX. Sleds, Wall Balls, Sandbags y más.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {equipmentItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ y: -4 }}
              >
                <Card hover className="h-full flex flex-col">
                  <div className="aspect-video bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-center">
                    <span className="text-white/15 text-sm font-semibold uppercase tracking-widest">
                      {item.name}
                    </span>
                  </div>
                  <CardContent className="flex flex-col gap-2 pt-4">
                    <p className="font-bold text-white text-base">{item.name}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <a href="https://centr.mx" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                Ver equipamiento
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="border border-[#2a2a2a] bg-[#111111] p-10 md:p-16 text-center"
          >
            <Badge variant="yellow" className="mb-6">
              Próximamente
            </Badge>
            <h2
              className="font-display text-4xl md:text-6xl uppercase tracking-wider text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TIENDA ONLINE PRÓXIMAMENTE
            </h2>
            <p className="max-w-xl mx-auto text-white/60 text-base leading-relaxed mb-8">
              Hasta entonces, encuentra merch oficial en todos los eventos HYROX o contáctanos.
            </p>
            <a
              href="mailto:tienda@hyrox.mx"
              className="inline-flex items-center gap-2 text-[#e5f93a] text-sm font-semibold uppercase tracking-widest hover:underline underline-offset-4 transition-colors"
            >
              tienda@hyrox.mx
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/tienda")({
  component: TiendaPage,
});
