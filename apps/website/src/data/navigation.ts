export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Eventos", href: "/eventos" },
  { label: "La Carrera", href: "/la-carrera" },
  { label: "Campeonatos", href: "/campeonatos" },
  { label: "Preparación", href: "/preparacion" },
  { label: "Tu Nivel", href: "/tu-nivel" },
  { label: "Gimnasios", href: "/gimnasios" },
  { label: "FAQ", href: "/faq" },
];

export const topRightLinks = [
  { label: "Voluntario", href: "/voluntario" },
  { label: "Afiliaciones", href: "/afiliaciones" },
];
