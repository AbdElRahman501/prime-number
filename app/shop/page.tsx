import ProductCard from "@/components/ProductCard";
import { phoneNumbers } from "@/constants";
import { CompanyName, Sort } from "@/types";
import { filterPhoneNumbers } from "@/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const { prime } = searchParams as {
    [key: string]: string;
  };

  const phoneNumber = phoneNumbers.find((item) => item.phoneNumber === prime);
  const title = phoneNumber?.phoneNumber
    ? `شراء رقم الهاتف المميز (${phoneNumber.phoneNumber}) - بريم نمبر`
    : "شراء رقم الهاتف المميز - بريم نمبر";
  const description = phoneNumber?.phoneNumber
    ? "شراء رقم الهاتف المميز (" + phoneNumber.phoneNumber + ") - بريم نمبر"
    : "شراء رقم الهاتف المميز - بريم نمبر";
  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(phoneNumber?.phoneNumber || "")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [
        `/api/og?title=${encodeURIComponent(phoneNumber?.phoneNumber || "")}`,
      ],
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];

  const wishListData = cookies().get("wishList")?.value;
  const wishList: string[] = wishListData ? JSON.parse(wishListData) : [];

  // Destructure searchValue from searchParams
  const {
    q: searchValue,
    minP,
    maxP,
    ctf,
    sort,
  } = searchParams as {
    [key: string]: string;
  } & { ctf?: CompanyName[]; sort?: Sort };

  return (
    <>
      {searchValue && (
        <p className="mb-4" aria-live="polite">
          {phoneNumbers.length === 0
            ? "لا توجد نتائج مطابقة"
            : `عرض ${phoneNumbers.length} نتيجة مطابقة لـ `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      )}
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {phoneNumbers.length > 0 ? (
          filterPhoneNumbers(
            phoneNumbers,
            searchValue,
            maxP,
            minP,
            ctf,
            sort,
          ).map((phoneNumber) => (
            <ProductCard
              key={phoneNumber._id}
              {...phoneNumber}
              cart={cart}
              wishList={wishList}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            لا توجد أرقام متاحة
          </p>
        )}
      </div>
      <button
        className="mt-4 w-full rounded-3xl border border-primary py-4 text-center font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
        aria-label="تحميل المزيد من الأرقام"
      >
        تحميل المزيد...
      </button>
    </>
  );
}
