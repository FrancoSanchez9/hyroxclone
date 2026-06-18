import { motion, type Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";

const cards = [
  {
    category: "RACE DAY",
    number: "500K+",
    caption: "atletas compitieron esta temporada",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=560&q=75&fit=crop&auto=format",
  },
  {
    category: "COMUNIDAD",
    number: "150+",
    caption: "nacionalidades representadas",
    imageUrl:
      "https://images.unsplash.com/photo-1766970096331-78c8af007a3b?w=400&h=560&q=75&fit=crop&auto=format",
  },
  {
    category: "FINISH LINE",
    number: "92%",
    caption: "de los atletas vuelven a competir",
    imageUrl:
      "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=400&h=560&q=75&fit=crop&auto=format",
  },
  {
    category: "PREMIOS",
    number: "100+",
    caption: "ceremonias de podio al año",
    imageUrl:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=560&q=75&fit=crop&auto=format",
  },
  {
    category: "ENTRENAMIENTO",
    number: "5K+",
    caption: "gimnasios afiliados globales",
    imageUrl:
      "https://images.unsplash.com/photo-1536922246289-88c42f957773?w=400&h=560&q=75&fit=crop&auto=format",
  },
  {
    category: "WORLDWIDE",
    number: "40+",
    caption: "países con eventos HYROX",
    imageUrl:
      "https://images.unsplash.com/photo-1675474463858-54ea69949dfe?w=400&h=560&q=75&fit=crop&auto=format",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function MediaStripSection() {
  return (
    <section className="bg-black py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2
            className="text-white text-5xl md:text-6xl tracking-wider mb-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            LA EXPERIENCIA HYROX
          </h2>
          <p className="text-white/50 text-base md:text-lg">
            Más de 500,000 atletas ya lo vivieron
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-6 md:overflow-x-visible md:pb-0"
        >
          {cards.map((card) => (
            <motion.div
              key={card.category}
              variants={cardVariants}
              className="group relative shrink-0 w-48 md:w-auto snap-start overflow-hidden"
              style={{ height: "280px" }}
            >
              {card.imageUrl && (
                <img
                  src={card.imageUrl}
                  alt={card.category}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col justify-between p-4 border-t-2 border-transparent group-hover:border-[#e5f93a] transition-colors duration-300">
                <span className="text-xs font-bold tracking-widest text-white/70 group-hover:text-[#e5f93a] transition-colors duration-300">
                  {card.category}
                </span>
                <div className="flex flex-col gap-2">
                  <span
                    className="text-[#e5f93a] text-6xl leading-none drop-shadow-lg"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {card.number}
                  </span>
                  <p className="text-white/80 text-sm leading-snug">{card.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/eventos"
            className="inline-block border border-[#e5f93a] text-[#e5f93a] px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-[#e5f93a] hover:text-black transition-colors duration-300"
          >
            Ver todos los eventos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
