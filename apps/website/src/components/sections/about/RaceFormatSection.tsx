import { m } from "framer-motion";
import { SectionTitle } from "@/components/sections/about/SectionTitle";
import { Accordion } from "@/components/sections/about/Accordion";
import { EASE } from "@/lib/animation";

const stations = [
  {
    n: "01",
    name: "SkiErg",
    detail: "1,000 m",
    img: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=500&q=70&fit=crop&auto=format",
  },
  {
    n: "02",
    name: "Sled Push",
    detail: "50 m",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=70&fit=crop&auto=format",
  },
  {
    n: "03",
    name: "Sled Pull",
    detail: "50 m",
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&q=70&fit=crop&auto=format",
  },
  {
    n: "04",
    name: "Burpee Broad Jumps",
    detail: "80 reps",
    img: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&q=70&fit=crop&auto=format",
  },
  {
    n: "05",
    name: "Rowing",
    detail: "1,000 m",
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&q=70&fit=crop&auto=format",
  },
  {
    n: "06",
    name: "Farmers Carry",
    detail: "200 m",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=70&fit=crop&auto=format",
  },
  {
    n: "07",
    name: "Sandbag Lunges",
    detail: "100 m",
    img: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=500&q=70&fit=crop&auto=format",
  },
  {
    n: "08",
    name: "Wall Balls",
    detail: "100 reps",
    img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&q=70&fit=crop&auto=format",
  },
];

export function RaceFormatSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: "#0a0a0a",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle>RACE FORMAT</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* photo grid */}
          <m.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div
              className="p-4 mb-3"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p
                className="text-sm font-bold uppercase tracking-widest text-black mb-4 px-3 py-1 inline-block"
                style={{ background: "#ffffff" }}
              >
                THE COMPETITION
              </p>
              <div className="grid grid-cols-4 gap-1">
                {stations.map((s) => (
                  <div
                    key={s.n}
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <img
                      src={s.img}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      style={{
                        filter: "grayscale(100%)",
                        outline: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-0 left-0 p-1.5">
                      <span
                        className="block text-[10px] font-bold text-black px-1"
                        style={{ background: "#ffffff", lineHeight: 1.4 }}
                      >
                        {s.n}
                      </span>
                      <span className="block text-[9px] font-bold uppercase text-white/80 mt-0.5 leading-tight">
                        {s.detail}
                      </span>
                      <span className="block text-[9px] uppercase text-white/60 leading-tight">
                        {s.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </m.div>

          {/* accordion list */}
          <m.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex flex-col"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            {stations.map((s) => (
              <Accordion
                key={s.n}
                label={s.name}
                rows={[{ station: "Distancia / Reps", value: s.detail }]}
              />
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
