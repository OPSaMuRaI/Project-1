import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AccountSetup } from "@/components/dashboard/AccountSetup";
import { PersonalContentUpload } from "@/components/dashboard/PersonalContentUpload";
import { CompetitorUpload } from "@/components/dashboard/CompetitorUpload";
import { ScriptGenerator } from "@/components/dashboard/ScriptGenerator";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: userProfile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: personalContent } = await supabase
    .from("personal_content")
    .select("id, user_id, type, content, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: competitorContent } = await supabase
    .from("competitor_content")
    .select("id, source, content, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">
        Train your AI and generate scripts.
      </p>

      <div className="mt-10 space-y-12">
        <AccountSetup userId={user.id} initial={userProfile} />
        <PersonalContentUpload userId={user.id} items={personalContent ?? []} />
        <CompetitorUpload userId={user.id} items={competitorContent ?? []} />
        <ScriptGenerator
          userId={user.id}
          userProfile={userProfile}
          personalContent={personalContent ?? []}
          competitorContent={competitorContent ?? []}
        />
      </div>
    </div>
  );
}
