"use client";
import { companies, sortOptions } from "@/constants";
import { createUrl, formatPrice } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import LogoIcons from "./icons/logos";

interface Provider {
  searchParams: URLSearchParams;
  pathname: string;
  router: ReturnType<typeof useRouter>;
}

function updateParam(provider: Provider, key: string, value: string) {
  const { searchParams, pathname, router } = provider;
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set(key, value);
  const optionUrl = createUrl(pathname, newSearchParams);
  router.replace(optionUrl, { scroll: false });
}

const allowedParams = ["sort", "ctf", "minP", "maxP"];

const allKeysHaveValues = (obj: Record<string, string>) => {
  return (
    Object.entries(obj).length > 0 &&
    Object.entries(obj)
      .filter(
        ([key, value]) =>
          !((key === "maxP" && value) || (key === "minP" && value)),
      )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .find(([key, value]) => value !== "")
  );
};

export const FilterBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const provider = { searchParams, pathname, router };
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    if (allowedParams.includes(key)) params[key] = value;
  });
  const filterParams = Array.from(searchParams.entries()).filter(([key]) => {
    return allowedParams.includes(key) && params[key];
  });
  return (
    <div
      role="filter"
      style={{ paddingTop: filterParams.length > 0 ? "16px" : "0" }}
      className="scroll-bar-hidden flex items-center gap-3 overflow-scroll px-5 md:hidden md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {allKeysHaveValues(params) && (
        <button
          type="button"
          role="button"
          onClick={() => router.replace(pathname, { scroll: false })}
          className="flex justify-between gap-2 text-nowrap rounded-xl border border-foreground p-3"
        >
          مسح الفلتر
        </button>
      )}

      {filterParams.map(([key, value]) => (
        <Item key={key} id={key} value={value} provider={provider} />
      ))}
    </div>
  );
};

const Item: React.FC<{ id: string; value: string; provider: Provider }> = ({
  id,
  value,
  provider,
}) => {
  if (!allowedParams.includes(id) || !value) return null;
  switch (id) {
    case "maxP":
      return (
        id === "maxP" &&
        value !== "1000" && (
          <div className="flex justify-between gap-2 text-nowrap rounded-xl border border-foreground p-3">
            <button
              type="button"
              role="button"
              onClick={() => updateParam(provider, id, "")}
              className="cursor-pointer text-sm"
            >
              &#10005;
            </button>
            <span>اعلي سعر : {formatPrice(parseInt(value), "EGP")}</span>
          </div>
        )
      );
    case "minP":
      return (
        id === "minP" &&
        value !== "0" && (
          <div className="flex justify-between gap-2 text-nowrap rounded-xl border border-foreground p-3">
            <button
              type="button"
              role="button"
              onClick={() => updateParam(provider, id, "")}
              className="cursor-pointer text-sm"
            >
              &#10005;
            </button>
            <span> اقل سعر : {formatPrice(parseInt(value), "EGP")}</span>
          </div>
        )
      );
    case "sort":
      const sortName = sortOptions.find(
        (option) => option.value === value,
      )?.name;
      return (
        <div className="flex justify-between gap-2 text-nowrap rounded-xl border border-foreground p-3">
          <button
            type="button"
            role="button"
            onClick={() => updateParam(provider, id, "")}
            className="cursor-pointer text-sm"
          >
            &#10005;
          </button>
          <span>التصنيف : {sortName}</span>
        </div>
      );
    case "ctf":
      const companiesNames = value.split(",");
      const filteredCompanies = companies.filter((company) =>
        companiesNames.includes(company.name),
      );
      return filteredCompanies.map((company) => (
        <div
          key={company.name}
          className="flex justify-between gap-2 text-nowrap rounded-xl border border-foreground p-3"
        >
          <button
            type="button"
            role="button"
            onClick={() =>
              updateParam(
                provider,
                id,
                companiesNames
                  .filter((name) => name !== company.name)
                  .join(","),
              )
            }
            className="cursor-pointer text-sm"
          >
            &#10005;
          </button>
          <LogoIcons
            name={company.name}
            className="aspect-square h-6"
            viewBox="0 0 50 50"
          />
          <span>{company.nameAr}</span>
        </div>
      ));
    default:
      return (
        <div className="flex justify-between gap-2 text-nowrap rounded-xl border border-foreground p-3">
          <button
            type="button"
            role="button"
            onClick={() => updateParam(provider, id, "")}
            className="cursor-pointer text-sm"
          >
            &#10005;
          </button>
          <span>{value}</span>
        </div>
      );
  }
};
