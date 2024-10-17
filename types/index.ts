export interface Company {
  _id: string | number;
  name: string;
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
