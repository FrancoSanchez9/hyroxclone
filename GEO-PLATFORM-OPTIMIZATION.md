# GEO Platform Optimization Report — runluv.mx

Fecha: 2026-07-07
Proyecto analizado: `apps/website` (Vite + React + TanStack Router, SPA)

## Resumen ejecutivo (léelo primero)

Tu sitio tiene una **base técnica de GEO excelente en el `<head>`** (schema JSON-LD completo, `llms.txt`, `robots.txt` que permite todos los bots de IA, sitemap, meta por ruta) — pero dos problemas transversales tumban casi todas las puntuaciones:

1. **🔴 CRÍTICO — Renderizado 100% del lado del cliente.** El HTML compilado (`dist/index.html`) entrega un `<div id="root"></div>` **vacío**. No hay SSR, SSG ni prerender. Los crawlers de IA que **no ejecutan JavaScript** (ChatGPTBot/Bing, PerplexityBot, la mayoría) ven solo el `<head>`: tu contenido real (FAQ, modalidades, eventos, 46 `<h2>` + 31 `<h3>` de contenido) es **invisible** para ellos. Este es, de lejos, el mayor freno.
2. **🟠 Presencia de entidad nula (marca pre-lanzamiento).** Temporada 2027, sin Wikipedia, Wikidata, backlinks autoritativos, Reddit, YouTube consolidado ni Knowledge Panel. ChatGPT, Perplexity y Gemini se apoyan fuertemente en estas señales off-site.

Además, hay una **inconsistencia de identidad**: `llms.txt` describe runluv como plataforma **B2G para gobiernos**, mientras que `index.html` y la FAQ lo describen como **experiencia de running para consumidores**. Debes decidir cuál es la entidad canónica.

## Overall Platform Readiness

- **Combined GEO Score: 29/100** (promedio de las 5 plataformas) — **Débil**

## Platform Scores

| Platform            | Score  | Status            |
| ------------------- | ------ | ----------------- |
| Google AI Overviews | 50/100 | Moderate (límite) |
| ChatGPT Web Search  | 10/100 | Weak              |
| Perplexity AI       | 21/100 | Weak              |
| Google Gemini       | 30/100 | Weak              |
| Bing Copilot        | 33/100 | Weak              |

_Umbrales: Strong = 70+, Moderate = 40–69, Weak = 0–39_

**Patrón clave:** Google AIO y Gemini usan la infraestructura de Google, que **sí renderiza JS**, por eso puntúan más alto. ChatGPT, Perplexity y Copilot dependen de índices (Bing) y crawlers que **no renderizan de forma fiable** → tu SPA los deja casi ciegos.

---

## Platform Details

### Google AI Overviews — 50/100 (Moderate)

Google renderiza JS, así que puede leer tu contenido; el techo lo pone que **la marca aún no rankea** (no lanzada) y faltan señales de frescura/autoría.

| Criterio                                | Pts   | Nota                                                    |
| --------------------------------------- | ----- | ------------------------------------------------------- |
| Rankea top 10 en queries objetivo       | 0/20  | Sitio no lanzado, sin ranking                           |
| Encabezados en forma de pregunta        | 8/10  | FAQ + FAQPage schema sólidos                            |
| Respuesta directa tras el encabezado    | 12/15 | Respuestas FAQ concisas y directas                      |
| Tablas para datos comparables           | 5/10  | Hay `PlansTableSection`/métricas; parcial               |
| Listas para procesos/features           | 8/10  | Modalidades y categorías en listas                      |
| FAQ con 5+ preguntas                    | 10/10 | Múltiples categorías de FAQ                             |
| Estadísticas con fuente citada          | 3/10  | Hay cifras (7x ROI, 3–5k corredores) **sin atribución** |
| Fecha publicación/actualización visible | 2/5   | Solo `lastmod` en sitemap, no visible en página         |
| Autor con credenciales                  | 0/5   | Sin byline ni página de autor                           |
| URL + jerarquía de encabezados limpia   | 4/5   | H1>H2>H3 correcto                                       |

**Acciones:** añadir fecha visible "Actualizado: …", atribuir cada estadística ("Según [fuente], …"), añadir página de autor/organización con credenciales.

### ChatGPT Web Search — 10/100 (Weak)

ChatGPT usa el índice de **Bing** + reconocimiento de entidad. Sin JS-render en Bing, sin entidad → casi cero.

