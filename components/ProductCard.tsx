import { companies } from "@/constants";
import { PhoneNumber } from "@/types";
import { formatPrice } from "@/utils";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import CartForm from "./CartForm";
import WishListForm from "./WishListForm";

const ProductCard: React.FC<
  PhoneNumber & { cart?: string[]; wishList?: string[] }
> = ({ name, phoneNumber, price, company, cart, wishList }) => {
  const inCart = cart && cart.find((c) => c === phoneNumber);
  const inWishList = wishList && wishList.find((c) => c === phoneNumber);
  const color = companies.find((c) => c.name === company)?.color || "gray";
  return (
    <div className="w-full min-w-[265px] rounded-3xl bg-foreground pt-6 text-primary">
      <div className="bg-background py-3">
        <h1
          className="text-center text-4xl font-bold drop-shadow"
          style={{ color }}
        >
          {phoneNumber}
        </h1>
      </div>
      <div className="flex justify-between p-3 pb-0">
        <h2 className="text-xl font-bold">{name}</h2>
        <h2 className="text-xl font-bold">{formatPrice(price, "EGP")}</h2>
      </div>
      <div className="flex justify-between p-3">
        <Image
          width={75}
          height={20}
          className="object-contain"
          src={`/images/${company}.png`}
          alt={`${company} logo`}
        />
        <div className="flex gap-2">
          <CartForm phoneNumber={phoneNumber} type={inCart ? "remove" : "add"}>
            <SubmitButton
              aria-label={`إضافة ${phoneNumber} إلى السلة`}
              className="rounded-full bg-background p-2 text-2xl"
            >
              <Icon icon={inCart ? "solar:bag-bold" : "solar:bag-linear"} />
            </SubmitButton>
          </CartForm>
          <WishListForm phoneNumber={phoneNumber}>
            <SubmitButton
              aria-label={`إضافة ${phoneNumber} إلى المفضلة`}
              className="rounded-full bg-background p-2 text-2xl"
            >
              <Icon
                icon={inWishList ? "mdi:bookmark" : "mdi:bookmark-outline"}
              />
            </SubmitButton>
          </WishListForm>
          <Link
            href="#"
            aria-label={`مشاركة ${phoneNumber} على واتساب`}
            className="rounded-full bg-background p-2 text-2xl"
          >
            <Icon icon="ri:whatsapp-line" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
