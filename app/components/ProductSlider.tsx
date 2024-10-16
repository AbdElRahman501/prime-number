import dynamic from "next/dynamic";
import Link from "next/link";

const ProductCard = dynamic(() => import("./ProductCard"), { ssr: false });

const ProductSlider = () => {
  return (
    <section
      className="max-w-8xl mx-auto bg-background p-5 py-10 text-primary lg:px-20"
      aria-labelledby="featured-products-title"
    >
      <div className="rounded-4xl flex flex-col gap-4">
        <div className="title flex items-center justify-between">
          <h1
            id="featured-products-title"
            className="text-3xl font-bold uppercase md:text-4xl"
          >
            الأرقام المميزة
          </h1>
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full text-sm md:text-base"
            aria-label="View all popular numbers"
          >
            <p className="whitespace-nowrap uppercase group-hover:underline">
              عرض الكل
            </p>
          </Link>
        </div>
        <div className="relative">
          <div
            className="scroll-bar-hidden flex w-full gap-4 overflow-x-scroll"
            aria-label="Product slider"
          >
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
