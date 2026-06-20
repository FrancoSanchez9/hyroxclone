# GEO Audit Report: runluv®

**Audit Date:** 2026-06-19
**URL:** https://runluv.mx (local dev: http://localhost:5173)
**Business Type:** Plataforma B2G — eventos de running para gobiernos municipales/estatales
**Pages Analyzed:** 1 (SPA de una sola página con rutas adicionales sin contenido runluv)
**Auditado por:** 5 agentes GEO especializados en paralelo

---

## Executive Summary

**Overall GEO Score: 19/100 — Critical**

runluv® tiene un concepto sólido, contenido con estadísticas específicas y un diferenciador genuino en el mercado mexicano. Sin embargo, el sitio es prácticamente **invisible para todos los sistemas de IA** por tres razones estructurales: (1) todo el contenido se renderiza client-side en JavaScript — los crawlers de IA reciben `<div id="root"></div>` vacío; (2) el `<title>` y `<meta description>` aún dicen "HYROX México" en lugar de runluv, confundiendo la identidad de marca ante cualquier crawler; (3) no existen robots.txt, sitemap.xml, llms.txt ni Schema.org. Aplicar los 5 fixes inmediatos de este reporte puede mover el score de 19 a ~55/100 sin tocar el contenido.

### Score Breakdown

| Categoría                | Score  | Peso | Score Ponderado |
| ------------------------ | ------ | ---- | --------------- |
| AI Citability            | 38/100 | 25%  | 9.5             |
| Brand Authority          | 0/100  | 20%  | 0.0             |
| Content E-E-A-T          | 28/100 | 20%  | 5.6             |
| Technical GEO            | 22/100 | 15%  | 3.3             |
| Schema & Structured Data | 2/100  | 10%  | 0.2             |
| Platform Optimization    | 7/100  | 10%  | 0.7             |
| **Overall GEO Score**    |        |      | **19/100**      |

> **Nota importante:** La AI Citability intrínseca del contenido es 63/100 — el contenido es bueno. El score efectivo de 38 refleja el bloqueo arquitectural del CSR. Una vez implementado SSR/SSG, la AI Citability subiría a ~63/100 automáticamente.

---

## Problemas Críticos (Resolver Inmediatamente)

### C-1: `<title>` y `<meta name="description">` dicen "HYROX México"

**Archivo:** `apps/website/index.html`
**Impacto:** Cada crawler de IA que visita runluv.mx asocia el dominio con un **competidor** (HYROX). Es el único contenido legible sin JS.
**Fix:** Ver Sección "Quick Wins" abajo — ya aplicado en este reporte.

### C-2: Arquitectura CSR — contenido invisible para IA

**Impacto:** GPTBot, ClaudeBot, PerplexityBot, CCBot, Amazonbot ven `<div id="root"></div>`. Todo el contenido de valor existe solo en memoria de React. 10 de 12 crawlers de IA no pueden leer nada.
**Fix:** Migrar a SSR (TanStack Start) o SSG (vite-plugin-prerender). Plazo: sprint #1 post-lanzamiento.

### C-3: No existe robots.txt

**Archivo a crear:** `apps/website/public/robots.txt`
**Impacto:** Crawlers reciben HTML de la app al solicitar `/robots.txt`. Sin directivas de crawl, sin referencia a sitemap.

### C-4: No existe sitemap.xml

**Archivo a crear:** `apps/website/public/sitemap.xml`
**Impacto:** Crawlers de IA no tienen mapa de URLs. La única página descubrible es `/`.

### C-5: Zero Schema.org markup

**Impacto:** Ningún sistema de IA puede identificar a runluv como entidad, describir sus servicios o extraer datos estructurados. Es la mayor causa del score 0 en Schema.

### C-6: No existe llms.txt

**Archivo a crear:** `apps/website/public/llms.txt`
**Impacto:** Modelos de lenguaje que soportan el protocolo llms.txt no tienen contexto curado sobre runluv.

---

## Problemas de Alta Prioridad (Esta semana)

### H-1: FAQ page tiene contenido de HYROX (competidor)

**Archivo:** `apps/website/src/routes/faq.tsx`
**Impacto:** La ruta `/faq` existe pero muestra "¿Qué es HYROX?" — daño activo a la identidad de marca.

### H-2: Navegación principal usa hrefs de ancla sin páginas independientes

**Impacto:** Los 4 items del nav (`/#que-es`, `/#modalidades`, `/#impacto`, `/#modelo`) no crean páginas rastreables separadas.

### H-3: Sin tags Open Graph ni Twitter Card

**Impacto:** Cuando un funcionario de gobierno comparte el link en WhatsApp o email, no aparece ningún preview.

### H-4: Sin información de fundadores/equipo

**Impacto:** Baja puntuación E-E-A-T en Expertise y Authoritativeness. Cualquier AI que busque "quién es runluv" no encuentra nada.

### H-5: Estadísticas sin fuentes citadas

**El reclamo más vulnerable:** "7x retorno económico por peso invertido" no tiene metodología ni fuente. Funciona como copy pero falla auditorías de procurement gubernamental.

