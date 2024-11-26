"use client";
import { createUrl } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

let timer: NodeJS.Timeout;
function debounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const SearchField: React.FC<{
  onClick?: () => void;
  pathname?: string;
}> = ({ onClick, pathname: initialPathname }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();
  const newPathname = initialPathname || pathname;

  const initialSearchText = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialSearchText);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());

    if (query) {
      newParams.set("q", query);
      newParams.delete("page");
      newParams.delete("prime");
    } else {
      newParams.delete("q");
    }
    onClick?.();
    router.push(createUrl(newPathname, newParams));
  }

  const updateSearchParams = debounce((value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("q", value);
    newParams.delete("page");
    newParams.delete("prime");
    router.push(createUrl(pathname, newParams));
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (currentPage === "shop") {
      updateSearchParams(value);
    }
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("q");
    newParams.delete("prime");
    router.push(createUrl(pathname, newParams));
    setQuery("");
  };

  return (
    <form onSubmit={onSubmit} role="search" aria-label="نموذج البحث">
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          بحث
        </label>
        {query && (
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
          name="search"
          aria-labelledby="search-label" // Link to the label
          value={query}
          onChange={handleChange}
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