| Criterio                                   | Pts  | Nota                                                      |
| ------------------------------------------ | ---- | --------------------------------------------------------- |
| Artículo de Wikipedia                      | 0/20 | No existe                                                 |
| Entidad Wikidata (5+ props)                | 0/10 | No existe                                                 |
| Cobertura en índice de Bing                | 0/10 | No indexado / no lanzado                                  |
| Menciones en Reddit                        | 0/10 | Ninguna                                                   |
| Canal de YouTube con contenido             | 0/10 | `sameAs` declara `@runluv` pero sin contenido verificable |
| Backlinks autoritativos (.edu/.gov/prensa) | 0/15 | Ninguno                                                   |
| Consistencia de entidad                    | 5/10 | **Discrepancia B2G vs consumidor**                        |
| Contenido exhaustivo (2000+ palabras)      | 5/10 | Existe pero renderizado por JS (Bing no lo verá)          |
| Bing Webmaster Tools                       | 0/5  | Sin evidencia de configuración                            |

**Acciones:** crear entidad en **Wikidata** (rápido, alta palanca), verificar **Bing Webmaster Tools**, resolver la inconsistencia B2G/consumidor, y —lo más importante— **hacer el contenido visible sin JS** (ver Plan).

### Perplexity AI — 21/100 (Weak)

Perplexity prioriza **validación comunitaria** (Reddit 46.7% de sus citas) y frescura. Tienes contenido fresco pero cero huella comunitaria.

| Criterio                       | Pts  | Nota                                                                          |
| ------------------------------ | ---- | ----------------------------------------------------------------------------- |
| Presencia activa en Reddit     | 0/20 | Ninguna                                                                       |
| Foros (HN/SO/Quora)            | 0/10 | Ninguno                                                                       |
| Frescura (< 6 meses)           | 5/10 | Contenido nuevo pero **sin fecha visible on-page**                            |
| Investigación/datos originales | 5/15 | Métricas de impacto podrían ser dato original **pero sin metodología/fuente** |
| YouTube con transcripciones    | 0/10 | No                                                                            |
| Párrafos citables autónomos    | 6/10 | FAQ y `llms.txt` son citables                                                 |
| Validación multi-fuente        | 0/10 | Afirmaciones sin respaldo externo                                             |
| Contenido que genera discusión | 0/10 | Sin engagement                                                                |
| Wikipedia/Wikidata             | 0/5  | Ninguna                                                                       |

**Acciones:** publicar las métricas de impacto como **estudio original con metodología** (activo citable), sembrar presencia auténtica en subreddits de running MX, mostrar fechas visibles.

### Google Gemini — 30/100 (Weak)

Tu **schema es tu mayor fortaleza aquí** — Gemini consume Schema.org agresivamente. Lo frena la ausencia de YouTube (que Gemini pondera más que nadie), Knowledge Panel y ecosistema Google.

| Criterio                              | Pts   | Nota                                                             |
| ------------------------------------- | ----- | ---------------------------------------------------------------- |
| Google Knowledge Panel                | 0/15  | No existe                                                        |
| Google Business Profile               | 0/10  | No aplica del todo (modelo B2G/eventos)                          |
| YouTube con capítulos                 | 0/20  | Canal declarado en `sameAs`, sin contenido verificable           |
| Schema.org estructurado               | 15/15 | ✅ Organization + WebSite + FAQPage + WebPage/Speakable + sameAs |
| Ecosistema Google (Scholar/News/Maps) | 0/10  | Ninguno                                                          |
| Optimización de imágenes              | 7/10  | WebP + responsive + alt presente; imágenes **stock (Unsplash)**  |
| E-E-A-T (autor/about/editorial)       | 3/10  | Falta autor y política editorial                                 |
| Merchant Center                       | N/A   | No e-commerce                                                    |
| Contenido multimodal                  | 3/5   | Texto + imágenes; falta video                                    |

**Acciones:** crear **canal de YouTube real** con contenido por modalidad (mayor palanca en Gemini), reclamar Knowledge Panel vía Wikidata + GBP, sustituir imágenes stock por media original con alt descriptivo.

### Bing Copilot — 33/100 (Weak)

Comparte índice Bing con ChatGPT pero premia **IndexNow**, meta descriptions y LinkedIn. Ganancias rápidas disponibles aquí.

| Criterio                                | Pts  | Nota                                                                         |
| --------------------------------------- | ---- | ---------------------------------------------------------------------------- |
| Bing WMT verificado + sitemap           | 5/15 | Sitemap existe; WMT sin verificar                                            |
| Protocolo IndexNow                      | 0/15 | No implementado                                                              |
| Cobertura en índice de Bing             | 0/10 | No indexado                                                                  |
| Página de empresa LinkedIn              | 5/10 | Declarada en `sameAs`, verificar que esté completa                           |
| GitHub                                  | N/A  | No aplica                                                                    |
| Meta descriptions optimizadas           | 8/10 | index.html fuerte + meta en 18/24 rutas                                      |
| Señales sociales                        | 2/10 | Marca nueva                                                                  |
| Keywords exactas en títulos/encabezados | 7/10 | Títulos ricos en keywords                                                    |
| Velocidad < 2s                          | 5/10 | SPA React + framer-motion; fuentes precargadas y WebP ayudan, pero JS pesado |
| Bing Places                             | N/A  | Modelo B2G                                                                   |

