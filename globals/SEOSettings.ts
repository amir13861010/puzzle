import type { GlobalConfig } from "payload";

export const SEOSettings: GlobalConfig = {
  slug: "seo-settings",
  label: "تنظیمات سئو",
  admin: {
    group: "تنظیمات سایت",
    description: "متادیتا و تنظیمات پیش‌فرض نمایش سایت در موتورهای جست‌وجو و شبکه‌های اجتماعی.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "عمومی",
          fields: [
            { name: "siteName", type: "text", label: "نام سایت", defaultValue: "پازل" },
            { name: "title", type: "text", label: "عنوان پیش‌فرض", defaultValue: "پازل — باشگاه مدیران محصول جوان" },
            { name: "titleTemplate", type: "text", label: "الگوی عنوان صفحات", defaultValue: "%s | پازل", admin: { description: "%s با عنوان هر صفحه جایگزین می‌شود." } },
            { name: "description", type: "textarea", label: "توضیحات پیش‌فرض", defaultValue: "جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول، دیزاینرها و سازندگان جسور." },
            { name: "keywords", type: "text", label: "کلمات کلیدی پیش‌فرض", admin: { description: "کلمات را با ویرگول جدا کنید." } },
            { name: "siteUrl", type: "text", label: "آدرس اصلی سایت", defaultValue: "https://www.puzzleio.ir" },
            { name: "canonicalUrl", type: "text", label: "Canonical صفحهٔ اصلی", defaultValue: "/" },
          ],
        },
        {
          label: "شبکه‌های اجتماعی",
          fields: [
            { name: "ogTitle", type: "text", label: "عنوان پیش‌فرض Open Graph" },
            { name: "ogDescription", type: "textarea", label: "توضیحات پیش‌فرض Open Graph" },
            { name: "ogImage", type: "upload", relationTo: "media", label: "تصویر پیش‌فرض اشتراک‌گذاری" },
            { name: "twitterHandle", type: "text", label: "شناسهٔ Twitter/X", admin: { description: "همراه با @ وارد کنید." } },
          ],
        },
        {
          label: "نمایه‌سازی و تأیید مالکیت",
          fields: [
            { name: "allowIndexing", type: "checkbox", label: "اجازهٔ نمایه‌سازی سایت", defaultValue: true },
            { name: "googleSiteVerification", type: "text", label: "کد تأیید Google Search Console" },
          ],
        },
      ],
    },
  ],
};
