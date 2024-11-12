import {
  Company,
  Feature,
  Offer,
  PhoneNumber,
  Review,
  SortOptions,
  Store,
  Link,
} from "@/types";

export const headerLinks: Link[] = [
  { _id: "1", title: "الرئيسية", url: "/" },
  { _id: "2", title: "ارقامنا المميزه", url: "/shop" },
  { _id: "3", title: "من نحن", url: "/about" },
];

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

// TODO : no need to have phone numbers constants instead we will use data base
export const phoneNumbers: PhoneNumber[] = [
  {
    _id: "1",
    name: "رقم ذهبي",
    description: "بعض الوصف هنا",
    phoneNumber: "0101020000",
    price: 15000,
    company: "vodafone",
  },
  {
    _id: "2",
    name: "رقم ذهبي",
    description: "بعض الوصف هنا",
    phoneNumber: "0131003000",
    price: 10000,
    company: "we",
  },
  {
    _id: "3",
    name: "رقم فضي",
    description: "بعض الوصف هنا",
    phoneNumber: "0121000009",
    price: 5000,
    company: "orange",
  },
  {
    _id: "4",
    name: "رقم فضي",
    description: "بعض الوصف هنا",
    phoneNumber: "0101200009",
    price: 5000,
    company: "vodafone",
  },
  {
    _id: "1",
    active: true,
    name: "رقم ذهبي",
    description: "A premium number for VIP clients.",
    phoneNumber: "0101122334",
    price: 20000,
    company: "vodafone",
  },
  {
    _id: "2",
    active: true,
    name: "رقم النخبه",
    description: "Stand out with this unique number.",
    phoneNumber: "0155588999",
    price: 18000,
    company: "etisalat",
  },
  {
    _id: "3",
    active: true,
    name: "رقم رجال الاعمال",
    description: "An easy-to-remember number for professionals.",
    phoneNumber: "0123445566",
    price: 12000,
    company: "orange",
  },
  {
    _id: "4",
    active: true,
    name: "رقم رجال الاعمال",
    description: "A prestigious number for business executives.",
    phoneNumber: "0111777888",
    price: 25000,
    company: "we",
  },
  {
    _id: "5",
    active: true,
    name: "رقم المشاهير",
    description: "A memorable number for frequent callers.",
    phoneNumber: "0145566778",
    price: 9000,
    company: "vodafone",
  },
  {
    _id: "6",
    active: true,
    name: "رقم VIP",
    description: "A high-end number for distinguished clients.",
    phoneNumber: "0101102020",
    price: 30000,
    company: "etisalat",
  },
  {
    _id: "7",
    active: true,
    name: "رقم VIP",
    description: "Ideal for business owners who value quality.",
    phoneNumber: "0133222444",
    price: 15000,
    company: "orange",
  },
  {
    _id: "8",
    active: true,
    name: "رقم رائع",
    description: "A top-tier number for corporate leaders.",
    phoneNumber: "0125667788",
    price: 22000,
    company: "we",
  },
];

export const featureList: Feature[] = [
  {
    _id: 1,
    title: "أرقام حصرية ومميزة",
    description:
      "نقدم لك أرقاماً مميزة جداً وفريدة، تشمل أرقام VIP، وأرقام رجال أعمال، وأرقام خاصة للاستخدام الشخصي أو التجاري، مما يجعلها الخيار الأمثل للأفراد والشركات الباحثين عن التميز.",
  },
  {
    _id: 2,
    title: "سهولة البحث والاختيار",
    description:
      "مع نظامنا المتقدم، يمكنك بسهولة تصفح مئات الأرقام المميزة مثل أرقام موبينيل، فودافون، وأورانج، واختيار أرقام برايم أو أرقام سريعة التذكر التي تلائم احتياجاتك الشخصية أو التجارية.",
  },
  {
    _id: 3,
    title: "أسعار تنافسية",
    description:
      "نوفر لك خيارات متعددة تناسب ميزانيتك مع ضمان الحصول على أفضل العروض لأرقام مميزة للبيع، سواء كانت للاستخدام الشخصي أو للاستثمار في أرقام فاخرة وأرقام مميزة للتجارة الإلكترونية أو الأنشطة التجارية.",
  },
];

export const reviews: Review[] = [
  {
    _id: 1,
    name: "John Doe",
    review:
      "تجربتي مع هذا الموقع كانت رائعة. اخترت الرقم المثالي لي بكل سهولة، والعملية كلها كانت سلسة وسريعة. شكراً لفريق الدعم الرائع!",
  },
  {
    _id: 2,
    name: "Jane Smith",
    review:
      "لطالما كنت أبحث عن رقم مميز يعكس شخصيتي، وهذا الموقع وفّر لي خيارات لا حصر لها. أنصح الجميع باستخدام خدماتهم!",
  },
  {
    _id: 3,
    name: "Bob Johnson",
    review:
      "خدمة العملاء ممتازة! أجابوا على كل استفساراتي وساعدوني في العثور على الرقم المثالي لأعمالي التجارية.",
  },
];

export const offers: Offer[] = [
  {
    _id: "1",
    title: "أرقام فودافون مميزة",
    description:
      "احصل على رقم مميز من فودافون يعزز من هويتك التجارية ويزيد من ثقة عملائك بك. أرقام فودافون المميزة تعتبر مثالية للاستخدام التجاري والشخصي.",
    phoneNumber: "01010101010",
    company: "Vodafone",
  },
  {
    _id: "2",
    title: "أرقام أورانج حصرية",
    description:
      "رقم فريد من أورانج يضمن لك التميز ويساهم في تعزيز تواصلك مع عملائك بشكل أفضل. أرقام أورانج المميزة تناسب رجال الأعمال وأصحاب المشاريع.",
    phoneNumber: "01234567890",
    company: "Orange",
  },
  {
    _id: "3",
    title: "أرقام اتصالات لا مثيل لها",
    description:
      "اجعل رقمك لا يُنسى مع رقم مميز من اتصالات يعكس هوية عملك واحترافك. أرقام اتصالات المميزة هي الخيار المثالي لرجال الأعمال والعملاء المميزين.",
    phoneNumber: "01123456789",
    company: "etisalat",
  },
];

export const sortOptions: SortOptions[] = [
  { name: "الأحدث", value: "Nst" },
  { name: "الأقدم", value: "Ost" },
  { name: "الاعلي سعر", value: "Hp" },
  { name: "الاقل سعر", value: "Lp" },
  { name: "الاكثر اقبالا", value: "Tr" },
];

export const store: Store = {
  contacts: {
    phoneNumber: "+201015753392",
    address: "بنها - القليوبيه - مصر",
    email: "primenumber.eg@outlook.com",
    workHours: "6:00 AM - 10:00 PM",
  },
  socialMedia: [
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
  ],
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
    { _id: "3", title: "اراء العملاء", url: "#" },
    { _id: "4", title: "اتصل بنا", url: "#" },
    { _id: "5", title: "سياسة الخصوصية", url: "#" },
    { _id: "6", title: "الشروط والأحكام", url: "#" },
    { _id: "7", title: "معلومات عنا", url: "#" },
  ],
};

export const tags = {
  products: "products",
  quickProducts: "quick-products",
  topRatedProducts: "top-rated-products",
  newestProducts: "newest-products",
  reviews: "reviews",
  offers: "offers",
  store: "store",
};
