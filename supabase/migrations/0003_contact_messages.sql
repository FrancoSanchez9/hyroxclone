-- runluv® — mensajes del formulario de contacto
-- El form de /contacto hoy no persiste nada (routes/contacto.tsx:79 — TODO).
-- Mismo patrón de RLS que `leads`: insert público, lectura solo admin.
-- `status` permite al admin marcar qué ya atendió sin borrar el histórico.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'read', 'answered', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

create policy "contacto: insert público"
  on public.contact_messages for insert
  with check (true);

create policy "contacto: lectura solo admin"
  on public.contact_messages for select
  using (public.is_admin());

create policy "contacto: update solo admin"
  on public.contact_messages for update
  using (public.is_admin())
  with check (public.is_admin());
