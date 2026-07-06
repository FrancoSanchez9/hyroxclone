import { describe, expect, test } from "vitest";
import {
  computeBrujula,
  computeNivel,
  getNivelLabel,
  getLevelAdjust,
  computeModalAffinity,
  getArchetype,
  NIVEL_WEIGHTS,
  type LetterOption,
} from "./quiz-scoring";

describe("computeBrujula", () => {
  test("7 respuestas iguales dan 100% en esa dirección y 0 en el resto", () => {
    const answers: LetterOption[] = Array(7).fill("B"); // B = resistir
    const result = computeBrujula(answers);
    expect(result.resistir).toBeCloseTo(100);
    expect(result.descubrir).toBe(0);
    expect(result.superarte).toBe(0);
    expect(result.competir).toBe(0);
    expect(result.compartir).toBe(0);
  });

  test("respuestas null no suman a ninguna dirección", () => {
    const result = computeBrujula([null, null, null, null, null, null, null]);
    expect(Object.values(result).every((v) => v === 0)).toBe(true);
  });

  test("una respuesta por dirección reparte el porcentaje en partes iguales", () => {
    const answers: LetterOption[] = ["A", "B", "C", "D", "E", "A", "B"];
    const result = computeBrujula(answers);
    const total = Object.values(result).reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(100); // 7 respuestas × 4pts / 28 × 100 = 100 siempre
  });
});

describe("computeNivel", () => {
  const order = Object.keys(NIVEL_WEIGHTS) as (keyof typeof NIVEL_WEIGHTS)[];

  test("puntaje máximo (4 en las 7) da 100", () => {
    expect(computeNivel(Array(7).fill(4), order)).toBeCloseTo(100);
  });

  test("puntaje mínimo (0 en las 7) da 0", () => {
    expect(computeNivel(Array(7).fill(0), order)).toBe(0);
  });

  test("respuestas faltantes (null) cuentan como 0", () => {
    expect(computeNivel([null, null, null, null, null, null, null], order)).toBe(0);
  });
});

describe("getNivelLabel", () => {
  test.each([
    [0, 1],
    [24, 1],
    [25, 2],
    [44, 2],
    [45, 3],
    [64, 3],
    [65, 4],
    [84, 4],
    [85, 5],
    [100, 5],
  ])("score %i → nivel %i", (score, expectedLevel) => {
    expect(getNivelLabel(score).level).toBe(expectedLevel);
  });
});

describe("getLevelAdjust", () => {
  test("nivel dentro del rango recomendado → 100", () => {
    expect(getLevelAdjust(3, [3, 4])).toBe(100);
  });

  test("un nivel por debajo del más cercano → 70", () => {
    expect(getLevelAdjust(2, [3, 4])).toBe(70);
  });

  test("dos o más niveles por debajo → 35", () => {
    expect(getLevelAdjust(1, [3, 4])).toBe(35);
  });

  test("un nivel por encima → 90", () => {
    expect(getLevelAdjust(5, [4])).toBe(90);
  });

  test("dos o más niveles por encima → 75", () => {
    expect(getLevelAdjust(5, [1, 2])).toBe(75);
  });
});

describe("computeModalAffinity", () => {
  test("devuelve las 6 modalidades ordenadas de mayor a menor afinidad", () => {
    const brujula = { descubrir: 20, resistir: 80, superarte: 40, competir: 30, compartir: 10 };
    const result = computeModalAffinity(brujula, 4);
    expect(result).toHaveLength(6);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].affinity).toBeGreaterThanOrEqual(result[i].affinity);
    }
  });

  test("brújula 100% resistir + nivel 4 recomienda Cada Paso Cuenta primero", () => {
    const brujula = { descubrir: 0, resistir: 100, superarte: 0, competir: 0, compartir: 0 };
    const result = computeModalAffinity(brujula, 4);
    expect(result[0].key).toBe("CPC");
  });
});

describe("getArchetype", () => {
  test("compartir como dirección principal → EL COMPAÑERO", () => {
    const brujula = { descubrir: 10, resistir: 10, superarte: 10, competir: 10, compartir: 90 };
    expect(getArchetype(brujula, 2)).toBe("EL_COMPAÑERO");
  });

  test("competir como dirección principal (sin compartir en top 2) → EL COMPETIDOR", () => {
    const brujula = { descubrir: 10, resistir: 20, superarte: 10, competir: 90, compartir: 5 };
    expect(getArchetype(brujula, 3)).toBe("EL_COMPETIDOR");
  });

  test("resistir puro, nivel bajo (sin superarte/competir en top 2) → EL INCANSABLE", () => {
    const brujula = { descubrir: 20, resistir: 90, superarte: 10, competir: 10, compartir: 5 };
    expect(getArchetype(brujula, 2)).toBe("EL_INCANSABLE");
  });

  test("descubrir alto + competir bajo, sin nivel/resistir → EL CAMINANTE", () => {
    const brujula = { descubrir: 90, resistir: 10, superarte: 20, competir: 5, compartir: 15 };
    expect(getArchetype(brujula, 1)).toBe("EL_CAMINANTE");
  });

  test("caso por defecto → EL PRIMERO", () => {
    // Ninguna condición especial: descubrir alto pero competir >= 25 evita EL_CAMINANTE.
    const brujula = { descubrir: 60, resistir: 10, superarte: 5, competir: 25, compartir: 0 };
    expect(getArchetype(brujula, 1)).toBe("EL_PRIMERO");
  });
});
