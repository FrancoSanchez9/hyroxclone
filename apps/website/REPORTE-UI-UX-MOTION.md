# Reporte de Auditoría — UI/UX + Motion Performance

Proyecto: `apps/website` (runluv) · React + TanStack Router + Vite + Tailwind v4 + Framer Motion
Skills aplicadas: `fixing-motion-performance` · `ui-ux-pro-max`
Fecha: 2026-06-20

---

## Resumen ejecutivo

La base está **bien construida**: las animaciones usan casi siempre `transform`/`opacity` (compositor-friendly), los reveals tienen stagger y easing correctos, los botones usan `scale` en vez de mover layout, y el marquee usa `translateX` en lugar de JS de scroll. El trabajo de motion es sólido.

Los problemas reales son **3 sistémicos** y varios de pulido:

1. **`prefers-reduced-motion` no se respeta en ningún sitio** (accesibilidad CRÍTICA).
2. **Inconsistencia de marca**: morado `#a855f7` en vivo vs amarillo `#e5f93a`/`yellow-400` heredado de HYROX en componentes muertos y en los badges de páginas internas.
3. **Contraste de texto insuficiente**: uso masivo de `text-white/30–45` sobre fondos casi negros → por debajo de WCAG AA (4.5:1).

| Severidad  | Cantidad | Categorías                                                                           |
| ---------- | -------- | ------------------------------------------------------------------------------------ |
| 🔴 Crítico | 3        | Reduced-motion, contraste, marca                                                     |
| 🟠 Alto    | 5        | LCP image, tokens, focus, dvh, dead code                                             |
| 🟡 Medio   | 6        | transition-all, backdrop-filter, fuentes, iconos unicode, tap targets, enlaces rotos |
| 🟢 Bajo    | varios   | DRY, CSS muerto, tabular-nums                                                        |

---

## 🔴 CRÍTICO

### C1 · `prefers-reduced-motion` ignorado en toda la app

**Regla:** ux `reduced-motion` · motion §a11y
**Dónde:** todas las secciones con `framer-motion`, `StatsSection` (count-up), `SponsorsBanner` (marquee infinito), `globals.css:31` (`scroll-behavior: smooth`).
**Por qué importa:** usuarios con sensibilidad vestibular o `Reduce Motion` activado siguen recibiendo todas las entradas, el contador animado y el marquee infinito. Es requisito WCAG 2.3.3.
**Fix concreto:**

- Envolver el árbol en `<MotionConfig reducedMotion="user">` (en `__root.tsx`). Framer-motion entonces neutraliza automáticamente `x/y/scale` y deja solo opacidad.
- Para el marquee CSS y el `scroll-behavior`, añadir en `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### C2 · Contraste de texto por debajo de AA

**Regla:** ux `color-contrast` (4.5:1 texto normal)
**Dónde (ejemplos):**

- `ImpactoSection.tsx:83` `text-white/40`, `ModeloSection.tsx:189` `text-white/35`, `CategoriasSection.tsx:90` `text-white/45`, `CTASection.tsx:54` `text-white/50`, `HeroSection.tsx:153` `text-white/40`.
  **Por qué importa:** blanco al 35–45 % sobre `#060608`/`#0f0f14` da ~3.0–3.8:1, insuficiente para texto pequeño (muchos de estos son labels de 11–12px en mayúsculas, el peor caso de legibilidad).
  **Fix concreto:** subir el piso a `text-white/60` para texto secundario y `text-white/70` para descripciones de cuerpo; nunca bajar de `/55` en texto informativo. Verificar pares con un checker de contraste.

### C3 · Color de marca inconsistente (morado vs amarillo HYROX)

**Regla:** style `consistency` / `dark-mode-pairing` · token-driven theming
**Dónde:**

- En vivo (correcto): morado `#a855f7` en todas las secciones del home.
- Fuga de amarillo HYROX: `Card.tsx:17,18` (`#e5f93a`), `PageHero.tsx:34` (`bg-yellow-400 text-black`) — **y PageHero SÍ se usa** en páginas internas (eventos, faq, tienda, contacto). Resultado: home morado, badges de páginas internas amarillos.
- `StatsSection.tsx` y `SponsorsBanner.tsx` también traen amarillo + copy viejo, pero están muertos (ver A5).
  **Fix concreto:** reemplazar `#e5f93a`/`yellow-400`/`text-black` por los tokens morados (`--color-rl-purple`). En `PageHero` el badge debería ser `bg-rl-purple text-white` o un morado translúcido.

