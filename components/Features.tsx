import React from "react";

interface Feature {
  _id: number | string;
  title: string;
  description: string;
}

const featureList: Feature[] = [
  {
    _id: 1,
    title: "حساب سريع للأرقام الأولية",
    description:
      "نوفر خوارزمية متطورة تضمن حسابًا فوريًا للأرقام الأولية بدقة عالية",
  },
  {
    _id: 2,
    title: "واجهة سهلة الاستخدام",
    description:
      "صممنا واجهة بسيطة وجذابة تمكن المستخدمين من التحقق من الأرقام بسهولة",
  },
  {
    _id: 3,
    title: "دعم متعدد الأجهزة",
    description:
      "يعمل موقعنا بكفاءة على جميع الأجهزة، من الهواتف الذكية إلى أجهزة الكمبيوتر المكتبية",
  },
];

// Features component to display key features of the prime number calculator
const Features: React.FC = () => {
  return (
    <section className="px-5 py-12 md:px-20" aria-labelledby="features-heading">
      <div className="mx-auto flex flex-col items-center justify-center gap-8 sm:flex-row sm:flex-wrap">
        {featureList.map((feature) => (
          <FeatureCard key={feature._id} {...feature} />
        ))}
      </div>
    </section>
  );
};

const FeatureCard: React.FC<Feature> = ({ title, description }) => (
  <div className="max-w-sm text-center text-primary md:w-[30%]">
    <h3 className="text-2xl font-semibold">{title}</h3>
    <p className="mt-2">{description}</p>
  </div>
);
export default Features;
