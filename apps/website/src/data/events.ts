export interface HyroxEvent {
  id: string;
  name: string;
  city: string;
  venue: string;
  date: string;
  endDate?: string;
  country: string;
  categories: string[];
  registrationUrl: string;
  imageUrl?: string;
  soldOut?: boolean;
  featured?: boolean;
}

export const upcomingEvents: HyroxEvent[] = [
  {
    id: "acapulco-2026",
    name: "Mundo Imperial HYROX Acapulco",
    city: "Acapulco",
    venue: "Mundo Imperial",
    date: "2026-09-05",
    endDate: "2026-09-06",
    country: "México",
    categories: ["Open", "Pro", "Doubles", "Relay"],
    registrationUrl: "/eventos/acapulco-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1596460658047-1826d5921c56?w=800&h=500&q=80&fit=crop&auto=format",
    featured: true,
  },
  {
    id: "cdmx-2026",
    name: "HYROX Ciudad de México",
    city: "Ciudad de México",
    venue: "Centro Citibanamex",
    date: "2026-10-17",
    endDate: "2026-10-18",
    country: "México",
    categories: ["Open", "Pro", "Doubles", "Relay"],
    registrationUrl: "/eventos/cdmx-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1556764420-e37ef4cdfa5c?w=800&h=500&q=80&fit=crop&auto=format",
  },
  {
    id: "monterrey-2026",
    name: "HYROX Monterrey",
    city: "Monterrey",
    venue: "Cintermex",
    date: "2026-11-21",
    endDate: "2026-11-22",
    country: "México",
    categories: ["Open", "Pro", "Doubles"],
    registrationUrl: "/eventos/monterrey-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&h=500&q=80&fit=crop&auto=format",
  },
  {
    id: "guadalajara-2027",
    name: "HYROX Guadalajara",
    city: "Guadalajara",
    venue: "Expo Guadalajara",
    date: "2027-01-23",
    endDate: "2027-01-24",
    country: "México",
    categories: ["Open", "Pro", "Doubles", "Relay"],
    registrationUrl: "/eventos/guadalajara-2027",
    imageUrl:
      "https://images.unsplash.com/photo-1526676537331-7747bf8278fc?w=800&h=500&q=80&fit=crop&auto=format",
  },
];

export const divisions = [
  {
    name: "Open",
    description: "Para todos los niveles. El mismo formato desafiante pero accesible.",
    weights: { women: "Peso estándar", men: "Peso estándar" },
    color: "#e5f93a",
  },
  {
    name: "Pro",
    description: "Para atletas experimentados. Mismo formato, pesos más altos.",
    weights: { women: "Pesos aumentados", men: "Pesos aumentados" },
    color: "#ffffff",
  },
  {
    name: "Doubles",
    description: "Compite con un compañero. Corren juntos y dividen los ejercicios.",
    weights: { women: "Peso estándar", men: "Peso estándar" },
    color: "#888888",
  },
  {
    name: "Relay",
    description: "Equipo de 4 personas. Cada uno completa 2 km y 2 estaciones.",
    weights: { women: "Peso estándar", men: "Peso estándar" },
    color: "#555555",
  },
];
