export interface PriceTier {
  label: string;
  price: number;
  note?: string;
  available: boolean;
}

export interface ScheduleDay {
  day: string;
  waves: { time: string; label: string }[];
}

export interface HyroxEvent {
  id: string;
  name: string;
  city: string;
  venue: string;
  address?: string;
  date: string;
  endDate?: string;
  country: string;
  categories: string[];
  registrationUrl: string;
  imageUrl?: string;
  soldOut?: boolean;
  featured?: boolean;
  about?: string;
  tagline?: string;
  description?: string[];
  spotsLeft?: number;
  currency?: string;
  prices?: PriceTier[];
  schedule?: ScheduleDay[];
  mapsUrl?: string;
}

export const upcomingEvents: HyroxEvent[] = [
  {
    id: "puebla-2026",
    name: "runluv® Puebla",
    city: "Amozoc",
    venue: "Autódromo Internacional Miguel E. Abed",
    address: "Amozoc, Puebla",
    date: "2026-09-13",
    endDate: "2026-09-13",
    country: "México",
    categories: ["La Última Vuelta", "Cada Paso Cuenta", "5K", "10K", "Doubles", "Teams"],
    registrationUrl: "/eventos/puebla-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1596460658047-1826d5921c56?w=1200&h=700&q=80&fit=crop&auto=format",
    featured: true,
    about:
      "runluv® llega al Autódromo Internacional Miguel E. Abed en Amozoc, Puebla. Un circuito de clase mundial convertido en escenario para corredores de todos los niveles.",
    tagline: "Puebla, ¡aquí arranca todo!",
    description: [
      "Siente la energía de correr sobre un circuito de clase mundial: el asfalto donde rugen los motores ahora es tuyo. Cada recta, cada curva del Autódromo Miguel E. Abed se convierte en tu pista.",
      "Esta es la primera parada de la temporada runluv®. Elige tu desafío — La Última Vuelta, Cada Paso Cuenta o 5K/10K — y vive un ambiente único, con música, comunidad y energía en cada bloque de salida, dentro y fuera de la pista.",
    ],
    spotsLeft: 120,
    currency: "MXN",
    prices: [
      { label: "Early Bird", price: 899, note: "Lugares limitados", available: true },
      { label: "Regular", price: 1199, available: false },
    ],
    mapsUrl: "https://maps.google.com/?q=Autódromo+Internacional+Miguel+E.+Abed+Puebla",
  },
  {
    id: "guadalajara-2026",
    name: "runluv® Guadalajara",
    city: "Tlaquepaque",
    venue: "Autódromo Hermanos Gallo",
    address: "Tlaquepaque, Jalisco",
    date: "2026-10-11",
    endDate: "2026-10-11",
    country: "México",
    categories: ["La Última Vuelta", "Cada Paso Cuenta", "5K", "10K", "Doubles", "Teams"],
    registrationUrl: "/eventos/guadalajara-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1526676537331-7747bf8278fc?w=1200&h=700&q=80&fit=crop&auto=format",
    about:
      "El Autódromo Hermanos Gallo en Tlaquepaque se transforma en el escenario del primer evento runluv® en la Zona Metropolitana de Guadalajara.",
    tagline: "Guadalajara, ¡la perla también corre!",
    description: [
      "El Autódromo Hermanos Gallo abre sus puertas para la primera edición runluv® en la Zona Metropolitana de Guadalajara. Un circuito con historia, ahora al ritmo de tus pasos.",
      "Trae a tu crew, elige tu desafío y vive la fiesta tapatía del running: bloques de salida con energía, zonas para espectadores y una comunidad que no deja de empujar.",
    ],
    spotsLeft: 200,
    currency: "MXN",
    prices: [
      { label: "Early Bird", price: 899, note: "Lugares limitados", available: true },
      { label: "Regular", price: 1199, available: false },
    ],
    mapsUrl: "https://maps.google.com/?q=Autódromo+Hermanos+Gallo+Tlaquepaque",
  },
  {
    id: "leon-2026",
    name: "runluv® León",
    city: "León",
    venue: "Autódromo de León",
    address: "León, Guanajuato",
    date: "2026-11-08",
    endDate: "2026-11-08",
    country: "México",
    categories: ["La Última Vuelta", "Cada Paso Cuenta", "5K", "10K", "Doubles", "Teams"],
    registrationUrl: "/eventos/leon-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1556764420-e37ef4cdfa5c?w=1200&h=700&q=80&fit=crop&auto=format",
    about:
      "runluv® llega a León, Guanajuato. El Autódromo de León ofrece un circuito único para descubrir hasta dónde eres capaz de llegar.",
    tagline: "León, ¡el Bajío ruge!",
    description: [
      "El Autódromo de León se transforma en pista de corredores por un día. Un trazado rápido y plano, ideal para buscar tu marca personal o sobrevivir una vuelta más en La Última Vuelta.",
      "Ya sea tu primera carrera o tu revancha de la temporada, aquí descubres hasta dónde eres capaz de llegar — con toda la comunidad runluv® empujándote en cada kilómetro.",
    ],
    spotsLeft: 180,
    currency: "MXN",
    prices: [
      { label: "Early Bird", price: 899, note: "Lugares limitados", available: true },
      { label: "Regular", price: 1199, available: false },
    ],
    mapsUrl: "https://maps.google.com/?q=Autódromo+de+León",
  },
  {
    id: "monterrey-2026",
    name: "runluv® Monterrey",
    city: "Apodaca",
    venue: "Autódromo Monterrey",
    address: "Apodaca, Nuevo León",
    date: "2026-11-29",
    endDate: "2026-11-29",
    country: "México",
    categories: ["La Última Vuelta", "Cada Paso Cuenta", "5K", "10K", "Doubles", "Teams"],
    registrationUrl: "/eventos/monterrey-2026",
    imageUrl:
      "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=1200&h=700&q=80&fit=crop&auto=format",
    about:
      "El Autódromo Monterrey en Apodaca recibe a runluv®. La competencia de resistencia más emocionante llega al norte de México.",
    tagline: "Monterrey, ¡el norte corre fuerte!",
    description: [
      "El Autódromo Monterrey recibe la última parada clasificatoria de la temporada. El carácter regio se nota: aquí se corre con todo, hasta el final.",
      "Cierra tu temporada con la comunidad más intensa del país — cada bloque de salida es una fiesta y cada meta cruzada, un boleto rumbo a la gran final en CDMX.",
    ],
    spotsLeft: 250,
    currency: "MXN",
    prices: [
      { label: "Early Bird", price: 899, note: "Lugares limitados", available: true },
      { label: "Regular", price: 1199, available: false },
    ],
    mapsUrl: "https://maps.google.com/?q=Autódromo+Monterrey+Apodaca",
  },
  {
    id: "cdmx-2027",
    name: "runluv® Ciudad de México",
    city: "Iztacalco",
    venue: "Autódromo Hermanos Rodríguez",
    address: "Iztacalco, Ciudad de México",
    date: "2027-02-14",
    endDate: "2027-02-14",
    country: "México",
    categories: [
      "La Última Vuelta",
      "Cada Paso Cuenta",
      "5K",
      "10K",
      "LUV Pro",
      "Doubles",
      "Teams",
    ],
    registrationUrl: "/eventos/cdmx-2027",
    imageUrl:
      "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=1200&h=700&q=80&fit=crop&auto=format",
    about:
      "El evento más esperado de la temporada. El Autódromo Hermanos Rodríguez, uno de los circuitos más icónicos del mundo, se convierte en el escenario de la experiencia runluv® más grande de México.",
    tagline: "CDMX, ¡la gran final!",
    description: [
      "El Autódromo Hermanos Rodríguez — uno de los circuitos más icónicos del mundo — se convierte en el escenario de la experiencia runluv® más grande de México. Correr donde corre la Fórmula 1 no se olvida.",
      "Es el cierre de temporada: los mejores de cada ciudad, la categoría LUV Pro en su máxima expresión y una fiesta de running como no has vivido. Si solo vas a correr una este año, es esta.",
    ],
    spotsLeft: 400,
    currency: "MXN",
    prices: [
      { label: "Early Bird", price: 899, note: "Lugares limitados", available: true },
      { label: "Regular", price: 1299, available: false },
    ],
    mapsUrl: "https://maps.google.com/?q=Autódromo+Hermanos+Rodríguez+CDMX",
  },
];

export function getNextEvent(now = new Date()): HyroxEvent {
  const today = now.toISOString().slice(0, 10);
  return upcomingEvents.find((e) => e.date >= today) ?? upcomingEvents[upcomingEvents.length - 1];
}

export const divisions = [
  {
    name: "La Última Vuelta",
    description:
      "Resistencia con eliminación progresiva. Completa cada vuelta antes del tiempo límite o quedas eliminado.",
    weights: { women: "Individual y Teams", men: "Individual y Teams" },
    color: "#ffffff",
  },
  {
    name: "Cada Paso Cuenta",
    description: "Máxima distancia en 4 horas. Corre, trota o camina — cada kilómetro suma.",
    weights: { women: "Individual y Teams", men: "Individual y Teams" },
    color: "#ffffff",
  },
  {
    name: "5K",
    description: "Formato clásico de 5 kilómetros. Velocidad y marca personal.",
    weights: { women: "Femenil / Varonil por edad", men: "Femenil / Varonil por edad" },
    color: "#888888",
  },
  {
    name: "10K",
    description: "Formato clásico de 10 kilómetros. Resistencia y ritmo.",
    weights: { women: "Femenil / Varonil por edad", men: "Femenil / Varonil por edad" },
    color: "#555555",
  },
];
