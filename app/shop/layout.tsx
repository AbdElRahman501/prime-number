import dynamic from "next/dynamic";
import { Suspense } from "react";

const SearchField = dynamic(() => import("@/components/SearchField"), {
  ssr: false,
});
const FilterSection = dynamic(() => import("@/components/FilterSection"), {
  ssr: false,
});

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {/* SearchField */}
      <div className="m-5 mb-0 md:hidden">
        <Suspense>
          <SearchField />
        </Suspense>
      </div>

      {/* Uncomment the following line if you want to display applied filters */}
      {/* <div className="m-5 mb-0 md:hidden">الفلتر المطبق</div> */}

      {/* Main Layout */}
      <div className="flex flex-col gap-4 p-5 md:flex-row lg:px-20">
        {/* Product Listing */}
        <section className="flex min-h-[60vh] flex-1 flex-col gap-4">
          {children}
        </section>
        {/* FilterSection */}
        <FilterSection />
      </div>
    </>
  );
};

export default layout;
