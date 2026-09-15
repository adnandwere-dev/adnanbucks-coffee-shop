"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, Search, SearchX } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useAppContext } from "@/lib/store";

function MenuPageContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [toast, setToast] = useState(null);

  const toastTimeoutRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { addToCart } = useAppContext();

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleSearchChange = (event) => {
    const nextSearch = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (nextSearch.trim()) {
      params.set("search", nextSearch);
    } else {
      params.delete("search");
    }

    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (product) => {
    addToCart({
      id: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: "Grande",
      image: product.image,
      isHot: product.isHot,
    });

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast({
      message: `✓ ${product.name} added!`,
    });

    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 2000);
  };

  const categories = [
    { id: "all", label: "All Menu" },
    { id: "coffee", label: "Hot Coffees" },
    { id: "iced", label: "Cold Coffees" },
    { id: "bakery", label: "Bakery" },
    { id: "desserts", label: "Desserts" },
    { id: "seasonal", label: "Seasonal" },
  ];

  return (
    <div className="site-entrance min-h-screen bg-surface pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            Our Menu
          </h1>

          <p className="mt-3 font-body text-on-surface-variant">
            Sourced globally, roasted locally.
          </p>
        </div>

        <div className="relative mx-auto mb-8 max-w-2xl">
          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline"
          />

          <input
            type="search"
            placeholder="Search drinks, bakery..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-full border-none bg-surface-container-low py-3 pl-12 pr-4 font-body text-on-surface transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="mb-10 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap rounded-full px-6 py-2.5 font-body text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="menu-product-card group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-surface-container-low">
                    <Image
                      fill
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {product.tags.includes("Bestseller") && (
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors duration-200 dark:bg-surface-container-high dark:text-on-surface">
                        Bestseller
                      </div>
                    )}

                    {product.category === "seasonal" && (
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors duration-200 dark:bg-surface-container-high dark:text-on-surface">
                        Seasonal
                      </div>
                    )}
                  </div>

                  <div className="p-5 pb-0">
                    <h3 className="mb-1 line-clamp-2 font-body text-base font-bold text-on-surface transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>

                    <p className="line-clamp-2 font-body text-sm text-outline">
                      {product.description}
                    </p>
                  </div>
                </Link>

                <div className="mt-auto flex items-center justify-between border-t border-outline-variant/20 p-5 pt-4">
                  <span className="font-headline text-xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-[color,background-color,transform] duration-300 hover:scale-[1.03] hover:bg-primary hover:text-on-primary"
                    aria-label={`Add ${product.name} to order`}
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <SearchX size={56} className="mx-auto mb-4 text-outline-variant" />

            <h3 className="mb-2 font-headline text-2xl font-bold text-on-surface">
              No items found
            </h3>

            <p className="font-body text-on-surface-variant">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </div>

      {toast && (
        <div
          className="fixed bottom-24 right-4 z-50 rounded-xl bg-primary px-6 py-3 font-body font-bold text-on-primary shadow-2xl md:bottom-8 md:right-8"
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface pt-28" />}>
      <MenuPageContent />
    </Suspense>
  );
}
