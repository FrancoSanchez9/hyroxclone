# Plan de backend runluv® — de mock a producción

> Estado actual: el sitio (marketing, eventos, ranking, quiz, legales) está terminado y
> corre sobre **datos mock**. Ya existe un **esquema Supabase completo** en
> `supabase/migrations/` (events, orders, quiz_results, leads, RLS, vista `passport`)
> pero **el frontend no lo consume todavía**. Solo newsletter y quiz escriben a la DB.
>
> Objetivo: conectar el backend real en el orden correcto. Todo depende de **auth**.

Pasarela de pago elegida: **Stripe Payment Links / Checkout** (redirección hosteada,
sin formulario de tarjeta propio, sin PCI). MXN.

Proyecto Supabase: `nlhfbgyeyjfxhwthadpp`.

---

## Camino crítico

```
Fase 0  Migraciones aplicadas + env  ─┐
Fase 1  Auth real (Supabase)          │ desbloquea todo
Fase 2  Eventos leídos desde DB       │
Fase 3  CRUD admin de eventos         │
Fase 4  Pagos Stripe + webhook        │
Fase 5  Dashboard real (órdenes)      │
Fase 6  Formularios restantes         │
Fase 7  Analytics + rendimiento       ─┘
```

---

## Fase 0 — Base de datos y entorno · ~0.5 día

**Qué:**

- Aplicar `0001_init.sql` y `0002_quiz_lead_capture.sql` al proyecto Supabase.
- Añadir migración `0003` para la tabla `contact_messages` (hoy falta; `contacto.tsx:79`).
- Configurar `apps/website/.env` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_KEY` reales
  (publishable key — es pública por diseño, la seguridad la da RLS).
- Asignar `app_metadata.role='admin'` a tu usuario en el dashboard de Supabase.

**Entregable:** DB viva, `supabase` client no-null, sitio sigue funcionando.

**Riesgos:** ninguno — es aditivo, el sitio ya tolera `supabase = null`.

---

## Fase 1 — Autenticación real · ~1.5 días · 🔴 bloqueante

Hoy `src/lib/auth.ts` guarda una sesión falsa en `localStorage` y da rol admin a
cualquier email con la palabra "admin". Inseguro e incapaz de soportar órdenes reales.

**Qué:**

- Reescribir `src/lib/auth.ts` sobre `supabase.auth`:
  - `signInWithPassword`, `signInWithOAuth({ provider: 'google' })`, `signOut`.
  - `getSession()` async / hook `useSession()` que escuche `onAuthStateChange`.
  - `isAdmin()` leyendo `session.user.app_metadata.role`.
- Google OAuth real en `auth.login.tsx:29` (configurar provider en Supabase).
- `checkout.tsx`, `admin.tsx`, `dashboard.tsx` ya usan `getSession()/isAuthenticated()`
  → adaptarlos al nuevo contrato async.
- Los `beforeLoad` de `/admin` y `/dashboard` (hoy `ssr:false` + localStorage) siguen
  client-side, pero ahora validando la sesión real de Supabase.

**Entregable:** login/logout reales con Google y password, roles reales.

**Dependencias:** Fase 0.

---

## Fase 2 — Eventos desde la base de datos · ~1 día

Hoy los eventos son un array hardcodeado en `src/data/events.ts`; la tabla `events`
ya existe con lectura pública (RLS).

**Qué:**

- Crear `src/lib/events.ts`: `getEvents()`, `getEvent(id)` que leen de Supabase y
  mapean `snake_case` → el tipo `RunluvEvent`.
- Cargar eventos vía loader SSR de TanStack en `eventos.index.tsx`, `eventos.$eventId.tsx`,
  `UpcomingEventsSection`, `checkout.tsx`, `admin.tsx`, `dashboard.tsx`.
- `events.ts` (mock) queda como **seed**: script que inserta los eventos actuales en la DB.

**Entregable:** un evento nuevo/editado en la DB aparece en el sitio sin deploy.

**Dependencias:** Fase 0. (Independiente de auth para lectura.)

---

## Fase 3 — CRUD admin de eventos · ~2 días

Hoy `/admin` es solo-lectura con toasts "demo, no se guarda" (`admin.tsx:20`).

**Qué:**

- Formulario crear/editar evento (nombre, ciudad, fechas, precios `jsonb`, cupo,
  destacado, imagen, schedule). RLS ya restringe escritura a admin.
- Acciones: crear, editar, destacar (`featured`), agotar (`sold_out`), ajustar `spots_left`.
- Persistir el toggle de "Secciones visibles" (nueva tabla `site_sections` o `site_config`).
- Panel "Usuarios" leyendo de verdad (hoy `MOCK_USERS`); requiere una vista o RPC admin.
- Stats del "Resumen" (hoy hardcode `STATS`) desde conteos reales de `orders`/`events`.

**Entregable:** el admin gestiona el catálogo sin tocar código.

**Dependencias:** Fases 1 y 2.

---

## Fase 4 — Pagos con Stripe + webhook · ~2.5 días · 🔴 núcleo del negocio

Hoy el checkout es un formulario de tarjeta falso con `setTimeout` (`checkout.tsx:92`).
La tabla `orders` ya contempla `status`, `payment_provider`, `payment_ref`, `paid_at`.

**Qué (con Stripe Checkout / Payment Links, redirección hosteada):**

1. **Edge Function `create-checkout`** (Supabase): recibe evento/división/qty, crea la
   orden en `orders` con `status='pending'` (service key, bypassa RLS), crea una
   Stripe Checkout Session con `line_items` derivados del tier, y devuelve la URL.
2. **`checkout.tsx`**: quitar el formulario de tarjeta simulado. El paso "Pago" pasa a
   ser un botón "Pagar con Stripe" → redirige a la URL hosteada. Los datos (nombre,
   correo, teléfono) se capturan antes y viajan a la Edge Function.
3. **Edge Function `stripe-webhook`**: verifica la firma, escucha
   `checkout.session.completed` → marca la orden `paid`, guarda `payment_ref` y `paid_at`.
4. **Página de retorno** `/checkout/success` y `/checkout/cancel` (Stripe redirige aquí).
   La confirmación real la da el webhook, no el navegador.
5. Secrets de Stripe como env de las Edge Functions (nunca en el front).

**Entregable:** cobro real, orden confirmada por webhook, boleto asociado al usuario.

**Dependencias:** Fases 1 y 2. Requiere cuenta Stripe (MXN) + Supabase Edge Functions
(hoy **no hay ninguna** — se crea el directorio `supabase/functions/`).

---

## Fase 5 — Dashboard real del corredor · ~1 día

Hoy `dashboard.tsx` muestra "0 sellos" y ningún historial (`dashboard.tsx:27,195`).

**Qué:**

- Leer las `orders` del usuario (RLS ya filtra "cada quien las suyas").
- Mostrar inscripciones y el **pasaporte "5 Circuitos"** desde la vista `passport`.
- Descarga/visualización del boleto por orden.

**Entregable:** el corredor ve lo que compró y su progreso real.

**Dependencias:** Fases 1 y 4.

---

## Fase 6 — Formularios restantes · ~1 día

- **Contacto** (`contacto.tsx:79`, `// TODO`) → insertar en `contact_messages` (migración Fase 0).
- **Voluntario** (`VolunteerFormSection.tsx`, solo toast) → tabla `volunteer_applications`.
- **Afiliaciones** (`ApplicationFormSection.tsx:67`, `setTimeout`) → tabla `gym_applications`.
- Reglas RLS: insert público, lectura solo admin (patrón ya usado en `leads`).
- Opcional: notificación por email al admin (Edge Function + Resend).

