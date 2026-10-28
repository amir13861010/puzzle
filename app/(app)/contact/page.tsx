import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ارتباط با پازل",
  description: "راه‌های ارتباط با پازل؛ شبکه‌های اجتماعی، ایمیل و تلفن باشگاه مدیران محصول جوان.",
  keywords: ["تماس با پازل", "ارتباط با پازل", "باشگاه مدیران محصول جوان"],
  alternates: { canonical: "/contact" },
};

const links = [
  { label: "اینستاگرام", value: "@puzzle_io", href: "https://www.instagram.com/puzzle_io/" },
  { label: "لینکدین", value: "صفحهٔ پازل", href: "https://www.linkedin.com/company/%D9%BE%D8%A7%D8%B2%D9%84/" },
  { label: "تلگرام", value: "@puzzle_modiarn_mahsol", href: "https://t.me/puzzle_modiarn_mahsol" },
];

export default function ContactPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-black text-white px-6 pt-36 pb-24">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs tracking-[0.3em] text-[#c8ff00]">PUZZLEIO.IR / CONTACT</p>
        <h1 className="mt-5 text-4xl md:text-6xl font-black">ارتباط با ما</h1>
        <p className="mt-5 text-white/60">برای ارتباط با پازل از راه‌های زیر با ما در تماس باشید.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="border border-white/15 p-6 hover:border-[#c8ff00] transition-colors"><span className="block text-sm text-white/50">{link.label}</span><span className="mt-2 block text-lg font-bold">{link.value} ↗</span></a>)}
          <a href="mailto:khorjinekalamat@gmail.com" className="border border-white/15 p-6 hover:border-[#c8ff00] transition-colors"><span className="block text-sm text-white/50">ارتباط از طریق ایمیل</span><span className="mt-2 block text-lg font-bold" dir="ltr">khorjinekalamat@gmail.com</span></a>
          <a href="tel:09377884475" className="border border-white/15 p-6 hover:border-[#c8ff00] transition-colors"><span className="block text-sm text-white/50">ارتباط از طریق تلفن همراه</span><span className="mt-2 block text-lg font-bold" dir="ltr">09377884475</span></a>
        </div>
      </div>
    </main>
  );
}
