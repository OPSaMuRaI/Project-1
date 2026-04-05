# API Providers – CreatorMind

Use this as a reference when adding API keys. Copy `.env.local.example` to `.env.local` and fill in the values you need.

---

## 1. Script generation (required for real AI)

**Use:** Turning a video idea + your context into hook, body, and CTA.

| Provider | Env var | Where to get | Models | Notes |
|----------|---------|--------------|--------|-------|
| **OpenAI** | `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com/api-keys) | `gpt-4o-mini` (default), `gpt-4o`, `gpt-4.1` | Preferred. Good quality and JSON mode. |
| **Anthropic** | `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/) | `claude-3-5-sonnet-20241022` | Alternative. Strong copy. |

- **Pick one.** The app uses OpenAI first, then Anthropic. No key → demo script only.
- For production: `gpt-4o` or `gpt-4.1` (OpenAI) or `claude-3-5-sonnet` (Anthropic) for best quality.

---

## 2. Embeddings (for training memory / semantic search)

**Use:** (Planned) Storing and retrieving your style + competitor patterns for RAG. Not wired in yet.

| Provider | Env var | Where to get | Notes |
|----------|---------|--------------|-------|
| **OpenAI** | `OPENAI_API_KEY` | Same as script generation | `text-embedding-3-small`. One key for both. |
| **Voyage AI** | `VOYAGE_API_KEY` | [voyageai.com](https://www.voyageai.com/) | Good for long documents. Separate key. |

- If you use OpenAI for scripts, you can reuse `OPENAI_API_KEY` when you add embeddings.

---

## 3. Video transcript (for competitor video upload)

**Use:** Turning an uploaded competitor **video file** into text. Right now users paste transcripts; file upload can use:

| Provider | Env var | Where to get | Notes |
|----------|---------|--------------|-------|
| **AssemblyAI** | `ASSEMBLYAI_API_KEY` | [assemblyai.com](https://www.assemblyai.com/) | Upload URL → transcript. Good for long / noisy audio. |
| **OpenAI Whisper** | `OPENAI_API_KEY` | Same as script generation | `whisper-1` via API. One key. |

- **Not implemented yet.** Competitor flow currently expects pasted script or pasted transcript. To support video:
  1. Upload file to storage (e.g. Supabase Storage).
  2. Call AssemblyAI or Whisper with the file/URL.
  3. Save result as `competitor_content` with `source: 'video_transcript'`.

---

## 4. Payments (later – Stripe)

| Env var | Use |
|---------|-----|
| `STRIPE_SECRET_KEY` | Create checkout, manage subscriptions. |
| `STRIPE_WEBHOOK_SECRET` | Verify webhooks (subscription, payment). |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-side Stripe.js / Checkout. |

---

## Quick reference

| Use case | Provider | Env var |
|----------|----------|---------|
| Script generation | OpenAI | `OPENAI_API_KEY` |
| Script generation | Anthropic | `ANTHROPIC_API_KEY` |
| Embeddings (future) | OpenAI | `OPENAI_API_KEY` |
| Embeddings (future) | Voyage AI | `VOYAGE_API_KEY` |
| Video transcript (future) | AssemblyAI | `ASSEMBLYAI_API_KEY` |
| Video transcript (future) | OpenAI Whisper | `OPENAI_API_KEY` |
| Auth + DB | Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Payments (later) | Stripe | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
