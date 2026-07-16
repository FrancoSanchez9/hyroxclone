-- runluv® — endurece is_admin()
-- El linter de Supabase marca `function_search_path_mutable`: sin un search_path
-- fijo, la resolución de nombres dentro de la función depende del search_path de
-- quien la llama. Como is_admin() es la que gobierna TODAS las políticas de
-- escritura de admin (events, leads, contact_messages), conviene fijarlo.
--
-- search_path = '' obliga a calificar todo con su schema; auth.jwt() ya lo está.

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;
