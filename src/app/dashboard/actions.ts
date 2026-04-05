"use server";

import { createClient } from "@/lib/supabase/server";
import type { ContentGoal, Tone } from "@/lib/types";

export async function saveUserProfile(
  userId: string,
  data: {
    niche?: string;
    target_audience?: string;
    content_goal?: ContentGoal | "";
    tone?: Tone | "";
  }
) {
  const supabase = await createClient();
  const payload = {
    user_id: userId,
    niche: data.niche || null,
    target_audience: data.target_audience || null,
    content_goal: (data.content_goal as ContentGoal) || null,
    tone: (data.tone as Tone) || null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("user_profiles").upsert(payload, {
    onConflict: "user_id",
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function addPersonalContent(
  userId: string,
  type: "script" | "caption" | "transcript",
  content: string
) {
  const supabase = await createClient();
  const { error } = await supabase.from("personal_content").insert({
    user_id: userId,
    type,
    content: content.trim(),
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function deletePersonalContent(id: string) {
  const supabase = await createClient();
  await supabase.from("personal_content").delete().eq("id", id);
  return { error: null };
}

export async function addCompetitorContent(
  userId: string,
  source: "pasted_script" | "video_transcript",
  content: string
) {
  const supabase = await createClient();
  const { error } = await supabase.from("competitor_content").insert({
    user_id: userId,
    source,
    content: content.trim(),
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function deleteCompetitorContent(id: string) {
  const supabase = await createClient();
  await supabase.from("competitor_content").delete().eq("id", id);
  return { error: null };
}
