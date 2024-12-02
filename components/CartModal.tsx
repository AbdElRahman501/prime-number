"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  addToLocalStorage,
  createWhatsAppLink,
  formatPrice,
  toggleItemInArray,
} from "@/utils";
import { PhoneNumber, Store } from "@/types";
import { cartHandler } from "@/app/lib/cart";

export default function CartModal({
  cart: initialCart,
  store,
}: {
  cart: PhoneNumber[] | undefined;
  store: Store;
}) {
  const [cart, setCart] = useState<PhoneNumber[]>(initialCart || []);
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const total = cart?.reduce((a, b) => a + b.price, 0) || 0;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("max-md:overflow-hidden");
    } else {
      document.body.classList.remove("max-md:overflow-hidden");
    }
    return () => {
      document.body.classList.remove("max-md:overflow-hidden");
    };
  }, [isOpen]);

  const allNumbers = cart?.map((item) => item.phoneNumber).join(", ") || "";

  useEffect(() => {
    if (JSON.stringify(cart) !== JSON.stringify(initialCart)) {
      setCart(initialCart || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCart]);

  return (
    <>
      <div className="relative">
        <button
          aria-label="Open cart"
          className="text-2xl text-primary hover:text-foreground sm:text-3xl"
          onClick={openCart}
        >
          <Icon icon="solar:bag-bold" aria-hidden="true" />
        </button>
        {cart && cart.length > 0 ? (
          <span
            role="status"
            aria-live="polite"
            className="pointer-events-none absolute right-0 top-0 block aspect-square h-4 w-4 rounded-full bg-red-500 text-center text-xs text-white"
          >
            {cart.length}
          </span>
        ) : null}
      </div>

      {/* backdrop Overlay */}
      <div
        onClick={closeCart}
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
        {!cart ||
          (cart.length === 0 && (
            <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
              {/* Empty Cart */}
              <Icon icon="solar:bag-bold" className="h-20 w-20" />
              <p className="mt-6 text-center text-2xl font-bold">
                الحقيبة فارغة.
              </p>
            </div>
          ))}

        {/* Cart with Items */}
        <div className="flex h-full flex-col justify-between overflow-hidden p-1">
          <ul className="flex-grow overflow-auto py-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-500 [&::-webkit-scrollbar]:w-2">
            {cart.map((item) => (
              <li
                key={item.phoneNumber}
                className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-700"
              >
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className={`font-semibold text-background`}>
                    {formatPrice(item.price, "EGP")}
                  </p>
                </div>
                <p className="text-lg font-semibold text-neutral-500">
                  {item.phoneNumber}
                </p>
                <button
                  onClick={async () => {
                    await cartHandler(item.phoneNumber);
                    addToLocalStorage(
                      "cart",
                      toggleItemInArray(
                        cart.map((item) => item.phoneNumber),
                        item.phoneNumber,
                      ),
                    );
                    setCart((pv) =>
                      pv.filter((p) => p.phoneNumber !== item.phoneNumber),
                    );
                  }}
                  aria-label={`ازالة ${item.phoneNumber}`}
                  className="text-lg"
                >
                  <Icon
                    id="trash"
                    className="h-5 w-5 text-background"
                    icon="solar:trash-bin-trash-bold"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Price Details */}
          <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
              <p className="text-base text-black dark:text-white">المجموع</p>
              <p className="text-lg font-semibold text-black dark:text-white">
                {formatPrice(total, "EGP")}
              </p>
            </div>
          </div>

          {/* Checkout Button */}
          {cart && cart.length > 0 ? (
            <Link
              target="_blank"
              href={createWhatsAppLink(store.contacts.phoneNumber, allNumbers)}
              className="flex items-center justify-center gap-3 rounded-full bg-background px-10 py-3 text-2xl font-semibold text-primary hover:opacity-90 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
              aria-label="Buy Now"
            >
              <span>شراء الان</span>
              <Icon icon="ri:whatsapp-fill" aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href="/shop"
              aria-label="Go to Shop"
              className="flex items-center justify-center gap-3 rounded-full bg-background px-10 py-3 text-2xl font-semibold text-primary hover:opacity-90 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
            >
              <div onClick={closeCart}>
                <span>تسوق الان</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
