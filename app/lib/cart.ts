"use server";
import { increaseScore } from "@/lib/actions/product.actions";
import { toggleItemInArray } from "@/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function cartHandler(phoneNumber: string) {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];
  const inCart = cart.find((c) => c === phoneNumber) ? true : false;

  cookies().set("cart", JSON.stringify(toggleItemInArray(cart, phoneNumber)));
  if (!inCart) {
    increaseScore(phoneNumber);
  }
  revalidateTag("cart");
  return "added to cart";
}

export async function addCartItems(previousState: unknown, cart: string[]) {
  cookies().set("cart", JSON.stringify(cart));
  revalidateTag("cart");
  return "added to cart items";
}