### H-6: Links "Descarga dossier" y "Contacto" apuntan a `href: "/"`

**Archivo:** `apps/website/src/data/navigation.ts`
**Impacto:** Los CTAs de mayor intención están rotos.

---

## Problemas de Prioridad Media (Este mes)

### M-1: Sin política de privacidad

**Impacto:** Requerida por LFPDPPP de México para cualquier formulario de contacto. Riesgo legal.

### M-2: Sin marca de tiempo / fecha de publicación visible

**Impacto:** Perplexity y otros sistemas de IA depriorizan contenido sin fecha para las claims de tendencias ("¿Por qué ahora?").

### M-3: Sin presencia en plataformas citadas por IA

Reddit, YouTube, LinkedIn: cero menciones de runluv en cualquier plataforma que los LLMs usan como fuente.

### M-4: Imagen hero carga a 1920px en mobile (sin srcset)

**Impacto:** CLS/LCP subóptimo. La imagen background de Unsplash descarga 1920px en móvil.

### M-5: Sin presencia en Google Ecosystem

Cero: YouTube channel, Google Business Profile, Google Knowledge Panel.

---

## Problemas de Baja Prioridad

### L-1: Sin IndexNow implementado

Bing indexing instantáneo disponible pero no configurado.

### L-2: Sin `<link rel="canonical">` en ninguna ruta

Riesgo de contenido duplicado cuando escalen las rutas.

### L-3: Headers de seguridad ausentes en producción

HSTS, CSP, X-Frame-Options — deben configurarse en el CDN antes del lanzamiento.

---

## Category Deep Dives

### AI Citability (38/100)

**Citabilidad intrínseca del contenido:** 63/100 — el contenido es sólido.
**Citabilidad efectiva:** 38/100 — bloqueada por CSR.

El bloque más citable del sitio es la sección de **Impacto en Números** (score intrínseco: 74/100):

> "3,000–5,000 corredores por evento / 15,000 asistentes totales / 20–35% visitantes foráneos / 1,500–3,500 noches de hotel generadas / 7x retorno económico por peso invertido / 90+ días de impacto visible post-evento"

La frase más memorable y citable:

> "Las carreras tradicionales terminan en la meta. runluv® empieza ahí."

**Bloques menos citables:** Hero (19/100) y CTA (22/100) — copy aspiracional sin claims factuales.

**Acción principal:** Implementar SSR/SSG. El contenido ya está escrito correctamente; solo necesita ser legible por crawlers.

---

### Brand Authority (0/100)

Sitio pre-lanzamiento. Sin presencia pública verificable en ninguna plataforma que los LLMs usan como fuente de entidades.

| Plataforma           | Estado  |
| -------------------- | ------- |
| Wikipedia            | Ausente |
| Reddit               | Ausente |
| YouTube              | Ausente |
| LinkedIn             | Ausente |
| Medios de running MX | Ausente |
| Prensa institucional | Ausente |

**Nota:** Brand Authority no puede forzarse — se construye con presencia real. La secuencia recomendada: LinkedIn → comunicado de prensa → YouTube → Reddit → Wikipedia (post primeros eventos).

---

### Content E-E-A-T (28/100)

| Dimensión                     | Score | Diagnóstico                                         |
| ----------------------------- | ----- | --------------------------------------------------- |
| Experience (Experiencia)      | 5/25  | Pre-lanzamiento: cero eventos documentados          |
| Expertise (Expertise)         | 9/25  | Conocimiento real del sector pero atribuido a nadie |
| Authoritativeness (Autoridad) | 4/25  | Sin validación externa, sin equipo visible          |
| Trustworthiness (Confianza)   | 14/25 | Claims internamente consistentes pero sin fuentes   |

**El mayor gap:** No hay ningún nombre de persona en todo el sitio. Ni un fundador, ni un director de producción, ni un director general. Para un pitch B2G, esto es una señal de alerta para los equipos de procurement.

**Contenido faltante crítico (por ROI):**

1. Página "Nosotros/Equipo" con al menos 1 persona nombrada y su LinkedIn
2. Metodología del 7x (aunque sea un párrafo)
3. Política de privacidad
4. Página de contacto real (no solo email en footer)

---

### Technical GEO (22/100)

| Componente               | Score  | Estado                               |
| ------------------------ | ------ | ------------------------------------ |
| Server-Side Rendering    | 0/100  | Crítico — SPA puro                   |
| Meta Tags & Indexability | 25/100 | Crítico — marca incorrecta           |
| Crawlability             | 5/100  | Crítico — sin robots.txt/sitemap     |
| Security Headers         | 45/100 | Alto — pendiente para producción     |
| Core Web Vitals          | 40/100 | Alto — sin fetchpriority, sin srcset |
| Mobile Optimization      | 70/100 | Bueno                                |
| URL Structure            | 75/100 | Bueno                                |

**Fix de SSR recomendado:** TanStack Start (compatible con TanStack Router ya instalado) o `vite-plugin-prerender` como solución inmediata de menor esfuerzo.

