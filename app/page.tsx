import Companies from "@/components/Companies";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const Testimonial = dynamic(() => import("@/components/Testimonial"), {
  ssr: false,
});
const Features = dynamic(() => import("@/components/Features"), { ssr: false });

const ProductSlider = dynamic(() => import("@/components/ProductSlider"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">بريم نمبر, ارقام مميزه في مصر</h1>
      <Hero />
      <Companies />
      <ProductSlider />
      <Features />
      <ProductSlider />
      <Testimonial />
    </main>
  );
}
