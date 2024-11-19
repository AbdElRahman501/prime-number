import Companies from "@/components/Companies";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import {
  HeroSkeleton,
  ProductSliderSkeleton,
  TestimonialSkeleton,
} from "@/components/LoadingSkeleton";
import ProductSlider from "@/components/ProductSlider";
import Testimonial from "@/components/Testimonial";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">بريم نمبر, ارقام مميزه في مصر</h1>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Companies />
      <Suspense fallback={<ProductSliderSkeleton />}>
        <ProductSlider title="الأرقام المميزة" sort="Tr" />
      </Suspense>
      <Features />
      <Suspense fallback={<ProductSliderSkeleton />}>
        <ProductSlider title="المضاف حديثا" sort="Nst" />
      </Suspense>
      <Suspense fallback={<TestimonialSkeleton />}>
        <Testimonial />
      </Suspense>
    </main>
  );
}
