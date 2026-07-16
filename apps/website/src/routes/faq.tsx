import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaqAccordionItem } from "@/components/sections/faq/FaqAccordionItem";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Sobre runluv®",
    items: [
      {
        question: "¿Qué es runluv®?",
        answer:
          "runluv® es una experiencia de running que transforma los autódromos en escenarios donde corredores de todos los niveles descubren hasta dónde son capaces de llegar. Cada evento reúne competencia, resistencia y un ambiente diseñado para convivir, disfrutar y celebrar cada kilómetro. En runluv® no se trata solo de cruzar una meta, sino de encontrar tu desafío y vivirlo hasta el final.",
      },
      {
        question: "¿Quién puede participar en runluv®?",
        answer:
          "Todos. runluv® está diseñado para corredores de distintos niveles: desde quienes están por vivir su primer 5K hasta quienes buscan un desafío de resistencia más exigente. No necesitas ser atleta profesional. Lo importante es elegir una modalidad adecuada para tu nivel, prepararte con responsabilidad y escuchar a tu cuerpo durante toda la experiencia.",
      },
      {
        question: "¿Necesito clasificarme para participar?",
        answer:
          "No. Los eventos runluv® están abiertos a participantes de diferentes niveles, sin necesidad de clasificación previa. Algunas modalidades pueden requerir mayor preparación física o experiencia previa, pero siempre habrá un desafío pensado para que cada persona encuentre su siguiente vuelta.",
      },
      {
        question: '¿Qué significa "Resiste hasta el final"?',
        answer:
          "Es la filosofía de runluv®. Significa seguir cuando aparece el cansancio, administrar tu energía, confiar en tu preparación y recordar que cada llegada marca el inicio del siguiente desafío. Para algunos, resistir será terminar su primer 5K. Para otros, será dar una vuelta más, correr más tiempo o volver para enfrentar un reto mayor.",
      },
      {
        question: "¿runluv® es una carrera o una experiencia?",
        answer:
          "Es ambas cosas. runluv® nace del running, pero no termina en la carrera. Cada evento está pensado para que puedas competir, convivir, descansar, compartir y celebrar. El desafío está en el circuito; la experiencia se vive en todo el autódromo.",
      },
    ],
  },
  {
    title: "Brújula runluv®",
    items: [
      {
        question: "¿Qué es la brújula runluv®?",
        answer:
          "La brújula runluv® es una herramienta diseñada para ayudarte a encontrar tu siguiente desafío. A partir de algunas preguntas sobre tu experiencia, condición actual, objetivos y forma de vivir el running, la brújula te orienta hacia la modalidad que mejor se adapta a tu momento como corredor. Sirve para orientarte, no para clasificarte.",
      },
      {
        question: "¿Para qué sirve la brújula runluv®?",
        answer:
          "Sirve para ayudarte a tomar una mejor decisión antes de inscribirte. La brújula considera tu nivel, tu experiencia, tu relación con la resistencia, tu interés por competir y la forma en que quieres vivir el evento. Con esa información, te muestra qué desafíos pueden ser más adecuados para ti.",
      },
      {
        question: "¿El mapa runluv® decide por mí?",
        answer:
          "No. La decisión final siempre es tuya. La brújula runluv® funciona como una guía, pero tú eliges el camino. Te ayuda a identificar qué modalidad puede adaptarse mejor a tu momento actual, pero tú eliges el desafío que quieres enfrentar.",
      },
      {
        question: "¿Qué resultado me dará la brújula runluv®?",
        answer:
          "La brújula puede mostrarte: tu orientación principal como corredor, tus fortalezas, tu afinidad con distintas modalidades, tu desafío recomendado y otras modalidades que podrías disfrutar después. La idea no es decirte quién eres, sino ayudarte a descubrir hacia dónde puedes dar tu siguiente paso.",
      },
      {
        question: "¿Puedo volver a hacer la brújula runluv®?",
        answer:
          "Sí. De hecho, esa es parte de la experiencia. Siempre somos distintos. Tu condición, tus objetivos y tu forma de vivir el running pueden cambiar con el tiempo. Puedes hacer la brújula antes de cada temporada o antes de elegir un nuevo desafío. En runluv®, siempre hay una siguiente vuelta.",
      },
    ],
  },
  {
    title: "Modalidades",
    items: [
      {
        question: "¿Qué modalidades existen en runluv®?",
        answer:
          "Las modalidades pueden variar según el autódromo, pero runluv® contempla desafíos para diferentes niveles y formas de correr. Entre ellas pueden estar: 5K, 10K, La Última Vuelta, Cada Paso Cuenta, Parejas (Doubles), Teams y LUV Pro. Cada modalidad tiene reglas, duración y objetivos propios. La información específica estará disponible en la página de cada evento.",
      },
      {
        question: "¿Qué modalidad debo elegir si estoy empezando?",
        answer:
          "Si estás comenzando, Cada Paso Cuenta o un 5K puede ser una gran primera experiencia. Te permitirá vivir el ambiente de runluv®, conocer el circuito, medir tu desempeño y descubrir cómo se siente correr en un autódromo. Lo importante no es empezar con el desafío más difícil, sino elegir el que te permita disfrutar y llegar con seguridad.",
      },
      {
        question: "¿Qué es La Última Vuelta?",
        answer:
          "La Última Vuelta es uno de los desafíos más representativos de runluv®. Es una modalidad donde la estrategia, el ritmo y la resistencia son fundamentales. Cada vuelta exige tomar decisiones: cuándo acelerar, cuándo administrar energía y cómo seguir cuando el cansancio aparece. Se trata de resistir con inteligencia, no solo de correr rápido.",
      },
      {
        question: "¿Qué es Cada Paso Cuenta?",
        answer:
          "Cada Paso Cuenta es una modalidad pensada para quienes quieren vivir un desafío de mayor duración. Aquí cada kilómetro suma y cada decisión importa. La clave está en mantenerte en movimiento, administrar tu ritmo y construir tu resultado paso a paso. Es ideal para quienes disfrutan los retos largos y quieren descubrir hasta dónde pueden llegar.",
      },
      {
        question: "¿Qué es LUV Pro?",
        answer:
          "La Última Vuelta Pro (LUV Pro) es una modalidad pensada para corredores con mayor experiencia, mejor preparación y un enfoque más competitivo. Está diseñada para quienes quieren exigirse al máximo, medir su desempeño y enfrentar un reto de mayor intensidad dentro del universo runluv®.",
      },
      {
        question: "¿Puedo participar en pareja o equipo?",
        answer:
          "Sí. Algunas modalidades están diseñadas para vivirse en pareja o en equipo. runluv® entiende que correr también puede ser compartir. Si prefieres vivir el desafío acompañado, motivar a otros o celebrar cada kilómetro con tu grupo, revisa las opciones de Parejas o Teams disponibles en tu evento.",
      },
      {
        question: "¿Puedo cambiar de modalidad después de inscribirme?",
        answer:
          "Dependerá de las políticas de cada evento, la disponibilidad de lugares y las fechas límite establecidas. Antes de comprar tu boleto, revisa con cuidado la modalidad, distancia, horarios y condiciones. Si necesitas hacer algún ajuste, contacta al equipo runluv® con la mayor anticipación posible.",
      },
    ],
  },
  {
    title: "Preparación",
    items: [
      {
        question: "¿Cómo debo prepararme para runluv®?",
        answer:
          "Depende del desafío que elijas. Para 5K o 10K, te recomendamos construir una base de running, cuidar tu ritmo y llegar con confianza. Para modalidades de resistencia, también será importante trabajar hidratación, alimentación, recuperación y administración del esfuerzo. La mejor preparación es la que te permite disfrutar la experiencia sin poner en riesgo tu salud.",
      },
      {
        question: "¿Necesito entrenar con un coach?",
        answer:
          "No es obligatorio, pero sí recomendable si quieres llegar mejor preparado. Puedes entrenar por tu cuenta, seguir un plan adecuado a tu nivel o prepararte con un coach, club o centro especializado. Lo importante es que tu entrenamiento corresponda al desafío que vas a enfrentar.",
      },
      {
        question: "¿Puedo prepararme por mi cuenta?",
        answer:
          "Sí. Puedes prepararte por tu cuenta o apoyarte en los contenidos de entrenamiento que compartiremos en nuestras redes sociales. Sin embargo, para llegar mejor al día del evento, te recomendamos seguir un plan adecuado a tu nivel y, cuando sea posible, entrenar con un coach, club o centro especializado. La mejor preparación es la que te ayuda a correr con confianza, administrar tu ritmo y resistir hasta el final.",
      },
      {
        question: "¿Qué debo entrenar antes del evento?",
        answer:
          "Te recomendamos trabajar cuatro aspectos: resistencia cardiovascular, ritmo constante, recuperación y estrategia de carrera. En runluv® no siempre gana quien sale más rápido. Muchas veces, la mejor carrera es la que sabes administrar.",
      },
      {
        question: "¿Qué debo hacer la semana previa?",
        answer:
          "La semana previa no es para improvisar. Descansa, hidrátate, come bien, revisa tu equipo y consulta toda la información del evento. También es importante conocer horarios, accesos, estacionamiento, kit de participante y recomendaciones específicas de la sede. Llegar tranquilo también forma parte de la experiencia.",
      },
    ],
  },
  {
    title: "Día del evento",
    items: [
      {
        question: "¿Qué debo llevar el día del evento?",
        answer:
          "Te recomendamos llevar: identificación oficial, boleto o código QR, ropa cómoda para correr, tenis adecuados, cambio de ropa, bloqueador solar, gorra o lentes si el evento es al aire libre, hidratación o nutrición personal si la modalidad lo permite, y lo necesario para disfrutar el resto del evento. Cada sede podrá tener reglas específicas, por lo que siempre debes revisar la guía oficial del evento.",
      },
      {
        question: "¿A qué hora debo llegar?",
        answer:
          "Llega con suficiente anticipación para registrarte, ubicar accesos, conocer el circuito, dejar tus cosas si existe guardarropa y calentar sin prisa. La hora exacta recomendada se publicará en la información de cada evento. Llegar temprano te permitirá vivir runluv® desde el primer momento.",
      },
      {
        question: "¿Dónde encuentro mi horario de salida?",
        answer:
          "Los horarios de salida se publicarán en la página del evento o se enviarán por los canales oficiales de comunicación. Revisa tu correo, WhatsApp, la página del evento y las redes oficiales de runluv® durante los días previos. Si no encuentras tu información, contacta al equipo de atención antes del día del evento.",
      },
      {
        question: "¿Cómo funciona el registro?",
        answer:
          "Al llegar, deberás presentar tu boleto o código QR en la zona de registro. Dependiendo del evento, recibirás tu kit de participante, número, chip de cronometraje, pulsera o cualquier otro elemento necesario para competir. Te recomendamos revisar tu kit antes de salir del área de registro.",
      },
      {
        question: "¿Habrá chip de cronometraje?",
        answer:
          "Sí, las modalidades competitivas contarán con sistema de cronometraje para generar resultados oficiales. El chip permite registrar tu desempeño y validar tu participación. Deberás colocarlo correctamente y devolverlo si así lo indica la organización.",
      },
      {
        question: "¿Cómo se mide mi resultado?",
        answer:
          "Tu resultado se medirá de acuerdo con las reglas de la modalidad en la que participes. Puede incluir tiempo total, distancia recorrida, vueltas completadas, posición general, posición por categoría o cualquier otro criterio definido para el desafío. Los resultados oficiales estarán disponibles después del evento en los canales indicados por runluv®.",
      },
      {
        question: "¿Qué pasa si no puedo terminar?",
        answer:
          "Tu seguridad es lo más importante. Si necesitas detenerte, bajar el ritmo o retirarte, podrás hacerlo siguiendo las indicaciones del personal de ruta. Avísale al staff, voluntarios o personal médico si te sientes mal o necesitas apoyo. Escuchar a tu cuerpo también es parte del desafío.",
      },
      {
        question: "¿Habrá atención médica?",
        answer:
          "Sí. Los eventos runluv® contarán con personal de apoyo y atención médica para responder ante cualquier situación durante la experiencia. Si durante la carrera te sientes mal, avisa de inmediato al staff, voluntarios o personal médico.",
      },
      {
        question: "¿Puedo usar audífonos?",
        answer:
          "Dependerá de las reglas de cada modalidad y sede. Por seguridad, algunas competencias pueden restringir el uso de audífonos para que los participantes escuchen indicaciones del staff, jueces, voluntarios o personal de seguridad. Revisa siempre el reglamento del evento antes de correr.",
      },
      {
        question: "¿Habrá hidratación?",
        answer:
          "Sí. Los eventos contarán con zonas de hidratación o abastecimiento de acuerdo con la modalidad y la distancia. También se indicará si puedes llevar hidratación personal. En desafíos largos, te recomendamos planear tu estrategia de hidratación antes del evento.",
      },
      {
        question: "¿Habrá guardarropa?",
        answer:
          "Dependerá de cada sede. Si el servicio está disponible, te recomendamos llevar solo lo necesario y evitar objetos de valor. runluv® informará previamente las condiciones, horarios y restricciones del guardarropa.",
      },
      {
        question: "¿Habrá vestidores o regaderas?",
        answer:
          "Dependerá de cada sede. Algunos autódromos podrán contar con espacios de apoyo, pero no todas las sedes tendrán vestidores o regaderas. La información específica se publicará en la página de cada evento.",
      },
    ],
  },
  {
    title: "La experiencia",
    items: [
      {
        question: "¿runluv® es solo para corredores?",
        answer:
          "No. runluv® nace desde el running, pero la experiencia también está pensada para acompañantes, familias, clubes, marcas y comunidad. Puedes correr, apoyar, convivir, escuchar música, comer, descansar y celebrar cada kilómetro desde distintos espacios del evento.",
      },
      {
        question: "¿Pueden ir mis familiares o amigos?",
        answer:
          "Sí. runluv® está diseñado para vivirse acompañado. Tus familiares y amigos podrán asistir como espectadores, siempre de acuerdo con la disponibilidad y reglas de acceso de cada sede. La información sobre boletos de acompañantes, accesos y zonas de espectadores estará disponible en la página del evento.",
      },
      {
        question: "¿Habrá actividades además de las carreras?",
        answer:
          "Sí. La experiencia runluv® contempla un ambiente diseñado para convivir antes, durante y después de cada carrera. Dependiendo de la sede, podrás encontrar música, zonas de descanso, alimentos, activaciones, marcas invitadas y espacios para celebrar con otros corredores.",
      },
      {
        question: "¿Puedo quedarme después de correr?",
        answer:
          "Sí, cuando el formato del evento lo permita. La idea de runluv® es que no llegues únicamente a correr y salir. Queremos que vivas el ambiente, acompañes a otros participantes, descanses, compartas y celebres cada kilómetro.",
      },
      {
        question: "¿Puedo tomar fotos o grabar?",
        answer:
          "Sí, siempre que lo hagas desde zonas permitidas y sin interferir con la seguridad de los participantes. Los acompañantes deberán respetar las áreas asignadas para espectadores y las indicaciones del staff.",
      },
      {
        question: "¿Habrá fotos oficiales?",
        answer:
          "En algunos eventos podrá haber fotografía oficial. Si el servicio está disponible, se informará en la página del evento cómo consultar, descargar o comprar tus fotos después de correr.",
      },
      {
        question: "¿Se permiten mascotas?",
        answer:
          "Dependerá de las reglas de cada sede. Algunos recintos no permiten el ingreso de mascotas por seguridad, operación o reglamento interno. Los animales de servicio podrán estar sujetos a validación según las condiciones de cada lugar. Revisa la información del evento antes de asistir.",
      },
    ],
  },
  {
    title: "Boletos e inscripciones",
    items: [
      {
        question: "¿Cómo me inscribo?",
        answer:
          "Podrás inscribirte desde la página oficial del evento. Selecciona la sede, elige tu desafío, revisa las condiciones de participación y completa tu compra. Una vez confirmada la inscripción, recibirás la información correspondiente por correo electrónico.",
      },
      {
        question: "¿Qué incluye mi inscripción?",
        answer:
          "La inscripción puede incluir acceso al evento, participación en la modalidad seleccionada, número de corredor, cronometraje, kit de participante y otros beneficios según cada sede. Los elementos incluidos se especificarán en la página de cada evento.",
      },
      {
        question: "¿Puedo comprar boletos para acompañantes?",
        answer:
          "Sí. Los boletos para acompañantes estarán sujetos a disponibilidad. Para asegurar el acceso de familiares o amigos, te recomendamos comprarlos con anticipación.",
      },
      {
        question: "¿Puedo transferir mi boleto?",
        answer:
          "Las transferencias dependerán de la política de cada evento y de la plataforma de venta utilizada. Antes de comprar, revisa cuidadosamente las condiciones de cambios, reembolsos y transferencias. Si necesitas apoyo, contacta al equipo de atención runluv®.",
      },
      {
        question: "¿Puedo pedir reembolso?",
        answer:
          "Los reembolsos estarán sujetos a las políticas de compra de cada evento. Te recomendamos revisar los términos y condiciones antes de confirmar tu inscripción. En caso de duda, contacta al equipo de atención antes de realizar la compra.",
      },
      {
        question: "¿Qué pasa si me equivoqué en mis datos?",
        answer:
          "Contacta al equipo de atención runluv® lo antes posible. Incluye tu nombre completo, correo utilizado en la compra, sede, modalidad y número de orden o boleto. Los cambios estarán sujetos a las políticas y fechas límite de cada evento.",
      },
    ],
  },
  {
    title: "Reglas y seguridad",
    items: [
      {
        question: "¿Habrá reglamento oficial?",
        answer:
          "Sí. Cada modalidad tiene reglas específicas. El reglamento indicará condiciones de participación, tiempos, recorridos, relevos, uso de chip, zonas permitidas, penalizaciones y criterios de resultados. Léelo antes del evento para vivir tu desafío con claridad y seguridad.",
      },
      {
        question: "¿Quién supervisa la competencia?",
        answer:
          "El evento contará con personal de organización, jueces, staff de ruta y voluntarios para orientar a los participantes y cuidar el cumplimiento de las reglas. Su objetivo no es interrumpir la experiencia, sino hacer que todos compitan en condiciones seguras, claras y justas.",
      },
      {
        question: "¿Qué pasa si rompo una regla?",
        answer:
          "Dependiendo de la modalidad y la falta, podrías recibir una advertencia, ajuste en tu resultado, penalización o descalificación. Las reglas existen para cuidar la seguridad, la experiencia y la equidad entre participantes.",
      },
      {
        question: "¿Puedo recibir ayuda externa durante la carrera?",
        answer:
          "Dependerá de cada modalidad. En algunas competencias no se permitirá recibir asistencia fuera de las zonas oficiales. En otras, especialmente por equipos, existirán reglas específicas sobre relevos, acompañamiento o apoyo. Consulta siempre el reglamento de tu desafío.",
      },
      {
        question: "¿Hay edad mínima para participar?",
        answer:
          "La edad mínima dependerá de cada modalidad y evento. La información se publicará en la página correspondiente. En caso de participantes menores de edad, podrán aplicar requisitos adicionales como autorización de madre, padre o tutor.",
      },
    ],
  },
  {
    title: "Clubes, coaches y marcas",
    items: [
      {
        question: "Tengo un club de running, ¿puedo participar con mi comunidad?",
        answer:
          "Sí. runluv® busca conectar con clubes, equipos y comunidades de running. Si quieres llevar a tu club, organizar una experiencia grupal o participar en una modalidad por equipos, contacta al equipo runluv® para conocer opciones disponibles.",
      },
      {
        question: "Soy coach o entrenador, ¿puedo preparar corredores para runluv®?",
        answer:
          "Sí. Los coaches y entrenadores son aliados naturales de la experiencia runluv®. Podrás preparar corredores para distintos desafíos, acompañarlos durante el proceso y ayudarles a elegir la modalidad más adecuada según su nivel.",
      },
      {
        question: "¿Puedo ser patrocinador o tener una activación en el evento?",
        answer:
          "Sí. runluv® está abierto a colaboraciones con marcas alineadas al deporte, bienestar, comunidad, entretenimiento y estilo de vida. Para propuestas comerciales, activaciones o patrocinios, contacta al equipo runluv®.",
      },
    ],
  },
  {
    title: "Contacto",
    items: [
      {
        question: "¿A quién puedo contactar si tengo dudas?",
        answer:
          "Si tienes preguntas sobre inscripción, boletos, horarios, modalidades, accesos o logística, contacta al equipo de atención runluv® a través de los canales oficiales publicados en la página del evento. Para ayudarte mejor, incluye: sede o evento, modalidad, nombre completo, correo usado en la compra, número de boleto u orden si lo tienes, y una descripción clara de tu duda.",
      },
      {
        question: "¿Dónde encuentro la información más actualizada?",
        answer:
          "La información más actualizada estará en la página oficial de cada evento y en las redes sociales de runluv®. Revisa esos canales durante los días previos, ya que horarios, accesos y detalles operativos pueden actualizarse conforme se acerque la fecha.",
      },
      {
        question: "¿Qué debo recordar antes de correr?",
        answer:
          "Elige bien tu desafío. Prepárate con responsabilidad. Llega con tiempo. Escucha a tu cuerpo. Disfruta el ambiente. Celebra cada kilómetro. Recuerda que en runluv®, cada llegada marca el inicio del siguiente desafío.",
      },
    ],
  },
];

