import { Company, Feature, FooterLink, Link, PhoneNumber } from "@/types";

export const companies: Company[] = [
  {
    _id: "1",
    name: "Vodafone",
    number: 12,
    image: "/images/vodafone.png",
    color: "#000",
  },
  {
    _id: "2",
    name: "Etisalat",
    number: 12,
    image: "/images/etisalat.png",
    color: "#000",
  },
  {
    _id: "3",
    name: "Orange",
    number: 12,
    image: "/images/orange.png",
    color: "#000",
  },
  {
    _id: "4",
    name: "we",
    number: 12,
    image: "/images/we.png",
    color: "#000",
  },
];

export const phoneNumbers: PhoneNumber[] = [
  {
    _id: "1",
    name: "رقم مميز",
    description: "بعض الوصف هنا",
    phoneNumber: "0101020000",
    price: 15000,
    company: "Vodafone",
  },
  {
    _id: "2",
    name: "رقم مميز",
    description: "بعض الوصف هنا",
    phoneNumber: "0101003000",
    price: 10000,
    company: "Vodafone",
  },
  {
    _id: "3",
    name: "رقم مميز",
    description: "بعض الوصف هنا",
    phoneNumber: "0101000009",
    price: 5000,
    company: "Vodafone",
  },
  {
    _id: "4",
    name: "رقم مميز",
    description: "بعض الوصف هنا",
    phoneNumber: "0101000009",
    price: 5000,
    company: "Vodafone",
  },
];

export const footerList: FooterLink[] = [
  {
    _id: "1",
    title: "معلومات التواصل",
    links: [
      {
        _id: "1",
        title: "0123456789",
        url: "tel:+1234567890",
        icon: "mdi:phone",
      },
      {
        _id: "2",
        title: "primenumber.eg@outlook.com",
        url: "mailto:primenumber.eg@outlook.com",
        icon: "mdi:email",
      },
      {
        _id: "3",
        title: "من 6 صباحا إلى 6 مساءا",
        url: "#",
        icon: "mdi:clock-outline",
      },
      {
        _id: "4",
        title: "بنها - القليوبيه - مصر",
        url: "#",
        icon: "mdi:map-marker",
      },
    ],
  },
  {
    _id: "2",
    title: "روابط سريعة",
    links: [
      {
        _id: "1",
        title: "الصفحه الرئيسية",
        url: "/",
      },
      {
        _id: "2",
        title: "الارقام المثالية",
        url: "/",
      },
      { _id: "3", title: "اراء العملاء", url: "/" },
      { _id: "4", title: "اتصل بنا", url: "/" },
      { _id: "5", title: "سياسة الخصوصية", url: "/" },
      { _id: "6", title: "الشروط والأحكام", url: "/" },
      { _id: "7", title: "معلومات عنا", url: "/" },
    ],
  },
];

export const socialMedia: Link[] = [
  {
    _id: "1",
    title: "Facebook",
    url: "https://www.facebook.com/",
    icon: "mdi:facebook",
  },
  {
    _id: "2",
    title: "Twitter",
    url: "https://twitter.com/",
    icon: "mdi:twitter",
  },
  {
    _id: "3",
    title: "Instagram",
    url: "https://www.instagram.com/",
    icon: "mdi:instagram",
  },
  {
    _id: "4",
    title: "LinkedIn",
    url: "https://www.linkedin.com/",
    icon: "mdi:linkedin",
  },
  {
    _id: "5",
    title: "YouTube",
    url: "https://www.youtube.com/",
    icon: "mdi:youtube",
  },
];

export const featureList: Feature[] = [
  {
    _id: 1,
    title: "أرقام حصرية ومميزة",
    description:
      "نقدم لك أرقاماً مميزة وفريدة لا مثيل لها، لتكون جزءاً من هويتك الشخصية أو التجارية.",
  },
  {
    _id: 2,
    title: "سهولة البحث والاختيار",
    description:
      "مع نظامنا المتقدم، يمكنك بسهولة تصفح مئات الأرقام والعثور على الرقم الذي يلائم احتياجاتك.",
  },
  {
    _id: 3,
    title: "أسعار تنافسية",
    description:
      "نوفر لك خيارات متعددة تناسب ميزانيتك مع ضمان الحصول على أفضل العروض للأرقام المميزة.",
  },
];
