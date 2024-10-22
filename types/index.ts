export interface Company {
  _id: string | number;
  name: "vodafone" | "etisalat" | "orange" | "we";
  number: number;
  image: string;
  color: string;
}

export interface PhoneNumber {
  _id: string | number;
  name: string;
  description: string;
  phoneNumber: string | number;
  price: number;
  company: string;
}

export interface FooterLink {
  _id: string | number;
  title: string;
  links: Link[];
}

export interface Link {
  _id: string | number;
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
  _id: number | string;
  title: string;
  description: string;
  number: number | string;
  company: string;
}

export interface CartItem {
  _id: number | string;
  phoneNumber: number;
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
