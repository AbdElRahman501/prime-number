"use server";
import { addToCart, removeFromCart } from "@/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(previousState: unknown, phoneNumber: string) {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];
  cookies().set("cart", JSON.stringify(addToCart(cart, phoneNumber)));
  revalidateTag("cart");
  return "added to cart";
}
export async function removeItem(previousState: unknown, phoneNumber: string) {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];
  cookies().set("cart", JSON.stringify(removeFromCart(cart, phoneNumber)));
  revalidateTag("cart");
  return "removed from cart";
}
export async function cartHandler(
  previousState: unknown,
  { phoneNumber, type }: { phoneNumber: string; type: "add" | "remove" },
) {
  if (type === "add") {
    return addItem(previousState, phoneNumber);
  } else {
    return removeItem(previousState, phoneNumber);
  }
}
