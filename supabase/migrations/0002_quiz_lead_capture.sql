-- runluv® — nombre en el cuestionario
-- Antes de revelar el resultado, el quiz pide cómo quiere que le llamen. Ese
-- nombre personaliza la imagen para compartir y se guarda con el resultado
-- (anónimo — sin email). Columna nullable → compatible con lo existente.

alter table public.quiz_results
  add column if not exists name text;
