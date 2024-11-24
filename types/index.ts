export interface Company {
  _id: string | number;
  name: CompanyName;
  count?: number;
  nameAr: string;
  htmlTitle?: string;
  image?: string;
  color: string;
}
export interface Result<T = void> {
  success: boolean;
  message: string;
  data?: T;
}
export interface CompanyProductCount {
  company: string;
  count: number;
}

export interface BlockHeader {
  _id: string;
  type: "header";
  content: string;
}
export interface BlockParagraph {
  _id: string;
  type: "paragraph";
  content: string;
}
export interface BlockFeature {
  _id: string;
  type: "features";
  content: {
    title: string;
    description: string;
  }[];
}

export type AboutBlock = BlockHeader | BlockParagraph | BlockFeature;

export type CompanyName = "vodafone" | "etisalat" | "orange" | "we";
export type Sort = "Nst" | "Ost" | "Lp" | "Hp" | "Tr";

export type Metric =
  | "activeUsers"
  | "sessions"
  | "newUsers"
  | "screenPageViews";
export type Dimension = "date";
export type CartType = "line" | "bar" | "pie" | "doughnut";
export type FormElements =
  | "number"
  | "text"
  | "select"
  | "textarea"
  | "checkbox"
  | "radio";

export interface CustomFormeElementProps
  extends React.HTMLProps<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > {
  options?: string[];
}

export interface SortOptions {
  name: string;
  value: Sort;
  sort: "asc" | "desc";
  sortBy: keyof PhoneNumber;
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
  updatedAt?: string;
  createdAt?: string;
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
  _id: string;
  name: string;
  review: string;
  active?: boolean;
}

export interface Offer {
  _id: string;
  title: string;
  description: string;
  start?: string;
  end?: string;
  active?: boolean;
  phoneNumber: string;
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
  _id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  isAdmin: boolean;
  forceLogout: boolean;
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
  workHours: WorkHours;
}
export type WorkHours = {
  start: string;
  end: string;
};

export interface Column<T> {
  key?: keyof T;
  label: string | JSX.Element;
  type?:
    | "string"
    | "boolean"
    | "image"
    | "action"
    | "date"
    | "description"
    | "input";
  inputProps?: CustomFormeElementProps;
  RowAction?: (props: { item: T }) => JSX.Element;
  action?: (item: T) => Promise<Result>;
}

export interface Row {
  date: string;
  value: string;
}
