import { Icon } from "@iconify/react";
import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="relative w-80 min-w-[306px] flex-1 snap-x snap-mandatory snap-start flex-col gap-4 rounded-3xl bg-foreground pt-5 text-primary">
      <h1 className="bg-background py-3 text-center text-3xl font-bold">
        01015753392
      </h1>
      <div className="flex justify-between p-3 pb-0">
        <h2 className="text-xl font-bold">رقم مميز</h2>
        <h2 className="text-2xl font-bold">15,500.00 جنيه</h2>
      </div>
      <div className="flex justify-between p-3">
        <Image
          width={75}
          height={20}
          className="object-contain"
          src="/images/vodafone.png"
          alt="Vodafone logo"
          priority
        />
        <div className="flex gap-2">
          <Icon
            className="rounded-full bg-background p-2 text-3xl"
            icon="bx:bxs-cart"
            aria-label="Add to cart"
          />
          <Icon
            className="rounded-full bg-background p-2 text-3xl"
            icon="bx:bxs-bookmark"
            aria-label="Bookmark"
          />
          <Icon
            className="rounded-full bg-background p-2 text-3xl"
            icon="ri:whatsapp-fill"
            aria-label="Share on WhatsApp"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
