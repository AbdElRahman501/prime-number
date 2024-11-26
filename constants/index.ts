import { Company, SortOptions, Link, HeaderLevel } from "@/types";

export const headerLinks: Link[] = [
  { _id: "1", title: "الرئيسية", url: "/" },
  { _id: "2", title: "ارقامنا المميزه", url: "/shop" },
  { _id: "3", title: "من نحن", url: "/about" },
];
export const fontSizeMapping: Record<HeaderLevel, string> = {
  h1: "text-6xl", // Larger text
  h2: "text-5xl",
  h3: "text-4xl",
  h4: "text-3xl",
  h5: "text-2xl",
  h6: "text-xl", // Smaller text
};

export const companies: Company[] = [
  {
    _id: "1",
    name: "vodafone",
    nameAr: "فودافون",
    color: "#E60000",
  },
  {
    _id: "2",
    name: "etisalat",
    nameAr: "اتصالات",
    color: "#E00700",
  },
  {
    _id: "3",
    name: "orange",
    nameAr: "اورانج",
    htmlTitle:
      "<h3 class='font-bold drop-shadow-lg'>orange<sup class='text-xs'>TM</sup></h3>",
    color: "#F60",
  },
  {
    _id: "4",
    name: "we",
    nameAr: "وي",
    htmlTitle: "<h3>telecom<strong>egypt</strong></h3>",
    color: "#5C2E91",
  },
];

export const sortOptions: SortOptions[] = [
  { name: "الأحدث", value: "Nst", sort: "desc", sortBy: "createdAt" },
  { name: "الأقدم", value: "Ost", sort: "asc", sortBy: "createdAt" },
  { name: "الاعلي سعر", value: "Hp", sort: "desc", sortBy: "price" },
  { name: "الاقل سعر", value: "Lp", sort: "asc", sortBy: "price" },
  { name: "الاكثر اقبالا", value: "Tr", sort: "desc", sortBy: "score" },
];

export const tags = {
  products: "products",
  quickProducts: "quick-products",
  topRatedProducts: "top-rated-products",
  newestProducts: "newest-products",
  productCounts: "product-counts",
  reviews: "reviews",
  offers: "offers",
  store: "store",
  about: "about",
};
