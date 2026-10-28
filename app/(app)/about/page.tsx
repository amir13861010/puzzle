import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دربارهٔ پازل و باشگاه مدیران محصول جوان",
  description: "با پازل و باشگاه مدیران محصول جوان آشنا شوید؛ جامعه‌ای برای یادگیری مهارت‌های کاری، مدیریت محصول و ساخت محصولات بهتر.",
  keywords: ["درباره پازل", "باشگاه مدیران محصول جوان", "مدیریت محصول", "مهارت‌های نرم"],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-black text-white px-6 pt-36 pb-24">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.3em] text-[#c8ff00]">PUZZLEIO.IR / ABOUT</p>
        <h1 className="mt-5 text-4xl md:text-6xl font-black">دربارهٔ ما</h1>
        <h2 className="mt-8 text-2xl md:text-3xl font-bold">پازل و باشگاه مدیران محصول جوان</h2>
        <p className="mt-5 leading-9 text-white/75">ما یک جامعه‌ایم برای کسانی که می‌خواهند در محیط کار واقعی بهتر فکر کنند، بهتر تصمیم بگیرند و محصول‌های بهتری بسازند. این مسیر دو بخش دارد که کنار هم کامل می‌شوند: پازل و باشگاه مدیران محصول جوان.</p>
        <section className="mt-12 space-y-4"><h2 className="text-2xl font-bold">پازل: مهارت‌هایی که کار را جلو می‌برند</h2><p className="leading-9 text-white/75">ماموریت پازل در باشگاه مدیران محصول جوان برگزاری دوره‌های تخصصی مهارت‌های نرم و توسعه فردی کاربردی در فضای کار است. ارتباط مؤثر، تصمیم‌گیری، مدیریت تعارض، کار تیمی و رهبری، چیزهایی هستند که بیشترین تفاوت را در مسیر شغلی می‌سازند. در پازل این مهارت‌ها را با تمرین و مثال‌های واقعی یاد می‌گیریم، نه با شعار و تئوری خشک.</p></section>
        <section className="mt-12 space-y-4"><h2 className="text-2xl font-bold">باشگاه مدیران محصول جوان: از ایده تا محصول</h2><p className="leading-9 text-white/75">باشگاه مدیران محصول جوان خانهٔ کسانی است که در دنیای محصول کار می‌کنند یا می‌خواهند وارد آن شوند. حوزه‌های کاری ما:</p><ul className="list-disc space-y-2 pr-6 text-white/75 leading-8"><li>مدیریت محصول</li><li>طراحی محصول (Product Design)</li><li>هوش مصنوعی</li><li>توسعهٔ محصول (Product Development)</li><li>بیزینس و راه‌اندازی محصول</li></ul><p className="leading-9 text-white/75">باشگاه از جامعه‌ای از مدیران و متخصصان حوزهٔ محصول تشکیل شده است. اینجا فقط درس نمی‌دهیم، تجربه‌ها، شکست‌ها و چالش‌های واقعی را هم با هم بررسی می‌کنیم.</p></section>
        <section className="mt-12 space-y-4"><h2 className="text-2xl font-bold">چرا محتوای باشگاه مدیران محصول جوان به‌روز و معتبر است؟</h2><ul className="space-y-4 text-white/75 leading-8"><li><strong className="text-white">تأیید متخصصان:</strong> محتوای هر دوره در باشگاه مدیران محصول جوان پیش از برگزاری، به تأیید افراد شایسته و صاحب‌نظر در بیرون از ایران می‌رسد تا با استانداردها و روش‌های روز دنیا هماهنگ بماند.</li><li><strong className="text-white">گواهی پایان دوره:</strong> شرکت‌کنندگان در پایان دوره مدرک دریافت می‌کنند.</li><li><strong className="text-white">منابع مرجع:</strong> دوره‌های ما بر پایهٔ کتاب‌های معتبر مدیریت و محصول طراحی می‌شوند، کتاب‌هایی که در کتابخانه‌ها و پایگاه‌های علمی معتبر بین‌المللی (از جمله در گلاسکو و آمریکا، مانند Gale) در دسترس‌اند.</li></ul></section>
        <section className="mt-12 space-y-4"><h2 className="text-2xl font-bold">کتاب‌های گران، در دسترس شما</h2><p className="leading-9 text-white/75">بسیاری از این کتاب‌ها بیرون از ایران قیمت بالایی دارند و دسترسی به آن‌ها آسان نیست. در باشگاه مدیران محصول جوان این منابع را معرفی می‌کنیم و محتوایشان را در قالب دوره‌ای مقرون‌به‌صرفه آموزش می‌دهیم، تا نیازی به خرید و خواندن تک‌تک آن‌ها نداشته باشید.</p></section>
        <section className="mt-12 border-r-4 border-[#c8ff00] pr-6"><h2 className="text-2xl font-bold">به ما بپیوندید</h2><p className="mt-4 leading-9 text-white/75">اگر می‌خواهید از سطح یک مدیر محصول معمولی به یک تصمیم‌گیر اثرگذار برسید، یا مهارت‌های نرم‌تان را برای محیط کار تقویت کنید، پازل و باشگاه مدیران محصول جوان جای شماست.</p></section>
      </article>
    </main>
  );
}
