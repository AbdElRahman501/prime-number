import { phoneNumbers } from "@/constants";
import dynamic from "next/dynamic";

export const metadata = {
  title: "ابحث عن رقم الهاتف المميز",
  description:
    "اكتشف أفضل الأرقام المميزة في مصر، وابحث عن الرقم المثالي لك بسهولة.",
};

const ProductCard = dynamic(() => import("@/components/ProductCard"), {
  ssr: false,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Destructure searchValue from searchParams
  const { q: searchValue } = searchParams as {
    [key: string]: string;
  };

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
          phoneNumbers.map((phoneNumber) => (
            <ProductCard key={phoneNumber._id} {...phoneNumber} />
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
