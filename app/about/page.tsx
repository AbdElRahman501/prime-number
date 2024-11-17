import { fetchStore } from "@/lib/actions/store.actions";
import { createWhatsAppLink } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default async function page() {
  const store = await fetchStore();
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
            أهلاً بكم في افضل متجر الأرقام المميزة في مصر{" "}
            <strong>بريم نمبر</strong>
          </p>
          <p className="mb-6 text-gray-700">
            نحن متجر إلكتروني متخصص في بيع <strong>أرقام مميزة</strong> في مصر،
            ونهدف إلى تقديم تجربة فريدة من نوعها لعملائنا الذين يبحثون عن{" "}
            <strong>أرقام فودافون مميزة</strong>،{" "}
            <strong>أرقام أورانج مميزة</strong>، و
            <strong>أرقام موبينيل مميزة</strong>. تأسسنا بهدف توفير أرقام تتناسب
            مع احتياجات الأفراد والشركات على حد سواء. سواء كنت تبحث عن رقم
            لتقديمه كهدية خاصة، أو تحتاج إلى رقم يُعبر عن شخصيتك وهويتك، فإننا
            نوفر لك تشكيلة واسعة من <strong>الأرقام الفاخرة</strong> و
            <strong>الأرقام VIP</strong> التي تلبي كل رغباتك.
          </p>
          <p className="mb-6 text-gray-700">
            بفضل خبرتنا الكبيرة في سوق <strong>الأرقام المميزة</strong>، نحن
            ندرك أن الرقم المثالي يمكن أن يسهم في تعزيز هوية عملك أو تعزيز
            علامتك الشخصية. لذلك نعمل باستمرار على تقديم أفضل الخيارات من{" "}
            <strong>الأرقام الفريدة</strong> التي تساعدك على التميز في أي مجال
            تختاره.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="transform rounded-3xl bg-white p-6 text-center shadow-xl transition-transform hover:scale-105">
            <h2 className="mb-3 text-xl font-semibold text-primary">رؤيتنا</h2>
            <p className="text-gray-600">
              أن نكون الرواد في <strong>سوق الأرقام المميزة</strong>، مع التركيز
              على الجودة والتميز في خدمة العملاء. نهدف إلى أن نكون الوجهة الأولى
              لكل من يبحث عن
              <strong>أرقام خاصة</strong> للاستخدام الشخصي أو{" "}
              <strong>أرقام مميزة للأعمال</strong>.
            </p>
          </div>
          <div className="transform rounded-3xl bg-white p-6 text-center shadow-xl transition-transform hover:scale-105">
            <h2 className="mb-3 text-xl font-semibold text-primary">قيمنا</h2>
            <p className="text-gray-600">
              الشفافية، الابتكار، والالتزام هي القيم التي تميزنا وتوجه مسيرتنا
              في توفير
              <strong>أرقام مميزة للأفراد والشركات</strong>. نحرص على أن نكون
              شريكاً موثوقاً للعملاء في تقديم <strong>أرقام برايم</strong> و
              <strong>أرقام فريدة</strong> تلبي تطلعاتهم.
            </p>
          </div>
          <div className="transform rounded-3xl bg-white p-6 text-center shadow-xl transition-transform hover:scale-105">
            <h2 className="mb-3 text-xl font-semibold text-primary">هدفنا</h2>
            <p className="text-gray-600">
              تقديم مجموعة متنوعة من <strong>الأرقام المميزة</strong> مع التركيز
              على الجودة ورضا العملاء. نسعى إلى تقديم أفضل{" "}
              <strong>أرقام مميزة للبيع</strong>، سواء كانت للاستخدام الشخصي أو
              للأعمال التجارية، مع خدمات تسهل اختيار الرقم المناسب.
            </p>
          </div>
        </section>

        <section className="mt-10 text-center">
          <h2 className="mb-6 text-3xl font-bold text-primary">
            لماذا تختار <strong>الأرقام المميزة</strong>؟
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            لأننا نؤمن بأن <strong>الأرقام المميزة</strong> تعكس الهوية وتساعد
            على تعزيز التواصل الشخصي والتجاري. نقدم <strong>أرقام برايم</strong>{" "}
            و<strong>أرقام فريدة</strong> تدعم تميزكم في كافة المجالات. فريقنا
            من الخبراء هنا لدعمكم في كل خطوة، من اختيار
            <strong>الرقم المثالي</strong> حتى إتمام عملية الشراء، لتستمتعوا
            بتجربة مريحة وسلسة.
          </p>
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-center text-3xl font-bold text-primary">
            خدماتنا
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="transform rounded-3xl bg-white p-6 text-center shadow-xl transition-transform hover:scale-105">
              <h3 className="mb-3 text-xl font-semibold text-primary">
                أرقام خاصة للأفراد
              </h3>
              <p className="text-gray-600">
                نقدم تشكيلة واسعة من <strong>الأرقام المميزة</strong> التي تناسب
                الاستخدام الشخصي. سواء كنت تبحث عن رقم سهل الحفظ أو{" "}
                <strong>رقم سريع التذكر</strong>، فإننا نوفر لك أفضل الخيارات
                التي تساعدك في بناء هوية مميزة.
              </p>
            </div>
            <div className="transform rounded-3xl bg-white p-6 text-center shadow-xl transition-transform hover:scale-105">
              <h3 className="mb-3 text-xl font-semibold text-primary">
                أرقام للأعمال
              </h3>
              <p className="text-gray-600">
                للأعمال التجارية، نوفر <strong>أرقام مميزة</strong> تسهم في
                تعزيز حضور شركتك وتسهيل عملية التواصل مع العملاء. من{" "}
                <strong>أرقام VIP</strong>
                إلى <strong>أرقام ترويجية</strong>، نحن هنا لدعم نمو أعمالك.
              </p>
            </div>
          </div>
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-center text-3xl font-bold text-primary">
            لماذا تعتبر الأرقام المميزة استثماراً؟
          </h2>
          <p className="mx-auto max-w-2xl text-center text-gray-700">
            إن شراء <strong>رقم مميز</strong> ليس مجرد رفاهية، بل هو استثمار
            حقيقي يمكن أن يسهم في تعزيز علامتك التجارية أو حتى في تميزك الشخصي.
            فالأرقام التي نختارها بعناية تتميز بكونها{" "}
            <strong>سهلة التذكر</strong> و<em>ذات تأثير قوي</em> على العملاء
            والمستثمرين. اقتناء <strong>رقم VIP</strong> أو{" "}
            <strong>رقم فريد</strong> هو خطوة نحو بناء هوية متميزة سواء كنت
            فرداً أو مؤسسة.
          </p>
        </section>

        <section className="my-10">
          <h2 className="mb-6 text-center text-3xl font-bold text-primary">
            تواصل معنا الآن
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-center text-gray-700">
            إذا كنت تبحث عن <strong>رقم مميز</strong> للاستخدام الشخصي أو
            التجاري، لا تتردد في التواصل معنا. نحن هنا لتقديم الاستشارة ومساعدتك
            في اختيار
            <strong>الرقم المثالي</strong> الذي يلبي احتياجاتك.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={createWhatsAppLink(store.contacts.phoneNumber)}
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
