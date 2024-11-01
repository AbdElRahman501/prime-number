export interface Company {
  _id: string | number;
  name: CompanyName;
  nameAr: string;
  htmlTitle?: string;
  image?: string;
  color: string;
}

export type CompanyName = "vodafone" | "etisalat" | "orange" | "we";
export type Sort = "Nst" | "Ost" | "Lp" | "Hp" | "Tr";

export type Metric =
  | "activeUsers"
  | "sessions"
  | "newUsers"
  | "screenPageViews";
export type Dimension = "date";
export type CartType = "line" | "bar" | "pie" | "doughnut";

export interface SortOptions {
  name: string;
  value: Sort;
}

export interface PhoneNumber {
  _id: string;
  name: string;
  active?: boolean;
  category?: string;
  score?: number;
  description: string;
  phoneNumber: string;
  price: number;
  company: CompanyName;
}

export interface Link {
  _id: string;
  title: string;
  url: string;
  icon?: string;
}

export interface Feature {
  _id: number | string;
  title: string;
  description: string;
}

export interface Review {
  _id: number;
  name: string;
  review: string;
}

export interface Offer {
  _id: string;
  title: string;
  description: string;
  phoneNumber: string;
  company: string;
}

export interface CartItem {
  name: string;
  company: string;
  price: number;
  phoneNumber: string;
}
export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Store {
  contacts: contacts;
  socialMedia: Link[];
  links: Link[];
}

export interface contacts {
  phoneNumber: string;
  address: string;
  email: string;
  workHours: string;
}

export interface Column<T> {
  key?: keyof T;
  label: string | JSX.Element;
  type?: "string" | "boolean" | "image" | "action";
  RowAction?: (item: T) => JSX.Element;
}

export interface Row {
  date: string;
  value: string;
}
