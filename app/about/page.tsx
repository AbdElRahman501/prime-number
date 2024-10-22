import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function page() {
  return (
    <div className="bg-background py-10">
      <main className="container mx-auto px-6" aria-labelledby="about-heading">
        <h1
          id="about-heading"
          className="mb-8 text-center text-5xl font-bold text-primary drop-shadow-md"
        >
          من نحن
        </h1>

        <section className="mx-auto max-w-3xl text-center text-lg leading-relaxed">
          <p className="text-secondary mb-4 text-2xl font-medium">
            أهلاً بكم في متجر الأرقام المميزة
          </p>
          <p className="mb-6 text-gray-700">
            نحن متجر إلكتروني متخصص في بيع الأرقام المميزة في مصر. تأسسنا بهدف
            توفير أرقام فريدة وعالية الجودة تلبي احتياجات الأفراد والشركات على
            حد سواء. نسعى لأن نكون الرواد في سوق الأرقام المميزة من خلال تقديم
            أفضل الخدمات والتجارب لعملائنا.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="transform rounded-lg bg-white p-6 text-center shadow-xl transition-transform hover:scale-105">
            <h2 className="mb-3 text-xl font-semibold text-primary">رؤيتنا</h2>
            <p className="text-gray-600">
              أن نكون الرواد في سوق الأرقام المميزة، مع التركيز على الجودة
              والتميز في خدمة العملاء.
            </p>
          </div>
          <div className="transform rounded-lg bg-white p-6 text-center shadow-xl transition-transform hover:scale-105">
            <h2 className="mb-3 text-xl font-semibold text-primary">قيمنا</h2>
            <p className="text-gray-600">
              الشفافية، الابتكار، والالتزام هي القيم التي تميزنا وتوجه مسيرتنا.
            </p>
          </div>
          <div className="transform rounded-lg bg-white p-6 text-center shadow-xl transition-transform hover:scale-105">
            <h2 className="mb-3 text-xl font-semibold text-primary">هدفنا</h2>
            <p className="text-gray-600">
              تقديم مجموعة متنوعة من الأرقام المميزة مع التركيز على الجودة ورضا
              العملاء.
            </p>
          </div>
        </section>

        <section className="mt-10 text-center">
          <h2 className="mb-6 text-3xl font-bold text-primary">
            لماذا تختار الأرقام المميزة؟
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            لأننا نؤمن بأن الأرقام المميزة تعكس الهوية وتساعد على تعزيز التواصل
            الشخصي والتجاري. فريقنا من الخبراء هنا لدعمكم في كل خطوة، من اختيار
            الرقم المثالي حتى إتمام عملية الشراء.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="#"
              className="flex max-w-96 items-center justify-center gap-3 rounded-full bg-primary px-10 py-3 text-2xl font-semibold text-white hover:opacity-90 focus:outline-none focus:ring focus:ring-inset focus:ring-blue-300"
              role="button"
              aria-label="تواصل معنا"
            >
              <span>تواصل معنا</span>
              <Icon icon="ri:whatsapp-fill" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
