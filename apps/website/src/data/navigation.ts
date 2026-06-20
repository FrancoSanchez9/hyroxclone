export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: "¿Qué es?",
    href: "/#que-es",
  },
  {
    label: "Modalidades",
    href: "/#modalidades",
  },
  {
    label: "Impacto",
    href: "/#impacto",
  },
  {
    label: "Modelo",
    href: "/#modelo",
  },
];

export const topRightLinks = [
  { label: "Descarga dossier", href: "/" },
  { label: "Contacto", href: "/" },
];
