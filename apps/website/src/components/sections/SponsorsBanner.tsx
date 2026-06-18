const sponsors = [
  { name: "PUMA", src: "/sponsors/puma.svg" },
  { name: "Centr", src: "/sponsors/centr.svg" },
  { name: "Maurten", src: "/sponsors/maurten.svg" },
  { name: "Therabody", src: "/sponsors/therabody.svg" },
  { name: "Technogym", src: "/sponsors/technogym.svg" },
  { name: "Abbott", src: "/sponsors/abbott.svg" },
];

export function SponsorsBanner() {
  const items = [...sponsors, ...sponsors];

  return (
    <section className="w-full overflow-hidden bg-[#111111] py-10">
      <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
        NUESTROS PARTNERS
      </p>
      <div
        className="flex w-max items-center"
        style={{ animation: "marquee 30s linear infinite" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}
      >
        {items.map((sponsor, index) => (
          <span key={index} className="inline-flex items-center">
            <img
              src={sponsor.src}
              alt={sponsor.name}
              className="h-8 w-auto object-contain opacity-60 transition-opacity duration-200 hover:opacity-100"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="mx-10 h-4 w-px bg-white/20" aria-hidden="true" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
