"use client";
import { companies } from "@/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const FilterSection: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);

  const handleToggle = () => setActive((prev) => !prev);
  const handleClose = () => setActive(false);

  return (
    <>
      <div
        style={{
          bottom: active ? "0" : "-100%",
        }}
        className="scroll-bar-hidden fixed left-0 z-20 flex h-fit w-full flex-col gap-4 overflow-y-auto rounded-3xl bg-background p-5 duration-500 ease-in-out md:static md:h-full md:max-h-none md:min-h-[70dvh] md:w-1/4 2xl:w-1/5"
      >
        <button
          className="absolute left-5 top-5 text-2xl md:hidden"
          onClick={handleClose}
          aria-label="إغلاق الفلتر"
        >
          <Icon icon="ic:baseline-close" />
        </button>

        <h1 className="text-3xl font-bold">تصفية البحث</h1>

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">الترتيب</h2>
          <label htmlFor="ترتيب" className="sr-only">
            اختر ترتيب النتائج
          </label>
          <select
            name="ترتيب"
            id="ترتيب"
            className="h-10 w-full rounded-xl border border-background text-center text-sm text-primary"
            aria-label="اختر ترتيب النتائج"
          >
            <option value="">الأحدث</option>
            <option value="">الأقدم</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">المجموعات</h2>
          <div className="flex flex-col gap-1">
            {companies.map((company) => (
              <button
                key={company._id}
                className={`rounded-xl border-2 p-2 px-4 text-sm duration-200 hover:scale-105 hover:bg-primary hover:text-background ${
                  company._id === "2" ? "bg-primary text-background" : ""
                }`}
              >
                <span>{`${company.name} (${12})`}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">السعر</h2>
          <div className="flex w-full items-center gap-1">
            <input
              type="number"
              placeholder="أقل سعر"
              name="min"
              className="h-10 w-full rounded-xl border border-gray-200 text-center text-sm text-primary"
              aria-label="أقل سعر"
            />
            <span>إلى</span>
            <input
              type="number"
              name="max"
              placeholder="أعلى سعر"
              className="h-10 w-full rounded-xl border border-gray-200 text-center text-sm text-primary"
              aria-label="أعلى سعر"
            />
            <input type="submit" className="hidden" />
          </div>
        </div>

        <button
          onClick={handleClose}
          className="mt-5 w-full rounded-3xl border-2 border-background bg-primary py-4 font-semibold text-background"
        >
          <div className="flex h-full w-full items-center justify-center gap-2">
            <Icon icon="ic:baseline-filter-list" aria-label="تطبيق الفلتر" />
            <span className="ml-2">تطبيق الفلتر</span>
          </div>
        </button>
      </div>

      {active && (
        <button
          onClick={handleClose}
          aria-label="إغلاق القائمة"
          aria-hidden="true"
          className="fixed inset-0 top-[76px] z-10 h-[calc(100dvh-50px)] w-screen bg-black/30 backdrop-blur-sm duration-700 md:hidden"
        />
      )}

      <div className="sticky bottom-0 left-0 w-full pb-4 md:hidden">
        <button
          onClick={handleToggle}
          className="w-full rounded-3xl border-2 border-background bg-primary py-4 font-semibold text-background"
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
