-- Safe, additive upgrade for the already-live Lucky FX Studio database.
-- Run once in Supabase Dashboard > SQL Editor. Existing projects, messages,
-- authentication users, storage buckets, and media are not modified.

create table if not exists public.site_settings (
  id text primary key default 'site' check (id = 'site'),
  instagram_url text check (
    instagram_url is null
    or instagram_url ~* '^https://([a-z0-9-]+\.)?instagram\.com/'
  ),
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

insert into public.site_settings (id, instagram_url)
values ('site', null)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_settings'
      and policyname = 'Public reads site settings'
  ) then
    create policy "Public reads site settings"
      on public.site_settings for select
      to anon, authenticated
      using (id = 'site');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_settings'
      and policyname = 'Admins insert site settings'
  ) then
    create policy "Admins insert site settings"
      on public.site_settings for insert
      to authenticated
      with check (id = 'site');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'site_settings'
      and policyname = 'Admins update site settings'
  ) then
    create policy "Admins update site settings"
      on public.site_settings for update
      to authenticated
      using (id = 'site')
      with check (id = 'site');
  end if;
end $$;
