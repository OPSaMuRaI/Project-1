export type ContentGoal = "educate" | "entertain" | "sell";
export type Tone = "calm" | "aggressive" | "witty" | "luxury" | "raw";
export type PersonalContentType = "script" | "caption" | "transcript";
export type ScriptMode = "viral" | "educational" | "storytelling" | null;

export interface UserProfile {
  id: string;
  user_id: string;
  niche: string | null;
  target_audience: string | null;
  content_goal: ContentGoal | null;
  tone: Tone | null;
  created_at: string;
  updated_at: string;
}

export interface PersonalContentRow {
  id: string;
  user_id: string;
  type: PersonalContentType;
  content: string;
  created_at: string;
}

export interface CompetitorContentRow {
  id: string;
  user_id: string;
  source: "pasted_script" | "video_transcript";
  content: string;
  created_at: string;
}

export interface GeneratedScriptRow {
  id: string;
  user_id: string;
  video_idea: string;
  duration_seconds: number | null;
  platform: string;
  mode: ScriptMode;
  hook: string | null;
  body: string | null;
  cta: string | null;
  full_script: string | null;
  created_at: string;
}
