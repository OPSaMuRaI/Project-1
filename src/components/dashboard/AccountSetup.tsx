"use client";

import { useState, useTransition } from "react";
import { saveUserProfile } from "@/app/dashboard/actions";
import type { UserProfile } from "@/lib/types";
import type { ContentGoal, Tone } from "@/lib/types";

const CONTENT_GOALS: { value: ContentGoal; label: string }[] = [
  { value: "educate", label: "Educate" },
  { value: "entertain", label: "Entertain" },
  { value: "sell", label: "Sell" },
];

const TONES: { value: Tone; label: string }[] = [
  { value: "calm", label: "Calm" },
  { value: "aggressive", label: "Aggressive" },
  { value: "witty", label: "Witty" },
  { value: "luxury", label: "Luxury" },
  { value: "raw", label: "Raw" },
];

interface Props {
  userId: string;
  initial: UserProfile | null;
}

export function AccountSetup({ userId, initial }: Props) {
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [niche, setNiche] = useState(initial?.niche ?? "");
  const [targetAudience, setTargetAudience] = useState(initial?.target_audience ?? "");
  const [contentGoal, setContentGoal] = useState<ContentGoal | "">(initial?.content_goal ?? "");
  const [tone, setTone] = useState<Tone | "">(initial?.tone ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    startTransition(async () => {
      const r = await saveUserProfile(userId, {
        niche: niche || undefined,
        target_audience: targetAudience || undefined,
        content_goal: contentGoal || undefined,
        tone: tone || undefined,
      });
      if (r.error) {
        setMsg({ type: "err", text: r.error });
      } else {
        setMsg({ type: "ok", text: "Saved." });
      }
    });
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h2 className="text-lg font-semibold">1. Account setup (AI training)</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Niche, audience, goal, and tone. Your AI uses this to match your voice.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Niche</label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. Fitness, Finance, Dropshipping"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Target audience</label>
          <textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Age, pain points, desires..."
            rows={2}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Content goal</label>
          <select
            value={contentGoal}
            onChange={(e) => setContentGoal((e.target.value || "") as ContentGoal | "")}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="">Select</option>
            {CONTENT_GOALS.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone((e.target.value || "") as Tone | "")}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="">Select</option>
            {TONES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        {msg && (
          <p className={msg.type === "ok" ? "text-sm text-green-600 dark:text-green-400" : "text-sm text-red-600 dark:text-red-400"}>
            {msg.text}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save"}
        </button>
      </form>
    </section>
  );
}
