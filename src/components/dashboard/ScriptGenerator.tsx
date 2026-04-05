"use client";

import { useState, useTransition } from "react";
import { generateScript } from "@/app/dashboard/generate/action";
import type { UserProfile } from "@/lib/types";
import type { PersonalContentRow, CompetitorContentRow } from "@/lib/types";
import type { ScriptMode } from "@/lib/types";

const DURATIONS = [30, 60, 90];
const MODES: { value: ScriptMode; label: string }[] = [
  { value: null, label: "Default" },
  { value: "viral", label: "Viral" },
  { value: "educational", label: "Educational" },
  { value: "storytelling", label: "Storytelling" },
];

interface Props {
  userId: string;
  userProfile: UserProfile | null;
  personalContent: PersonalContentRow[];
  competitorContent: CompetitorContentRow[];
}

export function ScriptGenerator({ userId, userProfile, personalContent, competitorContent }: Props) {
  const [isPending, startTransition] = useTransition();
  const [videoIdea, setVideoIdea] = useState("");
  const [duration, setDuration] = useState(60);
  const [mode, setMode] = useState<ScriptMode>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ hook: string; body: string; cta: string; fullScript: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!videoIdea.trim()) return;
    setError(null);
    setResult(null);
    startTransition(async () => {
      const r = await generateScript({
        userId,
        videoIdea: videoIdea.trim(),
        durationSeconds: duration,
        platform: "instagram_reels",
        mode,
        userContext: {
          niche: userProfile?.niche ?? null,
          target_audience: userProfile?.target_audience ?? null,
          content_goal: userProfile?.content_goal ?? null,
          tone: userProfile?.tone ?? null,
          personalTexts: personalContent.map((c) => c.content),
          competitorTexts: competitorContent.map((c) => c.content),
        },
      });
      if (r.error) {
        setError(r.error);
      } else if (r.script) {
        setResult(r.script);
      }
    });
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h2 className="text-lg font-semibold">4. Script generator</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Enter a video idea. Get a hook, body, and CTA in your voice.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Video idea</label>
          <textarea
            value={videoIdea}
            onChange={(e) => setVideoIdea(e.target.value)}
            placeholder="e.g. 3 habits that doubled my productivity"
            rows={2}
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>{d}s</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Mode</label>
            <select
              value={mode ?? ""}
              onChange={(e) => setMode((e.target.value || null) as ScriptMode)}
              className="mt-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            >
              {MODES.map((m) => (
                <option key={String(m.value)} value={m.value ?? ""}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700 disabled:opacity-60"
        >
          {isPending ? "Generating…" : "Generate script"}
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Script</h3>
          <div className="mt-3 space-y-3">
            <div>
              <span className="text-xs font-medium text-violet-600 dark:text-violet-400">Hook</span>
              <p className="mt-0.5 whitespace-pre-wrap text-sm">{result.hook}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-violet-600 dark:text-violet-400">Body</span>
              <p className="mt-0.5 whitespace-pre-wrap text-sm">{result.body}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-violet-600 dark:text-violet-400">CTA</span>
              <p className="mt-0.5 whitespace-pre-wrap text-sm">{result.cta}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
