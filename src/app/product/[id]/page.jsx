"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Coffee,
  Flame,
  Info,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { getPairings, getProductById } from "@/lib/data";
import { useAppContext } from "@/lib/store";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useAppContext();

  const productId = params.id;
  const product = getProductById(productId);

  const [size, setSize] = useState("Grande");
  const [milk, setMilk] = useState("Whole Milk");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 pt-[80px] text-center">
        <Coffee
          size={64}
          strokeWidth={1.5}
          className="mb-4 text-outline-variant"
        />

        <h1 className="mb-4 font-headline text-3xl font-bold text-primary">
          Product Not Found
        </h1>

        <p className="mb-6 max-w-md font-body text-on-surface-variant">
          This item may have been removed or the link is incorrect.
        </p>

        <Link
          href="/menu"
          className="rounded-full bg-primary px-6 py-3 font-body font-bold text-on-primary transition-opacity hover:opacity-90"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  const isDrink = ["coffee", "iced", "seasonal"].includes(product.category);

  const priceAdjustment = size === "Tall" ? -0.5 : size === "Venti" ? 0.7 : 0;

  const finalPrice = product.price + priceAdjustment;
  const totalPrice = finalPrice * quantity;

  const pairings = getPairings(product.id, 3);

  const sizeOptions = [
    { label: "Tall", oz: "12 fl oz", adjustment: "-$0.50" },
    { label: "Grande", oz: "16 fl oz", adjustment: "Base" },
    { label: "Venti", oz: "24 fl oz", adjustment: "+$0.70" },
  ];

  const milkOptions = ["Whole Milk", "Skim Milk", "Oat Milk", "Almond Milk"];

  const handleAddToCart = () => {
    const cartItemId = isDrink
      ? `${product.id}-${encodeURIComponent(size)}-${encodeURIComponent(milk)}`
      : `${product.id}-standard`;

    addToCart({
      id: cartItemId,
      productId: product.id,
      name: product.name,
      price: finalPrice,
      quantity,
      size: isDrink ? size : "Standard",
      milk: isDrink ? milk : undefined,
      image: product.image,
      isHot: product.isHot,
    });

    router.push("/cart");
  };

  return (
    <div className="site-entrance min-h-screen bg-surface pb-32 pt-[100px] md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center text-sm font-body text-outline"
        >
          <Link href="/menu" className="transition-colors hover:text-primary">
            Menu
          </Link>

          <ChevronRight size={16} className="mx-1 shrink-0" />

          <span className="capitalize">{product.category}</span>

          <ChevronRight size={16} className="mx-1 shrink-0" />

          <span className="truncate font-semibold text-on-surface">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="site-entrance-delay-1 lg:col-span-6">
            <div className="relative  flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low soft-shadow">
              <Image
                fill
                priority
                src={product.image}
                alt={product.name}
                sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
                className="h-full w-full object-cover"
              />

              {product.calories && (
                <div className="absolute right-6 top-6 flex items-center rounded-full border border-outline-variant/30 bg-surface/80 px-4 py-2 font-body text-xs font-bold text-on-surface shadow-sm backdrop-blur-md">
                  <Flame size={16} className="mr-1 text-primary" />
                  {product.calories}
                </div>
              )}
            </div>
          </div>

          <div className="site-entrance-delay-2 flex flex-col lg:col-span-6">
            <div className="mb-8 border-b border-outline-variant/30 pb-8">
              <h1 className="mb-4 font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                {product.name}
              </h1>

              <p className="mb-6 font-body text-lg leading-relaxed text-on-surface-variant">
                {product.description}
              </p>

              {product.ingredients?.length > 0 && (
                <div className="rounded-xl bg-surface-container-low p-4">
                  <h2 className="mb-3 flex items-center font-body text-sm font-bold text-on-surface">
                    <Info size={18} className="mr-2 text-primary" />
                    What&apos;s inside
                  </h2>

                  <ul className="grid grid-cols-1 gap-2 font-body text-sm text-on-surface-variant sm:grid-cols-2">
                    {product.ingredients.map((ingredient) => (
                      <li key={ingredient} className="flex items-center">
                        <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {isDrink && (
              <div className="mb-8 flex-grow space-y-8">
                <section>
                  <h2 className="mb-4 font-headline text-xl font-bold text-primary">
                    Size Options
                  </h2>

                  <div className="grid grid-cols-3 gap-3">
                    {sizeOptions.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setSize(option.label)}
                        className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all duration-300 ${
                          size === option.label
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:border-outline"
                        }`}
                      >
                        <Coffee
                          strokeWidth={2}
                          className={`mb-2 ${
                            option.label === "Tall"
                              ? "h-6 w-6"
                              : option.label === "Grande"
                                ? "h-8 w-8"
                                : "h-10 w-10"
                          }`}
                        />

                        <span className="font-body text-sm font-bold">
                          {option.label}
                        </span>

                        <span className="mt-1 text-xs opacity-70">
                          {option.oz}
                        </span>

                        <span className="mt-1 text-xs font-semibold opacity-80">
                          {option.adjustment}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="mb-4 font-headline text-xl font-bold text-primary">
                    Milk Choice
                  </h2>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {milkOptions.map((milkOption) => (
                      <button
                        key={milkOption}
                        type="button"
                        onClick={() => setMilk(milkOption)}
                        className={`rounded-xl border px-3 py-3 text-center font-body text-sm font-semibold transition-all duration-300 ${
                          milk === milkOption
                            ? "border-primary bg-primary text-on-primary shadow-md"
                            : "border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low"
                        }`}
                      >
                        {milkOption}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            )}

            <div className="fixed bottom-0 left-0 z-40 w-full border-t border-outline-variant/30 bg-surface/90 p-4 backdrop-blur-xl md:static md:border-t-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <div className="flex items-center rounded-full border border-outline-variant/30 bg-surface-container-low">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((currentQuantity) =>
                        Math.max(1, currentQuantity - 1),
                      )
                    }
                    className="flex h-12 w-11 items-center justify-center rounded-l-full text-primary transition-colors hover:bg-outline-variant/20"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={20} />
                  </button>

                  <span className="w-8 text-center font-body font-bold text-on-surface">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((currentQuantity) => currentQuantity + 1)
                    }
                    className="flex h-12 w-11 items-center justify-center rounded-r-full text-primary transition-colors hover:bg-outline-variant/20"
                    aria-label="Increase quantity"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex h-12 flex-grow items-center justify-center gap-2 rounded-full bg-primary font-body font-bold text-on-primary shadow-md transition-all hover:opacity-90 hover:shadow-lg"
                >
                  <ShoppingBag size={19} />
                  <span>Add to Order</span>
                  <span className="opacity-80">• ${totalPrice.toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {pairings.length > 0 && (
          <section className="site-entrance-delay-3 mt-24 border-t border-outline-variant/20 pt-16">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold text-primary">
              Perfect Pairings
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {pairings.map((pairing) => (
                <Link
                  href={`/product/${pairing.id}`}
                  key={pairing.id}
                  className="group flex items-center gap-4 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-4 transition-all hover:shadow-md"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden relative rounded-xl bg-surface-container-low">
                    <Image
                      fill
                      sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
                      src={pairing.image}
                      alt={pairing.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <div>
                    <h3 className="mb-1 font-body font-bold text-on-surface transition-colors group-hover:text-primary">
                      {pairing.name}
                    </h3>

                    <span className="font-headline text-lg font-bold text-primary">
                      ${pairing.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
