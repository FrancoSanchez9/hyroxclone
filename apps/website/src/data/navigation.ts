export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: "¿Qué es HYROX?",
    children: [
      { label: "La Carrera de Fitness", href: "/la-carrera" },
      { label: "Mejor Preparación", href: "/preparacion" },
      { label: "Encuentra tu nivel", href: "/tu-nivel" },
      { label: "Campeonatos", href: "/campeonatos" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    label: "Training Clubs",
    children: [
      { label: "Buscar gimnasio", href: "/gimnasios" },
      { label: "Afiliaciones", href: "/afiliaciones" },
    ],
  },
  {
    label: "Tienda",
    href: "/tienda",
  },
  {
    label: "Eventos",
    href: "/eventos",
  },
  {
    label: "Voluntario",
    href: "/voluntario",
  },
];

export const topRightLinks = [
  { label: "Afiliaciones", href: "/afiliaciones" },
  { label: "Inscripciones", href: "/eventos" },
];
