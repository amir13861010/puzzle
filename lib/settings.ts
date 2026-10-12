import { createClient } from "@/lib/supabase/server";

export type Settings = {
  telegram: string;
  whatsapp: string;
};

const DEFAULT_SETTINGS: Settings = {
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/",
};

export async function getSettings(): Promise<Settings> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (!data) return DEFAULT_SETTINGS;

  return {
    telegram: data.telegram || DEFAULT_SETTINGS.telegram,
    whatsapp: data.whatsapp || DEFAULT_SETTINGS.whatsapp,
  };
}