-- Run in Supabase SQL Editor, then create an admin user in Authentication.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Untitled work' check (char_length(title) <= 120),
  description text not null default '' check (char_length(description) <= 2000),
  category text not null default 'Reels' check (char_length(category) <= 80),
  tags text[] not null default '{}',
  media_type text not null check (media_type in ('image','video')),
  media_url text not null,
  media_path text not null,
  poster_url text,
  poster_path text,
  featured boolean not null default false,
  hero_media boolean not null default false,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create policy "Public reads published work" on public.projects for select using (published or auth.role() = 'authenticated');
create policy "Admins insert work" on public.projects for insert to authenticated with check (true);
create policy "Admins update work" on public.projects for update to authenticated using (true) with check (true);
create policy "Admins delete work" on public.projects for delete to authenticated using (true);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  phone text check (char_length(phone) <= 40),
  service text check (char_length(service) <= 100),
  message text not null check (char_length(message) between 10 and 3000),
  status text not null default 'new' check (status in ('new','read','replied')),
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "Visitors send enquiries" on public.contact_messages for insert to anon with check (true);
create policy "Admins read enquiries" on public.contact_messages for select to authenticated using (true);
create policy "Admins update enquiries" on public.contact_messages for update to authenticated using (true) with check (true);
create policy "Admins delete enquiries" on public.contact_messages for delete to authenticated using (true);

-- Safe upgrades for installations created with an earlier schema version.
alter table public.projects add column if not exists hero_media boolean not null default false;
alter table public.contact_messages add column if not exists status text not null default 'new';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media','portfolio-media',true,524288000,array['image/jpeg','image/png','image/webp','video/mp4','video/webm'])
on conflict (id) do update set public=true, file_size_limit=excluded.file_size_limit, allowed_mime_types=excluded.allowed_mime_types;
create policy "Public reads portfolio media" on storage.objects for select using (bucket_id='portfolio-media');
create policy "Admins upload portfolio media" on storage.objects for insert to authenticated with check (bucket_id='portfolio-media');
create policy "Admins update portfolio media" on storage.objects for update to authenticated using (bucket_id='portfolio-media');
create policy "Admins delete portfolio media" on storage.objects for delete to authenticated using (bucket_id='portfolio-media');
