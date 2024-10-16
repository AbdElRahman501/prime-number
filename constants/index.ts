import { Company, FooterLink, Link, PhoneNumber } from "@/types";

export const companies: Company[] = [
  {
    name: "Vodafone",
    number: 12,
    image: "/images/vodafone.png",
  },
  {
    name: "Etisalat",
    number: 12,
    image: "/images/etisalat.png",
  },
  {
    name: "Orange",
    number: 12,
    image: "/images/orange.png",
  },
  {
    name: "we",
    number: 12,
    image: "/images/we.png",
  },
];

export const phoneNumbers: PhoneNumber[] = [
  {
    id: "1",
    name: "رقم مميز",
    description: "بعض الوصف هنا",
    phoneNumber: "0101020000",
    price: 15000,
  },
  {
    id: "2",
    name: "رقم مميز",
    description: "بعض الوصف هنا",
    phoneNumber: "0101003000",
    price: 10000,
  },
  {
    id: "3",
    name: "رقم مميز",
    description: "بعض الوصف هنا",
    phoneNumber: "0101000009",
    price: 5000,
  },
  {
    id: "4",
    name: "رقم مميز",
    description: "بعض الوصف هنا",
    phoneNumber: "0101000009",
    price: 5000,
  },
];

export const footerList: FooterLink[] = [
  {
    title: "معلومات التواصل",
    links: [
      {
        title: "0123456789",
        url: "tel:+1234567890",
        icon: "mdi:phone",
      },
      {
        title: "primenumber.eg@outlook.com",
        url: "mailto:primenumber.eg@outlook.com",
        icon: "mdi:email",
      },
      {
        title: "من 6 صباحا إلى 6 مساءا",
        url: "#",
        icon: "mdi:clock-outline",
      },
      {
        title: "بنها - القليوبيه - مصر",
        url: "#",
        icon: "mdi:map-marker",
      },
    ],
  },
  {
    title: "روابط سريعة",
    links: [
      {
        title: "الصفحه الرئيسية",
        url: "/",
      },
      {
        title: "الارقام المثالية",
        url: "/",
      },
      {
        title: "اراء العملاء",
        url: "/",
      },
      {
        title: "اتصل بنا",
        url: "/",
      },
      {
        title: "سياسة الخصوصية",
        url: "/",
      },
      {
        title: "الشروط والأحكام",
        url: "/",
      },
      {
        title: "معلومات عنا",
        url: "/",
      },
    ],
  },
];

export const socialMedia: Link[] = [
  {
    title: "Facebook",
    url: "https://www.facebook.com/",
    icon: "mdi:facebook",
  },
  {
    title: "Twitter",
    url: "https://twitter.com/",
    icon: "mdi:twitter",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/",
    icon: "mdi:instagram",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/",
    icon: "mdi:linkedin",
  },
  {
    title: "YouTube",
    url: "https://www.youtube.com/",
    icon: "mdi:youtube",
  },
];
