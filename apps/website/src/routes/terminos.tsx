import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { LegalLayout, type LegalSection } from "@/components/ui/LegalLayout";

const sections: LegalSection[] = [
  {
    heading: "Aceptación de los términos",
    content: (
      <p>
        Al acceder y utilizar este sitio web, usted acepta los presentes Términos y Condiciones. Si
        no está de acuerdo con ellos, le pedimos abstenerse de usar el sitio.
      </p>
    ),
  },
  {
    heading: "Uso del sitio",
    content: (
      <>
        <p>El usuario se compromete a utilizar el sitio de forma lícita y a no:</p>
        <ul>
          <li>Realizar actividades que dañen, inhabiliten o sobrecarguen la plataforma.</li>
          <li>Suplantar la identidad de terceros o proporcionar información falsa.</li>
          <li>Reproducir o distribuir el contenido sin autorización.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Inscripciones y pagos",
    content: (
      <p>
        Las inscripciones a los eventos se realizan a través de las plataformas de registro
        indicadas en cada evento. Los precios, categorías, fechas y condiciones de cancelación o
        reembolso se rigen por lo establecido al momento de la inscripción.
      </p>
    ),
  },
  {
    heading: "Propiedad intelectual",
    content: (
      <p>
        La marca, el logotipo, los textos, gráficos y demás contenidos de este sitio están
        protegidos por la legislación aplicable. Su uso no autorizado queda estrictamente prohibido.
      </p>
    ),
  },
  {
    heading: "Limitación de responsabilidad",
    content: (
      <p>
        El sitio se ofrece "tal cual". No garantizamos disponibilidad ininterrumpida ni la ausencia
        total de errores. La participación en eventos deportivos implica riesgos que el usuario
        reconoce y acepta al inscribirse, conforme a los términos específicos de cada evento.
      </p>
    ),
  },
  {
    heading: "Enlaces a terceros",
    content: (
      <p>
        Este sitio puede contener enlaces a sitios de terceros (plataformas de registro, pago o
        redes sociales). No somos responsables del contenido ni de las políticas de dichos sitios.
      </p>
    ),
  },
  {
    heading: "Modificaciones",
    content: (
      <p>
        Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las versiones
        actualizadas se publicarán en esta página con su fecha correspondiente.
      </p>
    ),
  },
  {
    heading: "Ley aplicable y jurisdicción",
    content: (
      <p>
        Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier
        controversia se someterá a los tribunales competentes correspondientes.
      </p>
    ),
  },
  {
    heading: "Contacto",
    content: (
      <p>
        Para cualquier duda sobre estos Términos, escríbenos a{" "}
        <a href="mailto:info@hyrox.mx">info@hyrox.mx</a> o visita nuestra{" "}
        <a href="/contacto">página de contacto</a>.
      </p>
    ),
  },
];

function TerminosPage() {
  return (
    <LegalLayout
      title="TÉRMINOS Y CONDICIONES"
      subtitle="Las reglas para el uso de este sitio y la participación en nuestros eventos."
      lastUpdated="19 de junio de 2026"
      sections={sections}
    />
  );
}

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: seo({
      title: "Términos y Condiciones",
      description:
        "Términos y condiciones de uso del sitio y de participación en los eventos de HYROX México.",
    }),
  }),
  component: TerminosPage,
});
