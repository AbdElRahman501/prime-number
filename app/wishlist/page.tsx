import ProductCard from "@/components/ProductCard";
import { fetchProductsByPhoneNumbers } from "@/lib/actions/product.actions";
import { fetchStore } from "@/lib/actions/store.actions";
import { PhoneNumber } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const page = async () => {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];

  const wishListData = cookies().get("wishList")?.value;
  const wishList: string[] = wishListData ? JSON.parse(wishListData) : [];

  const store = await fetchStore();
  const phoneNumbers: PhoneNumber[] =
    await fetchProductsByPhoneNumbers(wishList);

  return (
    <div className="container mx-auto min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-center text-3xl font-extrabold">المحفوظات</h1>
      {phoneNumbers.length === 0 ? (
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
          {phoneNumbers.map((phoneNumber) => (
            <Suspense key={phoneNumber._id}>
              <ProductCard
                {...phoneNumber}
                cart={cart}
                wishList={wishList}
                store={store}
              />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
