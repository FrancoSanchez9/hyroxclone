import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { LegalLayout, type LegalSection } from "@/components/ui/LegalLayout";

const sections: LegalSection[] = [
  {
    heading: "Identidad y domicilio del responsable",
    content: (
      <p>
        runluv® (en adelante, "el Responsable"), con domicilio en México, es responsable del
        tratamiento, uso y protección de sus datos personales conforme a la{" "}
        <strong>
          Ley Federal de Protección de Datos Personales en Posesión de los Particulares
        </strong>{" "}
        (LFPDPPP), su Reglamento y demás disposiciones aplicables.
      </p>
    ),
  },
  {
    heading: "Datos personales que recabamos",
    content: (
      <>
        <p>Para las finalidades descritas en este aviso, podemos recabar los siguientes datos:</p>
        <ul>
          <li>
            Datos de identificación y contacto: nombre, correo electrónico, teléfono y ciudad.
          </li>
          <li>
            Datos de inscripción a eventos: modalidad, categoría y preferencias de competencia.
          </li>
          <li>
            Datos de colaboración institucional o patrocinio (gobiernos, secretarías de turismo y
            aliados comerciales), cuando aplique.
          </li>
        </ul>
        <p>
          No recabamos datos personales sensibles salvo que sean estrictamente necesarios y previo
          consentimiento expreso.
        </p>
      </>
    ),
  },
  {
    heading: "Finalidades del tratamiento",
    content: (
      <>
        <p>
          <strong>Finalidades primarias</strong> (necesarias para la relación): gestionar
          inscripciones a eventos, atender solicitudes de contacto y de colaboración institucional,
          y enviar información operativa relacionada.
        </p>
        <p>
          <strong>Finalidades secundarias</strong> (opcionales): envío de comunicaciones
          promocionales, encuestas y contenido sobre futuros eventos. Usted puede negarse a estas
          finalidades escribiéndonos a <a href="mailto:contacto@runluv.mx">contacto@runluv.mx</a>.
        </p>
      </>
    ),
  },
  {
    heading: "Transferencia de datos",
    content: (
      <p>
        Sus datos pueden compartirse con proveedores que nos ayudan a operar los eventos (por
        ejemplo, plataformas de registro y pago) únicamente para cumplir las finalidades aquí
        descritas. No vendemos ni comercializamos sus datos personales.
      </p>
    ),
  },
  {
    heading: "Derechos ARCO",
    content: (
      <p>
        Usted tiene derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse</strong> al
        tratamiento de sus datos (derechos ARCO), así como a revocar su consentimiento. Para
        ejercerlos, envíe su solicitud a <a href="mailto:contacto@runluv.mx">contacto@runluv.mx</a>{" "}
        indicando su nombre y el derecho que desea ejercer. Atenderemos su solicitud en los plazos
        que marca la ley.
      </p>
    ),
  },
  {
    heading: "Uso de cookies",
    content: (
      <p>
        Este sitio utiliza cookies y tecnologías similares para mejorar su experiencia. Puede
        consultar el detalle en nuestra <a href="/cookies">Política de Cookies</a> y gestionarlas
        desde la configuración de su navegador.
      </p>
    ),
  },
  {
    heading: "Cambios al aviso de privacidad",
    content: (
      <p>
        Nos reservamos el derecho de actualizar este aviso. Cualquier modificación será publicada en
        esta misma página, indicando la fecha de la última actualización.
      </p>
    ),
  },
  {
    heading: "Contacto",
    content: (
      <p>
        Si tiene dudas sobre este aviso o el tratamiento de sus datos, contáctenos en{" "}
        <a href="mailto:contacto@runluv.mx">contacto@runluv.mx</a> o a través de nuestra{" "}
        <a href="/contacto">página de contacto</a>.
      </p>
    ),
  },
];

function PrivacidadPage() {
  return (
    <LegalLayout
      title="AVISO DE PRIVACIDAD"
      subtitle="Cómo recabamos, usamos y protegemos tus datos personales."
      lastUpdated="19 de junio de 2026"
      sections={sections}
    />
  );
}

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: seo({
      title: "Aviso de Privacidad",
      description: "Cómo runluv® recaba, usa y protege tus datos personales conforme a la LFPDPPP.",
    }),
  }),
  component: PrivacidadPage,
});
