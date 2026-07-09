import { createFileRoute } from "@tanstack/react-router";
import { m } from "framer-motion";
import { PageHero } from "@/components/ui/PageHero";
import { Link } from "@tanstack/react-router";
import { Flag } from "@/components/sections/ranking/Flag";
import { EASE } from "@/lib/theme";

const proAthletes = [
  {
    name: "Hunter McIntyre",
    country: "USA",
    flagCode: "us",
    division: "Pro Men",
    bestTime: "55:23",
    rank: 1,
    imageUrl: "/images/1571019613454-1cb2f99b2d8b-400.webp",
  },
  {
    name: "Tim Wenisch",
    country: "Germany",
    flagCode: "de",
    division: "Pro Men",
    bestTime: "54:08",
    rank: 2,
    imageUrl: "/images/1534438327276-14e5300c3a48-400.webp",
  },
  {
    name: "Lauren Weeks",
    country: "USA",
    flagCode: "us",
    division: "Pro Women",
    bestTime: "1:04:17",
    rank: 1,
    imageUrl: "/images/1594381898411-846e7d193883-400.webp",
  },
  {
    name: "Linda Meier",
    country: "Germany",
    flagCode: "de",
    division: "Pro Women",
    bestTime: "1:02:45",
    rank: 2,
    imageUrl: "/images/1541534741688-6078c6bfb5c5-400.webp",
  },
  {
    name: "Jonas Weber",
    country: "Germany",
    flagCode: "de",
    division: "Pro Men",
    bestTime: "56:12",
    rank: 3,
    imageUrl: "/images/1517836357463-d25dfeac3438-400.webp",
  },
  {
    name: "Emma Fischer",
    country: "Switzerland",
    flagCode: "ch",
    division: "Pro Women",
    bestTime: "1:05:33",
    rank: 3,
    imageUrl: "/images/1544216717-3bbf52512659-400.webp",
  },
];

const worldRecords = [
  { division: "Pro Men", athlete: "Tim Wenisch", time: "54:08", year: "2024" },
  { division: "Pro Women", athlete: "Linda Meier", time: "1:02:45", year: "2024" },
  { division: "Open Men", athlete: "James Anderson", time: "58:31", year: "2024" },
  { division: "Open Women", athlete: "Sofia Martinez", time: "1:08:22", year: "2024" },
];

function AthletesPage() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <PageHero
        inverted
        title="ATHLETES"
        subtitle="The world's best fitness racers compete at RunLuv events."
        badge="ELITE COMPETITION"
      />

      {/* Athletes grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12"
          >
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              PRO ATHLETES
            </h2>
          </m.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {proAthletes.map((athlete, i) => (
              <m.div
                key={athlete.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="group relative overflow-hidden"
                style={{ background: "#111" }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={athlete.imageUrl}
                    width={400}
                    height={267}
                    alt={athlete.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    style={{ outline: "1px solid rgba(255,255,255,0.1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div
                    className="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black"
                    style={{ background: "#ffffff" }}
                  >
                    {athlete.division}
                  </div>
                  <div
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-sm font-bold text-black"
                    style={{ background: "#fff" }}
                  >
                    #{athlete.rank}
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-2xl font-normal leading-none tracking-wider text-white uppercase"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {athlete.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/50">
                    <Flag code={athlete.flagCode} />
                    {athlete.country}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs uppercase tracking-widest text-white/50">
                      Best Time
                    </span>
                    <span
                      className="text-xl font-normal tabular-nums text-[#ffffff]"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {athlete.bestTime}
                    </span>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* World Records */}
      <section style={{ background: "#0a0a0a" }} className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffffff] mb-3">
              All Time
            </p>
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              WORLD RECORDS
            </h2>
          </m.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {worldRecords.map((record, i) => (
              <m.div
                key={record.division}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="p-6 flex items-center justify-between"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#ffffff] mb-1">
                    {record.division}
                  </p>
                  <h3
                    className="text-xl font-normal text-white uppercase"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {record.athlete}
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5">{record.year}</p>
                </div>
                <span
                  className="text-3xl font-normal tabular-nums text-[#ffffff]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {record.time}
                </span>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Elite 15 */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffffff] mb-4">
              Elite Program
            </p>
            <h2
              className="text-5xl md:text-7xl font-normal leading-none text-white uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ELITE 15 PROGRAM
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
              The top 15 athletes in the world compete for the RunLuv World Championship title. Are
              you ready to join the elite?
            </p>
            <Link
              to="/elite-15"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/90 transition-[transform,background-color] duration-[160ms] ease-out-strong active:scale-[0.96]"
            >
              Learn About Elite 15
            </Link>
          </m.div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/athletes")({
  component: AthletesPage,
});
