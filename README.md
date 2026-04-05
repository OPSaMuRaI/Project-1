# CreatorMind

Personal AI script generator for content creators. Train an AI on your niche, audience, and style; generate hook, body, and CTA for Instagram Reels.

## Setup

### 1. Install

```bash
npm install
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API** copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In **SQL Editor**, run the schema: `supabase/schema.sql`
4. In **Authentication → URL Configuration** add your site URL and `http://localhost:3000/auth/callback` (and production callback) to **Redirect URLs**.

### 3. Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set at least:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

For real AI script generation, add **one** of:

- `OPENAI_API_KEY` — [platform.openai.com](https://platform.openai.com/api-keys)
- `ANTHROPIC_API_KEY` — [console.anthropic.com](https://console.anthropic.com/)

Without either, the app returns a **demo script** so you can try the flow.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API providers

See **[docs/API_PROVIDERS.md](docs/API_PROVIDERS.md)** for:

- Script generation: OpenAI, Anthropic  
- Embeddings (future): OpenAI, Voyage AI  
- Video transcript (future): AssemblyAI, Whisper  
- Payments (later): Stripe  

## Pages

- **/** — Landing
- **/pricing** — Pricing
- **/login** — Log in
- **/signup** — Sign up
- **/dashboard** — AI setup, content uploads, script generator (requires auth)

## Tech

- **Next.js 15** (App Router), **Tailwind**
- **Supabase** (auth, DB)
- **AI:** OpenAI or Anthropic (script); demo when no keys
