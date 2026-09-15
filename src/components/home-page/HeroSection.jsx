import Link from "next/link";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="site-entrance relative pt-[120px] pb-24 md:pt-[160px] md:pb-[120px] px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center">
      {/* طبقة الخلفية مع صورة وتدرج لوني */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          fill
          priority
          src={"/images/home-page/1.jpg"}
          alt={"AdnanBucks Roastery Interior"}
          className="w-full h-full object-cover object-center opacity-90 dark:opacity-70 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent z-10 transition-colors duration-300"></div>
      </div>

      {/* محتوى Hero */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 lg:col-span-6 flex flex-col justify-center space-y-6">
          <span className="font-body text-xs sm:text-sm text-on-surface-variant font-bold uppercase tracking-[0.2em]">
            Artisanal Roastery
          </span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary font-bold tracking-tight leading-[1.1]">
            Elevating the <br />
            Art of Coffee.
          </h1>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-md">
            Experience the finest single-origin beans, roasted to perfection in
            our boutique roastery. A sanctuary for the modern coffee
            connoisseur.
          </p>
          <div className="pt-4">
            <Link
              href="/menu"
              className="inline-block bg-primary text-on-primary font-body font-semibold py-4 px-8 rounded-full hover:opacity-90 transition-all shadow-lg hover:-translate-y-1 active:translate-y-0"
            >
              Discover Our Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
