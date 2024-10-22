"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CartItem } from "@/types";
import { formatPrice } from "@/utils";

export default function CartModal({ cart }: { cart: CartItem[] | undefined }) {
  console.log("🚀 ~ CartModal ~ cart:", cart);
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-label="Open cart"
        className="text-2xl text-primary hover:text-foreground sm:text-3xl"
        onClick={openCart}
      >
        <Icon icon="solar:bag-bold" aria-hidden="true" />
      </button>

      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`${isOpen ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 h-screen w-screen bg-black/30 backdrop-blur-sm duration-700`}
      ></div>

      {/* Cart Modal */}

      <div
        style={{ right: isOpen ? "0" : "-100%" }}
        className="fixed inset-0 z-10 flex h-full w-full flex-col border-l border-neutral-200 bg-black/80 p-6 text-background backdrop-blur-xl duration-500 ease-in-out md:w-[390px] dark:border-neutral-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">الحقيبة</p>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-lg"
          >
            ✕
          </button>
        </div>

        {/* Cart Content */}
        <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
          {/* Empty Cart */}
          <Icon
            icon="solar:bag-bold"
            className="h-20 w-20"
            aria-hidden="true"
          />
          <p className="mt-6 text-center text-2xl font-bold">الحقيبة فارغة.</p>
        </div>

        {/* Cart with Items */}
        <div className="flex h-full flex-col justify-between overflow-hidden p-1">
          <ul className="flex-grow overflow-auto py-4"></ul>

          {/* Price Details */}
          <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
              <p className="text-base text-black dark:text-white">المجموع</p>
              <p className="text-lg font-semibold text-black dark:text-white">
                {formatPrice(5000, "EGP")}
              </p>
            </div>
          </div>

          {/* Checkout Button */}
          <Link
            href="#buy"
            className="flex items-center justify-center gap-3 rounded-full bg-background px-10 py-3 text-2xl font-semibold text-primary hover:opacity-90 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
            role="button"
            aria-label="Buy Now"
          >
            <span>شراء الان</span>
            <Icon icon="ri:whatsapp-fill" />
          </Link>
        </div>
      </div>
    </>
  );
}
