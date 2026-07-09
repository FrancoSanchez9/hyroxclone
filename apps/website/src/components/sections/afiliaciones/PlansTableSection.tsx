import { m } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { CellValue } from "@/components/sections/afiliaciones/CellValue";
import { EASE } from "@/lib/theme";

const tableFeatures = [
  { label: "Uso del logo", trainingClub: true, performanceCentre: true, performanceAcademy: true },
  {
    label: "Localizador oficial",
    trainingClub: true,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Acceso HYROX365",
    trainingClub: false,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Cursos de coaches",
    trainingClub: false,
    performanceCentre: true,
    performanceAcademy: true,
  },
  {
    label: "Equipamiento certificado",
    trainingClub: false,
    performanceCentre: false,
    performanceAcademy: true,
  },
  {
    label: "Precio afiliación anual",
    trainingClub: "€500–€800",
    performanceCentre: "€1,000–€1,500",
    performanceAcademy: "€2,000+",
  },
];

export function PlansTableSection() {
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
            PLANES
          </Badge>
          <h2
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="text-[clamp(2rem,6vw,3.5rem)] leading-none tracking-tight text-white"
          >
            NIVELES DE AFILIACIÓN
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border border-[#2a2a2a] bg-[#111111] px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-white/50 w-1/4"
                >
                  Característica
                </th>
                <th
                  scope="col"
                  className="border border-[#2a2a2a] bg-[#111111] px-5 py-4 text-center text-xs font-semibold uppercase tracking-widest text-white/70 w-1/4"
                >
                  Training Club
                </th>
                <th
                  scope="col"
                  className="border border-[#ffffff]/30 bg-[#ffffff]/5 px-5 py-4 text-center w-1/4"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Badge variant="yellow" className="text-[10px]">
                      RECOMENDADO
                    </Badge>
                    <span
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      className="text-base tracking-wide text-[#ffffff]"
                    >
                      Performance Centre
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="border border-[#2a2a2a] bg-[#111111] px-5 py-4 text-center text-xs font-semibold uppercase tracking-widest text-white/70 w-1/4"
                >
                  Performance Academy
                </th>
              </tr>
            </thead>
            <tbody>
              {tableFeatures.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-[#0e0e0e]" : "bg-[#111111]"}>
                  <td className="border border-[#2a2a2a] px-5 py-3.5 text-sm text-white/70">
                    {row.label}
                  </td>
                  <td className="border border-[#2a2a2a] px-5 py-3.5 text-center">
                    <CellValue value={row.trainingClub} />
                  </td>
                  <td className="border border-[#ffffff]/20 bg-[#ffffff]/[0.03] px-5 py-3.5 text-center">
                    <CellValue value={row.performanceCentre} />
                  </td>
                  <td className="border border-[#2a2a2a] px-5 py-3.5 text-center">
                    <CellValue value={row.performanceAcademy} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </m.div>
      </div>
    </section>
  );
}
