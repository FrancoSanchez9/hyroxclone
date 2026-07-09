import { createRootRoute, Outlet, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "@/globals.css";

// JSON-LD structured data — moved here from the old index.html so it ships in the
// SSR'd <head> of every route. Kept as plain objects and serialized inline below.
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://runluv.mx/#organization",
  name: "runluv",
  legalName: "runluv®",
  url: "https://runluv.mx",
  description:
    "Experiencia mexicana de running que transforma los autódromos en pistas para corredores de todos los niveles. Modalidades La Última Vuelta, Cada Paso Cuenta, 5K y 10K en Puebla, Guadalajara, León, Monterrey y Ciudad de México.",
  slogan: "Resiste hasta el final",
  address: { "@type": "PostalAddress", addressCountry: "MX" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contacto@runluv.mx",
    contactType: "sales",
    areaServed: "MX",
    availableLanguage: "Spanish",
  },
  areaServed: { "@type": "Country", name: "México" },
  knowsAbout: [
    "eventos deportivos en autódromos",
    "carreras de running en México",
    "turismo deportivo",
    "desarrollo económico urbano mediante eventos",
    "colaboración público-privada en eventos deportivos",
  ],
  sameAs: [
    "https://www.linkedin.com/company/runluv",
    "https://www.instagram.com/runluv.mx",
    "https://twitter.com/runluvmx",
    "https://www.youtube.com/@runluv",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://runluv.mx/#website",
  name: "runluv®",
  url: "https://runluv.mx",
  publisher: { "@id": "https://runluv.mx/#organization" },
  inLanguage: "es-MX",
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://runluv.mx/#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es runluv®?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "runluv® es una experiencia de running que transforma los autódromos en escenarios donde corredores de todos los niveles descubren hasta dónde son capaces de llegar. Cada evento reúne competencia, resistencia y un ambiente diseñado para convivir, disfrutar y celebrar cada kilómetro.",
      },
    },
    {
      "@type": "Question",
      name: "¿Quién puede participar en runluv®?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Todos. runluv® está diseñado para corredores de distintos niveles: desde quienes están por vivir su primer 5K hasta quienes buscan un desafío de resistencia más exigente. No necesitas ser atleta profesional ni clasificarte previamente.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué modalidades existen en runluv®?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Última Vuelta (resistencia con eliminación progresiva: completa cada vuelta antes del tiempo límite o quedas eliminado), Cada Paso Cuenta (máxima distancia acumulada en 4 horas) y carreras tradicionales de 5K y 10K. Hay categorías individuales Open y Pro, Doubles, Teams y Corporate Teams.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es La Última Vuelta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Es el desafío más representativo de runluv®: una carrera continua en circuito cerrado de 3 a 5 km donde cada vuelta debe completarse dentro de un tiempo máximo. Quien excede el tiempo queda eliminado. Gana el último corredor que logra mantenerse en competencia.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuándo y dónde son los eventos runluv®?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La primera temporada runluv® inicia en 2027 con sedes clasificatorias en los autódromos de Puebla, Guadalajara, León y Monterrey, y la Gran Final en el Autódromo Hermanos Rodríguez de la Ciudad de México.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué significa 'Resiste hasta el final'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Es la filosofía de runluv®. Significa seguir cuando aparece el cansancio, administrar tu energía, confiar en tu preparación y recordar que cada llegada marca el inicio del siguiente desafío.",
      },
    },
  ],
};

const WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://runluv.mx/#webpage",
  name: "runluv® — Corre los autódromos de México y descubre tu límite",
  url: "https://runluv.mx",
  isPartOf: { "@id": "https://runluv.mx/#website" },
  about: { "@id": "https://runluv.mx/#organization" },
  inLanguage: "es-MX",
};

function RootLayout() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest focus:text-black focus:bg-white focus:outline-2 focus:outline-black focus:outline-offset-2"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer />
        <CookieBanner />
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              color: "#f5f5f5",
              fontFamily: "'Inter', sans-serif",
            },
          }}
        />
      </MotionConfig>
    </LazyMotion>
  );
}

// The document shell rendered by SSR and hydrated by client.tsx (hydrateRoot(document, ...)).
function RootDocument() {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }}
        />
      </head>
      <body>
        <RootLayout />
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "runluv® — Corre los autódromos de México y descubre tu límite" },
      {
        name: "description",
        content:
          "runluv® transforma los autódromos de México en pistas para corredores. Elige tu reto — La Última Vuelta, Cada Paso Cuenta, 5K o 10K — y vive la temporada 2027: Puebla, Guadalajara, León, Monterrey y la Gran Final en CDMX.",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      // Open Graph — og:url / og:image / twitter:image apuntan temporalmente a
      // runluv.vercel.app (runluv.mx aún no resuelve). Cambiar de vuelta a
      // runluv.mx cuando el dominio esté conectado.
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://runluv.vercel.app/" },
      { property: "og:site_name", content: "runluv®" },
      { property: "og:locale", content: "es_MX" },
      {
        property: "og:title",
        content: "runluv® — Corre los autódromos de México y descubre tu límite",
      },
      {
        property: "og:description",
        content:
          "Running sobre los autódromos de México. Elige tu reto — La Última Vuelta, Cada Paso Cuenta, 5K o 10K — y vive la temporada 2027 con la Gran Final en el Autódromo Hermanos Rodríguez.",
      },
      { property: "og:image", content: "https://runluv.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "runluv® — Running sobre los autódromos de México" },
      // Twitter / X Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@runluvmx" },
      {
        name: "twitter:title",
        content: "runluv® — Corre los autódromos de México y descubre tu límite",
      },
      {
        name: "twitter:description",
        content:
          "Running sobre los autódromos de México. Elige tu reto y vive la temporada 2027. Resiste hasta el final.",
      },
      { name: "twitter:image", content: "https://runluv.vercel.app/og-image.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "canonical", href: "https://runluv.mx/" },
      // Fonts — self-hosted, preloaded so they're ready before first paint (no FOUT).
      {
        rel: "preload",
        href: "/fonts/bebas-neue-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/inter-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  component: RootDocument,
});