**Acciones:** verificar **Bing Webmaster Tools** + enviar sitemap (rápido), implementar **IndexNow**, completar LinkedIn de empresa.

---

## Prioritized Action Plan

### 🔴 Bloqueante (hazlo primero — desbloquea 4 de 5 plataformas)

1. **Renderizar el contenido sin depender de JS.** Opciones, de menor a mayor esfuerzo:
   - **Prerender/SSG** de las rutas públicas (index, eventos, la-carrera, faq, campeonatos, preparacion, tu-nivel, gimnasios, afiliaciones, voluntario). Con TanStack Router puedes migrar a **TanStack Start (SSR/SSG)** o añadir un paso de prerender estático en el build. Este único cambio hace visible todo tu contenido a Bing/ChatGPT/Perplexity/Copilot.
   - Como parche mínimo: inyectar en `index.html` el texto clave (qué es runluv, modalidades, FAQ) como HTML estático, no solo como JSON-LD. Hoy el `<body>` compilado está vacío.

### ⚡ Quick Wins (esta semana — bajo esfuerzo, multi-plataforma)

2. **Resolver la inconsistencia de entidad** entre `llms.txt` (B2G/gobiernos) e `index.html`/FAQ (consumidor). Elige la narrativa canónica y alinéala en ambos. Afecta ChatGPT + Gemini + Perplexity.
3. **Crear el `og-image.jpg` faltante** (referenciado en `index.html` pero devuelve 404). Genera 1200×630.
4. **Crear entidad en Wikidata** con: instance of, official website, `sameAs` (mismos que el schema), país (MX), fecha de fundación. Palanca alta para ChatGPT/Gemini, esfuerzo bajo.
5. **Verificar Bing Webmaster Tools** y enviar `sitemap.xml`. Verificar Google Search Console.
6. **Añadir fechas visibles** ("Publicado / Actualizado") en páginas de contenido — Perplexity y AIO las premian.
7. **Atribuir las estadísticas** ("Según [fuente], 7x de retorno…") — mejora AIO y validación en Perplexity.

### 🛠 Medio plazo (este mes)

8. **Implementar IndexNow** (clave en `/.well-known/` + ping al publicar) — 15 pts directos en Copilot.
9. **Lanzar canal de YouTube real** con un video por modalidad (La Última Vuelta, Endurance 4H, 5K/10K) con capítulos y descripción con URL — mayor palanca única en Gemini, ayuda a todas.
10. **Página de autor/organización con E-E-A-T**: quién organiza runluv, credenciales, política editorial, enlaces `sameAs`.
11. **Sustituir imágenes stock (Unsplash) por media original** de eventos/entrenamientos con `alt` descriptivo — originalidad para Gemini/Perplexity.
12. **Publicar las métricas de impacto como estudio con metodología** (activo original y citable para Perplexity/AIO).

### 🎯 Estratégico (este trimestre — construcción de entidad)

13. **Evaluar notabilidad para Wikipedia** una vez lanzada la temporada 2027 (cobertura de prensa mexicana como fuente).
14. **Presencia comunitaria auténtica** en subreddits de running/fitness MX y foros — palanca #1 de Perplexity.
15. **Conseguir backlinks autoritativos**: prensa deportiva, federaciones, gobiernos municipales sede (dado el modelo B2G, los `.gob.mx` de las sedes son backlinks de altísimo valor).
16. **Completar LinkedIn de empresa** y publicar con regularidad (indexado por Copilot).

---

## Fortalezas ya presentes (no tocar, mantener)

- ✅ JSON-LD completo y bien formado: Organization, WebSite, FAQPage, WebPage + Speakable, `sameAs`×4.
- ✅ `robots.txt` permite explícitamente GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Amazonbot, Applebot-Extended.
- ✅ `llms.txt` presente y bien estructurado.
- ✅ `sitemap.xml` con prioridades y `lastmod`.
- ✅ Meta/OG/Twitter/canonical por ruta (18/24 rutas con `head:`).
- ✅ Jerarquía de encabezados sana (10 `<h1>`, 46 `<h2>`, 31 `<h3>`) y buena cobertura de `alt`.
- ✅ WebP responsive + fuentes self-hosted precargadas.
