export interface Station {
  number: number;
  name: string;
  detail: string;
  description: string;
  muscles: string[];
  openReps: string;
  proReps: string;
}

export const stations: Station[] = [
  {
    number: 1,
    name: "SkiErg",
    detail: "1,000 m",
    description:
      "La primera estación activa principalmente brazos, hombros y core. Cuando se ejecuta eficientemente, también involucra los músculos del tren inferior.",
    muscles: ["Brazos", "Hombros", "Core", "Tren inferior"],
    openReps: "1,000 m",
    proReps: "1,000 m",
  },
  {
    number: 2,
    name: "Sled Push",
    detail: "50 m",
    description:
      "Empuja el trineo 50 metros. Trabaja la cadena posterior completa, el core y en especial los cuádriceps.",
    muscles: ["Cadena posterior", "Core", "Cuádriceps"],
    openReps: "50 m",
    proReps: "50 m",
  },
  {
    number: 3,
    name: "Sled Pull",
    detail: "50 m",
    description:
      "Jala el trineo hacia ti durante 50 metros. Activa glúteos, espalda, bíceps y el tronco completo.",
    muscles: ["Glúteos", "Espalda", "Bíceps", "Core"],
    openReps: "50 m",
    proReps: "50 m",
  },
  {
    number: 4,
    name: "Burpee Broad Jumps",
    detail: "80 m",
    description:
      "Un ejercicio de cuerpo completo con salto que pone a prueba tu resistencia cardiovascular y fuerza funcional.",
    muscles: ["Cuerpo completo", "Cardiovascular"],
    openReps: "80 m",
    proReps: "80 m",
  },
  {
    number: 5,
    name: "Rowing",
    detail: "1,000 m",
    description:
      "El segundo ergómetro de la carrera. Marca el inicio de la segunda mitad de tu HYROX.",
    muscles: ["Espalda", "Brazos", "Piernas", "Core"],
    openReps: "1,000 m",
    proReps: "1,000 m",
  },
  {
    number: 6,
    name: "Farmers Carry",
    detail: "200 m",
    description:
      "Carga mancuernas y camina 200 metros. Exige espalda alta, core y fuerza de agarre.",
    muscles: ["Espalda alta", "Core", "Grip"],
    openReps: "200 m (2×24 kg)",
    proReps: "200 m (2×32 kg)",
  },
  {
    number: 7,
    name: "Sandbag Lunges",
    detail: "100 m",
    description:
      "Carga un sandbag sobre los hombros y avanza en zancadas durante 100 metros. Prueba de fuerza y estabilidad.",
    muscles: ["Cuádriceps", "Glúteos", "Estabilizadores"],
    openReps: "100 m (10 kg mujer / 20 kg hombre)",
    proReps: "100 m (20 kg mujer / 30 kg hombre)",
  },
  {
    number: 8,
    name: "Wall Balls",
    detail: "75–100 reps",
    description:
      "El finisher más duro. Lanza un balón medicinal a un objetivo en la pared repetidamente hasta completar todas las reps.",
    muscles: ["Cuerpo completo", "Piernas", "Hombros"],
    openReps: "75 reps (6 kg mujer) / 100 reps (9 kg hombre)",
    proReps: "75 reps (9 kg mujer) / 100 reps (14 kg hombre)",
  },
];