---

## 🟠 ALTO

### A1 · Imagen LCP del Hero sin optimizar

**Regla:** ux `image-optimization` / `image-dimension`
**Dónde:** `HeroSection.tsx:27`

```
src="https://images.unsplash.com/...?w=1920&q=80" loading="eager"
```

**Por qué importa:** es el elemento LCP. Se sirve 1920px a todos los dispositivos, desde un **dominio externo** (conexión extra), sin `srcset/sizes`, sin `width/height`, sin `preload`. Penaliza LCP en móvil.
**Fix:** auto-alojar la imagen (o CDN propio con AVIF/WebP), añadir `srcset`+`sizes` responsivos, `<link rel="preload" as="image">` en `index.html`, y `width/height` o `aspect-ratio`.

### A2 · Sin tokens de diseño — hex hardcodeados en todo el árbol

**Regla:** color `color-semantic` (tokens, no hex crudo en componentes)
**Dónde:** `globals.css:3-14` define `--color-rl-*`, pero los componentes usan `style={{ background: "#16161f" }}`, `text-[#a855f7]`, `border-[#2a2a3a]` ~decenas de veces.
**Por qué importa:** es exactamente la causa de C3 (el amarillo se quedó porque no hay una sola fuente de verdad). Imposible hacer theming o dark/light sin tocar 12 archivos.
**Fix:** migrar a las clases de token Tailwind (`bg-rl-card`, `text-rl-purple`, `border-rl-border`). Ya están definidas en `@theme`, solo no se usan.

### A3 · Botones/enlaces sin `focus-visible`

**Regla:** ux `focus-states` (anillo visible 2–4px)
**Dónde:** los `<a>` artesanales de `HeroSection.tsx:107-118`, `Navbar.tsx:62-84`, `CTASection.tsx:63-76`. El componente `Button.tsx:40` **sí** tiene anillo — pero los CTAs principales no lo usan.
**Fix:** añadir `focus-visible:ring-2 focus-visible:ring-[#a855f7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060608]` a esos enlaces, o convertirlos a `<Button as="a">`.

### A4 · Hero usa `min-h-screen` (100vh) en móvil

**Regla:** layout `viewport-units` (preferir `dvh`)
**Dónde:** `HeroSection.tsx:21` `min-h-screen`.
**Por qué importa:** en móvil `100vh` no descuenta la barra del navegador → la _stats strip_ (`absolute bottom-0`) queda parcialmente oculta bajo el chrome del navegador. El Drawer del Navbar ya usa `90dvh` correctamente, pero el Hero no.
**Fix:** `min-h-dvh` (o `min-h-[100dvh]`).

### A5 · Componentes muertos con copy y marca de HYROX

**Regla:** style `consistency`
**Dónde:** `StatsSection.tsx` y `SponsorsBanner.tsx` no se importan en ninguna ruta. Contienen amarillo `#e5f93a` y texto antiguo ("Gimnasios Afiliados Worldwide", "8 Estaciones Funcionales", "competencia diseñada para todos"). También `src/style.css` es boilerplate del template Vite (light mode) y no se importa.
**Fix:** eliminar `style.css`; eliminar o rebrandear `StatsSection`/`SponsorsBanner` antes de reutilizarlos.

---

## 🟡 MEDIO

### M1 · `transition-all` en superficies que togglean filtros pesados

**Regla:** motion §2/§7 `transform-performance` / blur
**Dónde:** `Navbar.tsx:22` (`transition-all duration-200` sobre un header que al hacer scroll añade `backdrop-filter: blur(14px)`), `HeroSection.tsx:115` y `CTASection.tsx:72` (`transition-all`).
**Por qué importa:** `transition-all` intenta animar `backdrop-filter` y `background-color` → trabajo de paint/composite innecesario al cruzar el umbral de scroll. Animar blur es caro.
**Fix:** ser explícito: `transition-[background-color,box-shadow]` en el Navbar y `transition-[border-color,background-color]` en los botones outline. No transicionar el `backdrop-filter` (que aparezca de golpe).

### M2 · Listener de scroll en Navbar

**Regla:** motion §4 (no animar desde eventos de scroll) / ux `debounce-throttle`
**Dónde:** `Navbar.tsx:13-17`
**Estado:** aceptable (solo togglea un booleano de umbral y React descarta el re-render si no cambia), pero dispara en cada frame de scroll.
**Fix opcional:** usar un sentinel + `IntersectionObserver` en lugar del listener, o un guard `if (next !== scrolled)`.

