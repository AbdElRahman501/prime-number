import {
  Company,
  Feature,
  Offer,
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
    _id: "1",
    name: "John Doe",
    review:
      "تجربتي مع هذا الموقع كانت رائعة. اخترت الرقم المثالي لي بكل سهولة، والعملية كلها كانت سلسة وسريعة. شكراً لفريق الدعم الرائع!",
  },
  {
    _id: "2",
    name: "Jane Smith",
    review:
      "لطالما كنت أبحث عن رقم مميز يعكس شخصيتي، وهذا الموقع وفّر لي خيارات لا حصر لها. أنصح الجميع باستخدام خدماتهم!",
  },
  {
    _id: "3",
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
    phoneNumber: "01015753392",
  },
  {
    _id: "2",
    title: "أرقام أورانج حصرية",
    description:
      "رقم فريد من أورانج يضمن لك التميز ويساهم في تعزيز تواصلك مع عملائك بشكل أفضل. أرقام أورانج المميزة تناسب رجال الأعمال وأصحاب المشاريع.",
    phoneNumber: "01256677888",
  },
  {
    _id: "3",
    title: "أرقام اتصالات لا مثيل لها",
    description:
      "اجعل رقمك لا يُنسى مع رقم مميز من اتصالات يعكس هوية عملك واحترافك. أرقام اتصالات المميزة هي الخيار المثالي لرجال الأعمال والعملاء المميزين.",
    phoneNumber: "01117778888",
  },
];

export const sortOptions: SortOptions[] = [
  { name: "الأحدث", value: "Nst", sort: "desc", sortBy: "createdAt" },
  { name: "الأقدم", value: "Ost", sort: "asc", sortBy: "createdAt" },
  { name: "الاعلي سعر", value: "Hp", sort: "desc", sortBy: "price" },
  { name: "الاقل سعر", value: "Lp", sort: "asc", sortBy: "price" },
  { name: "الاكثر اقبالا", value: "Tr", sort: "desc", sortBy: "score" },
];

export const store: Store = {
  contacts: {
    phoneNumber: "+201015753392",
    address: "بنها - القليوبيه - مصر",
    email: "primenumber.eg@outlook.com",
    workHours: {
      start: "09:00",
      end: "18:00",
    },
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
  productCounts: "product-counts",
  reviews: "reviews",
  offers: "offers",
  store: "store",
};
