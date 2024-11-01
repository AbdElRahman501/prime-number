import Companies from "@/components/Companies";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { ProductSliderSkeleton } from "@/components/LoadingSkeleton";
import ProductSlider from "@/components/ProductSlider";
import Testimonial from "@/components/Testimonial";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">بريم نمبر, ارقام مميزه في مصر</h1>
      <Hero />
      <Companies />
      <Suspense fallback={<ProductSliderSkeleton />}>
        <ProductSlider title="الأرقام المميزة" sort="Tr" />
      </Suspense>
      <Features />
      <Suspense fallback={<ProductSliderSkeleton />}>
        <ProductSlider title="المضاف حديثا" sort="Nst" />
      </Suspense>
      <Testimonial />
    </main>
  );
}