**Entregable:** ningún formulario se pierde en el vacío.

**Dependencias:** Fase 0.

---

## Fase 7 — Analytics y rendimiento · ~1 día

- **Analytics** (`analytics.ts:35`, `// TODO`): `trackEvent` no envía nada. Integrar
  Plausible/PostHog/GA4 (varios eventos ya están instrumentados, ej. `checkout_completed`).
- **Rendimiento:**
  - Auditar imágenes del hero y eventos (formato/tamaño; ya hay `.webp`).
  - Revisar peso de `framer-motion` y lazy-load de secciones below-the-fold.
  - Correr `vp check` + `vp test` + `npx react-doctor` y resolver hallazgos.
  - Lighthouse/Core Web Vitals (INP) sobre las rutas SSR clave.

**Entregable:** métricas de negocio visibles + web rápida y auditada.

---

## Resumen de esfuerzo

| Fase | Área                    | Estimación     | Bloqueante |
| ---- | ----------------------- | -------------- | :--------: |
| 0    | DB + entorno            | 0.5 d          |     🔴     |
| 1    | Auth Supabase           | 1.5 d          |     🔴     |
| 2    | Eventos desde DB        | 1 d            |            |
| 3    | CRUD admin              | 2 d            |            |
| 4    | Pagos Stripe + webhook  | 2.5 d          |     🔴     |
| 5    | Dashboard real          | 1 d            |            |
| 6    | Formularios             | 1 d            |            |
| 7    | Analytics + rendimiento | 1 d            |            |
|      | **Total**               | **~10.5 días** |            |

MVP transaccional mínimo (vender de verdad): **Fases 0 → 1 → 2 → 4** (~5.5 días).
