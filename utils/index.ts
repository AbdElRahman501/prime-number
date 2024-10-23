import { CartItem } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export function formatPrice(price: number, currency: "EGP" | "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function addToCart(cart: string[], phoneNumber: string) {
  const isInCart = cart.find((x) => x === phoneNumber);
  if (!isInCart) {
    return [...cart, phoneNumber];
  } else {
    return cart;
  }
}
export function removeFromCart(cart: string[], phoneNumber: string | number) {
  return cart.filter((x) => x !== phoneNumber);
}

export function isInCart(cart: CartItem[], phoneNumber: string) {
  if (!cart || !phoneNumber) return [];
  return cart.some((item) => item.phoneNumber === phoneNumber);
}

export const getMatchingItemsByKey = (
  arr1: never[],
  arr2: string[],
  key: string,
): never[] => {
  return arr1.filter((item1) => arr2.includes(item1[key])) as never[];
};

export function toggleWishListItem(wishList: string[], phoneNumber: string) {
  const isInWishList = wishList.find((x) => x === phoneNumber);
  if (!isInWishList) {
    return [...wishList, phoneNumber];
  } else {
    return wishList.filter((x) => x !== phoneNumber);
  }
}

export function createWhatsAppLink(
  phoneNumber: string,
  message: string,
): string {
  // Remove any non-numeric characters from the phone number
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  // Encode the message to ensure it works with URLs
  const encodedMessage = encodeURIComponent(message);

  // Return the full WhatsApp API link
  return `https://api.whatsapp.com/send?phone=${cleanedNumber}&text=${encodedMessage}`;
}
