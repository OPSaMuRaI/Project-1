"use server";

import { createClient } from "@/lib/supabase/server";

type ScriptMode = "viral" | "educational" | "storytelling" | null;

interface GenerateInput {
  userId: string;
  videoIdea: string;
  durationSeconds: number;
  platform: string;
  mode: ScriptMode;
  userContext: {
    niche: string | null;
    target_audience: string | null;
    content_goal: string | null;
    tone: string | null;
    personalTexts: string[];
    competitorTexts: string[];
  };
}

export async function generateScript(input: GenerateInput) {
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  const {
    videoIdea,
    durationSeconds,
    platform,
    mode,
    userContext: { niche, target_audience, content_goal, tone, personalTexts, competitorTexts },
  } = input;

  const contextParts: string[] = [];
  if (niche) contextParts.push(`Niche: ${niche}`);
  if (target_audience) contextParts.push(`Target audience: ${target_audience}`);
  if (content_goal) contextParts.push(`Content goal: ${content_goal}`);
  if (tone) contextParts.push(`Tone: ${tone}`);
  if (personalTexts.length)
    contextParts.push("Creator's style (from their content):\n" + personalTexts.join("\n\n---\n\n"));
  if (competitorTexts.length)
    contextParts.push("Competitor patterns (structure/psychology only, do not copy):\n" + competitorTexts.join("\n\n---\n\n"));

  const systemPrompt = `You are a scriptwriter for short-form video (Instagram Reels, etc.). Write in the creator's voice using their niche, audience, goal, and tone. Use their own content for vocabulary and rhythm. Use competitor examples only for hook structure, CTA style, and narrative flow—never copy. Output valid JSON: { "hook": string, "body": string, "cta": string }`;

  const userPrompt = `Context:
${contextParts.join("\n")}

Video idea: ${videoIdea}
Duration: ${durationSeconds}s
Platform: ${platform}
Mode: ${mode || "default"}

Generate hook, body, and CTA. Return only JSON.`;

  // Prefer OpenAI, then Anthropic. If neither key exists, return a demo.
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        return { error: `OpenAI: ${err}` };
      }
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(text) as { hook?: string; body?: string; cta?: string };
      const hook = parsed.hook ?? "";
      const body = parsed.body ?? "";
      const cta = parsed.cta ?? "";
      const fullScript = [hook, body, cta].filter(Boolean).join("\n\n");

      const supabase = await createClient();
      await supabase.from("generated_scripts").insert({
        user_id: input.userId,
        video_idea: videoIdea,
        duration_seconds: durationSeconds,
        platform,
        mode,
        hook,
        body,
        cta,
        full_script: fullScript,
      });

      return {
        error: null,
        script: { hook, body, cta, fullScript },
      };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "OpenAI request failed" };
    }
  }

  if (anthropicKey) {
    try {
      const res = await fetch(
        "https://api.anthropic.com/v1/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            system: systemPrompt,
            messages: [{ role: "user", content: userPrompt }],
          }),
        }
      );
      if (!res.ok) {
        const err = await res.text();
        return { error: `Anthropic: ${err}` };
      }
      const data = await res.json();
      const text = data.content?.[0]?.text ?? "{}";
      let parsed: { hook?: string; body?: string; cta?: string };
      try {
        const extracted = text.replace(/```json\n?|\n?```/g, "").trim();
        parsed = JSON.parse(extracted);
      } catch {
        parsed = {};
      }
      const hook = parsed.hook ?? "";
      const body = parsed.body ?? "";
      const cta = parsed.cta ?? "";
      const fullScript = [hook, body, cta].filter(Boolean).join("\n\n");

      const supabase = await createClient();
      await supabase.from("generated_scripts").insert({
        user_id: input.userId,
        video_idea: videoIdea,
        duration_seconds: durationSeconds,
        platform,
        mode,
        hook,
        body,
        cta,
        full_script: fullScript,
      });

      return {
        error: null,
        script: { hook, body, cta, fullScript },
      };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Anthropic request failed" };
    }
  }

  // No API keys: return demo script
  const demo = {
    hook: `You're leaving money on the table if you're not doing this with ${videoIdea}.`,
    body: `Here's the breakdown. First, most people get this wrong. Second, the fix is simpler than you think. Third, you can start today.`,
    cta: `Save this. Try it. Drop a "done" when you've tested it.`,
  };
  const fullScript = [demo.hook, demo.body, demo.cta].join("\n\n");

  const supabase = await createClient();
  await supabase.from("generated_scripts").insert({
    user_id: input.userId,
    video_idea: videoIdea,
    duration_seconds: durationSeconds,
    platform,
    mode,
    hook: demo.hook,
    body: demo.body,
    cta: demo.cta,
    full_script: fullScript,
  });

  return {
    error: null,
    script: { ...demo, fullScript },
  };
}
