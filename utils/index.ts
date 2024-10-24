import { CartItem, CompanyName, PhoneNumber, Sort } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";

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
  phoneNumber: string, // 01015753392
  product?: string,
): string {
  // Remove any non-numeric characters from the phone number
  const cleanedNumber = phoneNumber.replace(/\D/g, "");
  const productUrl = `${baseUrl}/shop?prime=${product}`;

  const message = product
    ? productUrl + ` مرحبا اريد شراء هذا الرقم  ${product} `
    : `اريد شراء رقم مميز هل يمكنك اطلاعي علي التفاصيل`;
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
  companies: CompanyName[] = [],
  sortBy: Sort | "default" = "default",
): PhoneNumber[] => {
  // Convert maxPrice and minPrice to numbers
  const maxPriceNum = parseFloat(maxPrice) || Infinity;
  const minPriceNum = parseFloat(minPrice) || 0;

  // Filter by query, price range, and company
  let filtered = phoneNumbers.filter((product) => {
    const matchesQuery = query
      ? product.name.includes(query) ||
        product.description.includes(query) ||
        product.phoneNumber.includes(query)
      : true;
    const withinPriceRange =
      product.price >= minPriceNum && product.price <= maxPriceNum;
    const matchesCompany =
      companies.length > 0 ? companies.includes(product.company) : true;

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
