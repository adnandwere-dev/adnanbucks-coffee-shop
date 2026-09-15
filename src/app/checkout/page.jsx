"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/lib/store";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useAppContext();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isDiscountReady, setIsDiscountReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedDiscount = Number(
        localStorage.getItem("adnanbucks_discount") || 0,
      );

      setDiscount(savedDiscount === 0.2 ? 0.2 : 0);
      setIsDiscountReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDiscountReady && cart.length === 0 && !isSuccess) {
      router.replace("/cart");
    }
  }, [cart, isSuccess, isDiscountReady, router]);

  const discountAmount = cartTotal * discount;
  const subtotalAfterDiscount = cartTotal - discountAmount;
  const tax = subtotalAfterDiscount * 0.08;
  const finalTotal = subtotalAfterDiscount + tax;

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    const randomOrder = `AB-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;

    setOrderNumber(randomOrder);
    setIsSuccess(true);

    localStorage.removeItem("adnanbucks_discount");
    clearCart();
  };

  if (!isDiscountReady || (cart.length === 0 && !isSuccess)) {
    return null;
  }

  return (
    <div className="site-entrance min-h-screen bg-surface pt-8 pb-24">
      <div className="mx-auto mb-12 flex max-w-7xl items-center justify-center border-b border-outline-variant/20 px-4 pb-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-headline text-3xl font-bold tracking-tight text-primary"
        >
          AdnanBucks
        </Link>

        <div className="ml-4 flex items-center border-l border-outline-variant/50 pl-4 font-body text-sm text-outline">
          <span className="material-symbols-outlined mr-1 text-[18px]">
            lock
          </span>
          Secure Checkout
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="site-entrance-delay-1 space-y-6 lg:col-span-7">
            <div
              className={`overflow-hidden rounded-2xl border bg-surface-container-lowest transition-all duration-500 ${
                activeStep === 1
                  ? "border-primary/50 shadow-md"
                  : "border-outline-variant/30"
              }`}
            >
              <div
                className="flex cursor-pointer items-center justify-between p-6"
                onClick={() => setActiveStep(1)}
              >
                <h3
                  className={`font-headline flex items-center gap-3 text-xl font-bold ${
                    activeStep === 1
                      ? "text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-body text-sm ${
                      activeStep === 1
                        ? "bg-primary text-on-primary"
                        : "bg-outline-variant/20 text-on-surface-variant"
                    }`}
                  >
                    1
                  </span>
                  Delivery Method
                </h3>

                {activeStep > 1 && (
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                )}
              </div>

              <div
                className={`overflow-hidden px-6 transition-all duration-500 ${
                  activeStep === 1
                    ? "max-h-[500px] pb-6 opacity-100"
                    : "max-h-0 pb-0 opacity-0"
                }`}
              >
                <div className="mb-6 grid grid-cols-2 gap-4 border-t border-outline-variant/20 pt-4">
                  <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-primary bg-primary/5 p-4">
                    <input
                      type="radio"
                      name="delivery"
                      defaultChecked
                      className="sr-only"
                    />
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary">
                      storefront
                    </span>
                    <span className="font-body text-center text-sm font-bold text-primary">
                      In-Store Pickup
                    </span>
                  </label>

                  <label className="flex cursor-not-allowed flex-col items-center rounded-xl border border-outline-variant/30 bg-surface p-4 opacity-50">
                    <input
                      type="radio"
                      name="delivery"
                      disabled
                      className="sr-only"
                    />
                    <span className="material-symbols-outlined mb-2 text-3xl text-outline">
                      local_shipping
                    </span>
                    <span className="font-body text-center text-sm font-bold text-outline">
                      Delivery (Unavailable)
                    </span>
                  </label>
                </div>

                <div className="mb-6 flex items-start gap-2 rounded-lg bg-surface-container-low p-4 font-body text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined mt-0.5 flex-shrink-0 text-[18px] text-primary">
                    info
                  </span>
                  Pickup available at AdnanBucks Main Roastery (123 Coffee Ave)
                  in approximately 15 minutes.
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="rounded-full bg-primary px-8 py-3 font-body font-bold text-on-primary transition-colors hover:opacity-90"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`overflow-hidden rounded-2xl border bg-surface-container-lowest transition-all duration-500 ${
                activeStep === 2
                  ? "border-primary/50 shadow-md"
                  : "border-outline-variant/30"
              }`}
            >
              <div
                className="flex cursor-pointer items-center justify-between p-6"
                onClick={() => activeStep > 1 && setActiveStep(2)}
              >
                <h3
                  className={`font-headline flex items-center gap-3 text-xl font-bold ${
                    activeStep === 2
                      ? "text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-body text-sm ${
                      activeStep === 2
                        ? "bg-primary text-on-primary"
                        : "bg-outline-variant/20 text-on-surface-variant"
                    }`}
                  >
                    2
                  </span>
                  Payment Details
                </h3>
              </div>

              <div
                className={`overflow-hidden px-6 transition-all duration-500 ${
                  activeStep === 2
                    ? "max-h-[800px] pb-6 opacity-100"
                    : "max-h-0 pb-0 opacity-0"
                }`}
              >
                <form
                  onSubmit={handlePlaceOrder}
                  className="space-y-5 border-t border-outline-variant/20 pt-4"
                >
                  <div>
                    <label className="mb-1.5 block font-body text-sm font-bold text-on-surface">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="Mohammad Adnan"
                      className="w-full rounded-xl border border-outline-variant/50 bg-surface px-4 py-3 font-body transition-colors focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-body text-sm font-bold text-on-surface">
                      Card Number (Mock)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        defaultValue="4111 1111 1111 1111"
                        className="w-full rounded-xl border border-outline-variant/50 bg-surface py-3 pl-11 pr-4 font-body transition-colors focus:border-primary focus:outline-none"
                      />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                        credit_card
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block font-body text-sm font-bold text-on-surface">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        defaultValue="12/26"
                        className="w-full rounded-xl border border-outline-variant/50 bg-surface px-4 py-3 font-body transition-colors focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block font-body text-sm font-bold text-on-surface">
                        CVC
                      </label>
                      <input
                        type="text"
                        required
                        defaultValue="123"
                        className="w-full rounded-xl border border-outline-variant/50 bg-surface px-4 py-3 font-body transition-colors focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-body text-lg font-bold text-on-primary shadow-md transition-colors hover:opacity-90"
                  >
                    <span className="material-symbols-outlined">lock</span>
                    Place Order • ${finalTotal.toFixed(2)}
                  </button>

                  <p className="text-center font-body text-xs text-outline">
                    This is a mock payment gateway. No real funds will be
                    charged.
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="site-entrance-delay-2 lg:col-span-5">
            <div className="sticky top-8 rounded-3xl border border-outline-variant/20 bg-surface-container-low p-6 sm:p-8">
              <h2 className="mb-6 font-headline text-2xl font-bold text-primary">
                In Your Bag
              </h2>

              <div className="mb-6 max-h-[300px] space-y-4 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-outline-variant/20 pb-4 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg relative bg-surface">
                        <Image
                          fill
                          sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <h4 className="line-clamp-1 font-body text-sm font-bold text-on-surface">
                          {item.name}
                        </h4>
                        <p className="font-body text-xs text-on-surface-variant">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <span className="ml-2 font-body text-sm font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-outline-variant/30 pt-4 font-body text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Promo discount (20%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="mt-2 flex justify-between border-t border-outline-variant/30 pt-3 font-body text-lg font-bold text-on-surface">
                  <span>Total</span>
                  <span className="text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/90 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center shadow-2xl md:p-12">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <span className="material-symbols-outlined text-5xl text-primary">
                task_alt
              </span>
            </div>

            <h2 className="mb-4 font-headline text-3xl font-bold text-primary md:text-4xl">
              Order Received!
            </h2>

            <p className="mb-2 font-body text-lg text-on-surface-variant">
              Thank you for your order. We&apos;re crafting your perfect brew
              right now.
            </p>

            <div className="my-8 rounded-xl bg-surface-container-low p-4">
              <span className="mb-1 block font-body text-sm text-outline">
                Order Number
              </span>
              <span className="font-headline text-2xl font-bold tracking-wider text-primary">
                {orderNumber}
              </span>
            </div>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full rounded-full bg-primary px-8 py-4 font-body font-bold text-on-primary transition-colors hover:opacity-90"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
