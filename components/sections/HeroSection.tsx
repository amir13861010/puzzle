import { ChevronDown, ArrowUpRight, Asterisk } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/hero-video.MOV" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[15%] -left-[5%] text-white/[0.04] font-display font-bold text-[15vw] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          PUZZLE PUZZLE
        </div>
        <div
          className="absolute bottom-[10%] -right-[5%] text-white/[0.04] text-[12vw] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          پازل پازل
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 w-full" dir="rtl">
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 text-white/50">
          <div className="w-8 md:w-12 h-px bg-white/30" />
          <span
            className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-mono"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            از ۱۴۰۳
          </span>
          <div className="w-8 md:w-12 h-px bg-white/30" />
        </div>

        <h1
          className="text-white text-[26vw] sm:text-[24vw] md:text-[20vw] lg:text-[18vw] leading-[0.85] font-black tracking-tighter select-none relative"
          style={{
            fontFamily: "var(--font-doran)",
            transform: "rotate(-2deg)",
          }}
        >
          پازل
        </h1>

        <div
          className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mt-8 md:mt-20 lg:mt-24 leading-tight md:whitespace-nowrap"
          style={{
            fontFamily: "var(--font-doran)",
            transform: "rotate(1deg)",
          }}
        >
          باشگاه مدیران محصول جوان جوان
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 md:gap-3 text-white/60">
        <span
          className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-mono"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Scroll
        </span>
        <ChevronDown
          className="w-4 h-4 md:w-5 md:h-5 animate-bounce"
          strokeWidth={1.5}
        />
      </div>

      <div className="hidden md:block absolute top-32 right-12 text-white/30 z-10">
        <Asterisk className="w-6 h-6 animate-spin-slow" />
      </div>

      <div className="hidden md:block absolute bottom-32 left-12 text-white/30 z-10">
        <ArrowUpRight className="w-6 h-6" />
      </div>
    </section>
  );
}