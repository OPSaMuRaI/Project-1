"use client";

import { useState, useTransition } from "react";
import { addPersonalContent, deletePersonalContent } from "@/app/dashboard/actions";
import type { PersonalContentRow, PersonalContentType } from "@/lib/types";

const TYPES: { value: PersonalContentType; label: string }[] = [
  { value: "script", label: "Script" },
  { value: "caption", label: "Caption" },
  { value: "transcript", label: "Transcript" },
];

interface Props {
  userId: string;
  items: PersonalContentRow[];
}

export function PersonalContentUpload({ userId, items }: Props) {
  const [isPending, startTransition] = useTransition();
  const [type, setType] = useState<PersonalContentType>("script");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setMsg(null);
    startTransition(async () => {
      const r = await addPersonalContent(userId, type, content);
      if (r.error) {
        setMsg({ type: "err", text: r.error });
      } else {
        setMsg({ type: "ok", text: "Added." });
        setContent("");
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deletePersonalContent(id);
    });
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h2 className="text-lg font-semibold">2. Personal content</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Paste scripts, captions, or transcripts. The AI learns your vocabulary and rhythm.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as PersonalContentType)}
            className="mt-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your script, caption, or transcript..."
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
                  <span className="text-xs font-medium text-zinc-500">{i.type}</span>
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
