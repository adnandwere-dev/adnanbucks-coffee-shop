"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/lib/store";

const PROMO_CODE = "COFFEE20";
const PROMO_DISCOUNT = 0.2;
const DISCOUNT_STORAGE_KEY = "adnanbucks_discount";

export default function CartPage() {
  const { cart, isCartReady, removeFromCart, updateQuantity, cartTotal } =
    useAppContext();

  const [promoCode, setPromoCode] = useState("");

  // قراءة الخصم المحفوظ مرة واحدة فقط عند إنشاء الصفحة.
  // لا يوجد useEffect ولا setState داخل useEffect.
  const [discount, setDiscount] = useState(() => {
    if (typeof window === "undefined") return 0;

    const savedDiscount = localStorage.getItem(DISCOUNT_STORAGE_KEY);

    return savedDiscount === String(PROMO_DISCOUNT) ? PROMO_DISCOUNT : 0;
  });

  const [promoMessage, setPromoMessage] = useState(() => {
    if (typeof window === "undefined") {
      return { text: "", isError: false };
    }

    const savedDiscount = localStorage.getItem(DISCOUNT_STORAGE_KEY);

    if (savedDiscount === String(PROMO_DISCOUNT)) {
      return {
        text: "✓ Promo code restored! 20% discount.",
        isError: false,
      };
    }

    return { text: "", isError: false };
  });

  const router = useRouter();

  const handleApplyPromo = () => {
    const cleanPromoCode = promoCode.trim().toUpperCase();

    if (!cleanPromoCode) {
      setPromoMessage({
        text: "Please enter a promo code.",
        isError: true,
      });
      return;
    }

    if (cleanPromoCode === PROMO_CODE) {
      setDiscount(PROMO_DISCOUNT);
      localStorage.setItem(DISCOUNT_STORAGE_KEY, String(PROMO_DISCOUNT));

      setPromoMessage({
        text: "✓ Promo code applied! 20% discount.",
        isError: false,
      });

      return;
    }

    setDiscount(0);
    localStorage.removeItem(DISCOUNT_STORAGE_KEY);

    setPromoMessage({
      text: "Invalid or expired promo code.",
      isError: true,
    });
  };

  const discountAmount = cartTotal * discount;
  const subtotalAfterDiscount = cartTotal - discountAmount;
  const tax = subtotalAfterDiscount * 0.08;
  const finalTotal = subtotalAfterDiscount + tax;

  if (!isCartReady) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-surface pt-[140px]">
        <p className="font-body text-on-surface-variant">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-surface px-4 pb-32 pt-[140px]">
        <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-surface-container-low">
          <ShoppingCart
            size={64}
            strokeWidth={1.5}
            className="text-outline-variant"
          />
        </div>

        <h2 className="mb-4 font-headline text-3xl font-bold text-primary">
          Your cart is empty
        </h2>

        <p className="mb-8 max-w-md text-center font-body text-on-surface-variant">
          Looks like you haven&apos;t made your choice yet. Explore our
          artisanal menu to find your perfect brew.
        </p>

        <button
          type="button"
          onClick={() => router.push("/menu")}
          className="rounded-full bg-primary px-10 py-4 font-body font-bold text-on-primary shadow-md transition-all hover:opacity-90 hover:shadow-lg"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-24 pt-[120px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-10 font-headline text-4xl font-bold text-primary">
          Your Order
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-item-enter flex flex-col gap-6 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 transition-colors hover:border-primary/30 sm:flex-row sm:p-6"
              >
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl relative bg-surface-container-low sm:w-32">
                  <Image
                    fill
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-grow flex-col">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-headline text-xl font-bold text-primary">
                          {item.name}
                        </h3>

                        <Link
                          href={`/product/${item.productId}`}
                          className="font-body text-xs font-bold text-primary/70 transition-colors duration-300 hover:text-primary"
                        >
                          View Details
                        </Link>
                      </div>

                      <p className="mt-1 font-body text-sm text-on-surface-variant">
                        {item.size}
                        {item.milk && ` • ${item.milk}`}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-lg p-2 text-outline-variant transition-colors hover:bg-error/10 hover:text-error"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={20} strokeWidth={2} />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex h-10 items-center rounded-full border border-outline-variant/30 bg-surface-container-low">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-full w-10 items-center justify-center rounded-l-full text-primary transition-colors hover:bg-outline-variant/20"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={18} strokeWidth={2.5} />
                      </button>

                      <span className="w-8 text-center font-body text-sm font-bold text-on-surface">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-full w-10 items-center justify-center rounded-r-full text-primary transition-colors hover:bg-outline-variant/20"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={18} strokeWidth={2.5} />
                      </button>
                    </div>

                    <span className="font-headline text-xl font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-[120px] rounded-3xl border border-outline-variant/20 bg-surface-container-low p-6 sm:p-8">
              <h2 className="mb-6 font-headline text-2xl font-bold text-primary">
                Order Summary
              </h2>

              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder='Try "COFFEE20"'
                    value={promoCode}
                    onChange={(event) => setPromoCode(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleApplyPromo();
                      }
                    }}
                    className="flex-grow rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 font-body text-sm transition-colors focus:border-primary focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="whitespace-nowrap rounded-lg bg-primary/10 px-4 py-3 font-body font-bold text-primary transition-colors hover:bg-primary/20"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage.text && (
                  <p
                    className={`mt-2 font-body text-xs font-medium ${
                      promoMessage.isError ? "text-error" : "text-primary"
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              <div className="mb-6 space-y-4 border-b border-outline-variant/30 pb-6 font-body text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between font-semibold text-primary">
                    <span>Discount (20%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-8 flex items-center justify-between">
                <span className="font-headline text-xl font-bold text-on-surface">
                  Total
                </span>

                <span className="font-headline text-3xl font-bold text-primary">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-body text-lg font-bold text-on-primary shadow-md transition-all hover:opacity-90 hover:shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
