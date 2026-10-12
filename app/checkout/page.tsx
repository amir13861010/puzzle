import { getSettings } from "@/lib/settings";
import { CheckoutClient } from "./CheckoutClient";

export const metadata = {
  title: "تسویه حساب | پازل",
  robots: { index: false },
};

export default async function CheckoutPage() {
  const settings = await getSettings();

  return <CheckoutClient settings={settings} />;
}