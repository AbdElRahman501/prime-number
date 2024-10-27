import { FilterBar } from "@/components/FilterBar";
import FilterSection from "@/components/FilterSection";
import SearchField from "@/components/SearchField";
import { Suspense } from "react";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="container mx-auto">
      {/* SearchField */}
      <div className="m-5 mb-0 md:hidden">
        <Suspense>
          <SearchField />
        </Suspense>
      </div>
      <FilterBar />
      {/* Main Layout */}
      <div className="flex flex-col gap-4 p-5 md:flex-row">
        {/* Product Listing */}
        {children}
        {/* FilterSection */}
        <FilterSection />
      </div>
    </main>
  );
};

export default layout;
