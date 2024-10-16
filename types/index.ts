export interface Company {
  name: string;
  number: number;
  image: string;
}

export interface PhoneNumber {
  id: string | number;
  name: string;
  description: string;
  phoneNumber: string | number;
  price: number;
}

export interface FooterLink {
  title: string;
  links: Link[];
}

export interface Link {
  title: string;
  url: string;
  icon?: string;
}
