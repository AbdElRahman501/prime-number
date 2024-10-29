import { CartItem, CompanyName, PhoneNumber, Sort } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";
import { companies } from "@/constants";
export function formatPrice(price: number, currency: "EGP" | "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function addToCart(cart: string[], phoneNumber: string) {
  const isInCart = cart.find((x) => x === phoneNumber);
  if (!isInCart) {
    return [...cart, phoneNumber];
  } else {
    return cart;
  }
}
export function removeFromCart(cart: string[], phoneNumber: string | number) {
  return cart.filter((x) => x !== phoneNumber);
}

export function isInCart(cart: CartItem[], phoneNumber: string) {
  if (!cart || !phoneNumber) return [];
  return cart.some((item) => item.phoneNumber === phoneNumber);
}

export const getMatchingItemsByKey = (
  arr1: never[],
  arr2: string[],
  key: string,
): never[] => {
  return arr1.filter((item1) => arr2.includes(item1[key])) as never[];
};

export function toggleWishListItem(wishList: string[], phoneNumber: string) {
  const isInWishList = wishList.find((x) => x === phoneNumber);
  if (!isInWishList) {
    return [...wishList, phoneNumber];
  } else {
    return wishList.filter((x) => x !== phoneNumber);
  }
}
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export function createWhatsAppLink(
  phoneNumber: string, // e.g., supplier's WhatsApp number like 01015753392
  product?: string, // e.g., the number you want to buy
): string {
  // Remove any non-numeric characters from the phone number
  const cleanedNumber = phoneNumber.replace(/\D/g, "");
  const productUrl = `${baseUrl}/shop?q=${product}`;

  // Construct a more readable, detailed message with line breaks
  const message = product
    ? `مرحبا، اريد شراء هذا الرقم: ${product}\n` +
      `رابط الرقم المطلوب: ${productUrl}\n`
    : `مرحبا، اريد شراء رقم مميز.\n` +
      `هل يمكنك اطلاعي على التفاصيل ألارقام المتاحة للشراء؟\n`;

  // Encode the message to ensure it works with URLs
  const encodedMessage = encodeURIComponent(message);

  // Return the full WhatsApp API link
  return `https://api.whatsapp.com/send?phone=${cleanedNumber}&text=${encodedMessage}`;
}

export function getSearchParamsAsArray(
  searchParams: URLSearchParams,
  key: string,
) {
  const value = searchParams?.get(key);
  return value?.length ? value.toLowerCase().trim().split(",") : [];
}

export function toggleStringInArray(array: string[], str: string) {
  // Check if the array contains the string
  if (array.includes(str)) {
    // If the string exists, remove it from the array
    return array.filter((item) => item !== str);
  } else {
    // If the string doesn't exist, add it to the array
    return [...array, str];
  }
}

export const filterPhoneNumbers = (
  phoneNumbers: PhoneNumber[],
  query: string = "",
  maxPrice: string = "",
  minPrice: string = "",
  companiesFilter: CompanyName[] = [],
  sortBy: Sort | "default" = "default",
): PhoneNumber[] => {
  // Convert maxPrice and minPrice to numbers
  const maxPriceNum = parseFloat(maxPrice) || Infinity;
  const minPriceNum = parseFloat(minPrice) || 0;
  // Filter by query, price range, and company
  let filtered = phoneNumbers.filter((product) => {
    const companyAr =
      companies.find((company) => company.name === product.company)?.nameAr ||
      product.company;

    const matchesQuery = query
      ? product.name.includes(query) ||
        product.description.includes(query) ||
        product.phoneNumber.includes(query) ||
        product.company.includes(query) ||
        companyAr.includes(query)
      : true;
    const withinPriceRange =
      product.price >= minPriceNum && product.price <= maxPriceNum;
    const matchesCompany =
      companiesFilter.length > 0
        ? companiesFilter.includes(product.company)
        : true;

    return matchesQuery && withinPriceRange && matchesCompany;
  });

  // Sort the filtered products
  if (sortBy === "Lp") {
    filtered = filtered.sort((a, b) => a.price - b.price); // Sort by price for low to high
  } else if (sortBy === "Hp") {
    filtered = filtered.sort((a, b) => b.price - a.price); // Sort by price for high to low
  } else if (sortBy === "Nst") {
    filtered = filtered.sort((a, b) =>
      b._id.toString().localeCompare(a._id.toString()),
    ); // Sort by newest
  } else if (sortBy === "Ost") {
    filtered = filtered.sort((a, b) =>
      a._id.toString().localeCompare(b._id.toString()),
    ); // Sort by oldest
  }

  return filtered;
};

type SortOrder = "asc" | "desc";

export function sortByKey<T>(
  data: T[],
  key?: keyof T,
  order: SortOrder = "asc",
): T[] {
  if (!key) return data;
  return data.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    // Handle string, number, or date comparisons
    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    } else if (valueA instanceof Date && valueB instanceof Date) {
      return order === "asc"
        ? valueA.getTime() - valueB.getTime()
        : valueB.getTime() - valueA.getTime();
    } else {
      return 0; // In case of non-comparable types
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSort<T extends Record<string, any>>(
  oldKey: keyof T,
  newKey: keyof T,
  sort: "asc" | "desc",
) {
  if (oldKey === newKey) {
    return sort && sort === "asc" ? "desc" : "asc";
  } else {
    return "asc";
  }
}

export function searchInData<T>(data: T[], query: string | undefined): T[] {
  if (!query) return data;
  const lowerCaseQuery = query.toLowerCase();
  return data.filter((item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(item as any).some((key) => {
      const value = item[key as keyof T];
      return String(value).toLowerCase().includes(lowerCaseQuery);
    });
  });
}

export const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
) => {
  const pages = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  // Add first page and ellipsis if needed
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push("...");
    }
  }

  // Add pages in range
  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  // Add last page and ellipsis if needed
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  return pages;
};

export function formatToTimeInput(value: string) {
  // Convert to 24-hour format if it's in 12-hour format
  const [time, modifier] = value.split(" ");

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(":");
  if (hours.length === 1) {
    hours = `0${hours}`; // Add leading zero if hour is single digit
  }

  if (modifier === "PM" && hours !== "12") {
    hours = String(parseInt(hours, 10) + 12);
  } else if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  return `${hours}:${minutes}`;
}

export function isSelected(arr: string[], id: string) {
  if (!arr) return false;
  return arr.find((item) => item === id);
}

export function areAllItemsSelected<T extends { _id: string }>(
  items: T[],
  selectedIds: string[],
): string {
  // Create a Set from selectedIds for O(1) lookup time
  const selectedIdsSet = new Set(selectedIds);
  const areAllSelected = items.every((item) => selectedIdsSet.has(item._id));
  return areAllSelected ? "true" : "false";
}
