import { getSettings as getSettingsFromPayload } from "./data";

export type Settings = {
  telegram: string;
  whatsapp: string;
};

const DEFAULT_SETTINGS: Settings = {
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/",
};

export async function getSettings(): Promise<Settings> {
  const settings = await getSettingsFromPayload();
  if (!settings) return DEFAULT_SETTINGS;
  return {
    telegram: settings.telegram || DEFAULT_SETTINGS.telegram,
    whatsapp: settings.whatsapp || DEFAULT_SETTINGS.whatsapp,
  };
}