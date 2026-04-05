"use client";

import { useState, useTransition } from "react";
import { addCompetitorContent, deleteCompetitorContent } from "@/app/dashboard/actions";
import type { CompetitorContentRow } from "@/lib/types";

interface Props {
  userId: string;
  items: CompetitorContentRow[];
}

export function CompetitorUpload({ userId, items }: Props) {
  const [isPending, startTransition] = useTransition();
  const [source, setSource] = useState<"pasted_script" | "video_transcript">("pasted_script");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setMsg(null);
    startTransition(async () => {
      const r = await addCompetitorContent(userId, source, content);
      if (r.error) {
        setMsg({ type: "err", text: r.error });
      } else {
        setMsg({ type: "ok", text: "Added. AI uses structure & psychology only—no copying." });
        setContent("");
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteCompetitorContent(id);
    });
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h2 className="text-lg font-semibold">3. Competitor analysis</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Paste a competitor script or transcript. The AI learns hook structure, CTA style, and flow—never copies.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Source</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value as "pasted_script" | "video_transcript")}
            className="mt-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="pasted_script">Pasted script</option>
            <option value="video_transcript">Video transcript</option>
          </select>
          {source === "video_transcript" && (
            <p className="mt-1 text-xs text-zinc-500">
              Use a transcript from AssemblyAI or Whisper. Paste the text below.
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste competitor reel script or transcript..."
            rows={4}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
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
          {isPending ? "Adding…" : "Add"}
        </button>
      </form>

      {items.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Uploaded</h3>
          <ul className="mt-2 space-y-2">
            {items.map((i) => (
              <li
                key={i.id}
                className="flex items-start justify-between gap-2 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-medium text-zinc-500">{i.source}</span>
                  <p className="mt-0.5 line-clamp-2 text-sm">{i.content}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(i.id)}
                  disabled={isPending}
                  className="shrink-0 text-sm text-red-600 hover:underline disabled:opacity-60"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
