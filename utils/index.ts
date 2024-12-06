import {
  AboutBlock,
  BlockFeature,
  BlockHeader,
  BlockParagraph,
  HeaderLevel,
  Offer,
} from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export const addToLocalStorage = (key: string, items: unknown) => {
  if (typeof window == "undefined") return;
  localStorage.setItem(key, JSON.stringify(items));
};
export const getFromLocalStorage = (key: string) => {
  if (typeof window == "undefined") return;
  return localStorage.getItem(key);
};

export function formatPrice(price: number, currency?: "EGP" | "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "EGP",
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

export function toggleItemInArray(array: string[], item: string) {
  const inArray = array.find((x) => x === item);
  if (!inArray) {
    return [...array, item];
  } else {
    return array.filter((x) => x !== item);
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
  const productUrl = `${baseUrl}/shop?prime=${product}`;

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

export function formatDate(inputDate: string) {
  // Extract year, month, and day from the input string
  const month = inputDate.substring(4, 6);
  const day = inputDate.substring(6, 8);

  // Convert month to a more readable format (1-12 to Jan-Dec)
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format day and month
  const formattedDay = parseInt(day, 10); // Convert string to number to remove leading zeros
  const formattedMonth = monthNames[parseInt(month, 10) - 1]; // Get month name

  // Return formatted date
  return `${formattedDay} ${formattedMonth}`;
}

export function formatDateAt(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}`;
}

export function removeDuplicates(stringsArray: string[]): string[] {
  return Array.from(new Set(stringsArray));
}

export function subtractArrays(array1: string[], array2: string[]) {
  return array1.filter((item) => !array2.includes(item));
}

export function modalKey(type: "remove" | "add" | "edit", key?: string) {
  key = key ? key : "";
  return type + "-" + key + "key";
}

export function getActionItems<T extends { _id: string }>(
  data: T[],
  searchParams?: { [key: string]: string | string[] | undefined },
  name?: string,
) {
  if (!searchParams) return {};
  const removeKey = modalKey("remove", name);
  const removeId = searchParams?.[removeKey] as string;

  const removeItem: T | undefined = data.find((item) => item._id === removeId);
  const editKey = modalKey("edit", name);
  const editId = searchParams?.[editKey] as string;

  const editItem: T | undefined = data.find((item) => item._id === editId);

  const addKey = modalKey("add", name);
  const isAddItem = searchParams?.[addKey] as string;

  return { removeItem, editItem, isAddItem };
}

export function isCurrentDateInRange({ start, end }: Offer) {
  const now = new Date();
  // Convert start and end to Date objects if they are provided
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  // Check if the current date is within the range
  if (startDate && endDate) {
    return now >= startDate && now <= endDate;
  } else if (startDate) {
    return now >= startDate;
  } else if (endDate) {
    return now <= endDate;
  }

  // If no start or end date, always return true
  return true;
}
export function formatTime({
  start,
  end,
}: {
  start: string;
  end: string;
}): string {
  const startTimeParts = start.split(":");
  const endTimeParts = end.split(":");

  const startHour = parseInt(startTimeParts[0], 10);
  const endHour = parseInt(endTimeParts[0], 10);

  const startMeridiem = startHour < 12 ? "ص" : "م";
  const endMeridiem = endHour < 12 ? "ص" : "م";

  const formattedStartTime = `${startHour % 12 || 12} ${startMeridiem}`;
  const formattedEndTime = `${endHour % 12 || 12} ${endMeridiem}`;

  return `${formattedStartTime} الي ${formattedEndTime}`;
}

export function removeIdFromArray<T extends { _id: string }>(
  arr: T[],
): Omit<T, "_id">[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return arr.map(({ _id, ...rest }) => ({ ...rest }));
}

export function moveObjectInArray<T extends { _id: string }>(
  array: T[],
  id: string,
  direction: "up" | "down",
): T[] {
  const newData = [...array];

  // Find the index of the object with the given ID
  const currentIndex = newData.findIndex((item) => item._id === id);
  if (currentIndex === -1) return newData;
  let newIndex = currentIndex;
  if (direction === "up") {
    newIndex = Math.max(0, currentIndex - 1);
  } else if (direction === "down") {
    newIndex = Math.min(newData.length - 1, currentIndex + 1);
  }
  if (newIndex === currentIndex) {
    return newData;
  }
  const [movedObject] = newData.splice(currentIndex, 1);
  newData.splice(newIndex, 0, movedObject);
  return newData;
}

export const addBlock = (
  data: AboutBlock[],
  type: "paragraph" | "features" | "header",
  block?: BlockParagraph | BlockFeature | BlockHeader,
  level: HeaderLevel = "h1",
): AboutBlock[] => {
  const index = block ? data.findIndex((x) => x._id === block._id) + 1 : 0;
  let object: AboutBlock;
  const newData = [...data];
  switch (type) {
    case "paragraph":
      object = {
        type: "paragraph",
        content: "",
        _id: String(Date.now()),
      } as BlockParagraph;
      break;
    case "features":
      object = {
        type: "features",
        content: [
          {
            title: "",
            description: "",
          },
        ],
        _id: String(Date.now()),
      } as BlockFeature;
      break;
    case "header":
      object = {
        type: "header",
        content: "",
        level,
        _id: String(Date.now()),
      } as BlockHeader;
      break;
    default:
      throw new Error(`Invalid block type: ${type}`);
  }

  // Use splice to insert the object into the data array
  newData.splice(index, 0, object);

  // Return the modified data array
  return newData;
};

// Utility function to check if data has changed
export const hasDataChanged = (
  originalData: { _id: string }[],
  currentData: { _id: string }[],
) => {
  return (
    JSON.stringify(removeIdFromArray(currentData)) !==
    JSON.stringify(removeIdFromArray(originalData))
  );
};
