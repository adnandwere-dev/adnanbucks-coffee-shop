import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
export default function PopularBakery() {
  return (
    <section className="site-entrance py-24 px-4 sm:px-6 lg:px-8 bg-surface transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        {/* صورة دائرية مع تأثيرات خلفية */}
        <div className="md:w-1/2 relative w-full">
          <div className="aspect-square rounded-full overflow-hidden soft-shadow border-4 border-surface-container-lowest relative z-10 w-[85%] md:w-full mx-auto group">
            <Image
              fill
              src={"/images/home-page/unnamed (1).jpg"}
              alt="Fresh baked almond croissant"
              className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
            />
          </div>
          {/* أشكال زخرفية */}
          {/* <div className="absolute top-10 -right-4 w-32 h-32 bg-primary-fixed rounded-full blur-3xl opacity-40 -z-10"></div>
          <div className="absolute -bottom-10 left-10 w-40 h-40 bg-secondary-container rounded-full blur-3xl opacity-50 -z-10"></div> */}
        </div>

        {/* نص وقائمة المخبوزات */}
        <div className="md:w-1/2 space-y-8">
          <div>
            <span className="font-body text-xs text-primary font-bold tracking-widest uppercase mb-2 block">
              Freshly Baked Daily
            </span>
            <h2 className="font-headline text-3xl md:text-5xl text-primary font-bold leading-tight">
              Hand-Crafted Pastries.
            </h2>
          </div>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed">
            Our bakery selection is prepared daily by master patissiers. Using
            only European butter and organic flour, every bite is designed to
            perfectly complement your coffee experience.
          </p>

          {/* قائمة المخبوزات المميزة */}
          <div className="space-y-0 pt-2">
            {PRODUCTS.filter((item) => item.category === "bakery").map(
              (item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center border-b border-outline-variant/30 py-5"
                >
                  <div>
                    <h4 className="font-body text-lg text-on-surface font-bold">
                      {item.name}
                    </h4>
                    <p className="font-body text-sm text-on-surface-variant mt-1">
                      {item.desc}
                    </p>
                  </div>
                  <span className="font-body text-lg text-primary font-bold ml-4">
                    {item.price}
                  </span>
                </div>
              ),
            )}
          </div>

          <div className="pt-4">
            <Link
              href="/menu"
              className="inline-block border-2 border-primary text-primary font-body font-semibold py-3 px-8 rounded-full hover:bg-primary hover:text-on-primary transition-colors duration-300"
            >
              View Full Bakery Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
