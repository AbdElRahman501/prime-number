import ProductCard from "@/components/ProductCard";
import { phoneNumbers } from "@/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="max-w-8xl mx-auto min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-center text-3xl font-extrabold">المحفوظات</h1>
      {phoneNumbers.length === 0 ? (
        <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
          <Icon
            icon="solar:bag-bold"
            className="h-20 w-20"
            aria-hidden="true"
          />
          <p className="mt-6 text-center text-2xl font-bold">لا توجد محفوظات</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {phoneNumbers.map((phoneNumber) => (
            <Suspense key={phoneNumber._id}>
              <ProductCard {...phoneNumber} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
