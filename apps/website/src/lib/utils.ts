import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimiza una URL de Unsplash reemplazando los parámetros de ancho (w), alto (h) y calidad (q).
 * Retorna la URL optimizada para mejorar el rendimiento de carga y el consumo de ancho de banda.
 */
export function optimizeUnsplash(
  url: string,
  width: number,
  height?: number,
  quality = 70,
): string {
  if (!url.includes("images.unsplash.com")) return url;

  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("w", String(width));
    if (height) {
      urlObj.searchParams.set("h", String(height));
      urlObj.searchParams.set("fit", "crop");
    } else {
      urlObj.searchParams.delete("h");
    }
    urlObj.searchParams.set("q", String(quality));
    urlObj.searchParams.set("auto", "format");
    return urlObj.toString();
  } catch {
    return url;
  }
}
