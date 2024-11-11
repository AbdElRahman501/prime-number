import { getQuickProducts } from "@/lib/actions/product.actions";
import { Sort } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cookies } from "next/headers";
import Link from "next/link";
import ProductCard from "./ProductCard";

const ProductSlider: React.FC<{
  title: string;
  sort: Sort;
}> = async ({ sort, title }) => {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];

  const wishListData = cookies().get("wishList")?.value;
  const wishList: string[] = wishListData ? JSON.parse(wishListData) : [];

  const phoneNumbers = await getQuickProducts(sort);

  if (phoneNumbers.length < 3) return null;
  return (
    <section
      className="bg-background p-5 py-10 pb-16 text-primary lg:px-20"
      role="region"
      aria-labelledby="products"
    >
      <div className="rounded-4xl container mx-auto flex flex-col gap-4">
        <div className="title flex items-center justify-between">
          <h2
            id="products"
            className="text-3xl font-bold uppercase md:text-4xl"
          >
            {title}
          </h2>
          <Link
            href={{
              pathname: "/shop",
              query: { sort: sort },
            }}
            className="group flex items-center gap-1 rounded-full text-sm md:text-base"
            aria-label="View all"
          >
            <p className="whitespace-nowrap uppercase group-hover:underline">
              عرض الكل
            </p>
            <Icon
              icon="bi:arrow-left"
              className="duration-300 group-hover:-translate-x-2"
            />
          </Link>
        </div>
        <div className="relative">
          <div
            className="scroll-bar-hidden flex w-full gap-4 overflow-x-scroll"
            aria-label="Product slider"
          >
            {phoneNumbers.map((number) => (
              <ProductCard
                key={number._id}
                {...number}
                cart={cart}
                wishList={wishList}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
