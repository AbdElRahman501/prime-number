import { companies, store } from "@/constants";
import { PhoneNumber } from "@/types";
import { createWhatsAppLink, formatPrice } from "@/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import CartForm from "./CartForm";
import WishListForm from "./WishListForm";
import LogoIcons from "./icons/logos";

const ProductCard: React.FC<
  PhoneNumber & { cart?: string[]; wishList?: string[] }
> = ({ name, phoneNumber, price, company, cart, wishList }) => {
  const inCart = cart && cart.find((c) => c === phoneNumber);
  const inWishList = wishList && wishList.find((c) => c === phoneNumber);
  const color = companies.find((c) => c.name === company)?.color || "gray";
  return (
    <div className="w-full min-w-[265px] rounded-3xl bg-foreground pt-6 text-primary">
      <div className="bg-background py-3">
        <h3
          className="text-center text-4xl font-bold drop-shadow"
          style={{ color }}
        >
          {phoneNumber}
        </h3>
      </div>
      <div className="flex justify-between p-3 pb-0">
        <h4 className="text-xl font-bold">{name}</h4>
        <h4 className="text-xl font-bold">{formatPrice(price, "EGP")}</h4>
      </div>
      <div className="flex items-center justify-between p-3">
        <LogoIcons name={company} className="h-6 w-6" viewBox="0 0 50 50" />
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
            target="_blank"
            href={createWhatsAppLink(store.phoneNumber, phoneNumber)}
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
