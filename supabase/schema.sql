-- CreatorMind – Supabase Schema
-- Run this in Supabase SQL Editor: Project → SQL Editor → New Query

-- ===========================================
-- 1. Profiles (extends auth.users)
-- ===========================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ===========================================
-- 2. User AI training / account setup
-- ===========================================
create table if not exists public.user_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  niche text,
  target_audience text,        -- age, pain points, desires
  content_goal text,          -- educate, entertain, sell
  tone text,                  -- calm, aggressive, witty, luxury, raw
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ===========================================
-- 3. Personal content (scripts, captions, transcripts)
-- ===========================================
create table if not exists public.personal_content (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null,         -- 'script' | 'caption' | 'transcript'
  content text not null,
  created_at timestamptz default now()
);

-- ===========================================
-- 4. Competitor content (scripts or video-derived)
-- ===========================================
create table if not exists public.competitor_content (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  source text,                -- 'pasted_script' | 'video_transcript'
  content text not null,
  created_at timestamptz default now()
);

-- ===========================================
-- 5. Generated scripts (history)
-- ===========================================
create table if not exists public.generated_scripts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  video_idea text not null,
  duration_seconds int,
  platform text default 'instagram_reels',
  mode text,                  -- 'viral' | 'educational' | 'storytelling' | null
  hook text,
  body text,
  cta text,
  full_script text,
  created_at timestamptz default now()
);

-- ===========================================
-- 6. Usage / limits (for Free vs Creator plan)
-- ===========================================
create table if not exists public.usage (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  plan text default 'free',   -- 'free' | 'creator' | 'pro'
  generations_this_month int default 0,
  month_reset_at date
);

-- ===========================================
-- RLS (Row Level Security)
-- ===========================================
alter table public.profiles enable row level security;
alter table public.user_profiles enable row level security;
alter table public.personal_content enable row level security;
alter table public.competitor_content enable row level security;
alter table public.generated_scripts enable row level security;
alter table public.usage enable row level security;

-- Profiles: users can read/update own
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- User profiles (AI training): own only
create policy "Users can manage own user_profile" on public.user_profiles for all using (auth.uid() = user_id);

-- Personal content: own only
create policy "Users can manage own personal_content" on public.personal_content for all using (auth.uid() = user_id);

-- Competitor content: own only
create policy "Users can manage own competitor_content" on public.competitor_content for all using (auth.uid() = user_id);

-- Generated scripts: own only
create policy "Users can manage own generated_scripts" on public.generated_scripts for all using (auth.uid() = user_id);

-- Usage: own only (read/update via service or app logic)
create policy "Users can view own usage" on public.usage for select using (auth.uid() = user_id);
create policy "Users can update own usage" on public.usage for update using (auth.uid() = user_id);
create policy "Users can insert own usage" on public.usage for insert with check (auth.uid() = user_id);

-- ===========================================
-- Trigger: create profile on signup
-- ===========================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  insert into public.usage (user_id, plan) values (new.id, 'free');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
