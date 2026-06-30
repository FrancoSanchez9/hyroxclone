import { m } from "framer-motion";
import { SectionTitle } from "@/components/sections/about/SectionTitle";
import { Accordion } from "@/components/sections/about/Accordion";
import { EASE } from "@/lib/animation";

const weightGroups = [
  {
    group: "Individual",
    categories: [
      {
        label: "Women",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "102 kg" },
          { station: "Sled Pull", value: "78 kg" },
          { station: "Burpee Broad Jumps", value: "80 reps" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×12 kg / 200 m" },
          { station: "Sandbag Lunges", value: "10 kg / 100 m" },
          { station: "Wall Balls", value: "4 kg / 100 reps" },
        ],
      },
      {
        label: "Women Pro",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "152 kg" },
          { station: "Sled Pull", value: "103 kg" },
          { station: "Burpee Broad Jumps", value: "80 reps" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×16 kg / 200 m" },
          { station: "Sandbag Lunges", value: "15 kg / 100 m" },
          { station: "Wall Balls", value: "6 kg / 100 reps" },
        ],
      },
      {
        label: "Men",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "152 kg" },
          { station: "Sled Pull", value: "103 kg" },
          { station: "Burpee Broad Jumps", value: "80 reps" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×24 kg / 200 m" },
          { station: "Sandbag Lunges", value: "20 kg / 100 m" },
          { station: "Wall Balls", value: "6 kg / 100 reps" },
        ],
      },
      {
        label: "Men Pro",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "202 kg" },
          { station: "Sled Pull", value: "153 kg" },
          { station: "Burpee Broad Jumps", value: "80 reps" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×32 kg / 200 m" },
          { station: "Sandbag Lunges", value: "25 kg / 100 m" },
          { station: "Wall Balls", value: "9 kg / 100 reps" },
        ],
      },
    ],
  },
  {
    group: "Doubles",
    categories: [
      {
        label: "Doubles Women",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "102 kg" },
          { station: "Sled Pull", value: "78 kg" },
          { station: "Burpee Broad Jumps", value: "40 reps c/u" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×12 kg / 200 m" },
          { station: "Sandbag Lunges", value: "10 kg / 100 m" },
          { station: "Wall Balls", value: "4 kg / 100 reps" },
        ],
      },
      {
        label: "Doubles Men",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "152 kg" },
          { station: "Sled Pull", value: "103 kg" },
          { station: "Burpee Broad Jumps", value: "40 reps c/u" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×24 kg / 200 m" },
          { station: "Sandbag Lunges", value: "20 kg / 100 m" },
          { station: "Wall Balls", value: "6 kg / 100 reps" },
        ],
      },
      {
        label: "Doubles Mixed",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "102 kg" },
          { station: "Sled Pull", value: "78 kg" },
          { station: "Burpee Broad Jumps", value: "40 reps c/u" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×16 kg / 200 m" },
          { station: "Sandbag Lunges", value: "15 kg / 100 m" },
          { station: "Wall Balls", value: "4 kg / 100 reps" },
        ],
      },
    ],
  },
  {
    group: "Relay",
    categories: [
      {
        label: "Relay Women",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "102 kg" },
          { station: "Sled Pull", value: "78 kg" },
          { station: "Burpee Broad Jumps", value: "20 reps c/u" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×12 kg / 200 m" },
          { station: "Sandbag Lunges", value: "10 kg / 100 m" },
          { station: "Wall Balls", value: "4 kg / 50 reps" },
        ],
      },
      {
        label: "Relay Men",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "152 kg" },
          { station: "Sled Pull", value: "103 kg" },
          { station: "Burpee Broad Jumps", value: "20 reps c/u" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×24 kg / 200 m" },
          { station: "Sandbag Lunges", value: "20 kg / 100 m" },
          { station: "Wall Balls", value: "6 kg / 50 reps" },
        ],
      },
      {
        label: "Relay Mixed",
        rows: [
          { station: "SkiErg", value: "1,000 m" },
          { station: "Sled Push", value: "102 kg" },
          { station: "Sled Pull", value: "78 kg" },
          { station: "Burpee Broad Jumps", value: "20 reps c/u" },
          { station: "Rowing", value: "1,000 m" },
          { station: "Farmers Carry", value: "2×16 kg / 200 m" },
          { station: "Sandbag Lunges", value: "15 kg / 100 m" },
          { station: "Wall Balls", value: "4 kg / 50 reps" },
        ],
      },
    ],
  },
];

export function WeightCategoriesSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: "#060606",
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.025) 31px, rgba(255,255,255,0.025) 32px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle>PESOS, DISTANCIAS Y REPETICIONES</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">
          {/* left photo */}
          <m.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden hidden lg:block"
            style={{ minHeight: "700px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=900&q=80&fit=crop&auto=format"
              alt="Atleta RunLuv competencia"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
              style={{ filter: "grayscale(100%)", outline: "1px solid rgba(255,255,255,0.1)" }}
            />
          </m.div>

          {/* right: grouped accordions */}
          <m.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="pl-0 lg:pl-16"
          >
            {weightGroups.map((group) => (
              <div key={group.group} className="mb-10">
                <h3 className="text-xl font-semibold text-white mb-4">{group.group}</h3>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  {group.categories.map((cat) => (
                    <Accordion key={cat.label} label={cat.label} rows={cat.rows} />
                  ))}
                </div>
              </div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
