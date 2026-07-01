import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, type LegalSection } from "@/components/ui/LegalLayout";

const sections: LegalSection[] = [
  {
    heading: "¿Qué son las cookies?",
    content: (
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita
        un sitio web. Sirven para recordar sus preferencias, mejorar la navegación y obtener
        información estadística sobre el uso del sitio.
      </p>
    ),
  },
  {
    heading: "Tipos de cookies que utilizamos",
    content: (
      <ul>
        <li>
          <strong>Esenciales:</strong> necesarias para el funcionamiento básico del sitio. No pueden
          desactivarse.
        </li>
        <li>
          <strong>De preferencias:</strong> recuerdan opciones como el idioma o tu consentimiento de
          cookies.
        </li>
        <li>
          <strong>Analíticas:</strong> nos ayudan a entender cómo se usa el sitio para mejorarlo (de
          forma anónima y agregada).
        </li>
      </ul>
    ),
  },
  {
    heading: "Cómo gestionar las cookies",
    content: (
      <p>
        Puede aceptar o rechazar las cookies desde el aviso que aparece al entrar al sitio, así como
        configurarlas o eliminarlas en cualquier momento desde los ajustes de su navegador. Tenga en
        cuenta que desactivar algunas cookies puede afectar el funcionamiento del sitio.
      </p>
    ),
  },
  {
    heading: "Cambios a esta política",
    content: (
      <p>
        Esta Política de Cookies puede actualizarse para reflejar cambios en la normativa o en
        nuestras prácticas. Publicaremos cualquier modificación en esta misma página.
      </p>
    ),
  },
  {
    heading: "Contacto",
    content: (
      <p>
        Si tienes preguntas sobre el uso de cookies, escríbenos a{" "}
        <a href="mailto:info@runluv.mx">info@runluv.mx</a>. Consulta también nuestro{" "}
        <a href="/privacidad">Aviso de Privacidad</a>.
      </p>
    ),
  },
];

function CookiesPage() {
  return (
    <LegalLayout
      title="POLÍTICA DE COOKIES"
      subtitle="Qué cookies usamos y cómo puedes gestionarlas."
      lastUpdated="19 de junio de 2026"
      sections={sections}
    />
  );
}

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies | runluv®" },
      {
        name: "description",
        content: "Qué cookies utiliza runluv® México y cómo puedes gestionarlas.",
      },
    ],
  }),
  component: CookiesPage,
});
