"use client";
import { createUrl } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchField: React.FC<{ onClick?: () => void; pathname?: string }> = ({
  onClick,
  pathname: initialPathname,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  let pathname = usePathname();
  pathname = initialPathname || pathname;
  const initialSearchText = searchParams.get("q") || "";
  const [searchText, setSearchText] = useState(initialSearchText);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
      newParams.delete("page");
      newParams.delete("prime");
    } else {
      newParams.delete("q");
    }
    onClick?.();
    router.push(createUrl(pathname, newParams));
  }

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("q");
    newParams.delete("prime");
    router.push(createUrl(pathname, newParams));
    setSearchText("");
  };

  useEffect(() => {
    setSearchText(searchParams.get("q") || "");
  }, [searchParams]);

  return (
    <form onSubmit={onSubmit} role="search" aria-label="نموذج البحث">
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          بحث
        </label>
        {searchText && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="مسح البحث"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary"
          >
            <Icon icon="mingcute:close-fill" aria-hidden="true" />
          </button>
        )}
        <input
          type="text"
          id="search"
          aria-labelledby="search-label" // Link to the label
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="ابحث هنا..."
          className="peer w-full rounded-full border border-foreground px-10 py-2 focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          aria-label="إرسال البحث"
          title="إرسال البحث" // Added title for better UX
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground peer-focus:text-primary"
        >
          <Icon icon="akar-icons:search" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};

export default SearchField;