const normalized = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f®]/g, "");

const slug = (title: string) =>
  normalized(title)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const TOTAL_QUESTIONS = faqData.reduce((total, category) => total + category.items.length, 0);

function FAQPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const searchTerm = normalized(query.trim());
  const filtered = useMemo(() => {
    if (!searchTerm) return faqData;

    return faqData
      .map((category) => {
        const categoryMatches = normalized(category.title).includes(searchTerm);
        return {
          ...category,
          items: categoryMatches
            ? category.items
            : category.items.filter(
                (item) =>
                  normalized(item.question).includes(searchTerm) ||
                  normalized(item.answer).includes(searchTerm),
              ),
        };
      })
      .filter((category) => category.items.length > 0);
  }, [searchTerm]);

  const resultCount = filtered.reduce((total, category) => total + category.items.length, 0);
  const visibleSections = filtered.map((category) => slug(category.title)).join("|");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-faq-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.idx));
          }
        }
      },
      { rootMargin: "-18% 0px -72% 0px" },
    );
    sections.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleSections]);

  const categoryLink = (category: FAQCategory) => {
    const categoryIndex = faqData.findIndex((item) => item.title === category.title);
    return {
      categoryIndex,
      isActive: active === categoryIndex,
      href: `#${slug(category.title)}`,
    };
  };

  return (
    <div
      className="relative min-h-screen overflow-x-clip px-4 pb-24 pt-28 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(170deg, #000 0%, #0a0a0a 40%, #101204 100%)" }}
    >
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -right-56 top-32 h-[34rem] w-[34rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,255,0,0.07), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.025) 119px, rgba(255,255,255,0.025) 120px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-9 sm:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rl-accent sm:text-sm">
            runluv® México
          </p>
          <h1 className="max-w-4xl text-balance text-[clamp(3.25rem,9vw,7rem)] leading-[0.9] tracking-tight text-white uppercase">
            Resuelve tus <span className="text-rl-accent">dudas</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-rl-text-secondary">
            Todo lo que necesitas saber antes de tu desafío runluv®.{" "}
            <span className="tabular-nums text-rl-text-muted">
              {TOTAL_QUESTIONS} preguntas · {faqData.length} temas
            </span>
          </p>
          <p className="mt-2 text-xs text-rl-text-muted">
            Última actualización: <time dateTime="2026-06-23">23 de junio de 2026</time>
          </p>

          <div className="mt-8 max-w-2xl">
            <label htmlFor="faq-search" className="sr-only">
              Buscar en preguntas frecuentes
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-rl-text-muted"
                aria-hidden="true"
              />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Buscar en ${TOTAL_QUESTIONS} preguntas…`}
                className="min-h-13 w-full appearance-none border border-rl-border-strong bg-white/[0.045] py-3 pl-12 pr-14 text-base text-white placeholder:text-rl-text-muted transition-[border-color,background-color,box-shadow] duration-160 hover:border-white/40 focus:border-rl-accent focus:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-rl-accent/30"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-rl-text-muted transition-[color,transform] duration-160 hover:text-white active:scale-[0.96]"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="mt-3 min-h-5 text-sm text-rl-text-muted" role="status" aria-live="polite">
              {searchTerm
                ? `${resultCount} ${resultCount === 1 ? "resultado" : "resultados"} en ${filtered.length} ${filtered.length === 1 ? "tema" : "temas"}`
                : "Busca por modalidad, horario, boleto, seguridad o cualquier palabra clave."}
            </p>
          </div>
        </header>

        {filtered.length > 0 && (
          <nav
            aria-label="Categorías de preguntas"
            className="sticky top-20 z-30 -mx-4 mb-10 border-y border-rl-border-subtle bg-black/92 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden"
          >
            <div className="flex gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {filtered.map((category) => {
                const link = categoryLink(category);
                return (
                  <a
                    key={category.title}
                    href={link.href}
                    className={cn(
                      "inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 text-xs font-bold uppercase tracking-wider transition-[color,border-color,background-color,transform] duration-160 active:scale-[0.96]",
                      link.isActive
                        ? "border-rl-accent bg-rl-accent text-black"
                        : "border-rl-border-strong bg-black/70 text-rl-text-secondary hover:border-white/60 hover:text-white",
                    )}
                    aria-current={link.isActive ? "location" : undefined}
                  >
                    {category.title}
                    <span className="tabular-nums opacity-70">{category.items.length}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        )}

        <div className="grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Categorías de preguntas" className="hidden lg:block">
            <div className="sticky top-28 border-t border-rl-border-subtle pt-3">
              <p className="mb-3 px-4 text-[11px] font-bold uppercase tracking-[0.22em] text-rl-text-muted">
                {searchTerm ? "Temas encontrados" : "Explora por tema"}
              </p>
              {filtered.map((category) => {
                const link = categoryLink(category);
                return (
                  <a
                    key={category.title}
                    href={link.href}
                    className={cn(
                      "grid min-h-11 grid-cols-[2rem_1fr_auto] items-center gap-3 border-l-2 px-4 py-2 transition-[color,border-color,background-color] duration-160",
                      link.isActive
                        ? "border-rl-accent bg-white/[0.035] text-white"
                        : "border-rl-border-subtle text-rl-text-muted hover:border-white/40 hover:bg-white/[0.025] hover:text-white",
                    )}
                    aria-current={link.isActive ? "location" : undefined}
                  >
                    <span
                      className={cn(
                        "text-lg leading-none tabular-nums",
                        link.isActive && "text-rl-accent",
                      )}
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {String(link.categoryIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {category.title}
                    </span>
                    <span className="text-xs tabular-nums opacity-70">{category.items.length}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="min-w-0">
            {filtered.length === 0 ? (
              <div className="border-y border-rl-border-subtle py-12 sm:py-16" role="status">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-rl-accent">
                  Sin coincidencias
                </p>
                <h2 className="mt-3 max-w-2xl text-balance text-4xl leading-none text-white sm:text-5xl">
                  No encontramos “{query}”
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-rl-text-secondary">
                  Prueba con una palabra más corta, revisa la ortografía o contacta a nuestro
                  equipo.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="inline-flex min-h-12 items-center justify-center bg-rl-accent px-6 text-sm font-bold uppercase tracking-widest text-black transition-[filter,transform] duration-160 hover:brightness-95 active:scale-[0.96]"
                  >
                    Ver todas las preguntas
                  </button>
                  <a
                    href="/contacto"
                    className="inline-flex min-h-12 items-center justify-center border border-rl-border-strong px-6 text-sm font-bold uppercase tracking-widest text-white transition-[border-color,color,transform] duration-160 hover:border-rl-accent hover:text-rl-accent active:scale-[0.96]"
                  >
                    Contactar al equipo
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-14 sm:space-y-16">
                {filtered.map((category) => {
                  const categoryIndex = faqData.findIndex((item) => item.title === category.title);
                  const headingId = `faq-cat-${categoryIndex}`;

                  return (
                    <section
                      key={category.title}
                      id={slug(category.title)}
                      data-faq-section
                      data-idx={categoryIndex}
                      aria-labelledby={headingId}
                      className="scroll-mt-40 lg:scroll-mt-28"
                    >
                      <div className="mb-5 flex items-end justify-between gap-4 border-b border-rl-border-strong pb-5">
                        <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
                          <span
                            aria-hidden="true"
                            className="text-4xl leading-none tabular-nums sm:text-5xl"
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              color: "transparent",
                              WebkitTextStroke: "1.5px rgba(212,255,0,0.65)",
                            }}
                          >
                            {String(categoryIndex + 1).padStart(2, "0")}
                          </span>
                          <h2
                            id={headingId}
                            className="text-balance text-3xl leading-none tracking-wide text-white uppercase sm:text-4xl"
                          >
                            {category.title}
                          </h2>
                        </div>
                        <span
                          className="shrink-0 text-xs font-semibold tabular-nums text-rl-text-muted"
                          aria-label={`${category.items.length} ${category.items.length === 1 ? "pregunta" : "preguntas"}`}
                        >
                          {category.items.length}
                          <span className="hidden sm:inline">
                            {category.items.length === 1 ? " pregunta" : " preguntas"}
                          </span>
                        </span>
                      </div>

                      <div>
                        {category.items.map((item, index) => (
                          <FaqAccordionItem
                            key={item.question}
                            question={item.question}
                            answer={item.answer}
                            index={index}
                            searchTerm={searchTerm}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}

                <aside className="border-y border-rl-border-strong bg-white/[0.025] px-5 py-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rl-accent">
                      ¿Aún tienes dudas?
                    </p>
                    <h2 className="mt-2 text-balance text-3xl leading-none text-white sm:text-4xl">
                      Hablemos de tu siguiente desafío
                    </h2>
                  </div>
                  <a
                    href="/contacto"
                    className="mt-6 inline-flex min-h-12 shrink-0 items-center gap-2 bg-rl-accent px-6 text-sm font-bold uppercase tracking-widest text-black transition-[filter,transform] duration-160 hover:brightness-95 active:scale-[0.96] sm:mt-0"
                  >
                    Contactar al equipo
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </aside>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes | runluv®" },
      {
        name: "description",
        content:
          "Resuelve tus dudas sobre runluv®: inscripciones, modalidades, preparación, horarios, seguridad, espectadores y resultados.",
      },
    ],
  }),
  component: FAQPage,
});
