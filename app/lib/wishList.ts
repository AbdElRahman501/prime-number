"use server";
import { increaseScore } from "@/lib/actions/product.actions";
import { toggleItemInArray } from "@/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function wishListHandler(phoneNumber: string) {
  try {
    const wishListData = cookies().get("wishList")?.value;
    const wishList: string[] = wishListData ? JSON.parse(wishListData) : [];
    const inWishList = wishList.find((x) => x === phoneNumber);
    cookies().set(
      "wishList",
      JSON.stringify(toggleItemInArray(wishList, phoneNumber)),
    );
    if (!inWishList) {
      increaseScore(phoneNumber);
    }
    revalidateTag("wishList");
    return "added to wishList";
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
}

export async function addWishListItems(
  previousState: unknown,
  wishList: string[],
) {
  cookies().set("wishList", JSON.stringify(wishList));
  revalidateTag("wishList");
  return "added to wishList";
}
