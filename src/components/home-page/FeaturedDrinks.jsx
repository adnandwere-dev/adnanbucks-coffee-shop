import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";

export default function FeaturedDrinks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* عنوان القسم */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">
            Signature Pours
          </h2>
          <p className="font-body text-base text-on-surface-variant">
            Crafted with precision, designed for the senses.
          </p>
        </div>

        {/* شبكة Bento للمشروبات */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* المشروب الرئيسي البارز */}
          <Link
            href="/product/signature-caramel-macchiato"
            className="md:col-span-8 rounded-2xl overflow-hidden relative group image-hover-scale soft-shadow h-[400px] md:h-[500px] border border-outline-variant/20 block"
          >
            <Image
              fill
              src={"/images/products/signature-caramel-macchiato.jpg"}
              alt="Signature Caramel Macchiato"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
              <div>
                <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest backdrop-blur-sm">
                  Bestseller
                </span>
                <h3 className="font-headline text-2xl md:text-3xl text-white mb-2">
                  Signature Caramel Macchiato
                </h3>
                <p className="font-body text-sm md:text-base text-white/80 max-w-sm">
                  A harmonious blend of our dark roast espresso, velvet milk,
                  and artisanal caramel drizzle.
                </p>
              </div>
            </div>
          </Link>

          {/* المشروبات الجانبية */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6 h-[400px] md:h-[500px]">
            <Link
              href="/product/heritage-pour-over"
              className="rounded-2xl overflow-hidden relative group soft-shadow h-full border border-outline-variant/20 bg-surface-container block"
            >
              <Image
                fill
                src="/images/products/heritage-pour-over.jpg"
                alt="Pour Over Reserve"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-transparent z-10"></div>
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  Featured
                </span>
              </div>
              <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                <h3 className="font-body text-xl text-white font-bold">
                  Pour Over Reserve
                </h3>
                <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
                  View Details
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </p>
              </div>
              
            </Link>
            <Link
              href="/product/rose-pistachio-latte"
              className="rounded-2xl overflow-hidden relative group soft-shadow h-full border border-outline-variant/20 bg-surface-container block"
            >
              <Image
                fill
                src="/images/products/rose-pistachio-latte.jpg"
                alt="Iced Matcha Latte"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/35 to-transparent z-10"></div>
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  Seasonal
                </span>
              </div>
              <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                <h3 className="font-body text-xl text-white font-bold">
                  Rose Pistachio Latte
                </h3>
                <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
                  View Details
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
