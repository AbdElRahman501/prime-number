"use client";
import { wishListHandler } from "@/app/lib/wishList";
import { addToLocalStorage, toggleItemInArray } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const WishListButton: React.FC<{
  phoneNumber: string;
  wishList: string[];
}> = ({ phoneNumber, wishList }) => {
  const isInWishList = wishList.find((c) => c === phoneNumber) ? true : false;
  const [inWishList, setInWishList] = useState(isInWishList);

  return (
    <button
      onClick={async () => {
        setInWishList(!inWishList);
        await wishListHandler(phoneNumber);
        addToLocalStorage("wishList", toggleItemInArray(wishList, phoneNumber));
      }}
      aria-label={`إضافة ${phoneNumber} إلى السلة`}
      className="rounded-full bg-background p-2"
    >
      <Icon
        className="h-6 w-6"
        icon={inWishList ? "mdi:bookmark" : "mdi:bookmark-outline"}
      />
    </button>
  );
};

export default WishListButton;