---

### Schema & Structured Data (2/100)

**Schemas encontrados:** 0 de cualquier tipo.

**Schemas prioritarios para runluv (por impacto GEO):**

| Schema                        | Prioridad | Por qué                                       |
| ----------------------------- | --------- | --------------------------------------------- |
| Organization + sameAs         | Crítica   | Identidad de entidad — base de todo           |
| FAQPage                       | Alta      | Responde las preguntas B2G directamente en AI |
| Service (formatos de carrera) | Alta      | Hace los productos rastreables y citables     |
| WebPage + speakable           | Media     | Marca secciones clave para asistentes de voz  |
| WebSite + SearchAction        | Baja      | Identidad de dominio                          |

Los JSON-LD completos ya generados están en la sección "Quick Wins" y listos para insertar en `index.html`.

---

### Platform Optimization (7/100)

| Plataforma          | Score | Bloqueante principal             |
| ------------------- | ----- | -------------------------------- |
| Google AI Overviews | 8/100 | CSR + schema ausente             |
| ChatGPT Web Search  | 5/100 | Sin entidad Wikipedia/Wikidata   |
| Perplexity AI       | 6/100 | Sin presencia Reddit, sin fechas |
| Google Gemini       | 9/100 | Sin YouTube, sin Knowledge Graph |
| Bing Copilot        | 7/100 | Sin IndexNow, sin Bing Webmaster |

**La acción de mayor ROI cross-platform:** SSR + robots.txt + Organization schema. Estas tres acciones impactan las 5 plataformas simultáneamente.

---

## Quick Wins (Implementar Esta Semana)

1. **Fix inmediato del index.html** — title, meta description, OG tags, JSON-LD Organization y FAQPage — **COMPLETADO** (aplicado al finalizar este reporte)
2. **Crear robots.txt** en `public/` — **COMPLETADO**
3. **Crear sitemap.xml** en `public/` — **COMPLETADO**
4. **Crear llms.txt** en `public/` — **COMPLETADO**
5. **Crear página LinkedIn** para runluv® — manual, 2-3 horas, impacto inmediato en ChatGPT entity graph

---

## Plan de Acción a 30 Días

### Semana 1: Infraestructura Base (ya iniciada)

- [x] Fix title y meta description en index.html
- [x] Crear robots.txt con crawlers de IA permitidos
- [x] Crear sitemap.xml con rutas actuales
- [x] Crear llms.txt con contexto de marca
- [x] Añadir Organization JSON-LD + FAQPage schema a index.html
- [ ] Crear página LinkedIn de runluv®
- [ ] Reescribir `src/routes/faq.tsx` con contenido runluv (remover todo lo de HYROX)
- [ ] Implementar IndexNow (30 min)

### Semana 2: SSR/SSG — Desbloqueador Principal

- [ ] Evaluar TanStack Start vs vite-plugin-prerender
- [ ] Implementar pre-rendering al menos para `/` y `/faq`
- [ ] Verificar que crawlers lean el contenido (test con curl + User-Agent: GPTBot)
- [ ] Añadir `<Head>` por ruta con TanStack Router (title + canonical únicos)
- [ ] Crear OG image (1200x630) con logo runluv y tagline

### Semana 3: Contenido y E-E-A-T

- [ ] Añadir sección "Equipo / Nosotros" con al menos el/los fundador(es)
- [ ] Crear página `/contacto` real (formulario o Calendly embed)
- [ ] Crear página `/impacto-economico` con metodología del 7x y fuentes
- [ ] Publicar política de privacidad (requerida por LFPDPPP)
- [ ] Reescribir rutas existentes con contenido runluv (la-carrera, campeonatos, etc.)

### Semana 4: Brand Presence y Lanzamiento

- [ ] Publicar comunicado de prensa en comunicae.com.mx o similar
- [ ] Crear canal YouTube y subir video de concepto
- [ ] Participar en r/corredores con contenido útil (no promocional)
- [ ] Registrar Bing Webmaster Tools y añadir msvalidate.01
- [ ] Configurar headers de seguridad en plataforma de hosting (Vercel/Cloudflare)
- [ ] Lanzar con SSR activo y validar con Google Rich Results Test

---

## Apéndice: Páginas Analizadas

| URL                                 | Título actual                             | Issues GEO                                |
| ----------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `http://localhost:5173/`            | "HYROX México — La Carrera de Fitness" ❌ | 12 issues (6 Críticos)                    |
| `http://localhost:5173/faq`         | (hereda título raíz)                      | Contenido HYROX activo, debe reescribirse |
| `http://localhost:5173/eventos`     | (hereda título raíz)                      | Sin contenido runluv                      |
| `http://localhost:5173/la-carrera`  | (hereda título raíz)                      | Sin contenido runluv                      |
| `http://localhost:5173/campeonatos` | (hereda título raíz)                      | Sin contenido runluv                      |

---

_Reporte generado por 5 agentes GEO especializados (geo-ai-visibility, geo-technical, geo-content, geo-schema, geo-platform-analysis) en sesión paralela el 2026-06-19._
