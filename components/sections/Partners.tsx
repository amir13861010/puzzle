import Link from "next/link";

type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  alt: string | null;
  website_url: string | null;
};

export default function Partners({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;

  return (
    <section
      className="bg-[#fafafa] text-black relative overflow-hidden border-b-2 border-black"
      dir="rtl"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* تیتر */}
        <div className="pt-16 md:pt-24 pb-8 md:pb-12 border-b-2 border-black">
          <h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-black leading-[0.85] tracking-tighter uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SPONSOR
          </h2>
          <p className="mt-4 md:mt-6 text-sm md:text-base text-neutral-500 font-mono tracking-widest uppercase">
            OUR PARTNERS / 2025
          </p>
        </div>

        {/* گرید حامیان */}
        <div className="py-16 md:py-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 border-b-2 border-black">
          {partners.map((partner) => {
            const cardContent = (
              <>
                {partner.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logo_url}
                    alt={partner.alt || partner.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div
                    className="text-2xl md:text-3xl font-black text-black tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {partner.name}
                  </div>
                )}
              </>
            );

            const className =
              "group relative aspect-[4/3] border border-black/10 bg-white flex items-center justify-center p-8 hover:border-black transition-all";

            // اگه website_url داره، لینک؛ وگرنه div
            if (partner.website_url) {
              return (
                <a
                  key={partner.id}
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={partner.id} className={className}>
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* متن پایانی */}
        <div className="py-8 md:py-12 border-b-2 border-black">
          <p
            className="text-sm md:text-base text-neutral-600 leading-loose max-w-2xl mr-auto"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            دارای امتیاز از شرایط اسپانسرشیپ باشگاه پازل؛ برای اطلاعات بیشتر با ما
            در تماس باشید.
          </p>
        </div>
      </div>
    </section>
  );
}