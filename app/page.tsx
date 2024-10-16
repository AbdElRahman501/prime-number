import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Features = dynamic(() => import("@/components/Features"), { ssr: false });
const Companies = dynamic(() => import("@/components/Companies"), {
  ssr: false,
});
const ProductSlider = dynamic(() => import("@/components/ProductSlider"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Companies />
        <ProductSlider />
        <Features />
        <ProductSlider />
      </main>
      <Footer />
    </div>
  );
}
