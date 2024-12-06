import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import {
  FeatureSkeleton,
  HeroSkeleton,
  ProductSliderSkeleton,
  TestimonialSkeleton,
} from "@/components/LoadingSkeleton";
import { Suspense } from "react";
import Companies from "@/components/Companies";

const Features = dynamic(() => import("@/components/Features"), { ssr: false });
const ProductSlider = dynamic(() => import("@/components/ProductSlider"), {
  ssr: false,
});
const Testimonial = dynamic(() => import("@/components/Testimonial"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      {/* Prioritize SEO with screen-reader content */}
      <h1 className="sr-only">بريم نمبر, ارقام مميزه في مصر</h1>

      {/* Load the Hero Section immediately */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      {/* Lazy load other components */}
      <Companies />
      <Suspense fallback={<ProductSliderSkeleton />}>
        <ProductSlider title="الأرقام المميزة" sort="Tr" />
      </Suspense>
      <Suspense fallback={<FeatureSkeleton />}>
        <Features />
      </Suspense>
      <Suspense fallback={<ProductSliderSkeleton />}>
        <ProductSlider title="المضاف حديثا" sort="Nst" />
      </Suspense>
      <Suspense fallback={<TestimonialSkeleton />}>
        <Testimonial />
      </Suspense>
    </main>
  );
}
