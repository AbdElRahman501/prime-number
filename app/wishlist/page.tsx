import ProductCard from "@/components/ProductCard";
import { phoneNumbers } from "@/constants";
import { PhoneNumber } from "@/types";
import { getMatchingItemsByKey } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const page = () => {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];

  const wishListData = cookies().get("wishList")?.value;
  const wishList: string[] = wishListData ? JSON.parse(wishListData) : [];

  const wishListItems: PhoneNumber[] = getMatchingItemsByKey(
    phoneNumbers as never[],
    wishList,
    "phoneNumber",
  );

  return (
    <div className="max-w-8xl mx-auto min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-center text-3xl font-extrabold">المحفوظات</h1>
      {wishListItems.length === 0 ? (
        <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
          <Icon icon="mdi:bookmark" className="h-20 w-20" aria-hidden="true" />
          <p className="mt-6 text-center text-2xl font-bold">لا توجد محفوظات</p>
          <Link
            href="/shop"
            aria-label="Go to Shop"
            className="mt-5 flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-3 text-2xl font-semibold text-background hover:opacity-90 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
          >
            <span>تسوق الان</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {wishListItems.map((phoneNumber) => (
            <Suspense key={phoneNumber._id}>
              <ProductCard {...phoneNumber} cart={cart} wishList={wishList} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
