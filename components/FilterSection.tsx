"use client";
import { companies, sortOptions } from "@/constants";
import {
  createUrl,
  getSearchParamsAsArray,
  toggleStringInArray,
} from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import LogoIcons from "./icons/logos";

const FilterSection: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialSort = searchParams?.get("sort") || "";
  const initialCategories = getSearchParamsAsArray(searchParams, "ctf");
  const initialMinPrice = parseInt(searchParams?.get("minP") || "") || "";
  const initialMaxPrice = parseInt(searchParams?.get("maxP") || "") || "";

  const [isOpen, setIsOpen] = useState(false);

  const [sort, setSort] = useState<string>(initialSort);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [minPrice, setMinPrice] = useState<number | string>(
    initialMinPrice || "",
  );
  const [maxPrice, setMaxPrice] = useState<number | string>(
    initialMaxPrice || "",
  );

  const changed = useMemo(
    () => minPrice || maxPrice || categories.length > 0 || sort,
    [minPrice, maxPrice, categories, sort],
  );

  // functions
  const openFilter = () => {
    initializeFilter();
    setIsOpen(true);
  };
  const closeFilter = () => setIsOpen(false);

  const initializeFilter = () => {
    setSort(initialSort);
    setCategories(initialCategories);
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
  };

  function submitHandler() {
    // setSubmitChanges(true);
    closeFilter();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", sort);
    newSearchParams.set("ctf", categories.join(","));
    newSearchParams.set("minP", minPrice.toString());
    newSearchParams.set("maxP", maxPrice.toString());
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  }

  function onReset() {
    router.replace(pathname, { scroll: false });
    setMinPrice(0);
    setMaxPrice("");
    setCategories([]);
    setSort("");
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("max-md:overflow-hidden");
    } else {
      document.body.classList.remove("max-md:overflow-hidden");
    }
    return () => {
      document.body.classList.remove("max-md:overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <div
        style={{
          bottom: isOpen ? "0" : "-100%",
        }}
        className="scroll-bar-hidden fixed left-0 z-20 flex h-fit w-full flex-col gap-4 overflow-y-auto rounded-3xl bg-background p-5 duration-500 ease-in-out md:static md:h-full md:max-h-none md:min-h-[70dvh] md:w-1/4 2xl:w-1/5"
      >
        <button
          className="absolute left-5 top-5 text-2xl md:hidden"
          onClick={submitHandler}
          aria-label="إغلاق الفلتر"
        >
          <Icon icon="ic:baseline-close" />
        </button>

        <h2 className="text-3xl font-bold">تصفية البحث</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">الترتيب</h3>
          <label htmlFor="ترتيب" className="sr-only">
            اختر ترتيب النتائج
          </label>
          <select
            name="ترتيب"
            id="ترتيب"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 w-full rounded-xl border border-background bg-white text-center text-sm text-primary"
            aria-label="اختر ترتيب النتائج"
          >
            <option value="">الإفتراضي</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">المجموعات</h3>
          <div className="flex flex-col gap-1">
            {companies.map((company) => (
              <button
                onClick={() =>
                  setCategories(toggleStringInArray(categories, company.name))
                }
                key={company._id}
                className={`rounded-xl border-2 p-2 px-4 text-sm hover:border-primary ${
                  categories.includes(company.name)
                    ? "bg-primary text-background"
                    : ""
                }`}
              >
                <div className="flex h-6 items-center justify-center">
                  <div className="flex h-6 w-32 justify-start gap-2 font-inter text-lg">
                    <LogoIcons
                      name={company.name}
                      className="aspect-square h-full min-w-6"
                      viewBox="0 0 50 50"
                    />
                    <div>
                      <p className="font-bold">{company.nameAr}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">السعر</h3>
          <div className="flex w-full items-center gap-1">
            <input
              type="number"
              placeholder="أقل سعر"
              name="min"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
              className="h-10 w-full rounded-xl border border-gray-200 text-center text-sm text-primary"
              aria-label="أقل سعر"
            />
            <span>إلى</span>
            <input
              type="number"
              name="max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              placeholder="أعلى سعر"
              className="h-10 w-full rounded-xl border border-gray-200 text-center text-sm text-primary"
              aria-label="أعلى سعر"
            />
            <input type="submit" className="hidden" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={submitHandler}
            className="mt-4 w-full rounded-3xl border-2 border-background bg-primary py-4 font-semibold text-background focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
          >
            <div className="flex h-full w-full items-center justify-center gap-2">
              <Icon icon="ic:baseline-filter-list" aria-label="تطبيق الفلتر" />
              <span className="mr-2">تطبيق الفلتر</span>
            </div>
          </button>
          <button
            onClick={onReset}
            className={` ${changed ? "visible" : "invisible"} w-ful font-semibold text-primary`}
          >
            مسح الفلتر
          </button>
        </div>
      </div>

      {/* Backdrop  */}
      {isOpen && (
        <button
          onClick={submitHandler}
          aria-label="إغلاق القائمة"
          aria-hidden="true"
          className="fixed inset-0 top-[76px] z-10 h-[calc(100dvh-50px)] w-screen bg-black/30 backdrop-blur-sm duration-700 md:hidden"
        />
      )}

      <div className="sticky bottom-0 left-0 w-full pb-4 md:hidden">
        <button
          onClick={openFilter}
          className="w-full rounded-3xl border-2 border-background bg-primary py-4 font-semibold text-background focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
        >
          <div className="flex h-full w-full items-center justify-center">
            <Icon
              icon="ic:baseline-filter-list"
              aria-label="فتح قائمة الفلتر"
            />
            <span className="ml-2">قائمة الفلتر</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default FilterSection;