### M3 · Marquee infinito no se pausa fuera de viewport

**Regla:** motion §4 (pausar off-screen) — aplica si se reactiva `SponsorsBanner`
**Dónde:** `SponsorsBanner.tsx:20`
**Por qué importa:** la animación `30s linear infinite` sigue corriendo aunque la sección no esté visible; el pause solo ocurre con `mouseenter` (no teclado, no reduced-motion).
**Fix:** `IntersectionObserver` para `animationPlayState`, y respetar reduced-motion.

### M4 · Iconos como caracteres Unicode geométricos

**Regla:** style `no-emoji-icons` (vectores SVG, no glifos de fuente)
**Dónde:** `CategoriasSection.tsx:10,15,20,25,30` (`○ ◆ ⊕ ◈ ▣`).
**Por qué importa:** son glifos dependientes de fuente; renderizan distinto según plataforma y no se controlan con tokens. Están `aria-hidden` (bien) pero rompen la consistencia visual (el resto del sitio usa SVG de stroke 1.5 / Lucide).
**Fix:** sustituir por iconos Lucide o SVG inline con el mismo `stroke-width` del resto.

### M5 · Tap targets de la nav desktop < 44px

**Regla:** ux `touch-target-size`
**Dónde:** `Navbar.tsx:66` enlaces `px-3 py-2 text-sm` (~32–36px de alto). El drawer móvil (`px-6 py-4`) está bien.
**Fix:** subir a `py-3` mínimo en los enlaces tocables, o ampliar el área con padding/`min-h`.

### M6 · Enlace "Descarga dossier" apunta a `/`

**Regla:** ux (enlace funcional / `error-recovery`)
**Dónde:** `CTASection.tsx:71` `href="/"`.
**Por qué importa:** un CTA secundario que promete un dossier lleva al home — confunde y rompe expectativa.
**Fix:** enlazar al PDF real, o cambiar el texto/ocultarlo hasta que exista.

---

## 🟢 BAJO / Pulido

- **DRY tipografía:** `fontFamily: "'Bebas Neue'"` inline ~30 veces. Ya existe `.text-display` y `--font-display` en `globals.css`. Usar la utilidad.
- **Count-up sin `tabular-nums`:** `StatsSection.tsx:47` — al animar `0 → 5,000` el ancho del número cambia cada frame (reflow del span). Añadir `font-variant-numeric: tabular-nums` (regla `number-tabular`). (Solo si se reactiva el componente.)
- **Doble `<h2>` para un mismo título visual:** `DiferenciadorSection.tsx:35-54` — semánticamente son dos h2 para un encabezado. Considerar `<h2>` + `<span>`.
- **`scroll-behavior: smooth` global** debería ir bajo `prefers-reduced-motion` (incluido en el fix de C1).
- **Preload de fuente crítica:** Bebas Neue alimenta el h1 LCP pero se carga vía Google Fonts render-blocking. Considerar `preload` del woff2 o auto-alojar con `size-adjust` fallback para reducir CLS al hacer swap.

---

## Lo que ya está BIEN (no tocar)

- ✅ Animaciones basadas en `transform`/`opacity` (no layout).
- ✅ Botones con `scale` + `@media(hover:hover)` para no romper en touch.
- ✅ Marquee con `translateX` (no JS de scrollTop).
- ✅ Count-up que escribe `textContent` (no anima layout) y usa `useInView({ once: true })`.
- ✅ `AnimatePresence` correcto en el CookieBanner con exit `translateY`.
- ✅ Stagger 70–120ms y easing ease-out: dentro de las guías de Material/HIG.
- ✅ `font-display: swap` + `preconnect` a Google Fonts.
- ✅ Drawer móvil con `90dvh`, handle visible y cierre accesible.

---

## Plan sugerido (orden de impacto/esfuerzo)

1. **C1** `<MotionConfig reducedMotion="user">` + bloque CSS reduced-motion → 1 archivo, arregla accesibilidad global.
2. **C3 + A2** migrar amarillo→morado vía tokens (`PageHero`, `Card`) → cierra la inconsistencia de marca.
3. **C2** subir contrastes `text-white/30–45` → `/60–70`.
4. **A5** borrar código muerto (`style.css`, `StatsSection`, `SponsorsBanner`).
5. **A1** optimizar imagen LCP del Hero (srcset + preload + self-host).
6. **A3 / A4 / M1–M6** pulido de focus, `dvh`, `transition-*` explícitas y enlace del dossier.
