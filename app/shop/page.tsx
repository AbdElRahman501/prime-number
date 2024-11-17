import { companies, sortOptions } from "@/constants";
import ProductCard from "@/components/ProductCard";
import { CompanyName } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import {
  fetchFilteredProducts,
  fetchProductByPhoneNumber,
} from "@/lib/actions/product.actions";
import Link from "next/link";
import { fetchStore } from "@/lib/actions/store.actions";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const { prime } = searchParams as {
    [key: string]: string;
  };

  const phoneNumber = await fetchProductByPhoneNumber(prime);
  const color =
    companies.find((c) => c.name === phoneNumber?.company)?.color || "gray";
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
          url: `/api/og?title=${encodeURIComponent(phoneNumber?.phoneNumber || "")}&color=${encodeURIComponent(color)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [
        `/api/og?title=${encodeURIComponent(phoneNumber?.phoneNumber || "")}&color=${encodeURIComponent(color)}`,
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

  const store = await fetchStore();
  // Destructure searchValue from searchParams
  const {
    q: query,
    minP,
    maxP,
    ctf,
    sort: sortKey,
    prime,
    lim,
  } = searchParams as {
    [key: string]: string;
  };

  const { sortBy, sort } =
    sortOptions.find((option) => option.value === sortKey) || {};

  const limit = parseInt(lim) || 16;
  const minPrice = parseInt(minP) || 0;
  const maxPrice = parseInt(maxP) || Infinity;
  const companies = ctf?.split(",") as CompanyName[];

  const { phoneNumbers, totalProducts } = await fetchFilteredProducts({
    limit,
    sort,
    minPrice,
    maxPrice,
    companies,
    sortBy,
    query: prime || query,
  });

  return (
    <section className="flex min-h-[60vh] flex-1 flex-col gap-4">
      {query && (
        <p className="mb-4" aria-live="polite">
          {phoneNumbers.length === 0
            ? "لا توجد نتائج مطابقة"
            : `عرض ${phoneNumbers.length} نتيجة مطابقة لـ `}
          <span className="font-bold">&quot;{query}&quot;</span>
        </p>
      )}
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {phoneNumbers.length > 0 ? (
          phoneNumbers.map((phoneNumber) => (
            <ProductCard
              key={phoneNumber._id}
              {...phoneNumber}
              cart={cart}
              wishList={wishList}
              store={store}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            لا توجد أرقام متاحة
          </p>
        )}
      </div>
      {totalProducts > limit ? (
        <Link
          href={{
            query: {
              ...searchParams,
              lim: String(limit + 10),
            },
          }}
          scroll={false}
          className="mt-4 w-full rounded-3xl border border-primary py-4 text-center font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
          aria-label="تحميل المزيد من الأرقام"
        >
          تحميل المزيد...
        </Link>
      ) : null}
    </section>
  );
}
