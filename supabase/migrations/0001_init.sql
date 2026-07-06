-- runluv® — esquema inicial
-- Cubre: CRUD de eventos, compras, resultados del cuestionario, leads.
-- Auth la maneja Supabase (auth.users). El rol admin vive en
-- app_metadata.role = 'admin' (se asigna una vez en el dashboard de Supabase).
-- ponytail: 4 tablas. profiles/event_prices/results/form_submissions se
-- agregan cuando exista el caso de uso que las lea.

-- ── Helper: ¿el JWT trae rol admin? ─────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;

-- ── 1. events — el admin gestiona esto desde /admin ─────────────────────────
create table public.events (
  id text primary key, -- slug, ej. 'puebla-2027'
  name text not null,
  city text not null,
  venue text not null,
  address text,
  date date not null,
  end_date date,
  country text not null default 'México',
  categories text[] not null default '{}',
  -- [{ "label": "Early Bird", "price": 899, "available": true, "note": "..." }]
  prices jsonb not null default '[]',
  currency text not null default 'MXN',
  image_url text,
  tagline text,
  about text,
  description text[],
  schedule jsonb, -- [{ "day": "...", "waves": [{ "time": "...", "label": "..." }] }]
  spots_left int,
  sold_out boolean not null default false,
  featured boolean not null default false,
  maps_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "events: lectura pública"
  on public.events for select
  using (true);

create policy "events: escritura solo admin"
  on public.events for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── 2. orders — compras (evento individual o pase de temporada) ─────────────
-- El pase de temporada es un event_id más ('pase-temporada-2027').
-- unit_price/total son snapshot del precio cobrado: los tiers cambian, la orden no.
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id), -- null = compra como invitado
  email text not null,
  name text not null,
  phone text,
  event_id text not null references public.events (id),
  division text,
  category text,
  qty int not null check (qty > 0),
  tier_label text, -- 'Early Bird' | 'Regular' | ...
  unit_price numeric not null check (unit_price >= 0),
  total numeric not null check (total >= 0),
  currency text not null default 'MXN',
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'cancelled', 'refunded')),
  payment_provider text, -- 'mercadopago' | 'stripe'
  payment_ref text, -- id de la transacción en el PSP
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index orders_user_id_idx on public.orders (user_id);
create index orders_event_id_idx on public.orders (event_id);

alter table public.orders enable row level security;

-- Sin policy de insert/update para clientes: las órdenes las crea y actualiza
-- el webhook del pago con la service key (bypassa RLS). El navegador solo lee.
create policy "orders: cada quien lee las suyas"
  on public.orders for select
  using (user_id = auth.uid() or public.is_admin());

-- ── 3. quiz_results — brújula runluv® ───────────────────────────────────────
-- Direcciones como columnas (no jsonb) para poder consultar
-- "cuántos Incansables tengo" sin desempacar json.
create table public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id), -- null = anónimo
  email text,
  descubrir int not null check (descubrir between 0 and 100),
  resistir int not null check (resistir between 0 and 100),
  superarte int not null check (superarte between 0 and 100),
  competir int not null check (competir between 0 and 100),
  compartir int not null check (compartir between 0 and 100),
  nivel int not null check (nivel between 1 and 5),
  nivel_pct numeric not null check (nivel_pct between 0 and 100),
  archetype text not null,
  recommended_modality text not null,
  affinities jsonb, -- [{ "modality": "CPC", "affinity": 92 }, ...]
  created_at timestamptz not null default now()
);

create index quiz_results_user_id_idx on public.quiz_results (user_id);

alter table public.quiz_results enable row level security;

create policy "quiz: cualquiera puede guardar su resultado"
  on public.quiz_results for insert
  with check (user_id is null or user_id = auth.uid());

create policy "quiz: cada quien lee los suyos"
  on public.quiz_results for select
  using (user_id = auth.uid() or public.is_admin());

-- ── 4. leads — emails capturados (newsletter, quiz de invitados, contacto) ──
create table public.leads (
  email text primary key,
  source text not null, -- 'newsletter' | 'quiz' | 'contacto'
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "leads: insert público"
  on public.leads for insert
  with check (true);

create policy "leads: lectura solo admin"
  on public.leads for select
  using (public.is_admin());

-- ── Vista: pasaporte "5 Circuitos" (no es tabla — se deriva de orders) ──────
-- security_invoker: la vista respeta el RLS de orders (sin esto expondría
-- las órdenes de todos).
create or replace view public.passport
with (security_invoker = true) as
select user_id, event_id, min(paid_at) as stamped_at
from public.orders
where status = 'paid' and user_id is not null
group by user_id, event_id;
