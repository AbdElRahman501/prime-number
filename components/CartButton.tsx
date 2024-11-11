"use client";
import { cartHandler } from "@/app/lib/cart";
import { addToLocalStorage, toggleItemInArray } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

const CartButton: React.FC<{
  phoneNumber: string;
  cart: string[];
}> = ({ phoneNumber, cart }) => {
  const isInCart = cart.find((c) => c === phoneNumber) ? true : false;
  const [inCart, setInCart] = useState(isInCart);

  useEffect(() => {
    if (inCart !== isInCart) {
      setInCart(isInCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInCart]);

  return (
    <button
      onClick={async () => {
        setInCart(!inCart);
        addToLocalStorage("cart", toggleItemInArray(cart, phoneNumber));
        await cartHandler(phoneNumber);
      }}
      aria-label={`إضافة ${phoneNumber} إلى السلة`}
      className="rounded-full bg-background p-2"
    >
      <Icon
        className="h-6 w-6"
        icon={inCart ? "solar:bag-bold" : "solar:bag-linear"}
      />
    </button>
  );
};

export default CartButton;
