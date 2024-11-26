import { fetchStore } from "@/lib/actions/store.actions";
import { Feature } from "@/types";
import React from "react";
import { renderTextWithLineBreaksAndStrong } from "./Blocks";

/**
 * Features Component
 * Renders a list of features using the FeatureCard component.
 */
const Features: React.FC = async () => {
  const store = await fetchStore();
  return (
    <section className="px-5 py-20 md:px-20" aria-labelledby="features">
      <h2 id="features" className="sr-only">
        اكتشف أهم مزايا الأرقام الفريدة والمصممة لتلبية احتياجاتك الشخصية
        والتجارية
      </h2>
      <div className="mx-auto flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {store.features.map((feature) => (
          <FeatureCard key={feature._id} {...feature} />
        ))}
      </div>
    </section>
  );
};

/**
 * FeatureCard Component
 * Displays an individual feature with a title and description.
 */
const FeatureCard: React.FC<Feature> = ({ title, description }) => (
  <div className="max-w-sm text-center text-primary md:w-[30%]">
    <h3 className="text-2xl font-semibold">{title}</h3>
    <p className="mt-2">{renderTextWithLineBreaksAndStrong(description)}</p>
  </div>
);

export default Features;
