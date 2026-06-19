export const SITE_NAME = "HYROX México";

// Dominio de producción. Ajustar cuando se confirme el dominio final.
export const SITE_URL = "https://hyrox.mx";

interface SeoInput {
  /** Título de la página. Se le añade " | HYROX México" salvo que ya incluya el nombre del sitio. */
  title: string;
  description?: string;
  keywords?: string;
  /** URL absoluta de la imagen para Open Graph / Twitter (para vistas previas al compartir). */
  image?: string;
}

/**
 * Construye el arreglo de meta tags (title, description, Open Graph y Twitter)
 * para el `head` de una ruta de TanStack Router.
 */
export function seo({ title, description, keywords, image }: SeoInput) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return [
    { title: fullTitle },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    ...(description
      ? [
          { name: "description", content: description },
          { name: "twitter:description", content: description },
          { property: "og:description", content: description },
        ]
      : []),
    ...(keywords ? [{ name: "keywords", content: keywords }] : []),
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { property: "og:image", content: image },
        ]
      : []),
  ];
}
