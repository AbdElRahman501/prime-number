import { featureList } from "@/constants";
import { Feature } from "@/types";
import React from "react";

// Features component to display key features of the prime number calculator
const Features: React.FC = () => {
  return (
    <section
      className="px-5 py-20 md:px-20"
      role="features"
      aria-labelledby="features"
    >
      <h2 id="features" className="sr-only">
        اكتشف أهم مزايا الأرقام الفريدة والمصممة لتلبية احتياجاتك الشخصية
        والتجارية
      </h2>
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
