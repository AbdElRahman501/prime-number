"use server";
import { toggleWishListItem } from "@/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function wishListHandler(
  previousState: unknown,
  phoneNumber: string,
) {
  try {
    const wishListData = cookies().get("wishList")?.value;
    const wishList: string[] = wishListData ? JSON.parse(wishListData) : [];
    cookies().set(
      "wishList",
      JSON.stringify(toggleWishListItem(wishList, phoneNumber)),
    );
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
