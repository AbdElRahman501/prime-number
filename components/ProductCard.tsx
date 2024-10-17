import { PhoneNumber } from "@/types";
import { formatPrice } from "@/utils";
import { Icon } from "@iconify/react";
import Image from "next/image";

const ProductCard: React.FC<PhoneNumber> = ({ name, phoneNumber, price }) => {
  return (
    <div className="relative w-80 min-w-[306px] flex-1 snap-x snap-mandatory snap-start flex-col gap-4 rounded-3xl bg-foreground pt-6 text-primary">
      <h1 className="bg-background py-3 text-center text-4xl font-bold">
        {phoneNumber}
      </h1>
      <div className="flex justify-between p-3 pb-0">
        <h2 className="text-xl font-bold">{name}</h2>
        <h2 className="text-xl font-bold">{formatPrice(price, "EGP")}</h2>
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
            className="rounded-full bg-background p-2 text-4xl"
            icon="solar:bag-linear"
            aria-label="Add to cart"
          />
          <Icon
            className="rounded-full bg-background p-2 text-4xl"
            icon="mdi:bookmark-outline"
            aria-label="Bookmark"
          />
          <Icon
            className="rounded-full bg-background p-2 text-4xl"
            icon="ri:whatsapp-line"
            aria-label="Share on WhatsApp"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
